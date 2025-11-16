import { useEffect, useState } from 'react';
import { AdminAPI } from '@/lib/api';
import { Button } from '@/components/ui/button';

export default function AdminInquiries(){
  const [items, setItems] = useState([]);
  const load = ()=> AdminAPI.listInquiries().then(setItems);
  useEffect(()=>{ load(); },[]);

  const mark = async (id, status)=>{ await AdminAPI.setInquiryStatus(id, status); load(); };

  return (
    <div>
      <h1 className="text-2xl font-semibold">Inquiries</h1>
      <div className="mt-6 space-y-3">
        {items.map(q=> (
          <div key={q.id} className="p-4 rounded-xl border bg-white/70">
            <div className="font-medium">{q.name} · {q.email}</div>
            <div className="text-sm text-slate-600">{q.service} — {q.budget || 'n/a'}</div>
            <p className="text-sm mt-2">{q.message}</p>
            <div className="mt-3 flex gap-2">
              <Button size="sm" variant="outline" onClick={()=>mark(q.id, 'read')} data-testid={`inq-read-${q.id}`}>Mark Read</Button>
              <Button size="sm" variant="destructive" onClick={()=>mark(q.id, 'archived')} data-testid={`inq-arch-${q.id}`}>Archive</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
