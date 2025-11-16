export default function Footer(){
  return (
    <footer className="mt-20 border-t border-[var(--brand-border)] bg-[var(--brand-bg)]" role="contentinfo">
      <div className="lux-gold-sep" />
      <div className="lux-container py-12 text-sm text-[var(--brand-soft)] flex flex-col sm:flex-row gap-4 justify-between">
        <div className="space-y-1">
          <div className="font-semibold text-[var(--brand-ink)]" style={{fontFamily:'Playfair Display, serif'}} data-testid="footer-brand">Elif</div>
          <div className="italic">Crafting digital experiences with precision and elegance.</div>
          <div>© {new Date().getFullYear()} All rights reserved.</div>
        </div>
        <div className="flex gap-6" aria-label="Social links">
          <a href="#" className="hover:text-[var(--brand-ink)]" data-testid="footer-link-linkedin">LinkedIn</a>
          <a href="#" className="hover:text-[var(--brand-ink)]" data-testid="footer-link-instagram">Instagram</a>
          <a href="#" className="hover:text-[var(--brand-ink)]" data-testid="footer-link-github">GitHub</a>
        </div>
      </div>
    </footer>
  );
}
