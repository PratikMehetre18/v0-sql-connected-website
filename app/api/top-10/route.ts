import { query } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const videos = await query('SELECT * FROM videos WHERE top10_rank IS NOT NULL ORDER BY top10_rank');  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "Failed to fetch top 10 videos" }, { status: 500 })
  }
}
