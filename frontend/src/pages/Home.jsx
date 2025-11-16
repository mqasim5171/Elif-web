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
      <section className="max-w-6xl mx-auto px-4 py-12" aria-labelledby="home-services-heading">
        <h2 id="home-services-heading" className="text-lg font-semibold tracking-tight">Services</h2>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(s=> <ServiceCard key={s.id} service={s} />)}
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-4 py-12 border-t" aria-labelledby="home-projects-heading">
        <h2 id="home-projects-heading" className="text-lg font-semibold tracking-tight">Featured Projects</h2>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(p=> <ProjectCard key={p.id} project={p} />)}
        </div>
      </section>
    </main>
  );
}
