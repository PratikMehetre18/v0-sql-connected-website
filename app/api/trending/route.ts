import { query } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const videos = await query(`SELECT * FROM videos ORDER BY view_count DESC, rating DESC LIMIT 10`)
    return NextResponse.json(videos)
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "Failed to fetch trending videos" }, { status: 500 })
  }
}
