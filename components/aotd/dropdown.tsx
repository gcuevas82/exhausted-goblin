"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronDown, Check } from "lucide-react"
import { cn } from "@/lib/utils"

export type DropdownOption = { label: string; value: string }

export function Dropdown({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: DropdownOption[]
  value: string
  onChange: (value: string) => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", onDocClick)
    return () => document.removeEventListener("mousedown", onDocClick)
  }, [])

  const selected = options.find((o) => o.value === value) ?? options[0]

  return (
    <div className="flex flex-col gap-1.5" ref={ref}>
      <span className="font-display text-[0.7rem] uppercase tracking-[0.2em] text-accent text-glow-cyan">
        {label}
      </span>
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-haspopup="listbox"
          aria-expanded={open}
          className="flex w-full min-w-40 items-center justify-between gap-3 rounded-md border border-border bg-input px-3.5 py-2.5 text-left text-sm font-medium text-foreground transition-colors hover:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span className="truncate">{selected.label}</span>
          <ChevronDown
            className={cn(
              "size-4 shrink-0 text-accent transition-transform",
              open && "rotate-180",
            )}
          />
        </button>
        {open && (
          <ul
            role="listbox"
            className="absolute z-30 mt-1.5 max-h-64 w-full overflow-auto rounded-md border border-border bg-popover p-1 shadow-xl box-glow"
          >
            {options.map((opt) => {
              const isSelected = opt.value === value
              return (
                <li key={opt.value} role="option" aria-selected={isSelected}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(opt.value)
                      setOpen(false)
                    }}
                    className={cn(
                      "flex w-full items-center justify-between gap-2 rounded px-3 py-2 text-left text-sm transition-colors hover:bg-secondary",
                      isSelected
                        ? "bg-secondary text-primary"
                        : "text-popover-foreground",
                    )}
                  >
                    <span className="truncate">{opt.label}</span>
                    {isSelected && <Check className="size-4 shrink-0 text-primary" />}
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}
