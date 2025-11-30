import { query } from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 })
    }

    const videos = await query(
      `SELECT v.* FROM videos v
       INNER JOIN watchlist w ON v.id = w.video_id
       WHERE w.user_id = $1
       ORDER BY w.added_at DESC`,
      [Number.parseInt(userId)],
    )

    return NextResponse.json(videos)
  } catch (error) {
    console.error("Watchlist fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch watchlist" }, { status: 500 })
  }
}
