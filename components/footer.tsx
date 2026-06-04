'use client'

import { Code2, Share2, Globe } from 'lucide-react'

interface FooterProps {
  showAbout?: boolean
}

export default function Footer({ showAbout = false }: FooterProps) {
  return (
    <footer className="border-t border-border/40 bg-background/50 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Branding */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm">Interview Command</h3>
            <p className="text-xs text-muted-foreground">
              AI-powered mock interviews to help you ace your next opportunity.
            </p>
          </div>

          {/* Creator Info */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm">Created By</h3>
            <p className="text-xs text-muted-foreground mb-2">
              Designed & Developed by
              <br />
              <span className="text-foreground font-medium">Sri Monishan Robert Kumar</span>
            </p>
          </div>

          {/* Creator Links */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm">Connect</h3>
            <div className="flex items-center gap-4">
              <a
                href="https://srimonishan.com/"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                title="Portfolio"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/sri-monishan-robert-kumar/"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                title="LinkedIn"
              >
                <Share2 className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/srimonishan"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                title="GitHub"
              >
                <Code2 className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border/40 mt-8 pt-8">
          <p className="text-xs text-muted-foreground text-center">
            © 2024 Interview Command. A Sri Monishan AI Project.
          </p>
        </div>
      </div>
    </footer>
  )
}
