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
      estimatedCost: z.number().describe('Estimated cost in dollars'),
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
      estimatedCost: z.number().describe('Total cost for this item'),
      category: z.string().describe('Category (produce, protein, dairy, pantry, etc.)'),
    })
  ).describe('Consolidated grocery list with estimated costs'),
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
    total: z.number().describe('Total estimated cost in dollars'),
    byMeal: z.object({
      breakfast: z.number().describe('Estimated cost for breakfast'),
      lunch: z.number().describe('Estimated cost for lunch'),
      dinner: z.number().describe('Estimated cost for dinner'),
    }).describe('Cost breakdown by meal'),
    costPerServing: z.number().describe('Estimated cost per serving'),
  }).describe('Budget summary and breakdown'),
})

export type MealPlanResponse = z.infer<typeof mealPlanResponseSchema>
