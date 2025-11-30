import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 })
    }

    // Create dummy user with just the email provided
    const user = {
      id: Math.random().toString(),
      email,
      username: email.split("@")[0],
      fullName: email,
      isAdmin: false,
    }

    const response = NextResponse.json({
      success: true,
      user,
    })

    // Set secure cookie (simplified)
    response.cookies.set("auth", JSON.stringify(user), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    })

    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Failed to login" }, { status: 500 })
  }
}
