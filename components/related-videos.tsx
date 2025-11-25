"use client"

import { useEffect, useState } from "react"
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

export function RelatedVideos({ genre, excludeId }: { genre: string; excludeId: number }) {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchRelated() {
      try {
        const response = await fetch(`/api/videos?genre=${genre}&limit=8`)
        const data = await response.json()
        const filtered = data.filter((v: Video) => v.id !== excludeId)
        setVideos(filtered.slice(0, 4))
      } catch (error) {
        console.error("Failed to fetch related videos:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchRelated()
  }, [genre, excludeId])

  const displayVideos = videos.length > 0 ? videos : getDummyRecommendations()

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div>
      <h3 className="text-2xl font-bold text-white mb-4">Similar Content</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {displayVideos.map((video, idx) => (
          <VideoCard key={video.id || `dummy-related-${idx}`} {...video} />
        ))}
      </div>
    </div>
  )
}

function getDummyRecommendations(): Video[] {
  return [
    {
      id: 0,
      title: "You Might Like",
      thumbnail_url: "/recommendation-concept.png",
      genre: "Similar",
      rating: 8.5,
      duration_seconds: 5400,
    },
    {
      id: 0,
      title: "More Like This",
      thumbnail_url: "/similar-content.jpg",
      genre: "Similar",
      rating: 8.6,
      duration_seconds: 6000,
    },
    {
      id: 0,
      title: "Also Trending",
      thumbnail_url: "/trending-similar.jpg",
      genre: "Similar",
      rating: 8.8,
      duration_seconds: 5700,
    },
    {
      id: 0,
      title: "Fan Favorites",
      thumbnail_url: "/fan-favorites.jpg",
      genre: "Similar",
      rating: 8.9,
      duration_seconds: 5300,
    },
  ]
}
