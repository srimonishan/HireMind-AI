'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, Mic, MicOff, Send, RotateCcw } from 'lucide-react'
import Link from 'next/link'
import AudioWaveform from '@/components/audio-waveform'
import ScoreDisplay from '@/components/score-display'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface InterviewConfig {
  jobTitle: string
  interviewType: string
  difficulty: string
  duration: number
}

export default function InterviewRoom() {
  const router = useRouter()
  const [config, setConfig] = useState<InterviewConfig | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [userInput, setUserInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [isRecording, setIsRecording] = useState(false)
  const [scores, setScores] = useState({
    communication: 0,
    technical: 0,
    confidence: 0,
  })
  const [error, setError] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Load config from localStorage
  useEffect(() => {
    try {
      const savedConfig = localStorage.getItem('interviewConfig')
      if (!savedConfig) {
        router.push('/interview-setup')
        return
      }
      const parsedConfig = JSON.parse(savedConfig) as InterviewConfig
      setConfig(parsedConfig)
    } catch (error) {
      console.error('[v0] Failed to load interview config:', error)
      router.push('/interview-setup')
    }
  }, [router])

  // Initialize and start interview
  useEffect(() => {
    if (!config) return
    startInterview()

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [config])

  // Timer
  useEffect(() => {
    if (!config) return
    
    timerRef.current = setInterval(() => {
      setElapsedTime(prev => {
        if (prev >= config.duration * 60) {
          if (timerRef.current) clearInterval(timerRef.current)
          handleEndInterview()
          return prev
        }
        return prev + 1
      })
    }, 1000)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [config])

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const startInterview = async () => {
    if (!config) return
    
    setIsLoading(true)
    setError('')
    
    try {
      const initialQuestion = await getAIResponse(
        `You are conducting a ${config.jobTitle} interview. Ask the first technical or behavioral question about the ${config.jobTitle} role. Keep it concise (1-2 sentences).`
      )
      setMessages([{
        role: 'assistant',
        content: initialQuestion,
        timestamp: new Date(),
      }])
      setIsRecording(true)
    } catch (error) {
      console.error('[v0] Failed to start interview:', error)
      const errorMsg = error instanceof Error ? error.message : 'Unknown error'
      setError(`Failed to start interview: ${errorMsg}`)
      setMessages([{
        role: 'assistant',
        content: `Sorry, there was an error starting the interview. ${errorMsg}`,
        timestamp: new Date(),
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const getAIResponse = async (prompt: string): Promise<string> => {
    const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY
    if (!apiKey) throw new Error('OpenAI API key not configured')

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: `You are an expert technical interviewer for ${config?.jobTitle} positions. Your job is to:
1. Ask challenging but fair technical and behavioral questions
2. Follow up based on the candidate's answers
3. Provide constructive feedback
Keep responses concise (2-3 sentences max for questions, 1-2 sentences for follow-ups).`,
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: 0.7,
          max_tokens: 150,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error?.message || `API error: ${response.status}`)
      }

      const data = await response.json()
      return data.choices[0]?.message?.content || 'Could not generate response'
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }
      throw new Error('Failed to get AI response')
    }
  }

  const calculateScores = (userAnswer: string) => {
    // Simple scoring logic - in production, this would be more sophisticated
    const wordCount = userAnswer.split(' ').length
    const hasExamples = userAnswer.includes('example') || userAnswer.includes('such as')
    const hasDetails = wordCount > 15

    const communication = Math.min(100, 50 + (hasDetails ? 20 : 0) + (hasExamples ? 20 : 0) + Math.random() * 10)
    const technical = Math.min(100, 40 + (wordCount > 20 ? 30 : 20) + (hasExamples ? 20 : 0) + Math.random() * 10)
    const confidence = Math.min(100, 50 + (hasDetails ? 20 : 0) + Math.random() * 30)

    setScores({
      communication: Math.round(communication),
      technical: Math.round(technical),
      confidence: Math.round(confidence),
    })
  }

  const handleSendMessage = async () => {
    if (!userInput.trim() || !config) return

    const userMessage: Message = {
      role: 'user',
      content: userInput,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    calculateScores(userInput)
    setUserInput('')
    setIsLoading(true)
    setIsRecording(false)
    setError('')

    try {
      const conversationContext = messages
        .slice(-4)
        .map(m => `${m.role === 'user' ? 'Candidate' : 'Interviewer'}: ${m.content}`)
        .join('\n')

      const prompt = `${conversationContext}\nCandidate: ${userInput}\n\nAsk a relevant follow-up question or provide feedback.`
      const aiResponse = await getAIResponse(prompt)

      const assistantMessage: Message = {
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date(),
      }

      setMessages(prev => [...prev, assistantMessage])
      setIsRecording(true)
    } catch (error) {
      console.error('[v0] Failed to get AI response:', error)
      const errorMsg = error instanceof Error ? error.message : 'Unknown error'
      setError(errorMsg)
      const errorMessage: Message = {
        role: 'assistant',
        content: `Sorry, I encountered an error: ${errorMsg}. Please try again.`,
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleEndInterview = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    localStorage.removeItem('interviewConfig')
    
    const params = new URLSearchParams()
    params.set('communication', scores.communication.toString())
    params.set('technical', scores.technical.toString())
    params.set('confidence', scores.confidence.toString())
    params.set('jobTitle', config?.jobTitle || 'Software Engineer')
    router.push(`/results?${params.toString()}`)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (!config) {
    return (
      <main className="h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">Loading interview...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <div className="border-b border-border/40 bg-background/80 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl w-full px-6 py-4 flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-lg font-semibold">{config.jobTitle} Interview</h1>
            <p className="text-xs text-muted-foreground">{formatTime(elapsedTime)} / {config.duration}:00</p>
          </div>
          <div className="flex items-center gap-4">
            <ScoreDisplay scores={scores} />
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`p-2 rounded-lg transition-colors ${
                isMuted ? 'bg-destructive/20 text-destructive' : 'bg-primary/20 text-primary'
              }`}
            >
              {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="border-b border-destructive/40 bg-destructive/10">
          <div className="mx-auto max-w-6xl w-full px-6 py-3">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        </div>
      )}

      {/* Interview Room */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="mx-auto max-w-6xl w-full h-full px-6 py-8 flex gap-8">
          {/* Left: AI Avatar Area */}
          <div className="hidden lg:flex flex-col items-center justify-center w-1/3 space-y-4">
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 rounded-full blur-2xl" />
              <div className="relative w-full h-full bg-card border-2 border-primary rounded-full flex items-center justify-center">
                <AnimatePresence>
                  {isRecording && <AudioWaveform key="waveform" />}
                </AnimatePresence>
              </div>
            </div>
            <div className="text-center space-y-2">
              <h2 className="font-semibold text-lg">AI Interviewer</h2>
              <p className="text-xs text-muted-foreground">
                {isLoading ? 'Thinking...' : isRecording ? 'Ready to listen' : 'Speaking...'}
              </p>
            </div>
          </div>

          {/* Right: Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-6 pb-4">
              <AnimatePresence mode="popLayout">
                {messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-md px-4 py-3 rounded-lg ${
                        msg.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-card border border-border/40 text-foreground'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                      <p className="text-xs opacity-60 mt-2">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-border/40 pt-4 space-y-3">
              <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.ctrlKey) handleSendMessage()
                }}
                placeholder="Type your answer here..."
                disabled={isLoading}
                className="w-full p-3 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                rows={3}
              />
              <div className="flex gap-3">
                <button
                  onClick={handleEndInterview}
                  className="px-4 py-2 bg-card border border-border rounded-lg font-medium hover:bg-card/80 transition-colors text-sm"
                >
                  End Interview
                </button>
                <button
                  onClick={handleSendMessage}
                  disabled={isLoading || !userInput.trim()}
                  className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send Answer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
