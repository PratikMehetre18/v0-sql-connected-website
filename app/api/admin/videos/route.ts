import { query } from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const videos = await query(`SELECT * FROM videos ORDER BY created_at DESC LIMIT 100`)
    return NextResponse.json(videos)
  } catch (error) {
    console.error("Admin videos fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch videos" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, description, thumbnail_url, video_url, duration_seconds, genre, release_date, rating, created_by } =
      await request.json()

    if (!title || !video_url) {
      return NextResponse.json({ error: "Title and video URL are required" }, { status: 400 })
    }

    const result = await query(
      `INSERT INTO videos (title, description, thumbnail_url, video_url, duration_seconds, genre, release_date, rating, created_by)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [
        title,
        description,
        thumbnail_url,
        video_url,
        duration_seconds || 0,
        genre || "Other",
        release_date || new Date().toISOString().split("T")[0],
        rating || 0,
        created_by || 1,
      ],
    )

    return NextResponse.json(result[0], { status: 201 })
  } catch (error) {
    console.error("Video creation error:", error)
    return NextResponse.json({ error: "Failed to create video" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { videoId } = await request.json()

    if (!videoId) {
      return NextResponse.json({ error: "Video ID is required" }, { status: 400 })
    }

    await query(`DELETE FROM videos WHERE id = $1`, [videoId])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Video deletion error:", error)
    return NextResponse.json({ error: "Failed to delete video" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { id, title, description, thumbnail_url, genre, rating } = await request.json()

    if (!id) {
      return NextResponse.json({ error: "Video ID is required" }, { status: 400 })
    }

    const result = await query(
      `UPDATE videos SET title = $1, description = $2, thumbnail_url = $3, genre = $4, rating = $5, updated_at = NOW()
       WHERE id = $6
       RETURNING *`,
      [title, description, thumbnail_url, genre, rating, id],
    )

    return NextResponse.json(result[0])
  } catch (error) {
    console.error("Video update error:", error)
    return NextResponse.json({ error: "Failed to update video" }, { status: 500 })
  }
}
