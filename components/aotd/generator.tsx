"use client"

import { useCallback, useRef, useState } from "react"
import { Disc3, Sparkles, RotateCcw } from "lucide-react"
import { FilterBar, type FilterState, ANY_VALUE } from "./filter-bar"
import { Thinking } from "./thinking"
import { Fireworks } from "./fireworks"
import { AlbumCard, type GeneratedAlbum } from "./album-card"
import { cn } from "@/lib/utils"

type Status = "idle" | "thinking" | "revealed" | "error"

// Ensure the thinking animation is visible for a satisfying beat.
const MIN_THINK_MS = 2200

export function Generator() {
  const [filters, setFilters] = useState<FilterState>({
    decade: ANY_VALUE,
    genre: ANY_VALUE,
    artistType: ANY_VALUE,
    obscure: false,
  })
  const [status, setStatus] = useState<Status>("idle")
  const [album, setAlbum] = useState<GeneratedAlbum | null>(null)
  const [errorMsg, setErrorMsg] = useState<string>("")
  const [fireworks, setFireworks] = useState(false)
  const seenRef = useRef<string[]>([])

  const generate = useCallback(async () => {
    setStatus("thinking")
    setFireworks(false)
    const startedAt = Date.now()

    try {
      const res = await fetch("/api/album", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          decade: filters.decade === ANY_VALUE ? null : filters.decade,
          genre: filters.genre === ANY_VALUE ? null : filters.genre,
          artistType: filters.artistType === ANY_VALUE ? null : filters.artistType,
          obscure: filters.obscure,
          exclude: seenRef.current,
        }),
      })
      const data = await res.json()

      // Keep the animation on screen for a minimum time.
      const elapsed = Date.now() - startedAt
      if (elapsed < MIN_THINK_MS) {
        await new Promise((r) => setTimeout(r, MIN_THINK_MS - elapsed))
      }

      if (!data.ok) {
        setErrorMsg(
          data.reason === "no-match"
            ? "No albums match that combo yet. Try loosening a filter."
            : "You've heard every album that fits these filters! Reset or change your filters for more.",
        )
        setStatus("error")
        return
      }

      seenRef.current = [...seenRef.current, data.album.key]
      setAlbum(data.album)
      setStatus("revealed")
      setFireworks(true)
      window.setTimeout(() => setFireworks(false), 2800)
    } catch {
      const elapsed = Date.now() - startedAt
      if (elapsed < MIN_THINK_MS) {
        await new Promise((r) => setTimeout(r, MIN_THINK_MS - elapsed))
      }
      setErrorMsg("Something glitched in the matrix. Give it another spin.")
      setStatus("error")
    }
  }, [filters])

  const resetHistory = useCallback(() => {
    seenRef.current = []
    setAlbum(null)
    setStatus("idle")
    setErrorMsg("")
  }, [])

  const busy = status === "thinking"

  return (
    <div className="flex w-full flex-col gap-6">
      <Fireworks active={fireworks} />

      <FilterBar filters={filters} onChange={setFilters} disabled={busy} />

      <div className="flex flex-col items-center gap-3">
        <button
          type="button"
          onClick={generate}
          disabled={busy}
          className={cn(
            "group relative flex items-center gap-2.5 rounded-full bg-primary px-8 py-4 font-display text-base font-bold uppercase tracking-[0.15em] text-primary-foreground transition-all box-glow",
            busy ? "cursor-not-allowed opacity-70" : "hover:scale-105 active:scale-100",
          )}
        >
          {busy ? (
            <Disc3 className="size-5 animate-spin" />
          ) : (
            <Sparkles className="size-5" />
          )}
          {busy ? "Summoning..." : album ? "Give Me Another" : "Give Me My AoTD"}
        </button>

        {album && !busy && (
          <button
            type="button"
            onClick={resetHistory}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-accent"
          >
            <RotateCcw className="size-3.5" />
            Reset history ({seenRef.current.length} heard)
          </button>
        )}
      </div>

      <div className="min-h-[240px] w-full rounded-xl border border-border bg-card/50 p-5 backdrop-blur-md sm:p-8">
        {status === "idle" && (
          <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
            <Disc3 className="size-14 text-muted-foreground/60" />
            <p className="max-w-sm text-pretty text-sm text-muted-foreground">
              Set your decade, genre, and vibe above, then hit{" "}
              <span className="text-accent">Give Me My AoTD</span> to reveal today&apos;s pick.
            </p>
          </div>
        )}

        {status === "thinking" && <Thinking />}

        {status === "revealed" && album && <AlbumCard album={album} />}

        {status === "error" && (
          <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
            <p className="max-w-sm text-pretty text-sm text-foreground">{errorMsg}</p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={generate}
                className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:scale-105"
              >
                Try Again
              </button>
              {seenRef.current.length > 0 && (
                <button
                  type="button"
                  onClick={resetHistory}
                  className="rounded-full border border-border px-5 py-2 text-sm font-semibold text-foreground hover:border-primary"
                >
                  Reset History
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
