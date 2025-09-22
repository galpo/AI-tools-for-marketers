"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function analyzeContent(content: string) {
  const prompt = `Analyze the following marketing content and provide a JSON response with the following structure:
  {
    "sentiment": "positive/negative/neutral",
    "readabilityScore": number (1-10, where 10 is most readable),
    "keyTopics": ["topic1", "topic2", "topic3"],
    "suggestions": ["suggestion1", "suggestion2", "suggestion3"],
    "tone": "professional/casual/enthusiastic/etc",
    "wordCount": number
  }

  Content to analyze:
  ${content}

  Provide actionable suggestions for improving the marketing effectiveness of this content.`

  const { text } = await generateText({
    model: openai("gpt-4o"),
    prompt,
    maxOutputTokens: 500,
  })

  return text
}
