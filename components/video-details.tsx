"use client"

import { useState } from "react"
import { Heart, Plus, Share2, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface VideoDetailsProps {
  video: {
    id: number
    title: string
    description: string
    genre: string
    rating: number
    release_date: string
    view_count: number
    duration_seconds: number
  }
}

export function VideoDetails({ video }: VideoDetailsProps) {
  const [isInWatchlist, setIsInWatchlist] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  const handleAddToWatchlist = async () => {
    try {
      const response = await fetch("/api/watchlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoId: video.id }),
      })
      if (response.ok) {
        setIsInWatchlist(!isInWatchlist)
      }
    } catch (error) {
      console.error("Error updating watchlist:", error)
    }
  }

  const durationHours = Math.floor(video.duration_seconds / 3600)
  const durationMinutes = Math.floor((video.duration_seconds % 3600) / 60)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">{video.title}</h1>
        <div className="flex items-center gap-4 flex-wrap">
          <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white">{video.genre}</Badge>
          <span className="text-yellow-400 font-semibold">★ {video.rating}/10</span>
          <span className="text-gray-400">
            {durationHours > 0 && `${durationHours}h `}
            {durationMinutes}m
          </span>
          <span className="text-gray-400">{new Date(video.release_date).getFullYear()}</span>
        </div>
      </div>

      <p className="text-gray-300 leading-relaxed text-lg">{video.description}</p>

      <div className="flex gap-3 flex-wrap">
        <Button className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white gap-2">
          <Play className="w-4 h-4" />
          Play
        </Button>
        <Button
          variant="outline"
          className="border-gray-500 text-white hover:bg-white/10 gap-2 bg-transparent"
          onClick={handleAddToWatchlist}
        >
          <Plus className="w-4 h-4" />
          {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
        </Button>
        <Button
          variant="outline"
          className="border-gray-500 text-white hover:bg-white/10 gap-2 bg-transparent"
          onClick={() => setIsLiked(!isLiked)}
        >
          <Heart className="w-4 h-4" fill={isLiked ? "currentColor" : "none"} />
          Like
        </Button>
        <Button variant="outline" className="border-gray-500 text-white hover:bg-white/10 gap-2 bg-transparent">
          <Share2 className="w-4 h-4" />
          Share
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-900 p-4 rounded-lg">
        <div>
          <p className="text-gray-400 text-sm">Views</p>
          <p className="text-white text-lg font-semibold">{(video.view_count / 1000).toFixed(0)}K</p>
        </div>
        <div>
          <p className="text-gray-400 text-sm">Genre</p>
          <p className="text-white text-lg font-semibold">{video.genre}</p>
        </div>
        <div>
          <p className="text-gray-400 text-sm">Rating</p>
          <p className="text-white text-lg font-semibold">{video.rating}/10</p>
        </div>
        <div>
          <p className="text-gray-400 text-sm">Year</p>
          <p className="text-white text-lg font-semibold">{new Date(video.release_date).getFullYear()}</p>
        </div>
      </div>
    </div>
  )
}
