import { query } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const totalVideos = await query(`SELECT COUNT(*) as count FROM videos`)
    const totalUsers = await query(`SELECT COUNT(*) as count FROM users`)
    const totalViews = await query(`SELECT COALESCE(SUM(view_count), 0) as total FROM videos`)
    const topVideos = await query(`SELECT * FROM videos ORDER BY view_count DESC LIMIT 5`)

    return NextResponse.json({
      totalVideos: totalVideos[0].count,
      totalUsers: totalUsers[0].count,
      totalViews: totalViews[0].total,
      topVideos,
    })
  } catch (error) {
    console.error("Stats fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 })
  }
}
