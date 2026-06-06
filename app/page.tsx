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
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            Authentic Indian Meal Plans
          </h1>
          <p className="text-lg text-primary-foreground/90">
            AI-powered meal planning for Indian cuisine, tailored to your budget
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-12 px-4">
        {/* Main Content */}
        {!mealPlan ? (
          <div className="bg-card rounded-xl shadow-lg p-8 max-w-2xl mx-auto border border-border">
            <MealForm onSubmit={handleGenerateMealPlan} isLoading={isLoading} />
            {error && (
              <div className="mt-6 p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
                <p className="text-destructive font-semibold mb-1">Error generating meal plan</p>
                <p className="text-destructive/80 text-sm mb-3">{error}</p>
                <button
                  onClick={() => setMealPlan(null)}
                  className="px-4 py-2 bg-destructive text-white rounded-lg hover:bg-destructive/90 transition-colors font-medium text-sm"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {/* Meal Plan Grid */}
            <div className="bg-card rounded-xl shadow-lg p-8 border border-border">
              <MealPlanDisplay mealPlan={mealPlan} />
            </div>

            {/* Shopping List and Budget in 2-column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-card rounded-xl shadow-lg p-8 border border-border">
                <GroceryList mealPlan={mealPlan} />
              </div>

              <div className="bg-card rounded-xl shadow-lg p-8 border border-border">
                <BudgetSummary mealPlan={mealPlan} />
              </div>
            </div>

            {/* Substitutions */}
            {mealPlan.substitutions.length > 0 && (
              <div className="bg-card rounded-xl shadow-lg p-8 border border-border">
                <SubstitutionsDisplay mealPlan={mealPlan} />
              </div>
            )}

            {/* Reset Button */}
            <div className="text-center pt-4">
              <button
                onClick={() => {
                  setMealPlan(null)
                  setError(null)
                }}
                className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold shadow-md"
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
