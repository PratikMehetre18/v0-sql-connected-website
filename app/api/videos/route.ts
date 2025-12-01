import { query } from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const limit = Number.parseInt(searchParams.get("limit") || "20")
    const offset = Number.parseInt(searchParams.get("offset") || "0")
    const genre = searchParams.get("genre")

    let videos
    if (genre) {
      videos = await query(`SELECT * FROM videos WHERE genre = $1 ORDER BY rating DESC LIMIT $2 OFFSET $3`, [
        genre,
        limit,
        offset,
      ])
    } else {
      videos = await query(`SELECT * FROM movies ORDER BY created_at DESC LIMIT $1 OFFSET $2`, [limit, offset])
    }

    return NextResponse.json(videos)
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "Failed to fetch videos" }, { status: 500 })
  }
}
