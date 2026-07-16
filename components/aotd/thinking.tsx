"use client"

import { useEffect, useState } from "react"
import { Disc3 } from "lucide-react"

const MESSAGES = [
  "Spinning up the crates...",
  "Dusting off the vinyl...",
  "Consulting the goblin...",
  "Scanning the decades...",
  "Cueing the needle...",
  "Decoding the vibes...",
]

export function Thinking() {
  const [msg, setMsg] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setMsg((m) => (m + 1) % MESSAGES.length), 900)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="flex flex-col items-center gap-6 py-10">
      <div className="relative flex size-40 items-center justify-center">
        {/* pulsing rings */}
        <span className="absolute size-40 animate-ping rounded-full border border-primary/40" />
        <span className="absolute size-28 rounded-full border border-accent/40" />
        {/* spinning record */}
        <div className="animate-spin [animation-duration:1.6s]">
          <Disc3 className="size-28 text-primary drop-shadow-[0_0_14px_rgba(255,79,216,0.7)]" />
        </div>
      </div>
      <p
        key={msg}
        className="font-display text-sm uppercase tracking-[0.25em] text-accent text-glow-cyan animate-in fade-in duration-500"
      >
        {MESSAGES[msg]}
      </p>
    </div>
  )
}
