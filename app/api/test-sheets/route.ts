import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const testData = {
      timestamp: new Date().toISOString(),
      type: "test",
      message: "Testing Google Sheets integration",
      rating: 5,
      email: "test@example.com",
      name: "Test User",
      source: "AI Tools for Marketers - Test",
    }

    console.log("Testing Google Sheets webhook...")
    console.log("Webhook URL:", process.env.GOOGLE_SHEETS_WEBHOOK_URL ? "Configured" : "Not configured")

    if (!process.env.GOOGLE_SHEETS_WEBHOOK_URL) {
      return NextResponse.json(
        {
          success: false,
          error: "GOOGLE_SHEETS_WEBHOOK_URL environment variable not configured",
          instructions: "Please set up the Google Sheets webhook URL in your environment variables",
        },
        { status: 400 },
      )
    }

    const response = await fetch(process.env.GOOGLE_SHEETS_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testData),
    })

    const responseText = await response.text()

    console.log("Google Sheets Response Status:", response.status)
    console.log("Google Sheets Response:", responseText)

    if (response.ok) {
      return NextResponse.json({
        success: true,
        message: "Google Sheets webhook is working correctly!",
        status: response.status,
        response: responseText,
        testData,
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          error: "Google Sheets webhook failed",
          status: response.status,
          response: responseText,
          testData,
        },
        { status: 400 },
      )
    }
  } catch (error) {
    console.error("Google Sheets test error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to test Google Sheets webhook",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Google Sheets Test Endpoint",
    instructions: "Send a POST request to test the Google Sheets integration",
    webhookConfigured: !!process.env.GOOGLE_SHEETS_WEBHOOK_URL,
  })
}
