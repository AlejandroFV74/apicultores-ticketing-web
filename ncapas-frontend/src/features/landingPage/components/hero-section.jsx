export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/20" />

        {/* Animated Gradient Orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-neon-blue/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-32 right-10 w-96 h-96 rounded-full bg-neon-purple/10 blur-3xl animate-pulse" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-12">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neon-blue/30 bg-neon-blue/10 backdrop-blur-sm">
          {/* ✅ SVG Nativo para Sparkles */}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-neon-blue"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275Z"/><path d="m5 3 1 2.5L8.5 6 6 7 5 9.5 4 7 1.5 6 4 5.5Z"/><path d="M19 17l1 2.5 2.5.5-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1Z"/></svg>
          <span className="text-sm font-medium text-neon-blue">Discover Premium Events</span>
        </div>

        {/* Main Heading */}
        <div className="space-y-6">
          <h1 className="text-6xl md:text-7xl font-black tracking-tighter">
            <span className="bg-gradient-to-r from-neon-blue via-foreground to-neon-purple bg-clip-text text-transparent">
              Experience the Future
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-foreground/70 leading-relaxed max-w-2xl mx-auto">
            Curated events at the intersection of technology and culture. Secure your spot at the most electrifying
            experiences of 2026.
          </p>
        </div>

        

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-8 pt-12 border-t border-neon-blue/20">
          <div className="space-y-2">
            <p className="text-3xl font-black text-neon-blue">2,500+</p>
            <p className="text-sm text-foreground/60">Eventos Disponibles</p>
          </div>
          <div className="space-y-2">
            <p className="text-3xl font-black text-neon-purple">150K+</p>
            <p className="text-sm text-foreground/60">Asientos Reservados</p>
          </div>
          <div className="space-y-2">
            <p className="text-3xl font-black text-neon-blue">98%</p>
            <p className="text-sm text-foreground/60">Satisfacción de Cliente</p>
          </div>
        </div>
      </div>
    </section>
  )
}