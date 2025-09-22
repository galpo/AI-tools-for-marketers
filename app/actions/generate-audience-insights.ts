"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

interface AudienceInsightsParams {
  industry: string
  product: string
  currentAudience?: string
}

export async function generateAudienceInsights({ industry, product, currentAudience }: AudienceInsightsParams) {
  const prompt = `Generate detailed audience insights for a ${product} in the ${industry} industry. ${currentAudience ? `Current audience: ${currentAudience}` : ""}

  Provide a JSON response with the following structure:
  {
    "demographics": ["demographic1", "demographic2", "demographic3"],
    "psychographics": ["psychographic1", "psychographic2", "psychographic3"],
    "painPoints": ["pain1", "pain2", "pain3"],
    "motivations": ["motivation1", "motivation2", "motivation3"],
    "channels": ["channel1", "channel2", "channel3"],
    "messaging": ["message1", "message2", "message3"]
  }

  Be specific and actionable in your insights.`

  const { text } = await generateText({
    model: openai("gpt-4o"),
    prompt,
    maxOutputTokens: 600,
  })

  return text
}
