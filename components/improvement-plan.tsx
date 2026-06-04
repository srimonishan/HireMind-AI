import { CheckCircle, AlertCircle, Zap } from 'lucide-react'

interface ImprovementPlanProps {
  scores: {
    communication: number
    technical: number
    confidence: number
  }
}

export default function ImprovementPlan({ scores }: ImprovementPlanProps) {
  const generateRecommendations = () => {
    const recommendations = []

    if (scores.communication < 75) {
      recommendations.push({
        icon: AlertCircle,
        title: 'Communication',
        tips: [
          'Speak more clearly and slowly',
          'Use concrete examples',
          'Avoid filler words (um, uh)',
        ],
      })
    }

    if (scores.technical < 75) {
      recommendations.push({
        icon: Zap,
        title: 'Technical Knowledge',
        tips: [
          'Review core concepts daily',
          'Practice coding problems',
          'Study system design',
        ],
      })
    }

    if (scores.confidence < 75) {
      recommendations.push({
        icon: Zap,
        title: 'Confidence',
        tips: [
          'Practice mock interviews',
          'Prepare stories and examples',
          'Remember your achievements',
        ],
      })
    }

    if (recommendations.length === 0) {
      recommendations.push({
        icon: CheckCircle,
        title: 'Great Job!',
        tips: [
          'You performed well across all areas',
          'Keep up the practice',
          'You&apos;re ready for real interviews',
        ],
      })
    }

    return recommendations
  }

  const recommendations = generateRecommendations()

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Improvement Plan</h3>

      <div className="space-y-4">
        {recommendations.map((rec, idx) => {
          const Icon = rec.icon
          return (
            <div key={idx} className="space-y-2">
              <div className="flex items-center gap-2">
                <Icon className="w-5 h-5 text-primary" />
                <p className="font-medium text-sm">{rec.title}</p>
              </div>
              <ul className="space-y-1 ml-7">
                {rec.tips.map((tip, tipIdx) => (
                  <li key={tipIdx} className="text-xs text-muted-foreground">
                    • {tip}
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>

      <div className="bg-primary/10 border border-primary/30 rounded-lg p-3 mt-4">
        <p className="text-xs text-foreground">
          💡 Book your next interview in 2-3 days to test your improvements!
        </p>
      </div>
    </div>
  )
}
