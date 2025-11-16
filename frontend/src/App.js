import { useEffect } from 'react';
import '@/App.css';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import Services from '@/pages/Services';
import Projects from '@/pages/Projects';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import AdminLogin from '@/pages/admin/Login';
import AdminLayout from '@/pages/admin/Layout';
import Dashboard from '@/pages/admin/Dashboard';
import AdminProjects from '@/pages/admin/Projects';
import AdminServices from '@/pages/admin/Services';
import AdminSkills from '@/pages/admin/Skills';
import AdminPosts from '@/pages/admin/Posts';
import AdminInquiries from '@/pages/admin/Inquiries';
import AdminSettings from '@/pages/admin/Settings';
import { Toaster } from '@/components/ui/sonner';
import { auth } from '@/lib/auth';

function PublicLayout(){
  return (
    <div className="min-h-screen bg-[var(--brand-bg)] text-slate-900">
      <NavBar />
      <Outlet />
      <Footer />
      <Toaster richColors />
    </div>
  );
}

function RequireAuth(){
  const token = auth.token();
  if(!token) return <Navigate to="/admin/login" replace />;
  return <Outlet />;
}

function App(){
  useEffect(()=>{ /* init */ },[]);
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}> 
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route element={<RequireAuth />}> 
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/projects" element={<AdminProjects />} />
            <Route path="/admin/services" element={<AdminServices />} />
            <Route path="/admin/skills" element={<AdminSkills />} />
            <Route path="/admin/posts" element={<AdminPosts />} />
            <Route path="/admin/inquiries" element={<AdminInquiries />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
