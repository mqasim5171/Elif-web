import { useEffect, useState } from 'react';
import { AdminAPI } from '@/lib/api';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function AdminSettings(){
  const [settings, setSettings] = useState(null);
  useEffect(()=>{ AdminAPI.getSettings().then((s)=>{ setSettings(s); }); },[]);

  const save = async ()=>{ const updated = await AdminAPI.updateSettings(settings); setSettings(updated); toast.success('Settings saved'); };

  if(!settings) return null;
  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold">Site Settings</h1>
      <div className="mt-6 space-y-4">
        <div>
          <label className="text-sm font-medium">Brand Name</label>
          <Input value={settings.brand_name} onChange={(e)=>setSettings(s=>({...s, brand_name:e.target.value}))} data-testid="settings-brand-name" />
        </div>
        <div>
          <label className="text-sm font-medium">Tagline</label>
          <Input value={settings.tagline} onChange={(e)=>setSettings(s=>({...s, tagline:e.target.value}))} data-testid="settings-tagline" />
        </div>
        <div>
          <label className="text-sm font-medium">Primary Color</label>
          <Input value={settings.colors.primary} onChange={(e)=>setSettings(s=>({...s, colors:{...s.colors, primary:e.target.value}}))} data-testid="settings-color-primary" />
        </div>
        <div>
          <label className="text-sm font-medium">Secondary Color</label>
          <Input value={settings.colors.secondary} onChange={(e)=>setSettings(s=>({...s, colors:{...s.colors, secondary:e.target.value}}))} data-testid="settings-color-secondary" />
        </div>
        <div>
          <label className="text-sm font-medium">Accent Color</label>
          <Input value={settings.colors.accent} onChange={(e)=>setSettings(s=>({...s, colors:{...s.colors, accent:e.target.value}}))} data-testid="settings-color-accent" />
        </div>
        <Button onClick={save} data-testid="settings-save">Save</Button>
      </div>
    </div>
  );
}
