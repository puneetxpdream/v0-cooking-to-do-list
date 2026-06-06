'use client'

import { MealPlanResponse } from '@/lib/schemas'

interface BudgetSummaryProps {
  mealPlan: MealPlanResponse
}

export function BudgetSummary({ mealPlan }: BudgetSummaryProps) {
  const { budget } = mealPlan

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6 text-foreground">Budget Breakdown</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Total Cost Card */}
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-6">
          <h3 className="text-sm font-semibold text-primary mb-2">Total Daily Cost</h3>
          <p className="text-4xl font-bold text-primary">
            ₹{budget.total.toFixed(0)}
          </p>
          <p className="text-sm text-primary/70 mt-2">
            ₹{budget.costPerServing.toFixed(0)} per serving
          </p>
        </div>

        {/* Cost by Meal */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-semibold mb-4 text-foreground">Cost by Meal</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Breakfast</span>
              <span className="font-semibold text-foreground">
                ₹{budget.byMeal.breakfast.toFixed(0)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Lunch</span>
              <span className="font-semibold text-foreground">
                ₹{budget.byMeal.lunch.toFixed(0)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Dinner</span>
              <span className="font-semibold text-foreground">
                ₹{budget.byMeal.dinner.toFixed(0)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Budget Analysis */}
      <div className="mt-6 bg-accent/5 border border-accent/20 rounded-xl p-4">
        <h3 className="font-semibold text-accent mb-2">Money-Saving Tips</h3>
        <p className="text-sm text-foreground/70">
          Shop at local Indian markets for fresh produce and spices at better prices. Buy seasonal vegetables and consider buying in bulk from wholesale markets. You can also use the substitutions provided to reduce costs further.
        </p>
      </div>
    </div>
  )
}
