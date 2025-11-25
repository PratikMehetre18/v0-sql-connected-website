"use client"

import { useState, useEffect } from "react"
import { Trash2, Edit2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Video {
  id: number
  title: string
  genre: string
  rating: number
  view_count: number
  created_at: string
}

interface AdminVideosTableProps {
  refreshTrigger?: number
}

export function AdminVideosTable({ refreshTrigger }: AdminVideosTableProps) {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<number | null>(null)

  useEffect(() => {
    fetchVideos()
  }, [refreshTrigger])

  const fetchVideos = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/admin/videos")
      const data = await response.json()
      setVideos(data)
    } catch (error) {
      console.error("Failed to fetch videos:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (videoId: number) => {
    if (!confirm("Are you sure you want to delete this video?")) return

    try {
      setDeleting(videoId)
      const response = await fetch("/api/admin/videos", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoId }),
      })

      if (response.ok) {
        setVideos(videos.filter((v) => v.id !== videoId))
      }
    } catch (error) {
      console.error("Failed to delete video:", error)
    } finally {
      setDeleting(null)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="bg-slate-900 rounded-lg border border-slate-800 overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-800 bg-slate-800">
            <th className="px-6 py-3 text-left text-white font-semibold">Title</th>
            <th className="px-6 py-3 text-left text-white font-semibold">Genre</th>
            <th className="px-6 py-3 text-left text-white font-semibold">Rating</th>
            <th className="px-6 py-3 text-left text-white font-semibold">Views</th>
            <th className="px-6 py-3 text-left text-white font-semibold">Created</th>
            <th className="px-6 py-3 text-right text-white font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {videos.map((video) => (
            <tr key={video.id} className="border-b border-slate-800 hover:bg-slate-800/50">
              <td className="px-6 py-4 text-white truncate max-w-xs">{video.title}</td>
              <td className="px-6 py-4 text-gray-300">{video.genre}</td>
              <td className="px-6 py-4 text-gray-300">⭐ {video.rating}</td>
              <td className="px-6 py-4 text-gray-300">{(video.view_count / 1000).toFixed(1)}K</td>
              <td className="px-6 py-4 text-gray-300 text-sm">{new Date(video.created_at).toLocaleDateString()}</td>
              <td className="px-6 py-4 text-right flex gap-2 justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/20"
                  disabled={deleting !== null}
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
                  onClick={() => handleDelete(video.id)}
                  disabled={deleting === video.id}
                >
                  {deleting === video.id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {videos.length === 0 && (
        <div className="text-center py-12 text-gray-400">No videos yet. Create one to get started!</div>
      )}
    </div>
  )
}
