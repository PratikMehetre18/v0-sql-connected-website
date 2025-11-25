"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

interface Stats {
  totalVideos: number
  totalUsers: number
  totalViews: number
  topVideos: any[]
}

export function AdminStats() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/admin/stats")
        const data = await response.json()
        setStats(data)
      } catch (error) {
        console.error("Failed to fetch stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!stats) return null

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="bg-slate-900 border-slate-800">
          <div className="p-6">
            <p className="text-gray-400 text-sm mb-2">Total Videos</p>
            <p className="text-3xl font-bold text-white">{stats.totalVideos}</p>
          </div>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <div className="p-6">
            <p className="text-gray-400 text-sm mb-2">Total Users</p>
            <p className="text-3xl font-bold text-white">{stats.totalUsers}</p>
          </div>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <div className="p-6">
            <p className="text-gray-400 text-sm mb-2">Total Views</p>
            <p className="text-3xl font-bold text-white">{(stats.totalViews / 1000).toFixed(0)}K</p>
          </div>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <div className="p-6">
            <p className="text-gray-400 text-sm mb-2">Top Video Rating</p>
            <p className="text-3xl font-bold text-white">{stats.topVideos[0]?.rating || 0}/10</p>
          </div>
        </Card>
      </div>

      {stats.topVideos.length > 0 && (
        <Card className="bg-slate-900 border-slate-800">
          <div className="p-6">
            <h3 className="text-xl font-bold text-white mb-4">Top Videos</h3>
            <div className="space-y-3">
              {stats.topVideos.map((video, idx) => (
                <div key={video.id} className="flex items-center gap-4 pb-3 border-b border-slate-800 last:border-0">
                  <span className="text-gray-400 font-semibold w-6">#{idx + 1}</span>
                  <div className="flex-1">
                    <p className="text-white font-medium">{video.title}</p>
                    <p className="text-gray-400 text-sm">{(video.view_count / 1000).toFixed(1)}K views</p>
                  </div>
                  <span className="text-yellow-400">★ {video.rating}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
