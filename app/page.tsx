'use client'

import { useState } from 'react'
import { MealForm, FormData } from '@/components/meal-form'
import { MealPlanDisplay } from '@/components/meal-plan-display'
import { GroceryList } from '@/components/grocery-list'
import { BudgetSummary } from '@/components/budget-summary'
import { SubstitutionsDisplay } from '@/components/substitutions-display'
import { MealPlanResponse } from '@/lib/schemas'

export default function Page() {
  const [mealPlan, setMealPlan] = useState<MealPlanResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGenerateMealPlan = async (formData: FormData) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/generate-meal-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to generate meal plan')
      }

      const data = await response.json()
      setMealPlan(data)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An unexpected error occurred'
      )
      console.error('Error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🍽️ AI Meal Planner
          </h1>
          <p className="text-lg text-gray-600">
            Get personalized daily meal plans tailored to your preferences and budget
          </p>
        </div>

        {/* Main Content */}
        {!mealPlan ? (
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
            <MealForm onSubmit={handleGenerateMealPlan} isLoading={isLoading} />
            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 font-medium">Error:</p>
                <p className="text-red-700 text-sm">{error}</p>
                <button
                  onClick={() => setMealPlan(null)}
                  className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-8">
            {/* Meal Plan Grid */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <MealPlanDisplay mealPlan={mealPlan} />
            </div>

            {/* Shopping List and Budget in 2-column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <GroceryList mealPlan={mealPlan} />
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <BudgetSummary mealPlan={mealPlan} />
              </div>
            </div>

            {/* Substitutions */}
            {mealPlan.substitutions.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-8">
                <SubstitutionsDisplay mealPlan={mealPlan} />
              </div>
            )}

            {/* Reset Button */}
            <div className="text-center">
              <button
                onClick={() => {
                  setMealPlan(null)
                  setError(null)
                }}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Generate Another Meal Plan
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
