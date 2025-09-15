import { type NextRequest, NextResponse } from "next/server"
import { addUser, findUserByEmail } from "@/lib/user-storage"

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Registration API called")
    const { email, password, name } = await request.json()
    console.log("[v0] Registration data:", { email, name })

    // Validate input
    if (!email || !password || !name) {
      console.log("[v0] Missing required fields")
      return NextResponse.json({ error: "Email, password, and name are required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      console.log("[v0] Invalid email format")
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Validate password strength
    if (password.length < 6) {
      console.log("[v0] Password too short")
      return NextResponse.json({ error: "Password must be at least 6 characters long" }, { status: 400 })
    }

    const existingUser = findUserByEmail(email)
    if (existingUser) {
      console.log("[v0] User already exists")
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 })
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      email,
      password, // In production, hash the password
      name,
      createdAt: new Date().toISOString(),
    }

    addUser(newUser)
    console.log("[v0] User created successfully:", newUser.id)

    const token = btoa(
      JSON.stringify({
        userId: newUser.id,
        email: newUser.email,
        name: newUser.name,
        exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      }),
    )

    // Return user data and token
    const response = NextResponse.json({
      success: true,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        createdAt: newUser.createdAt,
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

    console.log("[v0] Registration successful")
    return response
  } catch (error) {
    console.error("[v0] Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
