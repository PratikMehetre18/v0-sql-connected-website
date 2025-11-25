"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Card } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

interface User {
  id: number
  email: string
  username: string
  fullName: string
  isAdmin?: boolean
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <main className="bg-slate-950 min-h-screen">
        <Header />
        <div className="flex justify-center items-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </main>
    )
  }

  if (!user) {
    return (
      <main className="bg-slate-950 min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-white text-lg">Please sign in to view your profile</p>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-slate-950 min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <Card className="bg-slate-900 border-slate-800 max-w-2xl">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-white mb-6">My Profile</h1>

            <div className="space-y-4">
              <div>
                <p className="text-gray-400 text-sm">Username</p>
                <p className="text-white text-lg font-semibold">{user.username}</p>
              </div>

              <div>
                <p className="text-gray-400 text-sm">Full Name</p>
                <p className="text-white text-lg font-semibold">{user.fullName || "Not set"}</p>
              </div>

              <div>
                <p className="text-gray-400 text-sm">Email</p>
                <p className="text-white text-lg font-semibold">{user.email}</p>
              </div>

              {user.isAdmin && (
                <div className="mt-6 p-4 bg-blue-500/20 border border-blue-500 rounded-lg">
                  <p className="text-blue-300">You have admin privileges</p>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </main>
  )
}
