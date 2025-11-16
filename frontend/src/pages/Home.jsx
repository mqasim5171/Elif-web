import Hero from '@/components/Hero';
import ServiceCard from '@/components/ServiceCard';
import ProjectCard from '@/components/ProjectCard';
import { PublicAPI } from '@/lib/api';
import { useEffect, useState } from 'react';

export default function Home(){
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  useEffect(()=>{
    (async()=>{
      try{
        const [svc, prj] = await Promise.all([PublicAPI.services(), PublicAPI.projects()]);
        setServices(svc.slice(0,6));
        setProjects(prj.slice(0,6));
      }catch(e){ console.error(e); }
    })();
  },[]);
  return (
    <main>
      <Hero />
      <section className="lux-container py-16">
        <div className="flex items-end justify-between">
          <h2 className="text-xl font-semibold tracking-tight" style={{fontFamily:'Playfair Display, serif'}}>Services</h2>
        </div>
        <div className="mt-6 lux-gold-sep" />
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(s=> <ServiceCard key={s.id} service={s} />)}
        </div>
      </section>
      <section className="lux-container py-16">
        <div className="flex items-end justify-between">
          <h2 className="text-xl font-semibold tracking-tight" style={{fontFamily:'Playfair Display, serif'}}>Featured Projects</h2>
        </div>
        <div className="mt-6 lux-gold-sep" />
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(p=> <ProjectCard key={p.id} project={p} />)}
        </div>
      </section>
    </main>
  );
}
