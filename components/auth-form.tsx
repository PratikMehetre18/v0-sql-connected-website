"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"

interface AuthFormProps {
  type: "login" | "signup"
}

export function AuthForm({ type }: AuthFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    fullName: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const endpoint = type === "login" ? "/api/auth/login" : "/api/auth/signup"
      const payload = type === "login" ? { email: formData.email, password: formData.password } : formData

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      let data
      try {
        data = await response.json()
      } catch {
        console.error("[v0] Failed to parse response as JSON")
        setError("Server error: Invalid response")
        return
      }

      if (!response.ok) {
        setError(data.error || "Authentication failed")
        return
      }

      // Store user info in localStorage
      localStorage.setItem("user", JSON.stringify(data.user))
      router.push("/")
    } catch (err) {
      console.error("[v0] Auth error:", err)
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="bg-red-500/20 border border-red-500 rounded-lg p-3 text-red-300">{error}</div>}

      <div>
        <label className="block text-white text-sm font-medium mb-2">Email</label>
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="bg-slate-800 border-slate-700 text-white"
          required
          disabled={loading}
        />
      </div>

      {type === "signup" && (
        <>
          <div>
            <label className="block text-white text-sm font-medium mb-2">Username</label>
            <Input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="bg-slate-800 border-slate-700 text-white"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">Full Name</label>
            <Input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="bg-slate-800 border-slate-700 text-white"
              disabled={loading}
            />
          </div>
        </>
      )}

      <div>
        <label className="block text-white text-sm font-medium mb-2">Password</label>
        <Input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="bg-slate-800 border-slate-700 text-white"
          required
          disabled={loading}
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white"
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Loading...
          </>
        ) : type === "login" ? (
          "Sign In"
        ) : (
          "Create Account"
        )}
      </Button>
    </form>
  )
}
