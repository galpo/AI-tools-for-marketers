import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { type, message, rating, email, name } = await request.json()

    // Validate required fields
    if (!type || !message) {
      return NextResponse.json(
        {
          error: "Type and message are required",
        },
        { status: 400 },
      )
    }

    // Prepare feedback data for Google Sheets
    const feedbackData = {
      timestamp: new Date().toISOString(),
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      type,
      message,
      rating: rating || null,
      email: email || "Anonymous",
      name: name || "Anonymous",
      source: "AI Tools for Marketers",
      userAgent: request.headers.get("user-agent") || "Unknown",
    }

    console.log("Processing feedback:", feedbackData)

    // Google Sheets Integration
    let sheetsSuccess = false
    let sheetsError = null

    if (process.env.GOOGLE_SHEETS_WEBHOOK_URL) {
      try {
        console.log("Sending to Google Sheets...")

        const sheetsResponse = await fetch(process.env.GOOGLE_SHEETS_WEBHOOK_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(feedbackData),
        })

        const sheetsResponseText = await sheetsResponse.text()
        console.log("Google Sheets Response Status:", sheetsResponse.status)
        console.log("Google Sheets Response:", sheetsResponseText)

        if (sheetsResponse.ok) {
          sheetsSuccess = true
          console.log("✅ Successfully sent to Google Sheets")
        } else {
          sheetsError = `HTTP ${sheetsResponse.status}: ${sheetsResponseText}`
          console.error("❌ Google Sheets error:", sheetsError)
        }
      } catch (error) {
        sheetsError = error instanceof Error ? error.message : "Unknown error"
        console.error("❌ Google Sheets webhook error:", error)
      }
    } else {
      console.log("⚠️ Google Sheets webhook URL not configured")
    }

    // Email notification (if configured)
    if (process.env.NOTIFICATION_EMAIL) {
      console.log("📧 Email notification would be sent to:", process.env.NOTIFICATION_EMAIL)
      // In production, integrate with email service like SendGrid, Resend, etc.
    }

    // Return response with Google Sheets status
    return NextResponse.json({
      success: true,
      message: "Feedback submitted successfully",
      googleSheets: {
        configured: !!process.env.GOOGLE_SHEETS_WEBHOOK_URL,
        success: sheetsSuccess,
        error: sheetsError,
      },
      data: feedbackData,
    })
  } catch (error) {
    console.error("Feedback API error:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Feedback API Status",
    googleSheetsConfigured: !!process.env.GOOGLE_SHEETS_WEBHOOK_URL,
    notificationEmailConfigured: !!process.env.NOTIFICATION_EMAIL,
    endpoints: {
      submit: "POST /api/feedback",
      test: "POST /api/test-sheets",
    },
  })
}
