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
      className="cursor-pointer transition-all duration-300 hover:shadow-glow hover:scale-105 hover:border-primary/50 bg-card shadow-card"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold text-foreground truncate">
            {project.name}
          </CardTitle>
          <Badge className={`ml-2 ${getStatusColor(project.status)} text-xs`}>
            {project.status}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {project.description}
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="text-foreground font-medium">{project.progress}%</span>
          </div>
          <Progress value={project.progress} className="h-2" />
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <CheckCircle2 className="h-4 w-4" />
            <span>{completedTasks}/{totalTasks} tasks</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Due {formatDistanceToNow(project.dueDate, { addSuffix: true })}</span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>Created {formatDistanceToNow(project.createdAt, { addSuffix: true })}</span>
        </div>
      </CardContent>
    </Card>
  );
};