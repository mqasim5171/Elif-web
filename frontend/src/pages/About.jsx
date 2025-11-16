export default function About(){
  return (
    <main className="lux-container py-16">
      <h1 className="text-5xl font-bold tracking-tight" style={{fontFamily:'Playfair Display, serif'}}>About Elif</h1>
      <div className="mt-6 lux-gold-sep" />
      <p className="text-[var(--brand-soft)] mt-6 max-w-3xl">We are a creative digital agency focused on elegant design, modern engineering, and measurable outcomes. Our process: Discovery → Design → Development → Launch → Support.</p>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="lux-card p-6">
          <h2 className="text-lg font-semibold" style={{fontFamily:'Playfair Display, serif'}}>Values</h2>
          <div className="mt-4 space-y-2 text-[var(--brand-soft)]">
            <div className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[var(--brand-gold)]" /><span>Clarity and honesty</span></div>
            <div className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[var(--brand-gold)]" /><span>Design with purpose</span></div>
            <div className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[var(--brand-gold)]" /><span>Reliable delivery</span></div>
            <div className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[var(--brand-gold)]" /><span>Long-term partnerships</span></div>
          </div>
        </div>
        <div className="lux-card p-6">
          <h2 className="text-lg font-semibold" style={{fontFamily:'Playfair Display, serif'}}>Why Choose Elif Digital</h2>
          <ul className="mt-4 list-disc pl-6 text-[var(--brand-soft)] space-y-1">
            <li>Premium craft and attention to detail</li>
            <li>Senior team with reliable delivery</li>
            <li>Pragmatic use of AI and automation</li>
            <li>Long-term support and iteration</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
