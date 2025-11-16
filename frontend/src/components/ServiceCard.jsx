import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function ServiceCard({ service }){
  return (
    <Card className="lux-card lux-card-hover fade-up" data-testid={`service-card-${service.id}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-[var(--brand-ink)]" style={{fontFamily:'Playfair Display, serif'}}>
          {service.icon ? <img src={service.icon} alt="" className="w-6 h-6" /> : <span className="w-6 h-6 rounded bg-[var(--brand-royal)]/30 border border-[var(--brand-border)]" />}
          {service.name}
          {!service.visible && <Badge variant="secondary">Hidden</Badge>}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-[var(--brand-soft)] text-sm">{service.short}</p>
      </CardContent>
    </Card>
  );
}
