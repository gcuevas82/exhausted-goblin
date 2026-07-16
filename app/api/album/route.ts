import { NextResponse } from "next/server"
import { ALBUMS, DECADES, type Album, type ArtistType, type Genre } from "@/lib/albums"

export const runtime = "nodejs"

type Filters = {
  decade?: string | null
  genre?: Genre | null
  artistType?: ArtistType | null
  obscure?: boolean
  exclude?: string[]
}

export function albumKey(a: Pick<Album, "artist" | "title">) {
  return `${a.artist}::${a.title}`
}

async function fetchCover(artist: string, title: string): Promise<string | null> {
  try {
    const term = encodeURIComponent(`${artist} ${title}`)
    const res = await fetch(
      `https://itunes.apple.com/search?term=${term}&entity=album&limit=5`,
      { headers: { Accept: "application/json" }, cache: "no-store" },
    )
    if (!res.ok) return null
    const data = (await res.json()) as {
      results?: { artworkUrl100?: string; collectionName?: string }[]
    }
    const results = data.results ?? []
    if (results.length === 0) return null
    // Prefer the closest name match, otherwise take the first result.
    const lowerTitle = title.toLowerCase()
    const best =
      results.find((r) =>
        r.collectionName?.toLowerCase().includes(lowerTitle.split(" (")[0]),
      ) ?? results[0]
    if (!best?.artworkUrl100) return null
    // Upscale the artwork.
    return best.artworkUrl100.replace("100x100bb", "600x600bb")
  } catch {
    return null
  }
}

const WIKI_HEADERS = {
  Accept: "application/json",
  "User-Agent": "AoTD-Generator/1.0 (album of the day app; contact: aotd@example.com)",
}

async function fetchWiki(artist: string, title: string) {
  try {
    const q = encodeURIComponent(`${title} ${artist} album`)
    const searchRes = await fetch(
      `https://en.wikipedia.org/w/rest.php/v1/search/page?q=${q}&limit=1`,
      { headers: WIKI_HEADERS, cache: "no-store" },
    )
    if (!searchRes.ok) return null
    const searchData = (await searchRes.json()) as {
      pages?: { key?: string; title?: string }[]
    }
    const key = searchData.pages?.[0]?.key
    if (!key) return null

    const sumRes = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(key)}`,
      { headers: WIKI_HEADERS, cache: "no-store" },
    )
    if (!sumRes.ok) return null
    const sum = (await sumRes.json()) as {
      extract?: string
      content_urls?: { desktop?: { page?: string } }
    }
    if (!sum.extract) return null
    return {
      extract: sum.extract,
      url: sum.content_urls?.desktop?.page ?? null,
    }
  } catch {
    return null
  }
}

export async function POST(request: Request) {
  let filters: Filters = {}
  try {
    filters = (await request.json()) as Filters
  } catch {
    filters = {}
  }

  const decade = DECADES.find((d) => d.label === filters.decade)
  const exclude = new Set(filters.exclude ?? [])

  let pool = ALBUMS.filter((a) => {
    if (decade && (a.year < decade.start || a.year > decade.end)) return false
    if (filters.genre && a.genre !== filters.genre) return false
    if (filters.artistType && a.artistType !== filters.artistType) return false
    if (filters.obscure && !a.obscure) return false
    return true
  })

  // Remove already-seen albums so results are unique per session.
  let available = pool.filter((a) => !exclude.has(albumKey(a)))

  // If everything has been seen, signal exhaustion (but only if the pool had matches).
  if (available.length === 0) {
    return NextResponse.json({
      ok: false,
      reason: pool.length === 0 ? "no-match" : "exhausted",
      poolSize: pool.length,
    })
  }

  const pick = available[Math.floor(Math.random() * available.length)]

  const [cover, wiki] = await Promise.all([
    fetchCover(pick.artist, pick.title),
    fetchWiki(pick.artist, pick.title),
  ])

  const spotifyUrl = `https://open.spotify.com/search/${encodeURIComponent(
    `${pick.artist} ${pick.title}`,
  )}`

  return NextResponse.json({
    ok: true,
    album: {
      ...pick,
      key: albumKey(pick),
      cover,
      spotifyUrl,
      wiki,
    },
    poolSize: pool.length,
    remaining: available.length - 1,
  })
}
