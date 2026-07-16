"use client"

import { useEffect, useRef } from "react"

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  color: string
  size: number
}

const COLORS = ["#ff4fd8", "#57e6ff", "#ffe66d", "#ff6ec7", "#8be9fd"]

export function Fireworks({
  active,
  duration = 2600,
}: {
  active: boolean
  duration?: number
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (!active) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const resize = () => {
      canvas.width = canvas.offsetWidth * dpr
      canvas.height = canvas.offsetHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener("resize", resize)

    const particles: Particle[] = []

    const burst = (x: number, y: number) => {
      const count = 46 + Math.floor(Math.random() * 26)
      const color = COLORS[Math.floor(Math.random() * COLORS.length)]
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count
        const speed = 1.6 + Math.random() * 3.4
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0,
          maxLife: 55 + Math.random() * 35,
          color: Math.random() > 0.7 ? COLORS[Math.floor(Math.random() * COLORS.length)] : color,
          size: 1.5 + Math.random() * 2.5,
        })
      }
    }

    const start = performance.now()
    let lastBurst = 0

    const w = () => canvas.offsetWidth
    const h = () => canvas.offsetHeight

    // Initial simultaneous bursts.
    burst(w() * 0.3, h() * 0.4)
    burst(w() * 0.7, h() * 0.35)

    const tick = (now: number) => {
      const elapsed = now - start
      ctx.clearRect(0, 0, w(), h())

      if (elapsed < duration - 700 && now - lastBurst > 380) {
        lastBurst = now
        burst(w() * (0.2 + Math.random() * 0.6), h() * (0.2 + Math.random() * 0.4))
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.life++
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.045 // gravity
        p.vx *= 0.99
        const alpha = Math.max(0, 1 - p.life / p.maxLife)
        if (alpha <= 0) {
          particles.splice(i, 1)
          continue
        }
        ctx.globalAlpha = alpha
        ctx.fillStyle = p.color
        ctx.shadowBlur = 12
        ctx.shadowColor = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
      ctx.shadowBlur = 0

      if (elapsed < duration || particles.length > 0) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener("resize", resize)
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)
    }
  }, [active, duration])

  if (!active) return null

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-40 h-full w-full"
    />
  )
}
