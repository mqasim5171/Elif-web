import { useEffect, useState } from 'react';
import { AdminAPI } from '@/lib/api';

export default function Dashboard(){
  const [stats, setStats] = useState(null);
  useEffect(()=>{ AdminAPI.stats().then(setStats).catch(console.error); },[]);
  return (
    <div>
      <h1 className="text-2xl font-semibold">Overview</h1>
      {stats && (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border bg-white/70"><div className="text-sm text-slate-600">Projects</div><div className="text-2xl font-bold" data-testid="stat-projects">{stats.projects}</div></div>
          <div className="p-4 rounded-xl border bg-white/70"><div className="text-sm text-slate-600">Services</div><div className="text-2xl font-bold" data-testid="stat-services">{stats.services}</div></div>
          <div className="p-4 rounded-xl border bg-white/70"><div className="text-sm text-slate-600">Inquiries</div><div className="text-2xl font-bold" data-testid="stat-inquiries">{stats.inquiries}</div></div>
        </div>
      )}
      <div className="mt-8">
        <h2 className="text-lg font-semibold">Latest inquiries</h2>
        <div className="mt-3 space-y-2">
          {stats?.latest_inquiries?.map((q)=> (
            <div key={q.id} className="p-3 rounded-lg border bg-white/70" data-testid={`inquiry-item-${q.id}`}>
              <div className="font-medium">{q.name} · {q.email}</div>
              <div className="text-sm text-slate-600">{q.service} — {q.budget || 'n/a'}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
