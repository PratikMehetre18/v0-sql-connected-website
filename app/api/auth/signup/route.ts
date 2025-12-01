import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL as string)

export async function POST(request: NextRequest) {
  try {
    const { email, password, username, fullName } = await request.json()

    if (!email || !password || !username) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create a simple dummy user without database dependency
    const user = {
      id: Math.random().toString(36).substring(7),
      email,
      username,
      full_name: fullName || username,
    }

    // ✅ Log signup event into login_events table (Neon DB)
    try {
      await sql`
        INSERT INTO login_events (email, event_type)
        VALUES (${email}, 'signup')
      `
    } catch (dbError) {
      console.error("[v0] Failed to log signup event:", dbError)
      // we don't block signup if logging fails
    }

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        fullName: user.full_name,
      },
    })

    response.cookies.set("auth", JSON.stringify(user), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    })

    return response
  } catch (error) {
    console.error("[v0] Signup error:", error)
    return NextResponse.json({ error: "Failed to create account" }, { status: 500 })
  }
}
