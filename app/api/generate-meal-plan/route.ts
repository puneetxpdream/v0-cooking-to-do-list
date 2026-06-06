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

    const systemPrompt = `You are an expert Indian meal planner who creates personalized daily meal plans using Indian ingredients and cooking styles. Your goals are to:
1. Create nutritious, varied Indian meals that respect dietary preferences and allergies
2. Optimize for the specified budget constraint using Indian market prices
3. Provide practical ingredient substitutions for common dietary needs
4. Calculate accurate costs and portions using Indian Rupees (₹)

Always provide meals that are:
- Balanced with Indian cooking traditions (protein, carbs, vegetables, spices)
- Realistic to cook for the specified number of servings
- Within the budget constraint using realistic Indian grocery prices
- Mindful of the person's daily routine and energy needs
- Feature authentic Indian recipes and common Indian ingredients available at local markets`

    const budgetMap = {
      low: '₹200-300 per day',
      medium: '₹300-600 per day',
      high: '₹600+ per day'
    }

    const userMessage = `Please create a daily meal plan with the following preferences:
- Daily Routine: ${dailyRoutine}
- Dietary Preferences: ${dietaryPreferences}
- Allergies/Restrictions: ${allergies || 'None'}
- Budget Constraint: ${budgetMap[budget as keyof typeof budgetMap]}
- Number of Servings: ${servings}

Generate a complete Indian meal plan including breakfast, lunch, and dinner. For each meal, provide the recipe name, description, cooking time, and all ingredients with quantities and estimated costs in Indian Rupees. Also provide a consolidated grocery list, dietary substitutions, and a budget breakdown. Use authentic Indian ingredients and cooking methods.`

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
