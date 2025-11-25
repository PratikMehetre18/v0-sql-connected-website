"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { VideoCard } from "@/components/video-card"
import { Loader2 } from "lucide-react"

interface Video {
  id: number
  title: string
  thumbnail_url: string
  genre: string
  rating: number
  duration_seconds: number
}

export default function WatchlistPage() {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  useEffect(() => {
    if (!user) {
      setLoading(false)
      return
    }

    const fetchWatchlist = async () => {
      try {
        const response = await fetch(`/api/watchlist?userId=${user.id}`)
        const data = await response.json()
        setVideos(data)
      } catch (error) {
        console.error("Failed to fetch watchlist:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchWatchlist()
  }, [user])

  if (loading) {
    return (
      <main className="bg-slate-950 min-h-screen">
        <Header />
        <div className="flex justify-center items-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </main>
    )
  }

  if (!user) {
    return (
      <main className="bg-slate-950 min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-white text-lg">Please sign in to view your watchlist</p>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-slate-950 min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8">My Watchlist</h1>

        {videos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">Your watchlist is empty</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {videos.map((video) => (
              <VideoCard key={video.id} {...video} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
