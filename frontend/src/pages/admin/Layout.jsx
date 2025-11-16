import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/auth';

export default function AdminLayout(){
  const nav = useNavigate();
  const logout = ()=>{ auth.clear(); nav('/admin/login'); };
  return (
    <div className="min-h-screen grid grid-cols-12">
      <aside className="col-span-12 md:col-span-3 lg:col-span-2 border-r bg-white/70 backdrop-blur p-4">
        <div className="font-semibold mb-4" data-testid="admin-sidebar-brand">Elif Admin</div>
        <nav className="flex flex-col gap-2">
          <NavLink to="/admin" end className={({isActive})=>isActive? 'font-medium text-[var(--brand-primary)]' : ''} data-testid="admin-nav-dashboard">Dashboard</NavLink>
          <NavLink to="/admin/projects" className={({isActive})=>isActive? 'font-medium text-[var(--brand-primary)]' : ''} data-testid="admin-nav-projects">Projects</NavLink>
          <NavLink to="/admin/services" className={({isActive})=>isActive? 'font-medium text-[var(--brand-primary)]' : ''} data-testid="admin-nav-services">Services</NavLink>
          <NavLink to="/admin/skills" className={({isActive})=>isActive? 'font-medium text-[var(--brand-primary)]' : ''} data-testid="admin-nav-skills">Skills</NavLink>
          <NavLink to="/admin/posts" className={({isActive})=>isActive? 'font-medium text-[var(--brand-primary)]' : ''} data-testid="admin-nav-posts">Blog</NavLink>
          <NavLink to="/admin/inquiries" className={({isActive})=>isActive? 'font-medium text-[var(--brand-primary)]' : ''} data-testid="admin-nav-inquiries">Inquiries</NavLink>
          <NavLink to="/admin/settings" className={({isActive})=>isActive? 'font-medium text-[var(--brand-primary)]' : ''} data-testid="admin-nav-settings">Settings</NavLink>
        </nav>
        <Button onClick={logout} variant="outline" className="mt-6" data-testid="admin-logout">Logout</Button>
      </aside>
      <main className="col-span-12 md:col-span-9 lg:col-span-10 p-6">
        <Outlet />
      </main>
    </div>
  );
}
