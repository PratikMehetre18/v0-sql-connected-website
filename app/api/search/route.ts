import { query } from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const q = searchParams.get("q") || ""
    const genre = searchParams.get("genre")
    const rating = searchParams.get("rating")
    const sort = searchParams.get("sort") || "newest"

    let sql = "SELECT * FROM videos WHERE 1=1"
    const params: any[] = []
    let paramCount = 1

    // Search by title or description
    if (q) {
      sql += ` AND (LOWER(title) LIKE LOWER($${paramCount}) OR LOWER(description) LIKE LOWER($${paramCount}))`
      params.push(`%${q}%`)
      paramCount++
    }

    // Filter by genre
    if (genre) {
      sql += ` AND genre = $${paramCount}`
      params.push(genre)
      paramCount++
    }

    // Filter by rating
    if (rating) {
      const minRating = Number.parseFloat(rating)
      sql += ` AND rating >= $${paramCount}`
      params.push(minRating)
      paramCount++
    }

    // Sorting
    if (sort === "newest") {
      sql += " ORDER BY created_at DESC"
    } else if (sort === "trending") {
      sql += " ORDER BY view_count DESC, rating DESC"
    } else if (sort === "rating") {
      sql += " ORDER BY rating DESC"
    }

    sql += " LIMIT 50"

    const videos = await query(sql, params)
    return NextResponse.json(videos)
  } catch (error) {
    console.error("Search error:", error)
    return NextResponse.json({ error: "Search failed" }, { status: 500 })
  }
}
