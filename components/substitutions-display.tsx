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
      <h2 className="text-2xl font-bold mb-6">Ingredient Substitutions</h2>
      
      <div className="space-y-3">
        {mealPlan.substitutions.map((sub, idx) => (
          <div
            key={idx}
            className="border border-gray-200 rounded-lg overflow-hidden bg-white"
          >
            <button
              onClick={() => toggleItem(sub.originalItem)}
              className="w-full px-4 py-3 hover:bg-gray-50 flex justify-between items-center text-left transition-colors"
            >
              <span className="font-medium text-gray-900">{sub.originalItem}</span>
              <span className="text-gray-400">
                {expandedItem === sub.originalItem ? '−' : '+'}
              </span>
            </button>

            {expandedItem === sub.originalItem && (
              <div className="divide-y divide-gray-100 border-t border-gray-200">
                {sub.alternatives.map((alt, altIdx) => (
                  <div key={altIdx} className="px-4 py-3 bg-gray-50">
                    <p className="font-medium text-gray-900 mb-1">{alt.name}</p>
                    <p className="text-sm text-gray-600">{alt.reason}</p>
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
