export const maxDuration = 30

const mockResponses = [
  "Based on your needs, I'd recommend checking out Apollo for lead generation - it's excellent for finding contact data and has great integration capabilities.",
  "For email marketing, I'd suggest looking at Mailchimp for beginners or ConvertKit for more advanced automation features. Both offer great templates and analytics.",
  "SEO tools I'd recommend include SEMrush for comprehensive analysis, Ahrefs for backlink research, and Google Search Console which is free and essential.",
  "For content creation, Copy.ai and Jasper are popular AI-powered options, while Canva is great for visual content creation.",
  "Free marketing automation tools include HubSpot's free tier, Mailchimp's basic plan, and Zapier's starter plan for connecting different tools.",
]

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return new Response("Invalid messages format", { status: 400 })
    }

    const lastMessage = messages[messages.length - 1]?.content || ""

    // Simple keyword-based responses
    let response =
      "I'd be happy to help you find the right marketing tools! Could you tell me more about your specific needs?"

    if (lastMessage.toLowerCase().includes("lead")) {
      response = mockResponses[0]
    } else if (lastMessage.toLowerCase().includes("email")) {
      response = mockResponses[1]
    } else if (lastMessage.toLowerCase().includes("seo")) {
      response = mockResponses[2]
    } else if (lastMessage.toLowerCase().includes("content")) {
      response = mockResponses[3]
    } else if (lastMessage.toLowerCase().includes("free")) {
      response = mockResponses[4]
    }

    // Simulate streaming response
    const stream = new ReadableStream({
      start(controller) {
        const words = response.split(" ")
        let index = 0

        const interval = setInterval(() => {
          if (index < words.length) {
            const chunk = words[index] + " "
            controller.enqueue(new TextEncoder().encode(`data: {"content":"${chunk}"}\n\n`))
            index++
          } else {
            controller.enqueue(new TextEncoder().encode(`data: [DONE]\n\n`))
            controller.close()
            clearInterval(interval)
          }
        }, 50)
      },
    })

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    })
  } catch (error) {
    console.error("Chat API error:", error)
    return new Response("Internal Server Error", { status: 500 })
  }
}
