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
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto space-y-6">
      <div>
        <label htmlFor="dailyRoutine" className="block text-sm font-medium mb-2">
          Daily Routine / Activity Level
        </label>
        <select
          id="dailyRoutine"
          name="dailyRoutine"
          value={formData.dailyRoutine}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
        <label htmlFor="dietaryPreferences" className="block text-sm font-medium mb-2">
          Dietary Preferences
        </label>
        <select
          id="dietaryPreferences"
          name="dietaryPreferences"
          value={formData.dietaryPreferences}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
        <label htmlFor="allergies" className="block text-sm font-medium mb-2">
          Allergies & Restrictions (optional)
        </label>
        <textarea
          id="allergies"
          name="allergies"
          value={formData.allergies}
          onChange={handleChange}
          placeholder="e.g., nuts, shellfish, dairy, soy"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={3}
          disabled={isLoading}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="budget" className="block text-sm font-medium mb-2">
            Budget Constraint
          </label>
          <select
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading}
          >
            <option value="low">Low (₹200-300/day)</option>
            <option value="medium">Medium (₹300-600/day)</option>
            <option value="high">High (₹600+/day)</option>
          </select>
        </div>

        <div>
          <label htmlFor="servings" className="block text-sm font-medium mb-2">
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
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading}
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full"
        size="lg"
      >
        {isLoading ? 'Generating meal plan...' : 'Generate My Meal Plan'}
      </Button>
    </form>
  )
}
