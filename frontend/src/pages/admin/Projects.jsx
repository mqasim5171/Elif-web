import { useEffect, useState } from 'react';
import { AdminAPI } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';

export default function AdminProjects(){
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: '', slug: '', short: '', visible: true });

  const load = ()=> AdminAPI.listProjects().then(setItems);
  useEffect(()=>{ load(); },[]);

  const save = async ()=>{
    try{
      await AdminAPI.upsertProject({ ...form, tech: form.tech || [], tags: form.tags || [] });
      toast.success('Saved'); setOpen(false); setForm({ title:'', slug:'', short:'', visible:true }); load();
    }catch(e){ toast.error('Error saving'); }
  };

  const del = async (id)=>{ await AdminAPI.deleteProject(id); toast.success('Deleted'); load(); };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Projects</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button data-testid="add-project-btn">Add Project</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>{form.id? 'Edit' : 'New'} Project</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <Input placeholder="Title" value={form.title} onChange={(e)=>setForm(f=>({...f, title:e.target.value}))} data-testid="project-title" />
              <Input placeholder="Slug" value={form.slug} onChange={(e)=>setForm(f=>({...f, slug:e.target.value}))} data-testid="project-slug" />
              <Textarea placeholder="Short description" value={form.short} onChange={(e)=>setForm(f=>({...f, short:e.target.value}))} data-testid="project-short" />
              <Input placeholder="Cover image URL" value={form.cover_url||''} onChange={(e)=>setForm(f=>({...f, cover_url:e.target.value}))} data-testid="project-cover" />
              <Input placeholder="Live URL" value={form.live_url||''} onChange={(e)=>setForm(f=>({...f, live_url:e.target.value}))} data-testid="project-live" />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={()=>setOpen(false)} data-testid="project-cancel">Cancel</Button>
              <Button onClick={save} data-testid="project-save">Save</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map(it=> (
          <div key={it.id} className="p-4 rounded-xl border bg-white/70">
            <div className="font-medium">{it.title}</div>
            <div className="text-sm text-slate-600">{it.short}</div>
            <div className="mt-3 flex gap-2">
              <Button variant="outline" size="sm" onClick={()=>{ setForm(it); setOpen(true); }} data-testid={`project-edit-${it.id}`}>Edit</Button>
              <Button variant="destructive" size="sm" onClick={()=>del(it.id)} data-testid={`project-delete-${it.id}`}>Delete</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
