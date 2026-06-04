import { motion } from 'framer-motion'

interface ScoreDisplayProps {
  scores: {
    communication: number
    technical: number
    confidence: number
  }
}

export default function ScoreDisplay({ scores }: ScoreDisplayProps) {
  const overall = Math.round((scores.communication + scores.technical + scores.confidence) / 3)

  return (
    <div className="flex items-center gap-4">
      <div className="text-right space-y-1">
        <p className="text-sm font-semibold text-primary">{overall}%</p>
        <p className="text-xs text-muted-foreground">Overall Score</p>
      </div>
      <div className="flex gap-2">
        {Object.entries(scores).map(([key, value]) => (
          <div key={key} className="text-center space-y-1">
            <div className="w-12 h-12 rounded-lg bg-card border border-border/40 flex items-center justify-center">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-xs font-semibold text-primary"
              >
                {value}%
              </motion.span>
            </div>
            <p className="text-xs text-muted-foreground capitalize">
              {key.substring(0, 3)}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
