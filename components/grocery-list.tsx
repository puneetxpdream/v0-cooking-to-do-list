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
      <h2 className="text-2xl font-bold mb-6 text-foreground">Shopping List</h2>
      
      <div className="space-y-3">
        {groupedByCategory.map(([category, items]) => (
          <div key={category} className="border border-border rounded-xl overflow-hidden bg-card">
            <button
              onClick={() => toggleCategory(category)}
              className="w-full px-4 py-3 bg-muted hover:bg-muted/80 flex justify-between items-center font-semibold text-left transition-colors text-foreground"
            >
              <span className="capitalize">{category}</span>
              <span className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full font-medium">
                {items.length} items
              </span>
            </button>

            {expandedCategory === category && (
              <div className="divide-y divide-border">
                {items.map((item, idx) => (
                  <div
                    key={idx}
                    className="px-4 py-3 bg-card flex justify-between items-start hover:bg-muted/40"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{item.item}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.quantity} {item.unit}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-primary">
                        ₹{item.estimatedCost.toFixed(0)}
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
