import { Calendar, Clock, Users, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Project } from "@/types";
import { formatDistanceToNow } from "date-fns";

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'planning': return 'bg-info text-info-foreground';
      case 'active': return 'bg-success text-success-foreground';
      case 'completed': return 'bg-primary text-primary-foreground';
      case 'on-hold': return 'bg-warning text-warning-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const completedTasks = project.tasks.filter(task => task.status === 'completed').length;
  const totalTasks = project.tasks.length;

  return (
    <Card
  className="cursor-pointer relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg shadow-xl transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl hover:shadow-primary/30 hover:border-primary/40"
  onClick={onClick}
>
  {/* Glow effect */}
  <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-primary/20 via-transparent to-secondary/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

  <CardHeader className="relative z-10 pb-3">
    <div className="flex items-start justify-between">
      <CardTitle className="text-lg font-semibold text-white/90 truncate group-hover:text-white transition-colors">
        {project.name}
      </CardTitle>
      <Badge
        className={`ml-2 ${getStatusColor(
          project.status
        )} text-xs backdrop-blur-sm bg-white/10`}
      >
        {project.status}
      </Badge>
    </div>
    <p className="text-sm text-gray-300 line-clamp-2">{project.description}</p>
  </CardHeader>

  <CardContent className="relative z-10 space-y-4">
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-400">Progress</span>
        <span className="text-white/90 font-medium">{project.progress}%</span>
      </div>
      <Progress
        value={project.progress}
        className="h-2 bg-white/10 [&>div]:bg-gradient-to-r [&>div]:from-primary [&>div]:to-secondary rounded-full"
      />
    </div>

    <div className="flex items-center justify-between text-sm">
      <div className="flex items-center gap-1 text-gray-400">
        <CheckCircle2 className="h-4 w-4" />
        <span>
          {completedTasks}/{totalTasks} tasks
        </span>
      </div>
      <div className="flex items-center gap-1 text-gray-400">
        <Clock className="h-4 w-4" />
        <span>
          Due {formatDistanceToNow(project.dueDate, { addSuffix: true })}
        </span>
      </div>
    </div>

    <div className="flex items-center gap-1 text-sm text-gray-400">
      <Calendar className="h-4 w-4" />
      <span>
        Created {formatDistanceToNow(project.createdAt, { addSuffix: true })}
      </span>
    </div>
  </CardContent>
</Card>

  );
};