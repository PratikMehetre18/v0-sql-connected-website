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

interface SearchResultsProps {
  query: string
  genre?: string
  rating?: string
  sort?: string
}

export function SearchResults({ query, genre, rating, sort }: SearchResultsProps) {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        if (query) params.append("q", query)
        if (genre) params.append("genre", genre)
        if (rating) params.append("rating", rating)
        if (sort) params.append("sort", sort)

        const response = await fetch(`/api/search?${params}`)
        const data = await response.json()
        setVideos(data)
      } catch (error) {
        console.error("Search failed:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
  }, [query, genre, rating, sort])

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  const displayVideos = videos.length > 0 ? videos : getDummySearchVideos()
  const resultCount = videos.length > 0 ? videos.length : displayVideos.length

  return (
    <div>
      <p className="text-gray-400 mb-6">
        {videos.length > 0 ? `Found ${resultCount} result${resultCount !== 1 ? "s" : ""}` : "Showing suggested content"}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {displayVideos.map((video, idx) => (
          <VideoCard key={video.id || `dummy-search-${idx}`} {...video} />
        ))}
      </div>
    </div>
  )
}

function getDummySearchVideos(): Video[] {
  return [
    {
      id: 0,
      title: "Popular Searches",
      thumbnail_url: "/popular-search.jpg",
      genre: "Suggestion",
      rating: 8.4,
      duration_seconds: 5400,
    },
    {
      id: 0,
      title: "Trending Now",
      thumbnail_url: "/trending-now.jpg",
      genre: "Suggestion",
      rating: 8.8,
      duration_seconds: 6300,
    },
    {
      id: 0,
      title: "Top Rated",
      thumbnail_url: "/top-rated.jpg",
      genre: "Suggestion",
      rating: 9.1,
      duration_seconds: 5100,
    },
    {
      id: 0,
      title: "New Releases",
      thumbnail_url: "/new-releases.png",
      genre: "Suggestion",
      rating: 8.6,
      duration_seconds: 5900,
    },
  ]
}
