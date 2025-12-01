"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Video = {
  id: number;
  title: string;
  thumbnail_url: string | null;
};

export default function Top10Section() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadTop10() {
      try {
    const res = await fetch("/api/top-10");
        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }

        const data = await res.json();
        const list: Video[] = Array.isArray(data) ? data : data.videos ?? [];

        setVideos(list.slice(0, 10));
      } catch (err: any) {
        console.error("Failed to load Top 10 videos", err);
        setError(err.message ?? "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    loadTop10();
  }, []);

  if (loading) {
    return (
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-white">Top 10</h2>
        <p className="text-gray-400 text-sm">Loading top movies…</p>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-white">Top 10</h2>
        <p className="text-red-400 text-sm">
          Could not load Top 10 videos: {error}
        </p>
      </section>
    );
  }

  if (!videos.length) {
    return (
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-white">Top 10</h2>
        <p className="text-gray-400 text-sm">No videos found in database.</p>
      </section>
    );
  }

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4 text-white">Top 10</h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {videos.map((video, index) => (
          <div
            key={video.id}
            className="bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-md"
          >
            {/* IMAGE ON TOP */}
            <div className="relative w-full h-40 bg-slate-800">
              {video.thumbnail_url ? (
                <Image
                  src={video.thumbnail_url}
                  alt={video.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs text-zinc-500">
                  No image
                </div>
              )}
            </div>

            {/* TEXT BELOW IMAGE */}
            <div className="p-4 flex flex-col gap-1">
              <p className="text-xs text-zinc-400">#{index + 1} in Top 10</p>

              <h3 className="text-lg font-semibold text-white truncate">
                {video.title}
              </h3>

              <p className="text-[11px] text-zinc-500">From videos.title</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
