'use client'

import { MealPlanResponse } from '@/lib/schemas'

interface MealPlanDisplayProps {
  mealPlan: MealPlanResponse
}

export function MealPlanDisplay({ mealPlan }: MealPlanDisplayProps) {
  const { breakfast, lunch, dinner } = mealPlan.mealPlan

  const renderMeal = (
    mealName: string,
    meal: typeof breakfast
  ) => (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4 capitalize">{mealName}</h3>
      
      <div className="mb-4">
        <h4 className="font-medium text-base mb-1">{meal.name}</h4>
        <p className="text-gray-600 text-sm mb-3">{meal.description}</p>
        <p className="text-xs text-gray-500">⏱️ Cooking time: {meal.cookingTime} minutes</p>
      </div>

      <div>
        <h5 className="font-medium text-sm mb-2">Ingredients:</h5>
        <ul className="space-y-2">
          {meal.ingredients.map((ingredient, idx) => (
            <li key={idx} className="text-sm text-gray-700">
              <span className="font-medium">{ingredient.item}</span>
              <span className="text-gray-600"> - {ingredient.quantity} {ingredient.unit}</span>
              <span className="text-gray-500"> (₹{ingredient.estimatedCost.toFixed(0)})</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )

  return (
    <div className="w-full space-y-6">
      <h2 className="text-2xl font-bold">Your Daily Meal Plan</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {renderMeal('breakfast', breakfast)}
        {renderMeal('lunch', lunch)}
        {renderMeal('dinner', dinner)}
      </div>
    </div>
  )
}
