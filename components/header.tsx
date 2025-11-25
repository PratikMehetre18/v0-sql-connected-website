"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-b from-black/80 to-transparent">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="text-white font-bold text-xl hidden sm:inline">StreamBox</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-white hover:text-red-500 transition">
              Home
            </Link>
            <Link href="/search" className="text-white hover:text-red-500 transition">
              Browse
            </Link>
            <Link href="/watchlist" className="text-white hover:text-red-500 transition">
              Watchlist
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/search">
              <Button variant="ghost" size="icon" className="text-white hover:text-red-500">
                <Search className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/auth/login" className="hidden sm:inline-flex">
              <Button className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600">
                Sign In
              </Button>
            </Link>

            {/* Mobile menu button */}
            <button className="md:hidden text-white" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <nav className="md:hidden flex flex-col gap-4 mt-4 pb-4 border-t border-slate-700 pt-4">
            <Link href="/" className="text-white hover:text-red-500">
              Home
            </Link>
            <Link href="/search" className="text-white hover:text-red-500">
              Browse
            </Link>
            <Link href="/watchlist" className="text-white hover:text-red-500">
              Watchlist
            </Link>
            <Link href="/auth/login" className="w-full">
              <Button className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600">
                Sign In
              </Button>
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
