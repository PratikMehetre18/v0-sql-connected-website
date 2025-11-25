"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { SearchFilters } from "@/components/search-filters"
import { SearchResults } from "@/components/search-results"

export default function SearchPage() {
  const [searchParams, setSearchParams] = useState({
    query: "",
    genre: "",
    rating: "",
    sort: "newest",
  })

  const handleSearch = (query: string, genre?: string, rating?: string, sort?: string) => {
    setSearchParams({
      query: query || "",
      genre: genre || "",
      rating: rating || "",
      sort: sort || "newest",
    })
  }

  return (
    <main className="bg-slate-950 min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Browse Videos</h1>
          <SearchFilters onSearch={handleSearch} />
        </div>

        <SearchResults
          query={searchParams.query}
          genre={searchParams.genre}
          rating={searchParams.rating}
          sort={searchParams.sort}
        />
      </div>
    </main>
  )
}
