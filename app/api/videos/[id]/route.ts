import { query } from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const video = await query(`SELECT * FROM videos WHERE id = $1`, [Number.parseInt(id)])

    if (!video || video.length === 0) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 })
    }

    return NextResponse.json(video[0])
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "Failed to fetch video" }, { status: 500 })
  }
}
