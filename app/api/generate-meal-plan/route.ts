import { generateText, Output } from 'ai'
import { mealPlanResponseSchema } from '@/lib/schemas'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      dailyRoutine,
      dietaryPreferences,
      allergies,
      budget,
      servings,
    } = body

    // Validate input
    if (!dailyRoutine || !dietaryPreferences || !budget || !servings) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const systemPrompt = `You are an expert meal planner who creates personalized daily meal plans. Your goals are to:
1. Create nutritious, varied meals that respect dietary preferences and allergies
2. Optimize for the specified budget constraint
3. Provide practical ingredient substitutions for common dietary needs
4. Calculate accurate costs and portions

Always provide meals that are:
- Balanced (protein, carbs, vegetables)
- Realistic to cook for the specified number of servings
- Within the budget constraint
- Mindful of the person's daily routine and energy needs`

    const userMessage = `Please create a daily meal plan with the following preferences:
- Daily Routine: ${dailyRoutine}
- Dietary Preferences: ${dietaryPreferences}
- Allergies/Restrictions: ${allergies || 'None'}
- Budget Constraint: ${budget}
- Number of Servings: ${servings}

Generate a complete meal plan including breakfast, lunch, and dinner. For each meal, provide the recipe name, description, cooking time, and all ingredients with quantities and estimated costs. Also provide a consolidated grocery list, dietary substitutions, and a budget breakdown.`

    const result = await generateText({
      model: 'openai/gpt-4o-mini',
      system: systemPrompt,
      prompt: userMessage,
      output: Output.object({ schema: mealPlanResponseSchema }),
      temperature: 0.7,
    })

    // Extract the structured object from the result
    const mealPlan = result.object

    return Response.json(mealPlan)
  } catch (error) {
    console.error('Error generating meal plan:', error)
    return Response.json(
      {
        error: 'Failed to generate meal plan',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}
