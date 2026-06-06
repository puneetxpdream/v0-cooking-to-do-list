'use client'

import { useMemo, useState } from 'react'
import { MealPlanResponse } from '@/lib/schemas'

interface GroceryListProps {
  mealPlan: MealPlanResponse
}

export function GroceryList({ mealPlan }: GroceryListProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

  // Group items by category
  const groupedByCategory = useMemo(() => {
    const grouped: Record<string, typeof mealPlan.groceryList> = {}
    
    mealPlan.groceryList.forEach((item) => {
      if (!grouped[item.category]) {
        grouped[item.category] = []
      }
      grouped[item.category].push(item)
    })

    return Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b))
  }, [mealPlan.groceryList])

  const toggleCategory = (category: string) => {
    setExpandedCategory(
      expandedCategory === category ? null : category
    )
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6">Shopping List</h2>
      
      <div className="space-y-3">
        {groupedByCategory.map(([category, items]) => (
          <div key={category} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleCategory(category)}
              className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 flex justify-between items-center font-medium text-left transition-colors"
            >
              <span className="capitalize">{category}</span>
              <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
                {items.length} items
              </span>
            </button>

            {expandedCategory === category && (
              <div className="divide-y divide-gray-100">
                {items.map((item, idx) => (
                  <div
                    key={idx}
                    className="px-4 py-3 bg-white flex justify-between items-start hover:bg-gray-50"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{item.item}</p>
                      <p className="text-sm text-gray-600">
                        {item.quantity} {item.unit}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        ${item.estimatedCost.toFixed(2)}
                      </p>
                    </div>
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
