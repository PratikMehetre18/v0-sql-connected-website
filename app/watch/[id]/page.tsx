import { query } from "@/lib/db"
import { Header } from "@/components/header"
import { VideoPlayer } from "@/components/video-player"
import { VideoDetails } from "@/components/video-details"
import { RelatedVideos } from "@/components/related-videos"
import { notFound } from "next/navigation"

export default async function WatchPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const videos = await query("SELECT * FROM videos WHERE id = $1", [Number.parseInt(id)])

  if (!videos || videos.length === 0) {
    notFound()
  }

  const video = videos[0]

  return (
    <main className="bg-slate-950 min-h-screen">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <VideoPlayer videoUrl={video.video_url} title={video.title} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <VideoDetails video={video} />
          </div>

          <div>
            <div className="bg-slate-900 rounded-lg p-4">
              <h3 className="text-lg font-bold text-white mb-4">Cast & Crew</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-400 text-sm">Director</p>
                  <p className="text-white font-semibold">Coming Soon</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Produced By</p>
                  <p className="text-white font-semibold">Coming Soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <RelatedVideos genre={video.genre} excludeId={video.id} />
        </div>
      </div>
    </main>
  )
}
