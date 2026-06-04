'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Code2, Share2, Globe, Sparkles } from 'lucide-react'

interface AboutModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AboutModal({ isOpen, onClose }: AboutModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
          >
            <div className="bg-card border border-border/40 rounded-xl max-w-md w-full space-y-6 p-6 shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">About Interview Command</h2>
                <button
                  onClick={onClose}
                  className="p-1 hover:bg-background rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    A Premium AI Project
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Interview Command is an AI-powered mock interview platform designed to help job seekers practice and ace their interviews with real-time feedback and personalized improvement plans.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold">Created By</h3>
                  <p className="text-sm text-muted-foreground">
                    Designed & Developed by
                    <br />
                    <span className="text-foreground font-medium">Sri Monishan Robert Kumar</span>
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold">Technologies</h3>
                  <p className="text-sm text-muted-foreground">
                    Built with Next.js 16, React 19, TypeScript, Tailwind CSS, Framer Motion, and OpenAI GPT-4o-mini.
                  </p>
                </div>

                {/* Creator Links */}
                <div className="border-t border-border/40 pt-4 space-y-3">
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Connect with Creator</p>
                  <div className="grid grid-cols-3 gap-2">
                    <a
                      href="https://srimonishan.com/"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 px-3 py-2 bg-background border border-border/40 rounded-lg hover:border-primary/50 transition-colors text-xs font-medium"
                    >
                      <Globe className="w-4 h-4" />
                      Portfolio
                    </a>
                    <a
                      href="https://www.linkedin.com/in/sri-monishan-robert-kumar/"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 px-3 py-2 bg-background border border-border/40 rounded-lg hover:border-primary/50 transition-colors text-xs font-medium"
                    >
                      <Share2 className="w-4 h-4" />
                      LinkedIn
                    </a>
                    <a
                      href="https://github.com/srimonishan"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 px-3 py-2 bg-background border border-border/40 rounded-lg hover:border-primary/50 transition-colors text-xs font-medium"
                    >
                      <Code2 className="w-4 h-4" />
                      GitHub
                    </a>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Got It
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
