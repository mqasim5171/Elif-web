import { useEffect, useState } from 'react';
import { AdminAPI } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';

export default function AdminServices(){
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name:'', short:'', order:0, visible:true });

  const load = ()=> AdminAPI.listServices().then(setItems);
  useEffect(()=>{ load(); },[]);

  const save = async ()=>{
    try{
      await AdminAPI.upsertService(form);
      toast.success('Saved'); setOpen(false); setForm({ name:'', short:'', order:0, visible:true }); load();
    }catch(e){ toast.error('Error saving'); }
  };

  const del = async (id)=>{ await AdminAPI.deleteService(id); toast.success('Deleted'); load(); };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Services</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button data-testid="add-service-btn">Add Service</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>{form.id? 'Edit' : 'New'} Service</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <Input placeholder="Name" value={form.name} onChange={(e)=>setForm(f=>({...f, name:e.target.value}))} data-testid="service-name" />
              <Textarea placeholder="Short" value={form.short} onChange={(e)=>setForm(f=>({...f, short:e.target.value}))} data-testid="service-short" />
              <Input type="number" placeholder="Order" value={form.order} onChange={(e)=>setForm(f=>({...f, order:Number(e.target.value)}))} data-testid="service-order" />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={()=>setOpen(false)} data-testid="service-cancel">Cancel</Button>
              <Button onClick={save} data-testid="service-save">Save</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map(it=> (
          <div key={it.id} className="p-4 rounded-xl border bg-white/70">
            <div className="font-medium">{it.name}</div>
            <div className="text-sm text-slate-600">{it.short}</div>
            <div className="mt-3 flex gap-2">
              <Button variant="outline" size="sm" onClick={()=>{ setForm(it); setOpen(true); }} data-testid={`service-edit-${it.id}`}>Edit</Button>
              <Button variant="destructive" size="sm" onClick={()=>del(it.id)} data-testid={`service-delete-${it.id}`}>Delete</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
