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
  className="cursor-pointer relative rounded-xl border border-white/10 bg-white/5 backdrop-blur-md shadow-md transition-all duration-500 hover:scale-[1.03] hover:shadow-xl hover:shadow-primary/30 hover:border-primary/40"
  onClick={onClick}
>
  {/* Glow effect on hover */}
  <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-primary/20 via-transparent to-secondary/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

  <CardHeader className="relative z-10 pb-3">
    <div className="flex items-start justify-between">
      <CardTitle className="text-base font-semibold text-white truncate group-hover:text-primary transition-colors">
        {task.title}
      </CardTitle>
      <div className="flex gap-2">
        <Badge
          className={`text-xs px-2 py-0.5 rounded-md backdrop-blur-sm bg-white/10 ${getPriorityColor(
            task.priority
          )}`}
        >
          {task.priority}
        </Badge>
        <Badge
          className={`text-xs px-2 py-0.5 rounded-md backdrop-blur-sm bg-white/10 ${getStatusColor(
            task.status
          )}`}
        >
          {task.status}
        </Badge>
      </div>
    </div>

    {task.description && (
      <p className="text-sm text-gray-300 line-clamp-2 mt-1 group-hover:text-gray-100 transition-colors">
        {task.description}
      </p>
    )}
  </CardHeader>

  <CardContent className="relative z-10 space-y-3">
    {/* Assignee */}
    <div className="flex items-center gap-2 text-sm text-gray-400 group-hover:text-gray-200 transition-colors">
      <User className="h-4 w-4" />
      <span>{task.assignee}</span>
    </div>

    {/* Dates */}
    <div className="flex items-center justify-between text-sm">
      <div
        className={`flex items-center gap-1 ${
          isOverdue
            ? "text-red-400 font-medium"
            : "text-gray-400 group-hover:text-gray-200 transition-colors"
        }`}
      >
        {isOverdue && <AlertCircle className="h-4 w-4" />}
        <Clock className="h-4 w-4" />
        <span>
          Due {formatDistanceToNow(task.dueDate, { addSuffix: true })}
        </span>
      </div>
      <div className="flex items-center gap-1 text-gray-400 group-hover:text-gray-200 transition-colors">
        <Calendar className="h-4 w-4" />
        <span>
          {formatDistanceToNow(task.createdAt, { addSuffix: true })}
        </span>
      </div>
    </div>
  </CardContent>

  {/* Accent line */}
  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
</Card>

  );
};