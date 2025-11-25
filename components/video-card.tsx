"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { VideoModal } from "./video-modal"
import { Play } from "lucide-react"

interface VideoCardProps {
  id: number
  title: string
  thumbnail_url: string
  genre: string
  rating: number
  duration_seconds: number
  description?: string
}

export function VideoCard({ id, title, thumbnail_url, genre, rating, duration_seconds, description }: VideoCardProps) {
  const durationMinutes = Math.floor(duration_seconds / 60)
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <button onClick={() => setIsModalOpen(true)} className="w-full text-left">
        <Card className="overflow-hidden hover:scale-105 transition-transform cursor-pointer bg-slate-900 border-slate-800">
          <CardContent className="p-0 relative group">
            <div className="relative w-full aspect-video bg-slate-800">
              <Image
                src={thumbnail_url || "/placeholder.svg?height=180&width=320&query=video-thumbnail"}
                alt={title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="text-white text-center">
                  <Play className="w-12 h-12 mx-auto mb-2" fill="white" />
                  <div className="text-sm font-medium">{durationMinutes} min</div>
                </div>
              </div>
            </div>
            <div className="p-3">
              <h3 className="font-semibold text-white truncate text-sm mb-2">{title}</h3>
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="text-xs">
                  {genre}
                </Badge>
                <span className="text-xs text-yellow-400">★ {rating}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </button>

      <VideoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        id={id}
        title={title}
        thumbnail_url={thumbnail_url}
        genre={genre}
        rating={rating}
        duration_seconds={duration_seconds}
        description={description}
      />
    </>
  )
}
