"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

interface CopyGenerationParams {
  product: string
  audience: string
  tone: string
  copyType: string
}

export async function generateCopy({ product, audience, tone, copyType }: CopyGenerationParams) {
  const prompts = {
    headline: `Generate 5 compelling headlines for ${product} targeting ${audience}. Use a ${tone} tone. Make them attention-grabbing and benefit-focused.`,
    "social-media": `Create 3 engaging social media posts for ${product} targeting ${audience}. Use a ${tone} tone. Include relevant hashtags and call-to-actions.`,
    "email-subject": `Generate 5 email subject lines for ${product} targeting ${audience}. Use a ${tone} tone. Make them compelling and likely to increase open rates.`,
    "ad-copy": `Write compelling ad copy for ${product} targeting ${audience}. Use a ${tone} tone. Include a strong headline, benefits, and clear call-to-action.`,
    "product-description": `Write a detailed product description for ${product} targeting ${audience}. Use a ${tone} tone. Highlight key features, benefits, and value proposition.`,
    "landing-page": `Create landing page copy for ${product} targeting ${audience}. Use a ${tone} tone. Include headline, subheadline, benefits, and call-to-action.`,
  }

  const prompt = prompts[copyType as keyof typeof prompts]

  const { text } = await generateText({
    model: openai("gpt-4o"),
    prompt,
    maxOutputTokens: 500,
  })

  return text
}
