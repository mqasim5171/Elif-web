import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[var(--brand-bg)] pt-28 pb-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0e1425] via-[#0d1b32] to-[#07101f] opacity-70 pointer-events-none" />

      {/* Soft overlay instead of noise (no external image, so no webpack errors) */}
      <div className="absolute inset-0 bg-black/10 mix-blend-soft-light pointer-events-none" />

      {/* Glow orb */}
      <div className="absolute -top-20 -left-20 w-[400px] h-[400px] rounded-full bg-[#1c2d59] blur-[140px] opacity-50 pointer-events-none" />

      {/* Main container */}
      <div className="relative z-10 lux-container flex flex-col md:flex-row items-start justify-between gap-16">
        {/* Left column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-xl"
        >
          {/* Small badge */}
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[var(--brand-soft)] mb-4">
            Elif Studio · Web · Apps · Automation
          </p>

          <h1
            className="text-5xl sm:text-6xl font-semibold leading-tight text-white"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            We design, build,
            <br />
            and automate your
            <br />
            digital presence.
          </h1>

          <p className="mt-5 text-[var(--brand-soft)] text-base md:text-lg leading-relaxed max-w-lg">
            Elegant websites, robust apps, and smart automations for modern brands.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3 mt-7">
            <Link
              to="/projects"
              className="px-6 py-3 rounded-full bg-[var(--brand-royal)] text-white font-medium hover:bg-blue-700 transition-all"
            >
              View Projects
            </Link>

            <Link
              to="/contact"
              className="px-6 py-3 rounded-full border border-[var(--brand-border)] bg-white/5 text-white font-medium hover:bg-white/10 transition-all"
            >
              Let&apos;s Talk
            </Link>
          </div>
        </motion.div>

        {/* Right column visuals */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative flex flex-col gap-5 md:mt-4"
        >
          {/* Card 1 */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className="w-[280px] sm:w-[320px] h-[160px] sm:h-[170px] rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-xl p-5"
          >
            <div className="h-4 w-28 bg-white/20 rounded mb-3" />
            <div className="h-3 w-full bg-white/10 rounded mb-2" />
            <div className="h-3 w-3/4 bg-white/10 rounded" />
          </motion.div>

          {/* Card 2 */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="w-[280px] sm:w-[320px] h-[160px] sm:h-[170px] rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-xl p-5"
          >
            <div className="flex gap-3">
              <div className="h-12 w-12 rounded-xl bg-white/10" />
              <div className="flex-1">
                <div className="h-3 w-2/3 bg-white/20 rounded mb-2" />
                <div className="h-3 w-1/2 bg-white/10 rounded" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
