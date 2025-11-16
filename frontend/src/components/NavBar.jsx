import { Link, NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function NavBar(){
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--brand-border)]/60 bg-[var(--brand-bg)]/70 backdrop-blur-xl">
      <div className="lux-container py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3" data-testid="navbar-logo">
          <div className="w-8 h-8 rounded-full bg-[var(--brand-royal)] ring-1 ring-[var(--brand-gold)]/30" />
          <span className="font-semibold tracking-tight text-[var(--brand-ink)]" style={{fontFamily:'Playfair Display, serif'}}>Elif</span>
        </Link>
        <nav className="hidden md:flex gap-8 text-sm" aria-label="Primary">
          <NavLink to="/services" className={({isActive})=>isActive? 'text-[var(--brand-champagne)]' : 'text-[var(--brand-soft)] hover:text-[var(--brand-ink)]'} data-testid="navbar-services">Services</NavLink>
          <NavLink to="/projects" className={({isActive})=>isActive? 'text-[var(--brand-champagne)]' : 'text-[var(--brand-soft)] hover:text-[var(--brand-ink)]'} data-testid="navbar-projects">Projects</NavLink>
          <NavLink to="/about" className={({isActive})=>isActive? 'text-[var(--brand-champagne)]' : 'text-[var(--brand-soft)] hover:text-[var(--brand-ink)]'} data-testid="navbar-about">About</NavLink>
          <NavLink to="/contact" className={({isActive})=>isActive? 'text-[var(--brand-champagne)]' : 'text-[var(--brand-soft)] hover:text-[var(--brand-ink)]'} data-testid="navbar-contact">Contact</NavLink>
          <NavLink to="/admin" className={({isActive})=>isActive? 'text-[var(--brand-champagne)]' : 'text-[var(--brand-soft)] hover:text-[var(--brand-ink)]'} data-testid="navbar-admin">Admin</NavLink>
        </nav>
        <Button asChild data-testid="navbar-cta" className="rounded-full lux-btn-outline bg-transparent border border-[var(--brand-gold)]/60 text-[var(--brand-ink)]">
          <a href="/contact">Let's Talk</a>
        </Button>
      </div>
    </header>
  );
}
