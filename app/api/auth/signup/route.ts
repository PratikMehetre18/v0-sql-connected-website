import { sql } from "@neondatabase/serverless"
import { createUser } from "@/lib/auth"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email, password, username, fullName } = await request.json()

    if (!email || !password || !username) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const existingUser = await sql.query(`SELECT id FROM users WHERE email = $1 OR username = $2`, [email, username])

    if (existingUser.length > 0) {
      return NextResponse.json({ error: "Email or username already exists" }, { status: 409 })
    }

    const user = await createUser(email, password, username, fullName || username)

    if (!user) {
      return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
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
      maxAge: 7 * 24 * 60 * 60,
    })

    return response
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ error: "Failed to create account" }, { status: 500 })
  }
}
