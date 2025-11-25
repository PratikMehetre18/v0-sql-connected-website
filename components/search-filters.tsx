"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter } from "lucide-react"

interface SearchFiltersProps {
  onSearch: (query: string, genre?: string, rating?: string, sort?: string) => void
}

export function SearchFilters({ onSearch }: SearchFiltersProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("")
  const [selectedRating, setSelectedRating] = useState("")
  const [selectedSort, setSelectedSort] = useState("newest")
  const [showFilters, setShowFilters] = useState(false)

  const genres = ["Action", "Comedy", "Drama", "Horror", "Romance", "Sci-Fi", "Thriller"]
  const ratings = ["8+", "6+", "4+", "2+"]
  const sortOptions = ["newest", "trending", "rating"]

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault()
    onSearch(searchQuery, selectedGenre, selectedRating, selectedSort)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch()
    }, 500)

    return () => clearTimeout(timer)
  }, [selectedGenre, selectedRating, selectedSort])

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search movies, shows..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-slate-800 border-slate-700 text-white"
          />
        </div>
        <Button
          type="button"
          variant="outline"
          className="border-slate-700 text-white hover:bg-slate-800 bg-transparent"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="w-4 h-4" />
        </Button>
      </form>

      {/* Filters */}
      {showFilters && (
        <div className="bg-slate-900 rounded-lg p-4 border border-slate-800 space-y-4">
          {/* Genre Filter */}
          <div>
            <p className="text-white font-semibold mb-2 text-sm">Genre</p>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedGenre === "" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedGenre("")}
                className={selectedGenre === "" ? "bg-red-500" : "border-slate-700"}
              >
                All
              </Button>
              {genres.map((genre) => (
                <Button
                  key={genre}
                  variant={selectedGenre === genre ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedGenre(genre)}
                  className={selectedGenre === genre ? "bg-red-500" : "border-slate-700 text-gray-300 hover:text-white"}
                >
                  {genre}
                </Button>
              ))}
            </div>
          </div>

          {/* Rating Filter */}
          <div>
            <p className="text-white font-semibold mb-2 text-sm">Minimum Rating</p>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedRating === "" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedRating("")}
                className={selectedRating === "" ? "bg-red-500" : "border-slate-700"}
              >
                Any
              </Button>
              {ratings.map((rating) => (
                <Button
                  key={rating}
                  variant={selectedRating === rating ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedRating(rating)}
                  className={
                    selectedRating === rating ? "bg-red-500" : "border-slate-700 text-gray-300 hover:text-white"
                  }
                >
                  {rating}
                </Button>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div>
            <p className="text-white font-semibold mb-2 text-sm">Sort By</p>
            <div className="flex flex-wrap gap-2">
              {sortOptions.map((sort) => (
                <Button
                  key={sort}
                  variant={selectedSort === sort ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedSort(sort)}
                  className={selectedSort === sort ? "bg-red-500" : "border-slate-700 text-gray-300 hover:text-white"}
                >
                  {sort.charAt(0).toUpperCase() + sort.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
