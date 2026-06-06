'use client'

import { MealPlanResponse } from '@/lib/schemas'

interface BudgetSummaryProps {
  mealPlan: MealPlanResponse
}

export function BudgetSummary({ mealPlan }: BudgetSummaryProps) {
  const { budget } = mealPlan

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6">Budget Breakdown</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Total Cost Card */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-6">
          <h3 className="text-sm font-medium text-blue-600 mb-2">Total Daily Cost</h3>
          <p className="text-4xl font-bold text-blue-900">
            ${budget.total.toFixed(2)}
          </p>
          <p className="text-sm text-blue-700 mt-2">
            ${budget.costPerServing.toFixed(2)} per serving
          </p>
        </div>

        {/* Cost by Meal */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="font-medium mb-4">Cost by Meal</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Breakfast</span>
              <span className="font-semibold text-gray-900">
                ${budget.byMeal.breakfast.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Lunch</span>
              <span className="font-semibold text-gray-900">
                ${budget.byMeal.lunch.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Dinner</span>
              <span className="font-semibold text-gray-900">
                ${budget.byMeal.dinner.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Budget Analysis */}
      <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
        <h3 className="font-medium text-green-900 mb-2">💡 Budget Tips</h3>
        <p className="text-sm text-green-800">
          This meal plan is designed to be budget-friendly. Look for seasonal produce and 
          consider buying store brands to save even more. You can also use the substitutions 
          provided to reduce costs further.
        </p>
      </div>
    </div>
  )
}
