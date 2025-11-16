import { useEffect, useState } from 'react';
import { PublicAPI } from '@/lib/api';
import ServiceCard from '@/components/ServiceCard';

export default function Services(){
  const [services, setServices] = useState([]);
  useEffect(()=>{ PublicAPI.services().then(setServices).catch(console.error); },[]);
  return (
    <main className="lux-container py-16">
      <h1 className="text-5xl font-bold tracking-tight" style={{fontFamily:'Playfair Display, serif'}}>Services</h1>
      <p className="text-[var(--brand-soft)] mt-3">What we can do for you.</p>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map(s=> <ServiceCard key={s.id} service={s} />)}
      </div>
    </main>
  );
}
