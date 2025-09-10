import { streamText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    const result = streamText({
      model: openai("gpt-4o"),
      system: `You are an AI assistant specialized in marketing tools and technologies. You help marketers find the right AI tools for their specific needs.

You have knowledge of various marketing tool categories including:
- Analytics & Data tools (like Apollo, Clearbit, Lusha)
- Lead Builders (like Apollo Intelligence)
- Workflow Systems
- Content Creation tools
- Social Media Management
- Email Marketing platforms
- SEO tools
- And many more

When users ask about tools, provide helpful recommendations based on their specific needs, budget, and use case. Be concise but informative.`,
      messages,
      maxTokens: 1000,
      temperature: 0.7,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("Chat API error:", error)
    return new Response("Internal Server Error", { status: 500 })
  }
}
