export default function Footer(){
  return (
    <footer className="mt-16 border-t bg-white/70 backdrop-blur" role="contentinfo">
      <div className="max-w-6xl mx-auto px-4 py-10 text-sm text-slate-600 flex flex-col sm:flex-row gap-4 justify-between">
        <div className="space-y-1">
          <div className="font-semibold" data-testid="footer-brand">Elif</div>
          <div>© {new Date().getFullYear()} All rights reserved.</div>
        </div>
        <div className="flex gap-6" aria-label="Social links">
          <a href="#" className="hover:text-slate-900" data-testid="footer-link-linkedin">LinkedIn</a>
          <a href="#" className="hover:text-slate-900" data-testid="footer-link-instagram">Instagram</a>
          <a href="#" className="hover:text-slate-900" data-testid="footer-link-github">GitHub</a>
        </div>
      </div>
    </footer>
  );
}
