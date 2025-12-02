import { NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL as string)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const genre = searchParams.get("genre")
    const limitParam = searchParams.get("limit")
    const limit = limitParam ? Number(limitParam) : 50

    let rows

    if (genre) {
      // fetch by genre from videos table
      rows = await sql`
        SELECT id, title, description, genre, thumbnail_url, rating, view_count, created_at
        FROM videos
        WHERE genre = ${genre}
        ORDER BY created_at DESC
        LIMIT ${limit}
      `
    } else {
      // fetch all videos
      rows = await sql`
        SELECT id, title, description, genre, thumbnail_url, rating, view_count, created_at
        FROM videos
        ORDER BY created_at DESC
        LIMIT ${limit}
      `
    }

    return NextResponse.json(rows)
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "Failed to fetch videos" }, { status: 500 })
  }
}
