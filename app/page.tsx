'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Zap, Users, TrendingUp, Sparkles, Info } from 'lucide-react'
import Footer from '@/components/footer'
import AboutModal from '@/components/about-modal'

export default function Home() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isAboutOpen, setIsAboutOpen] = useState(false)

  const handleStartInterview = () => {
    setIsLoading(true)
    router.push('/interview-setup')
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="border-b border-border/40 bg-background/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold">Interview Command</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#features" className="text-sm hover:text-primary transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm hover:text-primary transition-colors">How It Works</a>
            <button
              onClick={() => setIsAboutOpen(true)}
              className="text-sm hover:text-primary transition-colors flex items-center gap-1"
            >
              <Info className="w-4 h-4" />
              About
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-[calc(100vh-80px)] relative overflow-hidden flex items-center">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold tracking-tight">
                  Master Your
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Next Interview</span>
                </h1>
                <p className="text-lg text-muted-foreground">
                  Practice with an AI interviewer that asks dynamic follow-up questions, provides real-time scoring, and generates personalized improvement plans.
                </p>
                <p className="text-xs text-muted-foreground/70 italic">
                  A Sri Monishan AI Project — Designed & Developed by Sri Monishan Robert Kumar
                </p>
              </div>

              <button
                onClick={handleStartInterview}
                disabled={isLoading}
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Starting...' : 'Start Mock Interview'}
                <Sparkles className="w-4 h-4" />
              </button>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-primary">1000+</div>
                  <div className="text-xs text-muted-foreground">Interviews Conducted</div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-primary">92%</div>
                  <div className="text-xs text-muted-foreground">Success Rate</div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-primary">15 min</div>
                  <div className="text-xs text-muted-foreground">Avg Interview</div>
                </div>
              </div>
            </motion.div>

            {/* Right - Dashboard Preview */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-card border border-border/40 rounded-xl p-6 space-y-4 shadow-2xl">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-muted-foreground">PERFORMANCE METRICS</span>
                    <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                  </div>
                  <div className="h-1 bg-border/40 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary to-accent"
                      initial={{ width: '0%' }}
                      animate={{ width: '75%' }}
                      transition={{ duration: 2, delay: 0.5 }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Communication</span>
                    <span className="text-primary font-semibold">78%</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Technical Knowledge</span>
                    <span className="text-primary font-semibold">85%</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Confidence</span>
                    <span className="text-primary font-semibold">72%</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-border/40">
                  <p className="text-xs text-muted-foreground mb-3">KEY RECOMMENDATIONS</p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-xs">
                      <span className="text-primary mt-1">→</span>
                      <span>Practice more technical questions</span>
                    </li>
                    <li className="flex items-start gap-2 text-xs">
                      <span className="text-primary mt-1">→</span>
                      <span>Work on pacing and pauses</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 border-t border-border/40">
        <div className="mx-auto max-w-7xl px-6">
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold">Powerful Features</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Everything you need to ace your interview
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: <Zap className="w-6 h-6" />,
                  title: 'AI Interviewer',
                  description: 'Real-time conversation with dynamic follow-up questions'
                },
                {
                  icon: <TrendingUp className="w-6 h-6" />,
                  title: 'Live Scoring',
                  description: 'Real-time performance metrics across multiple categories'
                },
                {
                  icon: <Users className="w-6 h-6" />,
                  title: 'Personalized Plans',
                  description: 'AI-generated improvement recommendations'
                },
                {
                  icon: <Sparkles className="w-6 h-6" />,
                  title: 'Interview History',
                  description: 'Track progress and review past interviews'
                }
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card border border-border/40 rounded-lg p-6 space-y-3 hover:border-primary/50 transition-colors"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* About Modal */}
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
    </main>
  )
}
