'use client'

import { useState } from 'react'
import { MealPlanResponse } from '@/lib/schemas'

interface SubstitutionsDisplayProps {
  mealPlan: MealPlanResponse
}

export function SubstitutionsDisplay({ mealPlan }: SubstitutionsDisplayProps) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null)

  if (mealPlan.substitutions.length === 0) {
    return null
  }

  const toggleItem = (item: string) => {
    setExpandedItem(expandedItem === item ? null : item)
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6 text-foreground">Money-Saving Alternatives</h2>
      
      <div className="space-y-3">
        {mealPlan.substitutions.map((sub, idx) => (
          <div
            key={idx}
            className="border border-border rounded-xl overflow-hidden bg-card"
          >
            <button
              onClick={() => toggleItem(sub.originalItem)}
              className="w-full px-4 py-3 hover:bg-muted/50 flex justify-between items-center text-left transition-colors"
            >
              <span className="font-semibold text-foreground">{sub.originalItem}</span>
              <span className="text-primary font-bold text-lg">
                {expandedItem === sub.originalItem ? '−' : '+'}
              </span>
            </button>

            {expandedItem === sub.originalItem && (
              <div className="divide-y divide-border border-t border-border">
                {sub.alternatives.map((alt, altIdx) => (
                  <div key={altIdx} className="px-4 py-3 bg-muted/30">
                    <p className="font-semibold text-foreground mb-1">{alt.name}</p>
                    <p className="text-sm text-muted-foreground">{alt.reason}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
