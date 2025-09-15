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

    const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      cookies: {
        get(name: string) {
          return cookies().get(name)?.value
        },
      },
    })

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      console.log("[v0] Unauthenticated feedback attempt blocked")
      return NextResponse.json(
        { error: "Authentication required. Please sign in to submit feedback." },
        { status: 401 },
      )
    }

    console.log("[v0] Authenticated user submitting feedback:", user.id)

    // Prepare data for Google Sheets
    const feedbackData = {
      timestamp: new Date().toISOString(),
      type,
      message,
      rating: rating || null,
      toolName: toolName || null,
      userEmail: user.email || "Unknown",
      userName: user.user_metadata?.name || userName || "Unknown",
      userId: user.id,
      source: "AI Tools for Marketers",
    }

    console.log("[v0] Prepared feedback data:", feedbackData)

    const GOOGLE_SHEETS_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL
    console.log("[v0] Google Sheets URL exists:", !!GOOGLE_SHEETS_URL)

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

        if (!response.ok) {
          const errorText = await response.text()
          console.error("[v0] Google Sheets error response:", errorText)
          throw new Error(`Google Sheets error: ${errorText}`)
        }

        const responseText = await response.text()
        console.log("[v0] Google Sheets success response:", responseText)
      } catch (error) {
        console.error("[v0] Google Sheets integration error:", error)
        // Fall through to Supabase fallback
      }
    }

    try {
      // Map to existing table structure with authenticated user ID
      const supabaseData = {
        type,
        message,
        rating: rating || null,
        tool_name: toolName || null,
        user_id: user.id, // Use authenticated user ID
        created_at: new Date().toISOString(),
      }

      const { error } = await supabase.from("feedback").insert([supabaseData])

      if (error) {
        console.error("[v0] Supabase error:", error)
        return NextResponse.json({ error: "Failed to save feedback. Please try again." }, { status: 500 })
      }

      console.log("[v0] Feedback saved to Supabase successfully")

      return NextResponse.json({
        success: true,
        message: "Feedback submitted successfully",
        id: Date.now().toString(),
      })
    } catch (supabaseError) {
      console.error("[v0] Supabase failed:", supabaseError)
      return NextResponse.json({ error: "Failed to save feedback. Please contact support." }, { status: 500 })
    }
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
