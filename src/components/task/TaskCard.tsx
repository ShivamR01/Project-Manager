import { Calendar, Clock, User, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Task } from "@/types";
import { formatDistanceToNow } from "date-fns";

interface TaskCardProps {
  task: Task;
  onClick: () => void;
}

export const TaskCard = ({ task, onClick }: TaskCardProps) => {
  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'todo': return 'bg-muted text-muted-foreground';
      case 'in-progress': return 'bg-info text-info-foreground';
      case 'completed': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const isOverdue = new Date() > task.dueDate && task.status !== 'completed';

  return (
    <Card 
      className="cursor-pointer transition-all duration-300 hover:shadow-card hover:scale-[1.02] hover:border-primary/50 bg-card"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-base font-medium text-foreground truncate">
            {task.title}
          </CardTitle>
          <div className="flex gap-2">
            <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
              {task.priority}
            </Badge>
            <Badge className={`text-xs ${getStatusColor(task.status)}`}>
              {task.status}
            </Badge>
          </div>
        </div>
        {task.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {task.description}
          </p>
        )}
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <User className="h-4 w-4" />
          <span>{task.assignee}</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className={`flex items-center gap-1 ${isOverdue ? 'text-destructive' : 'text-muted-foreground'}`}>
            {isOverdue && <AlertCircle className="h-4 w-4" />}
            <Clock className="h-4 w-4" />
            <span>Due {formatDistanceToNow(task.dueDate, { addSuffix: true })}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{formatDistanceToNow(task.createdAt, { addSuffix: true })}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};