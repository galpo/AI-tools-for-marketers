import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // System prompt for AI marketing tools assistant
    const systemPrompt = `You are an AI assistant specialized in marketing tools and technologies. You help users discover, compare, and choose the best AI tools for their marketing needs.

Your knowledge includes:
- Lead generation tools (Apollo, Clearbit, Lusha)
- Content creation tools (Jasper, Copy.ai, Writesonic)
- Analytics and data tools (HubSpot, Salesforce, Google Analytics)
- Email marketing tools (Mailchimp, ConvertKit, Klaviyo)
- Social media tools (Hootsuite, Buffer, Sprout Social)
- SEO tools (SEMrush, Ahrefs, Moz)
- Automation tools (Zapier, Make, ActiveCampaign)
- CRM systems (HubSpot, Salesforce, Pipedrive)

When users ask about tools:
1. Provide specific tool recommendations
2. Compare features and pricing when relevant
3. Suggest use cases and best practices
4. Ask clarifying questions to better understand their needs
5. Keep responses concise but informative

Always be helpful, accurate, and focused on marketing tools and strategies.`

    const result = streamText({
      model: openai("gpt-4o"),
      system: systemPrompt,
      messages,
      temperature: 0.7,
      maxTokens: 1000,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("Chat API error:", error)
    return new Response("Internal Server Error", { status: 500 })
  }
}
