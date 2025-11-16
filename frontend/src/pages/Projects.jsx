import { useEffect, useState } from 'react';
import { PublicAPI } from '@/lib/api';
import ProjectCard from '@/components/ProjectCard';

export default function Projects(){
  const [projects, setProjects] = useState([]);
  useEffect(()=>{ PublicAPI.projects().then(setProjects).catch(console.error); },[]);
  return (
    <main className="lux-container py-16">
      <h1 className="text-5xl font-bold tracking-tight" style={{fontFamily:'Playfair Display, serif'}}>Projects</h1>
      <p className="text-[var(--brand-soft)] mt-3">Selected work and experiments.</p>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(p=> <ProjectCard key={p.id} project={p} />)}
      </div>
    </main>
  );
}
