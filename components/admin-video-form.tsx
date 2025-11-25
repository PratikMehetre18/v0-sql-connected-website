"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"

interface AdminVideoFormProps {
  onSuccess?: () => void
}

export function AdminVideoForm({ onSuccess }: AdminVideoFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    thumbnail_url: "",
    video_url: "",
    duration_seconds: "",
    genre: "Action",
    rating: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await fetch("/api/admin/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          duration_seconds: Number.parseInt(formData.duration_seconds) || 0,
          rating: Number.parseFloat(formData.rating) || 0,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        setError(data.error || "Failed to create video")
        return
      }

      setFormData({
        title: "",
        description: "",
        thumbnail_url: "",
        video_url: "",
        duration_seconds: "",
        genre: "Action",
        rating: "",
      })

      onSuccess?.()
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-slate-900 p-6 rounded-lg border border-slate-800">
      <h3 className="text-xl font-bold text-white">Add New Video</h3>

      {error && <div className="bg-red-500/20 border border-red-500 rounded-lg p-3 text-red-300 text-sm">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-white text-sm font-medium mb-1">Title *</label>
          <Input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="bg-slate-800 border-slate-700 text-white"
            required
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-white text-sm font-medium mb-1">Genre</label>
          <select
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            className="w-full bg-slate-800 border border-slate-700 text-white rounded px-3 py-2"
            disabled={loading}
          >
            <option value="Action">Action</option>
            <option value="Comedy">Comedy</option>
            <option value="Drama">Drama</option>
            <option value="Horror">Horror</option>
            <option value="Romance">Romance</option>
            <option value="Sci-Fi">Sci-Fi</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-white text-sm font-medium mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full bg-slate-800 border border-slate-700 text-white rounded px-3 py-2 min-h-24"
          disabled={loading}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-white text-sm font-medium mb-1">Video URL *</label>
          <Input
            type="url"
            name="video_url"
            value={formData.video_url}
            onChange={handleChange}
            className="bg-slate-800 border-slate-700 text-white"
            required
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-white text-sm font-medium mb-1">Thumbnail URL</label>
          <Input
            type="url"
            name="thumbnail_url"
            value={formData.thumbnail_url}
            onChange={handleChange}
            className="bg-slate-800 border-slate-700 text-white"
            disabled={loading}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-white text-sm font-medium mb-1">Duration (seconds)</label>
          <Input
            type="number"
            name="duration_seconds"
            value={formData.duration_seconds}
            onChange={handleChange}
            className="bg-slate-800 border-slate-700 text-white"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-white text-sm font-medium mb-1">Rating (0-10)</label>
          <Input
            type="number"
            name="rating"
            min="0"
            max="10"
            step="0.1"
            value={formData.rating}
            onChange={handleChange}
            className="bg-slate-800 border-slate-700 text-white"
            disabled={loading}
          />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white"
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Creating...
          </>
        ) : (
          "Add Video"
        )}
      </Button>
    </form>
  )
}
