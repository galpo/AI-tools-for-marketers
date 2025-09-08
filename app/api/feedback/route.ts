import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { type, message, rating, toolName, userEmail, userName } = await request.json()

    // Validate required fields
    if (!type || !message) {
      return NextResponse.json({ error: "Type and message are required" }, { status: 400 })
    }

    // Prepare data for Google Sheets
    const feedbackData = {
      timestamp: new Date().toISOString(),
      type,
      message,
      rating: rating || null,
      toolName: toolName || null,
      userEmail: userEmail || "Anonymous",
      userName: userName || "Anonymous",
      source: "AI Tools for Marketers",
    }

    // Google Sheets integration
    const GOOGLE_SHEETS_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL

    if (GOOGLE_SHEETS_URL) {
      try {
        const response = await fetch(GOOGLE_SHEETS_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(feedbackData),
        })

        if (!response.ok) {
          console.error("Failed to send to Google Sheets:", response.statusText)
        }
      } catch (error) {
        console.error("Google Sheets integration error:", error)
        // Continue processing even if Google Sheets fails
      }
    }

    // Store feedback locally (in production, use a database)
    console.log("Feedback received:", feedbackData)

    // Send email notification (optional)
    if (process.env.NOTIFICATION_EMAIL) {
      // In production, integrate with email service like SendGrid, Resend, etc.
      console.log("Email notification would be sent to:", process.env.NOTIFICATION_EMAIL)
    }

    return NextResponse.json({
      success: true,
      message: "Feedback submitted successfully",
      id: Date.now().toString(),
    })
  } catch (error) {
    console.error("Feedback API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  try {
    // Return feedback statistics or recent feedback
    // In production, fetch from database
    const stats = {
      totalFeedback: 0,
      averageRating: 0,
      feedbackTypes: {
        bug: 0,
        feature: 0,
        general: 0,
        tool_review: 0,
      },
    }

    return NextResponse.json({
      success: true,
      stats,
    })
  } catch (error) {
    console.error("Feedback GET error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
