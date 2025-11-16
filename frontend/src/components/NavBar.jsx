import { Link, NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function NavBar(){
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/70 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2" data-testid="navbar-logo">
          <div className="w-8 h-8 rounded-lg bg-[var(--brand-primary)]" />
          <span className="font-semibold tracking-tight">Elif</span>
        </Link>
        <nav className="hidden md:flex gap-6" aria-label="Primary">
          <NavLink to="/services" className={({isActive})=>isActive? 'text-[var(--brand-primary)]' : 'text-slate-600 hover:text-slate-900'} data-testid="navbar-services">Services</NavLink>
          <NavLink to="/projects" className={({isActive})=>isActive? 'text-[var(--brand-primary)]' : 'text-slate-600 hover:text-slate-900'} data-testid="navbar-projects">Projects</NavLink>
          <NavLink to="/about" className={({isActive})=>isActive? 'text-[var(--brand-primary)]' : 'text-slate-600 hover:text-slate-900'} data-testid="navbar-about">About</NavLink>
          <NavLink to="/contact" className={({isActive})=>isActive? 'text-[var(--brand-primary)]' : 'text-slate-600 hover:text-slate-900'} data-testid="navbar-contact">Contact</NavLink>
          <NavLink to="/admin" className={({isActive})=>isActive? 'text-[var(--brand-primary)]' : 'text-slate-600 hover:text-slate-900'} data-testid="navbar-admin">Admin</NavLink>
        </nav>
        <Button asChild data-testid="navbar-cta" className="rounded-full bg-[var(--brand-accent)] hover:bg-amber-400 text-slate-900">
          <a href="#contact">Let's Talk</a>
        </Button>
      </div>
    </header>
  );
}
