"use client"

import { Sparkles } from "lucide-react"
import { DECADES, GENRES } from "@/lib/albums"
import { Dropdown } from "./dropdown"
import { cn } from "@/lib/utils"

export type FilterState = {
  decade: string
  genre: string
  artistType: string
  obscure: boolean
}

const ANY = "__any__"

const decadeOptions = [
  { label: "Any decade", value: ANY },
  ...DECADES.map((d) => ({ label: d.label, value: d.label })),
]

const genreOptions = [
  { label: "Any genre", value: ANY },
  ...GENRES.map((g) => ({ label: g, value: g })),
]

const artistTypeOptions = [
  { label: "Any type", value: ANY },
  { label: "Band", value: "band" },
  { label: "Solo artist", value: "solo" },
  { label: "Instrumental", value: "instrumental" },
]

export const ANY_VALUE = ANY

export function FilterBar({
  filters,
  onChange,
  disabled,
}: {
  filters: FilterState
  onChange: (next: FilterState) => void
  disabled?: boolean
}) {
  return (
    <div
      className={cn(
        "relative z-40 w-full rounded-xl border border-border bg-card p-4 backdrop-blur-md sm:p-5 box-glow",
        disabled && "pointer-events-none opacity-60",
      )}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Dropdown
          label="Decade"
          options={decadeOptions}
          value={filters.decade}
          onChange={(v) => onChange({ ...filters, decade: v })}
        />
        <Dropdown
          label="Genre"
          options={genreOptions}
          value={filters.genre}
          onChange={(v) => onChange({ ...filters, genre: v })}
        />
        <Dropdown
          label="Artist Type"
          options={artistTypeOptions}
          value={filters.artistType}
          onChange={(v) => onChange({ ...filters, artistType: v })}
        />
      </div>

      <button
        type="button"
        onClick={() => onChange({ ...filters, obscure: !filters.obscure })}
        aria-pressed={filters.obscure}
        className={cn(
          "mt-4 flex items-center gap-2.5 rounded-md border px-3.5 py-2.5 text-sm font-medium transition-colors",
          filters.obscure
            ? "border-primary bg-primary/15 text-primary box-glow"
            : "border-border bg-input text-muted-foreground hover:border-primary",
        )}
      >
        <span
          className={cn(
            "flex size-5 items-center justify-center rounded border transition-colors",
            filters.obscure
              ? "border-primary bg-primary text-primary-foreground"
              : "border-muted-foreground",
          )}
        >
          {filters.obscure && <Sparkles className="size-3.5" />}
        </span>
        Dig deeper &mdash; surface more obscure picks
      </button>
    </div>
  )
}
