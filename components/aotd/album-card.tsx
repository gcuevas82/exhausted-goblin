"use client"

import { Disc3, ExternalLink } from "lucide-react"
import type { ArtistType, Genre } from "@/lib/albums"

export type GeneratedAlbum = {
  title: string
  artist: string
  year: number
  genre: Genre
  artistType: ArtistType
  obscure: boolean
  key: string
  cover: string | null
  spotifyUrl: string
  wiki: { extract: string; url: string | null } | null
}

const ARTIST_TYPE_LABEL: Record<ArtistType, string> = {
  band: "Band",
  solo: "Solo Artist",
  instrumental: "Instrumental",
}

export function AlbumCard({ album }: { album: GeneratedAlbum }) {
  return (
    <div className="flex w-full flex-col items-center gap-6 animate-in fade-in zoom-in-95 duration-700 lg:flex-row lg:items-start">
      {/* Cover: click to open in Spotify */}
      <a
        href={album.spotifyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block w-full max-w-[320px] shrink-0"
        aria-label={`Open ${album.title} by ${album.artist} in Spotify`}
      >
        <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-border box-glow">
          {album.cover ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={album.cover || "/placeholder.svg"}
              alt={`${album.title} album cover`}
              crossOrigin="anonymous"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-secondary text-muted-foreground">
              <Disc3 className="size-16 animate-spin [animation-duration:4s]" />
              <span className="px-4 text-center text-sm">{album.title}</span>
            </div>
          )}
          <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="mb-4 flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
              <ExternalLink className="size-4" />
              Open in Spotify
            </span>
          </div>
        </div>
        <p className="mt-2 text-center font-display text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
          Tap the cover to listen
        </p>
      </a>

      {/* Details */}
      <div className="flex w-full flex-col gap-4 text-center lg:text-left">
        <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
          <Badge>{album.year}</Badge>
          <Badge>{album.genre}</Badge>
          <Badge>{ARTIST_TYPE_LABEL[album.artistType]}</Badge>
          {album.obscure && <Badge accent>Deep Cut</Badge>}
        </div>

        <div>
          <h2 className="font-display text-2xl font-bold leading-tight text-foreground text-glow text-balance sm:text-3xl">
            {album.title}
          </h2>
          <p className="mt-1 text-lg text-accent text-glow-cyan">{album.artist}</p>
        </div>

        {album.wiki ? (
          <div className="rounded-lg border border-border bg-card/60 p-4 text-left backdrop-blur-sm">
            <p className="text-sm leading-relaxed text-muted-foreground line-clamp-6">
              {album.wiki.extract}
            </p>
            {album.wiki.url && (
              <a
                href={album.wiki.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
              >
                Read more on Wikipedia
                <ExternalLink className="size-3.5" />
              </a>
            )}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            No background blurb found for this one &mdash; go in blind and enjoy the surprise.
          </p>
        )}

        <a
          href={album.spotifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mx-auto inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105 box-glow lg:mx-0"
        >
          <ExternalLink className="size-4" />
          Listen on Spotify
        </a>
      </div>
    </div>
  )
}

function Badge({
  children,
  accent,
}: {
  children: React.ReactNode
  accent?: boolean
}) {
  return (
    <span
      className={
        accent
          ? "rounded-full border border-primary bg-primary/15 px-3 py-1 font-display text-[0.65rem] uppercase tracking-[0.15em] text-primary"
          : "rounded-full border border-border bg-secondary px-3 py-1 font-display text-[0.65rem] uppercase tracking-[0.15em] text-secondary-foreground"
      }
    >
      {children}
    </span>
  )
}
