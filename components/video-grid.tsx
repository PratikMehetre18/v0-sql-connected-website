"use client"

import { useState, useEffect } from "react"
import { VideoCard } from "./video-card"
import { Loader2 } from "lucide-react"

interface Video {
  id: number
  title: string
  thumbnail_url: string
  genre: string
  rating: number
  duration_seconds: number
}

export function VideoGrid({ genre, title }: { genre?: string; title: string }) {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchVideos() {
      try {
        const url = genre ? `/api/videos?genre=${genre}&limit=12` : "/api/trending?limit=12"
        const response = await fetch(url)
        const data = await response.json()
        setVideos(data)
      } catch (error) {
        console.error("Failed to fetch videos:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchVideos()
  }, [genre])

  const displayVideos = videos.length > 0 ? videos : getDummyVideos()

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayVideos.map((video, idx) => (
            <VideoCard key={video.id || `dummy-${idx}`} {...video} />
          ))}
        </div>
      </div>
    </div>
  )
}

function getDummyVideos(): Video[] {
  return [
    {
      id: 0,
      title: "Featured Content",
      thumbnail_url: "/featured-movie.jpg",
      genre: "Featured",
      rating: 8.5,
      duration_seconds: 6000,
    },
    {
      id: 0,
      title: "Recommended",
      thumbnail_url: "/recommended-show.jpg",
      genre: "Featured",
      rating: 8.7,
      duration_seconds: 5400,
    },
    {
      id: 0,
      title: "Popular Now",
      thumbnail_url: "/popular-entertainment.jpg",
      genre: "Featured",
      rating: 9.0,
      duration_seconds: 7200,
    },
    {
      id: 0,
      title: "Trending This Week",
      thumbnail_url: "/trending-content.jpg",
      genre: "Featured",
      rating: 8.6,
      duration_seconds: 5800,
    },
  ]
}
