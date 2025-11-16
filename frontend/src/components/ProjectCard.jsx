import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ProjectCard({ project }){
  return (
    <Card className="group relative overflow-hidden rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-card)]/60 backdrop-blur fade-up" data-testid={`project-card-${project.id}`}>
      <div className="aspect-[16/9] w-full overflow-hidden">
        {project.cover_url && (
          <img src={project.cover_url} alt="" className="w-full h-full object-cover transition-[filter,transform] duration-500 group-hover:scale-[1.03]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(11,18,32,0.9)] via-transparent to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="font-semibold text-[var(--brand-ink)]" style={{fontFamily:'Playfair Display, serif'}}>{project.title}</div>
        <p className="text-sm text-[var(--brand-soft)] line-clamp-2">{project.short}</p>
        <div className="mt-3 flex gap-2">
          {project.live_url && <a className="lux-btn-primary text-xs" href={project.live_url} target="_blank" rel="noreferrer" data-testid="project-live-btn">Live</a>}
          {project.repo_url && <a className="lux-btn-outline text-xs" href={project.repo_url} target="_blank" rel="noreferrer" data-testid="project-repo-btn">Code</a>}
        </div>
      </div>
    </Card>
  );
}
