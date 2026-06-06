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
    <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-lg font-bold mb-4 capitalize text-foreground flex items-center gap-2">
        {mealName === 'breakfast' && '🌅'}
        {mealName === 'lunch' && '☀️'}
        {mealName === 'dinner' && '🌙'}
        {mealName}
      </h3>
      
      <div className="mb-4 pb-4 border-b border-border">
        <h4 className="font-semibold text-base mb-1 text-foreground">{meal.name}</h4>
        <p className="text-muted-foreground text-sm mb-3">{meal.description}</p>
        <p className="text-xs text-muted-foreground font-medium">⏱ {meal.cookingTime} mins</p>
      </div>

      <div>
        <h5 className="font-semibold text-sm mb-3 text-foreground">Ingredients:</h5>
        <ul className="space-y-2">
          {meal.ingredients.map((ingredient, idx) => (
            <li key={idx} className="text-sm text-foreground">
              <span className="font-medium">{ingredient.item}</span>
              <span className="text-muted-foreground"> - {ingredient.quantity} {ingredient.unit}</span>
              <span className="text-primary font-semibold"> ₹{ingredient.estimatedCost.toFixed(0)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )

  return (
    <div className="w-full space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Your Daily Meal Plan</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {renderMeal('breakfast', breakfast)}
        {renderMeal('lunch', lunch)}
        {renderMeal('dinner', dinner)}
      </div>
    </div>
  )
}
