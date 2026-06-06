import { z } from 'zod'

export const mealSchema = z.object({
  name: z.string().describe('Name of the meal'),
  description: z.string().describe('Brief description of the meal'),
  cookingTime: z.number().describe('Cooking time in minutes'),
  ingredients: z.array(
    z.object({
      item: z.string().describe('Ingredient name'),
      quantity: z.string().describe('Quantity of the ingredient'),
      unit: z.string().describe('Unit of measurement (cups, grams, etc.)'),
      estimatedCost: z.number().describe('Estimated cost in Indian Rupees'),
    })
  ).describe('List of ingredients needed for this meal'),
})

export const mealPlanResponseSchema = z.object({
  mealPlan: z.object({
    breakfast: mealSchema.describe('Breakfast meal details'),
    lunch: mealSchema.describe('Lunch meal details'),
    dinner: mealSchema.describe('Dinner meal details'),
  }).describe('Daily meal plan'),
  groceryList: z.array(
    z.object({
      item: z.string().describe('Grocery item name'),
      quantity: z.string().describe('Total quantity needed'),
      unit: z.string().describe('Unit of measurement'),
      estimatedCost: z.number().describe('Total cost for this item in Indian Rupees'),
      category: z.string().describe('Category (produce, protein, dairy, pantry, etc.)'),
    })
  ).describe('Consolidated grocery list with estimated costs in Indian Rupees'),
  substitutions: z.array(
    z.object({
      originalItem: z.string().describe('Original ingredient'),
      alternatives: z.array(
        z.object({
          name: z.string().describe('Alternative ingredient'),
          reason: z.string().describe('Why this is a good substitute'),
        })
      ).describe('List of substitution options'),
    })
  ).describe('Dietary substitution suggestions'),
  budget: z.object({
    total: z.number().describe('Total estimated cost in Indian Rupees'),
    byMeal: z.object({
      breakfast: z.number().describe('Estimated cost for breakfast in Indian Rupees'),
      lunch: z.number().describe('Estimated cost for lunch in Indian Rupees'),
      dinner: z.number().describe('Estimated cost for dinner in Indian Rupees'),
    }).describe('Cost breakdown by meal in Indian Rupees'),
    costPerServing: z.number().describe('Estimated cost per serving in Indian Rupees'),
  }).describe('Budget summary and breakdown in Indian Rupees'),
})

export type MealPlanResponse = z.infer<typeof mealPlanResponseSchema>
