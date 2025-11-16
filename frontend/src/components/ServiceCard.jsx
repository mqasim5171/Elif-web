import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function ServiceCard({ service }){
  return (
    <Card className="hover:shadow-lg transition-shadow" data-testid={`service-card-${service.id}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {service.icon ? <img src={service.icon} alt="" className="w-6 h-6" /> : <span className="w-6 h-6 rounded bg-blue-100" />}
          {service.name}
          {!service.visible && <Badge variant="secondary">Hidden</Badge>}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-slate-600 text-sm">{service.short}</p>
      </CardContent>
    </Card>
  );
}
