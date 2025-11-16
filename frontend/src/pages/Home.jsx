import Hero from '@/components/Hero';
import ServiceCard from '@/components/ServiceCard';
import ProjectCard from '@/components/ProjectCard';
import { PublicAPI } from '@/lib/api';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const [svc, prj] = await Promise.all([
          PublicAPI.services(),
          PublicAPI.projects(),
        ]);
        setServices(Array.isArray(svc) ? svc : []);
        setProjects(Array.isArray(prj) ? prj : []);
      } catch (e) {
        console.error('Failed to load homepage data', e);
      }
    })();
  }, []);

  const featuredServices = services.slice(0, 3);
  const featuredProjects = projects.slice(0, 3);

  const moreServicesExist = services.length > featuredServices.length;
  const moreProjectsExist = projects.length > featuredProjects.length;

  return (
    <main className="pb-24">
      {/* 1. HERO (already a separate component) */}
      <Hero />

      {/* 2. TRUST BAR */}
      <section className="lux-container py-8 fade-up">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--brand-soft)]">
            Trusted by teams behind
          </p>
          <div className="flex flex-wrap gap-3 text-xs md:text-sm text-[var(--brand-soft)]">
            <span className="px-3 py-1 rounded-full border border-[var(--brand-border)] bg-[var(--brand-card)]/60">
              Athleland – fitness platform
            </span>
            <span className="px-3 py-1 rounded-full border border-[var(--brand-border)] bg-[var(--brand-card)]/60">
              PRCS – NGO website
            </span>
            <span className="px-3 py-1 rounded-full border border-[var(--brand-border)] bg-[var(--brand-card)]/60">
              The Spanish Pizza – F&amp;B
            </span>
            <span className="px-3 py-1 rounded-full border border-[var(--brand-border)] bg-[var(--brand-card)]/60">
              Amanat – lost &amp; found app
            </span>
          </div>
        </div>
        <div className="mt-4 lux-gold-sep" />
      </section>

      {/* 3. WHAT WE DO BEST (services overview) */}
      <section className="lux-container py-16 space-y-10 fade-up" id="services">
        <div className="max-w-2xl space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--brand-soft)]">
            Services
          </p>
          <h2
            className="text-3xl sm:text-4xl font-semibold text-[var(--brand-ink)]"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            What we do best.
          </h2>
          <p className="text-sm md:text-base text-[var(--brand-soft)]">
            Elif is a digital studio focused on clean interfaces and reliable engineering.
            We design and build marketing sites, platforms, dashboards, and AI-powered tools
            that actually move metrics.
          </p>
        </div>

        {/* Pillars */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="lux-card p-5">
            <h3
              className="text-lg font-semibold text-[var(--brand-ink)] mb-1"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Design
            </h3>
            <p className="text-xs text-[var(--brand-soft)]">
              Product UI/UX, design systems, interactive prototypes that feel real.
            </p>
          </div>
          <div className="lux-card p-5">
            <h3
              className="text-lg font-semibold text-[var(--brand-ink)] mb-1"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Build
            </h3>
            <p className="text-xs text-[var(--brand-soft)]">
              Marketing sites, web apps, dashboards, and admin panels built on modern stacks.
            </p>
          </div>
          <div className="lux-card p-5">
            <h3
              className="text-lg font-semibold text-[var(--brand-ink)] mb-1"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Automate
            </h3>
            <p className="text-xs text-[var(--brand-soft)]">
              AI chatbots, workflow automation, internal tools that remove manual work.
            </p>
          </div>
        </div>

        {/* Dynamic services from backend */}
        {featuredServices.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-[var(--brand-soft)]">
                A snapshot of what we ship for clients:
              </p>
              {moreServicesExist && (
                <Link
                  to="/services"
                  className="text-xs md:text-sm text-[var(--brand-champagne)] hover:text-[var(--brand-gold)] underline-offset-4 hover:underline"
                >
                  View all services →
                </Link>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* 4. SELECTED WORK (projects) */}
      <section
        className="lux-container py-16 space-y-8 fade-up"
        id="projects"
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--brand-soft)]">
              Work
            </p>
            <h2
              className="text-3xl sm:text-4xl font-semibold text-[var(--brand-ink)]"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Selected work.
            </h2>
            <p className="mt-2 text-sm md:text-base text-[var(--brand-soft)] max-w-xl">
              From clean landing pages to full platforms, here are a few projects
              that represent how we think about product, design, and engineering.
            </p>
          </div>
          {moreProjectsExist && (
            <Link
              to="/projects"
              className="text-xs md:text-sm text-[var(--brand-champagne)] hover:text-[var(--brand-gold)] underline-offset-4 hover:underline"
            >
              View full portfolio →
            </Link>
          )}
        </div>

        {featuredProjects.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </section>

      {/* 5. HOW WE WORK (process) */}
      <section className="border-y border-[var(--brand-border)] bg-[var(--brand-bg-2)]/80">
        <div className="lux-container py-16 space-y-8 fade-up">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--brand-soft)]">
              Process
            </p>
            <h2
              className="text-3xl sm:text-4xl font-semibold text-[var(--brand-ink)]"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              How we work together.
            </h2>
            <p className="text-sm md:text-base text-[var(--brand-soft)]">
              Clear stages, frequent check-ins, and shared tools so you always
              know what we&apos;re working on and why.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            {[
              {
                title: 'Discover',
                body: 'We start with a short strategy call to understand your goals, audience, constraints, and success metrics.',
              },
              {
                title: 'Design',
                body: 'We translate everything into flows, wireframes, and high-fidelity UI tied to your brand.',
              },
              {
                title: 'Build',
                body: 'We implement using modern stacks — React/Next.js, FastAPI, Supabase, MongoDB, and more.',
              },
              {
                title: 'Launch & grow',
                body: 'We ship, monitor, and iterate based on real usage, not just opinions.',
              },
            ].map((step) => (
              <div key={step.title} className="lux-card p-5 h-full flex flex-col">
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--brand-soft)] mb-2">
                  {step.title}
                </span>
                <p className="text-xs md:text-sm text-[var(--brand-soft)] leading-relaxed">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. WHO WE WORK WITH */}
      <section className="lux-container py-16 space-y-6 fade-up">
        <div className="max-w-2xl space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--brand-soft)]">
            Fit
          </p>
          <h2
            className="text-3xl sm:text-4xl font-semibold text-[var(--brand-ink)]"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Who we &apos;re a great match for.
          </h2>
          <p className="text-sm md:text-base text-[var(--brand-soft)]">
            We work best with teams who care about craft, clarity, and fast
            iteration — not endless meetings.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {[
            'Early-stage founders',
            'SMEs digitizing operations',
            'Agencies needing a tech partner',
            'Creators & educators',
          ].map((item) => (
            <span
              key={item}
              className="px-4 py-2 rounded-full border border-[var(--brand-border)] bg-[var(--brand-card)]/70 text-xs md:text-sm text-[var(--brand-soft)]"
            >
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* 7. TESTIMONIALS (simple static for now) */}
      <section className="lux-container py-16 space-y-8 fade-up">
        <div className="max-w-2xl space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--brand-soft)]">
            Testimonials
          </p>
          <h2
            className="text-3xl sm:text-4xl font-semibold text-[var(--brand-ink)]"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            What clients say.
          </h2>
          <p className="text-sm md:text-base text-[var(--brand-soft)]">
            A few words from teams we&apos;ve worked with. Replace these with real quotes as you go.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="lux-card p-6 flex flex-col gap-3">
            <p className="text-sm text-[var(--brand-soft)]">
              “Elif helped us go from rough idea to fully designed and deployed platform in weeks.
              Clean UI, clean code, and no drama.”
            </p>
            <p className="text-xs text-[var(--brand-soft)]">
              <span className="font-semibold text-[var(--brand-ink)]">Founder</span> · SaaS product
            </p>
          </div>
          <div className="lux-card p-6 flex flex-col gap-3">
            <p className="text-sm text-[var(--brand-soft)]">
              “The team understood our non-technical requirements and translated them into something
              our audience actually uses every day.”
            </p>
            <p className="text-xs text-[var(--brand-soft)]">
              <span className="font-semibold text-[var(--brand-ink)]">Comms lead</span> · NGO
            </p>
          </div>
        </div>
      </section>

      {/* 8. FINAL CTA STRIP */}
      <section className="mt-4 border-t border-[var(--brand-border)] bg-[var(--brand-bg-2)]">
        <div className="lux-container py-16 fade-up">
          <div className="max-w-2xl space-y-4">
            <h2
              className="text-3xl sm:text-4xl font-semibold text-[var(--brand-ink)]"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Have a project in mind?
            </h2>
            <p className="text-sm md:text-base text-[var(--brand-soft)]">
              Share a bit about your idea, timeline, and budget. We&apos;ll come back with a
              clear plan, a rough estimate, and next steps — no generic sales pitch.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link to="/contact" className="lux-btn-primary">
              Tell us about your project
            </Link>
            <a
              href="mailto:hello@yourelifagency.com"
              className="lux-btn-outline text-[var(--brand-champagne)]"
            >
              Email us directly
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
