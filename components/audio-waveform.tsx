import { motion } from 'framer-motion'

export default function AudioWaveform() {
  const bars = Array.from({ length: 12 })

  return (
    <div className="flex items-center justify-center gap-1">
      {bars.map((_, i) => (
        <motion.div
          key={i}
          className="w-1 bg-gradient-to-t from-primary to-accent rounded-full"
          animate={{ height: ['4px', '20px', '4px'] }}
          transition={{
            duration: 0.5,
            delay: i * 0.05,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
