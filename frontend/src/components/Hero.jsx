import { Button } from '@/components/ui/button';

export default function Hero(){
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-blue-100 to-transparent" aria-hidden="true" />
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900" data-testid="hero-title">We design, build, and automate your digital presence.</h1>
          <p className="mt-4 text-slate-600 text-base md:text-lg" data-testid="hero-subtitle">Elegant websites, robust apps, and smart automations for modern brands.</p>
          <div className="mt-6 flex gap-3">
            <Button asChild data-testid="hero-view-projects" className="rounded-full bg-[var(--brand-primary)] hover:bg-blue-800">
              <a href="/projects">View Projects</a>
            </Button>
            <Button asChild variant="outline" data-testid="hero-lets-talk" className="rounded-full border-slate-300">
              <a href="/contact">Let's Talk</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
