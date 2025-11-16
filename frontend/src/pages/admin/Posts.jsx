import { useEffect, useState } from 'react';
import { AdminAPI } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';

export default function AdminPosts(){
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title:'', slug:'', excerpt:'', content:'', status:'draft' });

  const load = ()=> AdminAPI.listPosts().then(setItems);
  useEffect(()=>{ load(); },[]);

  const save = async ()=>{
    try{
      await AdminAPI.upsertPost(form);
      toast.success('Saved'); setOpen(false); setForm({ title:'', slug:'', excerpt:'', content:'', status:'draft' }); load();
    }catch(e){ toast.error('Error saving'); }
  };

  const del = async (id)=>{ await AdminAPI.deletePost(id); toast.success('Deleted'); load(); };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Blog</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button data-testid="add-post-btn">Add Post</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>{form.id? 'Edit' : 'New'} Post</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <Input placeholder="Title" value={form.title} onChange={(e)=>setForm(f=>({...f, title:e.target.value}))} data-testid="post-title" />
              <Input placeholder="Slug" value={form.slug} onChange={(e)=>setForm(f=>({...f, slug:e.target.value}))} data-testid="post-slug" />
              <Textarea placeholder="Excerpt" value={form.excerpt} onChange={(e)=>setForm(f=>({...f, excerpt:e.target.value}))} data-testid="post-excerpt" />
              <Textarea rows={6} placeholder="Content (Markdown supported)" value={form.content} onChange={(e)=>setForm(f=>({...f, content:e.target.value}))} data-testid="post-content" />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={()=>setOpen(false)} data-testid="post-cancel">Cancel</Button>
              <Button onClick={save} data-testid="post-save">Save</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map(it=> (
          <div key={it.id} className="p-4 rounded-xl border bg-white/70">
            <div className="font-medium">{it.title}</div>
            <div className="text-sm text-slate-600">{it.excerpt}</div>
            <div className="mt-3 flex gap-2">
              <Button variant="outline" size="sm" onClick={()=>{ setForm(it); setOpen(true); }} data-testid={`post-edit-${it.id}`}>Edit</Button>
              <Button variant="destructive" size="sm" onClick={()=>del(it.id)} data-testid={`post-delete-${it.id}`}>Delete</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
