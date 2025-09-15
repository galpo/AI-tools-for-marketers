import { type NextRequest, NextResponse } from "next/server"
import { findUserByCredentials } from "@/lib/user-storage"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()
    console.log("[v0] Login API called with email:", email)

    // Validate input
    if (!email || !password) {
      console.log("[v0] Missing email or password")
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    console.log("[v0] Searching for user with credentials")
    const user = findUserByCredentials(email, password)
    console.log("[v0] User found:", user ? "Yes" : "No")

    if (!user) {
      console.log("[v0] Invalid credentials for email:", email)
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    console.log("[v0] Creating token for user:", user.id)
    const token = btoa(
      JSON.stringify({
        userId: user.id,
        email: user.email,
        name: user.name,
        exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      }),
    )

    console.log("[v0] Login successful for user:", user.email)
    // Return user data and token
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
      },
      token,
    })

    // Set HTTP-only cookie
    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 86400, // 24 hours
    })

    return response
  } catch (error) {
    console.error("[v0] Login API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
