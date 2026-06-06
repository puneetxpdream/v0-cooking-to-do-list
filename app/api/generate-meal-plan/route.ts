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

    try {
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
    } catch (aiError) {
      console.error('[v0] AI SDK Error:', aiError)
      
      const errorMessage = aiError instanceof Error ? aiError.message : String(aiError)
      
      // Check for billing/credit card errors
      if (errorMessage.includes('credit card') || errorMessage.includes('requires a valid')) {
        return Response.json(
          {
            error: 'Billing setup required',
            details: 'To use the AI Meal Planner, please add a payment method to your Vercel account at https://vercel.com/account/billing to enable AI Gateway credits.',
          },
          { status: 402 }
        )
      }
      
      // Check for authentication errors
      if (errorMessage.includes('Unauthenticated') || errorMessage.includes('API_KEY')) {
        return Response.json(
          {
            error: 'AI Gateway authentication failed',
            details: 'Please ensure AI_GATEWAY_API_KEY environment variable is properly set in Vercel project settings.',
          },
          { status: 401 }
        )
      }

      // Generic AI errors
      return Response.json(
        {
          error: 'Failed to generate meal plan',
          details: errorMessage,
        },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('[v0] Request Error:', error)
    return Response.json(
      {
        error: 'Invalid request',
        details: error instanceof Error ? error.message : 'An unexpected error occurred',
      },
      { status: 400 }
    )
  }
}
