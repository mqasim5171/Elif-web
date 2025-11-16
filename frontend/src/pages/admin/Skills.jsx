import { useEffect, useState } from 'react';
import { AdminAPI } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';

export default function AdminSkills(){
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name:'', category:'', level:'' });

  const load = ()=> AdminAPI.listSkills().then(setItems);
  useEffect(()=>{ load(); },[]);

  const save = async ()=>{
    try{
      await AdminAPI.upsertSkill(form);
      toast.success('Saved'); setOpen(false); setForm({ name:'', category:'', level:'' }); load();
    }catch(e){ toast.error('Error saving'); }
  };

  const del = async (id)=>{ await AdminAPI.deleteSkill(id); toast.success('Deleted'); load(); };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Skills</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button data-testid="add-skill-btn">Add Skill</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>{form.id? 'Edit' : 'New'} Skill</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <Input placeholder="Name" value={form.name} onChange={(e)=>setForm(f=>({...f, name:e.target.value}))} data-testid="skill-name" />
              <Input placeholder="Category" value={form.category} onChange={(e)=>setForm(f=>({...f, category:e.target.value}))} data-testid="skill-category" />
              <Input placeholder="Level" value={form.level} onChange={(e)=>setForm(f=>({...f, level:e.target.value}))} data-testid="skill-level" />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={()=>setOpen(false)} data-testid="skill-cancel">Cancel</Button>
              <Button onClick={save} data-testid="skill-save">Save</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map(it=> (
          <div key={it.id} className="p-4 rounded-xl border bg-white/70">
            <div className="font-medium">{it.name}</div>
            <div className="text-sm text-slate-600">{it.category} · {it.level}</div>
            <div className="mt-3 flex gap-2">
              <Button variant="outline" size="sm" onClick={()=>{ setForm(it); setOpen(true); }} data-testid={`skill-edit-${it.id}`}>Edit</Button>
              <Button variant="destructive" size="sm" onClick={()=>del(it.id)} data-testid={`skill-delete-${it.id}`}>Delete</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
