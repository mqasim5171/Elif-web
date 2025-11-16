import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ProjectCard({ project }){
  return (
    <Card className="group hover:shadow-lg transition-shadow" data-testid={`project-card-${project.id}`}>
      <div className="aspect-[16/9] w-full overflow-hidden rounded-t-xl bg-slate-100">
        {project.cover_url && <img src={project.cover_url} alt="" className="w-full h-full object-cover group-hover:scale-[1.02] transition-[transform]" />}
      </div>
      <CardContent className="pt-4">
        <div className="font-semibold">{project.title}</div>
        <p className="text-sm text-slate-600 line-clamp-2">{project.short}</p>
        <div className="mt-3 flex gap-2">
          {project.live_url && <Button asChild size="sm" data-testid="project-live-btn"><a href={project.live_url} target="_blank" rel="noreferrer">Live</a></Button>}
          {project.repo_url && <Button asChild variant="outline" size="sm" data-testid="project-repo-btn"><a href={project.repo_url} target="_blank" rel="noreferrer">Code</a></Button>}
        </div>
      </CardContent>
    </Card>
  );
}
