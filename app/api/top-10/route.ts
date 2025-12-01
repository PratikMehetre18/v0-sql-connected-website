import { query } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const videos = await query('SELECT * FROM videos ORDER BY rating DESC LIMIT 10');
    console.error("API Error:", error)
    return NextResponse.json({ error: String(error) }, { status: 500 })  }
    return NextResponse.json(videos.rows || videos || []);}
