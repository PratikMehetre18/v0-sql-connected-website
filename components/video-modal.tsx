"use client"
import Image from "next/image"
import { X, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
  id: number
  title: string
  thumbnail_url: string
  genre: string
  rating: number
  duration_seconds: number
  description?: string
}

export function VideoModal({
  isOpen,
  onClose,
  id,
  title,
  thumbnail_url,
  genre,
  rating,
  duration_seconds,
  description,
}: VideoModalProps) {
  const durationMinutes = Math.floor(duration_seconds / 60)

  const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(title + " trailer")}`

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 rounded-lg max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-slate-800 hover:bg-slate-700 rounded-full p-2 transition-colors z-10"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {/* Movie thumbnail */}
        <div className="relative w-full aspect-video bg-slate-800">
          <Image
            src={thumbnail_url || "/placeholder.svg?height=400&width=600&query=movie-modal"}
            alt={title}
            fill
            className="object-cover"
          />
        </div>

        {/* Movie info */}
        <div className="p-6 space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="text-xs">
                {genre}
              </Badge>
              <span className="text-yellow-400 font-semibold">★ {rating}</span>
              <span className="text-gray-400 text-sm">{durationMinutes} min</span>
            </div>
          </div>

          {description && <p className="text-gray-300 text-sm leading-relaxed">{description}</p>}

          {/* Watch on YouTube button */}
          <a
            href={youtubeSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Watch on YouTube
          </a>
        </div>
      </div>
    </div>
  )
}
