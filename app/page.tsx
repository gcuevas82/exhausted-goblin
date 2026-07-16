import { Generator } from "@/components/aotd/generator"

export default function Page() {
  return (
    <main className="vapor-backdrop relative min-h-screen overflow-hidden">
      {/* retro perspective grid floor */}
      <div
        aria-hidden="true"
        className="vapor-grid pointer-events-none absolute inset-x-0 bottom-0 h-1/2"
      />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center px-4 py-10 sm:py-14">
        <header className="mb-8 text-center">
          <p className="font-display text-[0.7rem] uppercase tracking-[0.35em] text-accent text-glow-cyan sm:text-xs">
            Album of the Day
          </p>
          <h1 className="mt-2 font-display text-3xl font-black uppercase leading-tight tracking-tight text-primary text-glow text-balance sm:text-5xl">
            Exhausted Goblin&apos;s
            <br />
            AoTD Generator
          </h1>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            brought to you by{" "}
            <span className="text-accent text-glow-cyan">Gin The Human</span>
          </p>
        </header>

        <Generator />

        <footer className="mt-10 text-center text-[0.7rem] text-muted-foreground/70">
          <p>Cover art via iTunes &middot; Info via Wikipedia &middot; Listen on Spotify</p>
        </footer>
      </div>
    </main>
  )
}
