"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

interface CampaignPlanParams {
  goal: string
  budget: string
  timeline: string
  audience: string
  product: string
}

export async function generateCampaignPlan({ goal, budget, timeline, audience, product }: CampaignPlanParams) {
  const prompt = `Generate a comprehensive marketing campaign plan for a ${product} targeting ${audience} with a ${goal} goal, ${budget} budget, and ${timeline} timeline.

  Provide a JSON response with the following structure:
  {
    "strategy": "Overall campaign strategy description",
    "timeline": ["milestone1", "milestone2", "milestone3"],
    "budget": ["budget allocation1", "budget allocation2", "budget allocation3"],
    "channels": ["channel1", "channel2", "channel3"],
    "kpis": ["kpi1", "kpi2", "kpi3"],
    "content": ["content strategy1", "content strategy2", "content strategy3"]
  }

  Be specific and actionable with realistic recommendations.`

  const { text } = await generateText({
    model: openai("gpt-4o"),
    prompt,
    maxTokens: 700,
  })

  return text
}
