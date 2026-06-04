import { motion } from 'framer-motion'

interface ScoreChartProps {
  communication: number
  technical: number
  confidence: number
}

export default function ScoreChart({ communication, technical, confidence }: ScoreChartProps) {
  const data = [
    { label: 'Communication', value: communication, color: '#00d9ff' },
    { label: 'Technical', value: technical, color: '#1e40af' },
    { label: 'Confidence', value: confidence, color: '#0ea5e9' },
  ]

  const maxValue = 100

  return (
    <div className="space-y-6">
      {data.map((item, idx) => (
        <div key={item.label} className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">{item.label}</span>
            <span className="text-sm font-semibold text-primary">{item.value}%</span>
          </div>
          <div className="h-3 bg-background rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: item.color }}
              initial={{ width: '0%' }}
              animate={{ width: `${(item.value / maxValue) * 100}%` }}
              transition={{ duration: 0.8, delay: idx * 0.2, ease: 'easeOut' }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
