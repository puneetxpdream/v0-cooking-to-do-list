'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface MealFormProps {
  onSubmit: (data: FormData) => Promise<void>
  isLoading: boolean
}

export interface FormData {
  dailyRoutine: string
  dietaryPreferences: string
  allergies: string
  budget: 'low' | 'medium' | 'high'
  servings: number
}

export function MealForm({ onSubmit, isLoading }: MealFormProps) {
  const [formData, setFormData] = useState<FormData>({
    dailyRoutine: 'moderately active',
    dietaryPreferences: 'omnivore',
    allergies: '',
    budget: 'medium',
    servings: 2,
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'servings' ? parseInt(value) : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-6">
      <h2 className="text-2xl font-bold text-foreground mb-6">Tell Us Your Preferences</h2>

      <div>
        <label htmlFor="dailyRoutine" className="block text-sm font-semibold text-foreground mb-2">
          Daily Routine / Activity Level
        </label>
        <select
          id="dailyRoutine"
          name="dailyRoutine"
          value={formData.dailyRoutine}
          onChange={handleChange}
          className="w-full px-4 py-2.5 border border-border rounded-lg bg-input text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          disabled={isLoading}
        >
          <option>Sedentary (desk job)</option>
          <option>Lightly active (casual exercise)</option>
          <option>Moderately active</option>
          <option>Very active (frequent workouts)</option>
          <option>Extremely active (athlete)</option>
        </select>
      </div>

      <div>
        <label htmlFor="dietaryPreferences" className="block text-sm font-semibold text-foreground mb-2">
          Dietary Preferences
        </label>
        <select
          id="dietaryPreferences"
          name="dietaryPreferences"
          value={formData.dietaryPreferences}
          onChange={handleChange}
          className="w-full px-4 py-2.5 border border-border rounded-lg bg-input text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          disabled={isLoading}
        >
          <option>Omnivore</option>
          <option>Vegetarian</option>
          <option>Vegan</option>
          <option>Pescatarian (no meat, includes fish)</option>
          <option>Gluten-free</option>
        </select>
      </div>

      <div>
        <label htmlFor="allergies" className="block text-sm font-semibold text-foreground mb-2">
          Allergies & Restrictions (optional)
        </label>
        <textarea
          id="allergies"
          name="allergies"
          value={formData.allergies}
          onChange={handleChange}
          placeholder="e.g., nuts, shellfish, dairy, soy"
          className="w-full px-4 py-2.5 border border-border rounded-lg bg-input text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          rows={3}
          disabled={isLoading}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="budget" className="block text-sm font-semibold text-foreground mb-2">
            Budget Constraint
          </label>
          <select
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-border rounded-lg bg-input text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            disabled={isLoading}
          >
            <option value="low">Low (₹200-300/day)</option>
            <option value="medium">Medium (₹300-600/day)</option>
            <option value="high">High (₹600+/day)</option>
          </select>
        </div>

        <div>
          <label htmlFor="servings" className="block text-sm font-semibold text-foreground mb-2">
            Number of Servings
          </label>
          <input
            id="servings"
            type="number"
            name="servings"
            value={formData.servings}
            onChange={handleChange}
            min="1"
            max="10"
            className="w-full px-4 py-2.5 border border-border rounded-lg bg-input text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            disabled={isLoading}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 px-6 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md text-base"
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating meal plan...
          </span>
        ) : (
          'Generate My Meal Plan'
        )}
      </button>
    </form>
  )
}
