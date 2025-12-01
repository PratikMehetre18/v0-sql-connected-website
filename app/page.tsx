"use client"

import Top10Section from "@/components/Top10Section"
import { Header } from "@/components/header"
import { VideoGrid } from "@/components/video-grid"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Home() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  return (
    <main className="bg-slate-950 min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-b from-slate-900 to-slate-950 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-transparent to-pink-500/20"></div>
        </div>
        <div className="relative z-10 text-center space-y-4">
          {user ? (
            <>
              <h1 className="text-5xl md:text-6xl font-bold text-white text-balance">
                Hello {user.username}!
              </h1>
              <p className="text-xl text-gray-300 text-balance">
                What would you like to watch?
              </p>
            </>
          ) : (
            <>
              <h1 className="text-5xl md:text-6xl font-bold text-white text-balance">
                Watch Everything
              </h1>
              <p className="text-xl text-gray-300 text-balance">
                Thousands of movies, TV shows, and more
              </p>
            </>
          )}
          <div className="flex gap-4 justify-center">
            <Link href="/search">
              <Button className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-8 h-12">
                Start Watching
              </Button>
            </Link>
            <Link href="/search">
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white/10 px-8 h-12 bg-transparent"
              >
                Browse All
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Top 10 Videos – now powered by DB titles */}
      <section className="container mx-auto px-4 py-12">
        <Top10Section />
      </section>

      {/* Trending Videos */}
      <section className="container mx-auto px-4 py-12">
        <VideoGrid title="Trending Now" />
      </section>

      {/* Genre Sections */}
      <section className="container mx-auto px-4 space-y-12 pb-12">
        <VideoGrid genre="Action" title="Action & Adventure" />
        <VideoGrid genre="Drama" title="Drama" />
        <VideoGrid genre="Comedy" title="Comedy" />
      </section>
    </main>
  )
}
