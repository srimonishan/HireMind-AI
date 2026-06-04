"use client"

export const dynamic = 'force-dynamic'

import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronLeft, Download, Share2, Repeat2 } from 'lucide-react'
import ScoreChart from '@/components/score-chart'
import ImprovementPlan from '@/components/improvement-plan'
import Footer from '@/components/footer'

export default function Results() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const communication = parseInt(searchParams.get('communication') || '0')
  const technical = parseInt(searchParams.get('technical') || '0')
  const confidence = parseInt(searchParams.get('confidence') || '0')
  const jobTitle = searchParams.get('jobTitle') || 'Interview'

  const overallScore = Math.round((communication + technical + confidence) / 3)

  const getScoringLevel = (score: number) => {
    if (score >= 80) return { label: 'Excellent', color: '#00d9ff' }
    if (score >= 70) return { label: 'Good', color: '#0ea5e9' }
    if (score >= 60) return { label: 'Average', color: '#fbbf24' }
    return { label: 'Needs Improvement', color: '#ef4444' }
  }

  const handleDownload = () => {
    const report = `
Interview Results Report
========================

Position: ${jobTitle}
Date: ${new Date().toLocaleDateString()}

SCORES:
- Communication: ${communication}%
- Technical Knowledge: ${technical}%
- Confidence: ${confidence}%

Overall Score: ${overallScore}%

RECOMMENDATIONS:
${communication < 75 ? '- Work on clear communication and articulation\n' : ''}
${technical < 75 ? '- Study more technical concepts\n' : ''}
${confidence < 75 ? '- Practice to build confidence\n' : ''}

Good luck on your interview!
    `
    const blob = new Blob([report], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `interview-results-${new Date().getTime()}.txt`
    a.click()
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border/40 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:text-primary transition-colors">
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Home</span>
          </Link>
          <h1 className="text-lg font-semibold">Interview Results</h1>
          <div className="w-20" />
        </div>
      </div>

      {/* Results Content */}
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Score */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 bg-card border border-border/40 rounded-xl p-8 space-y-6"
          >
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">Overall Performance</h2>
              <p className="text-muted-foreground">{jobTitle} Interview</p>
            </div>

            <div className="flex items-center gap-12">
              <div className="flex-1">
                <ScoreChart
                  communication={communication}
                  technical={technical}
                  confidence={confidence}
                />
              </div>

              <div className="space-y-6 text-center">
                <div>
                  <div className="text-6xl font-bold text-primary">{overallScore}%</div>
                  <p className="text-muted-foreground mt-2">{getScoringLevel(overallScore).label}</p>
                </div>

                <div className="grid grid-cols-1 gap-3 w-full">
                  <div className="bg-background/50 rounded-lg p-3 space-y-1">
                    <p className="text-xs text-muted-foreground">Communication</p>
                    <p className="text-lg font-semibold">{communication}%</p>
                  </div>
                  <div className="bg-background/50 rounded-lg p-3 space-y-1">
                    <p className="text-xs text-muted-foreground">Technical</p>
                    <p className="text-lg font-semibold">{technical}%</p>
                  </div>
                  <div className="bg-background/50 rounded-lg p-3 space-y-1">
                    <p className="text-xs text-muted-foreground">Confidence</p>
                    <p className="text-lg font-semibold">{confidence}%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Feedback Cards */}
            <div className="pt-8 border-t border-border/40 space-y-4">
              <h3 className="font-semibold">Detailed Feedback</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    score: communication,
                    label: 'Communication',
                    feedback: communication >= 75
                      ? 'Great articulation and clarity!'
                      : 'Focus on speaking more clearly and concisely.',
                  },
                  {
                    score: technical,
                    label: 'Technical Knowledge',
                    feedback: technical >= 75
                      ? 'Solid technical foundation!'
                      : 'Study the key concepts for this role.',
                  },
                  {
                    score: confidence,
                    label: 'Confidence',
                    feedback: confidence >= 75
                      ? 'You came across as confident!'
                      : 'Practice more to build your confidence.',
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-background/50 border border-border/40 rounded-lg p-4 space-y-2"
                  >
                    <p className="text-sm font-semibold text-primary">{item.label}</p>
                    <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-primary to-accent"
                        initial={{ width: '0%' }}
                        animate={{ width: `${item.score}%` }}
                        transition={{ duration: 1, delay: idx * 0.2 }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">{item.feedback}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Improvement Plan */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card border border-border/40 rounded-xl p-6"
            >
              <ImprovementPlan
                scores={{ communication, technical, confidence }}
              />
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-3"
            >
              <button
                onClick={handleDownload}
                className="w-full px-4 py-3 bg-card border border-border rounded-lg font-medium hover:bg-card/80 transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download Report
              </button>
              <button
                onClick={() => router.push('/')}
                className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              >
                <Repeat2 className="w-4 h-4" />
                Try Again
              </button>
              <button
                className="w-full px-4 py-3 bg-card border border-border rounded-lg font-medium hover:bg-card/80 transition-colors flex items-center justify-center gap-2 opacity-50 cursor-not-allowed"
              >
                <Share2 className="w-4 h-4" />
                Share (Coming Soon)
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  )
}
