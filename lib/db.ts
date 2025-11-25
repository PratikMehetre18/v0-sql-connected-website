import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function query(text: string, params?: any[]) {
  try {
    const result = await sql.query(text, params)
    return result || []
  } catch (error) {
    console.error("Database query error:", error)
    throw error
  }
}

export async function getVideos(limit = 20, offset = 0) {
  return query(`SELECT * FROM videos ORDER BY created_at DESC LIMIT $1 OFFSET $2`, [limit, offset])
}

export async function getVideoById(id: number) {
  const result = await query(`SELECT * FROM videos WHERE id = $1`, [id])
  return result[0] || null
}

export async function getVideosByGenre(genre: string, limit = 10) {
  return query(`SELECT * FROM videos WHERE genre = $1 ORDER BY rating DESC LIMIT $2`, [genre, limit])
}

export async function getTrendingVideos(limit = 10) {
  return query(`SELECT * FROM videos ORDER BY view_count DESC, rating DESC LIMIT $1`, [limit])
}

export async function getUserWatchlist(userId: number) {
  return query(
    `SELECT v.* FROM videos v
     INNER JOIN watchlist w ON v.id = w.video_id
     WHERE w.user_id = $1
     ORDER BY w.added_at DESC`,
    [userId],
  )
}

export async function addToWatchlist(userId: number, videoId: number) {
  try {
    return await query(
      `INSERT INTO watchlist (user_id, video_id) VALUES ($1, $2)
       ON CONFLICT DO NOTHING`,
      [userId, videoId],
    )
  } catch (error) {
    console.error("Error adding to watchlist:", error)
    throw error
  }
}

export async function removeFromWatchlist(userId: number, videoId: number) {
  return query(`DELETE FROM watchlist WHERE user_id = $1 AND video_id = $2`, [userId, videoId])
}
