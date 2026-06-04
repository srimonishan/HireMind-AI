'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ChevronLeft, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function InterviewSetup() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [config, setConfig] = useState({
    jobTitle: '',
    interviewType: 'technical',
    difficulty: 'intermediate',
    duration: 15,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (field: string, value: string | number) => {
    setConfig(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const validateStep = () => {
    const newErrors: Record<string, string> = {}

    if (step === 1) {
      if (!config.jobTitle.trim()) newErrors.jobTitle = 'Job title is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep()) {
      if (step < 2) {
        setStep(step + 1)
      } else {
        startInterview()
      }
    }
  }

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1)
  }

  const startInterview = () => {
    // Store config in localStorage
    try {
      localStorage.setItem('interviewConfig', JSON.stringify({
        jobTitle: config.jobTitle,
        interviewType: config.interviewType,
        difficulty: config.difficulty,
        duration: config.duration,
      }))
      router.push('/interview')
    } catch (error) {
      console.error('Failed to save interview config:', error)
      setErrors({ submit: 'Failed to save configuration. Please try again.' })
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border/40 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:text-primary transition-colors">
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back</span>
          </Link>
          <div className="text-center">
            <h1 className="text-lg font-semibold">Interview Setup</h1>
            <p className="text-xs text-muted-foreground">Step {step} of 2</p>
          </div>
          <div className="w-20" />
        </div>
      </div>

      {/* Progress Bar */}
      <div className="border-b border-border/40 bg-background/40">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex gap-2">
            {[1, 2].map(s => (
              <motion.div
                key={s}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  s <= step ? 'bg-primary' : 'bg-border/40'
                }`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: (s - 1) * 0.1 }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="min-h-[calc(100vh-200px)] flex items-center">
        <div className="mx-auto max-w-2xl w-full px-6 py-12">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {/* Step 1: Job Details */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold">What position are you interviewing for?</h2>
                  <p className="text-muted-foreground">Tell us about the job you&apos;re preparing for</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Job Title</label>
                    <input
                      type="text"
                      value={config.jobTitle}
                      onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                      placeholder="e.g., Senior Product Manager"
                      className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    />
                    {errors.jobTitle && <p className="text-destructive text-sm mt-1">{errors.jobTitle}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Interview Type</label>
                    <select
                      value={config.interviewType}
                      onChange={(e) => handleInputChange('interviewType', e.target.value)}
                      className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:border-primary transition-colors"
                    >
                      <option value="technical">Technical</option>
                      <option value="behavioral">Behavioral</option>
                      <option value="mixed">Mixed</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Configuration */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold">Customize your interview</h2>
                  <p className="text-muted-foreground">Adjust the difficulty and duration</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Difficulty Level</label>
                    <div className="grid grid-cols-3 gap-3">
                      {['beginner', 'intermediate', 'advanced'].map(level => (
                        <button
                          key={level}
                          onClick={() => handleInputChange('difficulty', level)}
                          className={`py-3 px-4 rounded-lg font-medium transition-all ${
                            config.difficulty === level
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-card border border-border hover:border-primary/50'
                          }`}
                        >
                          {level.charAt(0).toUpperCase() + level.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Duration</label>
                    <div className="space-y-3">
                      <input
                        type="range"
                        min="5"
                        max="60"
                        step="5"
                        value={config.duration}
                        onChange={(e) => handleInputChange('duration', parseInt(e.target.value))}
                        className="w-full"
                      />
                      <div className="text-center">
                        <span className="text-lg font-semibold text-primary">{config.duration} minutes</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="border-t border-border/40 bg-background/40 sticky bottom-0">
        <div className="mx-auto max-w-2xl w-full px-6 py-6 flex gap-4">
          <button
            onClick={handlePrevious}
            disabled={step === 1}
            className="px-6 py-3 bg-card border border-border rounded-lg font-medium hover:bg-card/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
          >
            {step === 2 ? (
              <>
                Start Interview <Sparkles className="w-4 h-4" />
              </>
            ) : (
              'Next'
            )}
          </button>
        </div>
      </div>
    </main>
  )
}
