"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { AdminStats } from "@/components/admin-stats"
import { AdminVideoForm } from "@/components/admin-video-form"
import { AdminVideosTable } from "@/components/admin-videos-table"

export default function AdminPage() {
  const [user, setUser] = useState<any>(null)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      const userData = JSON.parse(storedUser)
      setUser(userData)

      // Note: In a real app, you'd verify admin status on the server
      if (!userData.isAdmin) {
        alert("Admin access required")
      }
    }
  }, [])

  if (!user) {
    return (
      <main className="bg-slate-950 min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-white text-lg">Please sign in to access the admin dashboard</p>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-slate-950 min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8">Admin Dashboard</h1>

        <div className="space-y-8">
          <AdminStats />

          <AdminVideoForm onSuccess={() => setRefreshTrigger((prev) => prev + 1)} />

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Manage Videos</h2>
            <AdminVideosTable refreshTrigger={refreshTrigger} />
          </div>
        </div>
      </div>
    </main>
  )
}
