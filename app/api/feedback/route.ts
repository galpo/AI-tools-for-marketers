import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    const { type, message, rating, toolName, userEmail, userName } = await request.json()

    console.log("[v0] Feedback submission received:", { type, message, rating, toolName, userEmail, userName })

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

    console.log("[v0] Prepared feedback data:", feedbackData)

    const GOOGLE_SHEETS_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL
    console.log("[v0] Environment check:")
    console.log("[v0] NODE_ENV:", process.env.NODE_ENV)
    console.log("[v0] VERCEL_ENV:", process.env.VERCEL_ENV)
    console.log("[v0] Google Sheets URL exists:", !!GOOGLE_SHEETS_URL)
    console.log("[v0] Google Sheets URL length:", GOOGLE_SHEETS_URL?.length || 0)
    console.log(
      "[v0] All env vars starting with GOOGLE:",
      Object.keys(process.env).filter((key) => key.startsWith("GOOGLE")),
    )

    if (GOOGLE_SHEETS_URL) {
      try {
        console.log("[v0] Sending to Google Sheets...")
        const response = await fetch(GOOGLE_SHEETS_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(feedbackData),
        })

        console.log("[v0] Google Sheets response status:", response.status)
        console.log("[v0] Google Sheets response headers:", Object.fromEntries(response.headers.entries()))

        if (!response.ok) {
          const errorText = await response.text()
          console.error("[v0] Google Sheets error response:", errorText)
          return NextResponse.json(
            {
              error: "Failed to save feedback to Google Sheets. Please check the webhook URL configuration.",
              details: errorText,
            },
            { status: 500 },
          )
        } else {
          const responseText = await response.text()
          console.log("[v0] Google Sheets success response:", responseText)
        }
      } catch (error) {
        console.error("[v0] Google Sheets integration error:", error)
        return NextResponse.json(
          {
            error: "Google Sheets integration failed. Please check your webhook configuration.",
            details: error instanceof Error ? error.message : "Unknown error",
          },
          { status: 500 },
        )
      }
    } else {
      console.log("[v0] No Google Sheets webhook URL configured, using Supabase fallback")

      // Store in Supabase as fallback
      try {
        const supabase = createServerClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.SUPABASE_SERVICE_ROLE_KEY!,
          {
            cookies: {
              get(name: string) {
                return cookies().get(name)?.value
              },
            },
          },
        )

        const { error } = await supabase.from("feedback").insert([feedbackData])

        if (error) {
          console.error("[v0] Supabase fallback error:", error)
          return NextResponse.json({ error: "Failed to save feedback. Please try again." }, { status: 500 })
        }

        console.log("[v0] Feedback saved to Supabase successfully")

        return NextResponse.json({
          success: true,
          message: "Feedback submitted successfully",
          id: Date.now().toString(),
        })
      } catch (supabaseError) {
        console.error("[v0] Supabase fallback failed:", supabaseError)
        return NextResponse.json({ error: "Failed to save feedback. Please contact support." }, { status: 500 })
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
      message: "Feedback submitted successfully to Google Sheets",
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
