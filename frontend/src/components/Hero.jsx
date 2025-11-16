import { Button } from '@/components/ui/button';

export default function Hero(){
  return (
    <section className="relative overflow-hidden hero-bg">
      <div className="absolute inset-0 vignette" aria-hidden="true" />
      <div className="lux-container py-20 md:py-28 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="fade-up">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] text-[var(--brand-ink)]" data-testid="hero-title" style={{fontFamily:'Playfair Display, serif'}}>
            We design, build, and
            automate your digital
            presence.
          </h1>
          <p className="mt-5 text-[var(--brand-soft)] text-base md:text-lg max-w-xl" data-testid="hero-subtitle">
            Elegant websites, robust apps, and smart automations for modern brands.
          </p>
          <div className="mt-8 flex gap-3">
            <a href="/projects" className="lux-btn-primary" data-testid="hero-view-projects">View Projects</a>
            <a href="/contact" className="lux-btn-outline" data-testid="hero-lets-talk">Let's Talk</a>
          </div>
        </div>
        <div className="relative hidden md:block" aria-hidden>
          <div className="absolute -top-8 -right-10 w-72 h-72 rounded-3xl bg-[var(--brand-royal)]/15 blur-2xl" />
          <div className="absolute bottom-10 -left-6 w-60 h-60 rounded-full bg-[var(--brand-gold)]/10 blur-2xl" />
          <div className="relative grid gap-6">
            <div className="lux-card p-4 glow-on-hover">
              <div className="h-36 rounded-xl bg-gradient-to-br from-[var(--brand-bg-2)] to-[var(--brand-card)] border border-[var(--brand-border)]" />
              <div className="mt-3 text-sm text-[var(--brand-soft)]">Concept website layout</div>
            </div>
            <div className="lux-card p-4 translate-x-10 -translate-y-8 glow-on-hover">
              <div className="h-24 rounded-xl bg-gradient-to-br from-[var(--brand-royal)]/20 to-transparent border border-[var(--brand-border)]" />
              <div className="mt-3 text-sm text-[var(--brand-soft)]">Blueprint components</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
