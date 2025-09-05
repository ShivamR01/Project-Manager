import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Edit2, Save, X, Plus } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { mockProjects, mockTeamMembers } from "@/data/mockData";
import { Task } from "@/types";

interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: Date;
}

interface ActivityLogEntry {
  id: string;
  action: string;
  author: string;
  timestamp: Date;
  details?: string;
}

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Find the task from mock data
  const allTasks = mockProjects.flatMap(project => project.tasks);
  const taskData = allTasks.find(task => task.id === id);

  const [task, setTask] = useState<Task | null>(taskData || null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    title: task?.title || "",
    description: task?.description || "",
    status: task?.status || "todo",
    priority: task?.priority || "medium",
    assignee: task?.assignee || "",
  });

  // Mock subtasks
  const [subtasks, setSubtasks] = useState<Subtask[]>([
    { id: "1", title: "Research requirements", completed: true },
    { id: "2", title: "Create wireframes", completed: false },
    { id: "3", title: "Develop prototype", completed: false },
  ]);

  // Mock comments
  const [comments] = useState<Comment[]>([
    {
      id: "1",
      author: "Alice Johnson",
      content: "Great progress on this task! The wireframes look excellent.",
      timestamp: new Date(2024, 11, 15, 10, 30),
    },
    {
      id: "2", 
      author: "Bob Wilson",
      content: "I've reviewed the requirements. Let's discuss the technical approach in tomorrow's standup.",
      timestamp: new Date(2024, 11, 16, 14, 15),
    },
  ]);

  // Mock activity log
  const [activityLog] = useState<ActivityLogEntry[]>([
    {
      id: "1",
      action: "Task created",
      author: "Alice Johnson",
      timestamp: new Date(2024, 11, 14, 9, 0),
    },
    {
      id: "2",
      action: "Status changed",
      author: "Bob Wilson", 
      timestamp: new Date(2024, 11, 15, 11, 30),
      details: "From 'To Do' to 'In Progress'",
    },
    {
      id: "3",
      action: "Assignee changed",
      author: "Carol Davis",
      timestamp: new Date(2024, 11, 16, 16, 45),
      details: "Assigned to Bob Wilson",
    },
  ]);

  if (!task) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Task Not Found</h1>
          <p className="text-muted-foreground mb-4">The task you're looking for doesn't exist.</p>
          <Button onClick={() => navigate("/tasks")}>Back to Tasks</Button>
        </div>
      </div>
    );
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "bg-destructive text-destructive-foreground";
      case "high": return "bg-warning text-warning-foreground";
      case "medium": return "bg-info text-info-foreground";
      case "low": return "bg-success text-success-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-success text-success-foreground";
      case "in-progress": return "bg-info text-info-foreground";
      case "todo": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const handleSave = () => {
    setTask({
      ...task,
      title: editForm.title,
      description: editForm.description,
      status: editForm.status as any,
      priority: editForm.priority as any,
      assignee: editForm.assignee,
    });
    setIsEditing(false);
    toast({
      title: "Task Updated",
      description: "Your changes have been saved successfully.",
    });
  };

  const handleCancel = () => {
    setEditForm({
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      assignee: task.assignee,
    });
    setIsEditing(false);
  };

  const toggleSubtask = (subtaskId: string) => {
    setSubtasks(prev =>
      prev.map(subtask =>
        subtask.id === subtaskId
          ? { ...subtask, completed: !subtask.completed }
          : subtask
      )
    );
    toast({
      title: "Subtask Updated",
      description: "Subtask status has been changed.",
    });
  };

  const getAssigneeName = (assigneeId: string) => {
    const assignee = mockTeamMembers.find(member => member.id === assigneeId);
    return assignee?.name || "Unassigned";
  };

  const getAssigneeAvatar = (assigneeId: string) => {
    const assignee = mockTeamMembers.find(member => member.id === assigneeId);
    return assignee?.name?.charAt(0) || "?";
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="shrink-0"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-foreground">Task Details</h1>
            <p className="text-muted-foreground">Manage and track task progress</p>
          </div>
          <Button
            onClick={() => setIsEditing(!isEditing)}
            variant={isEditing ? "outline" : "default"}
            className={!isEditing ? "bg-gradient-primary hover:opacity-90" : ""}
          >
            {isEditing ? (
              <>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </>
            ) : (
              <>
                <Edit2 className="h-4 w-4 mr-2" />
                Edit Task
              </>
            )}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Task Overview */}
            <Card className="border-border bg-card">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {isEditing ? (
                      <Input
                        value={editForm.title}
                        onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                        className="text-xl font-bold mb-2"
                        placeholder="Task title"
                      />
                    ) : (
                      <CardTitle className="text-xl">{task.title}</CardTitle>
                    )}
                  </div>
                  {isEditing && (
                    <Button onClick={handleSave} size="sm" className="ml-4">
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                {isEditing ? (
                  <Textarea
                    value={editForm.description}
                    onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Task description"
                    className="min-h-[100px] mb-4"
                  />
                ) : (
                  <p className="text-muted-foreground mb-4">{task.description}</p>
                )}

                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Status:</span>
                    {isEditing ? (
                      <Select
                        value={editForm.status}
                        onValueChange={(value) => setEditForm(prev => ({ ...prev, status: value as any }))}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="todo">To Do</SelectItem>
                          <SelectItem value="in-progress">In Progress</SelectItem>
                          <SelectItem value="completed">Done</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <Badge className={getStatusColor(task.status)}>
                        {task.status.replace('-', ' ')}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Priority:</span>
                    {isEditing ? (
                      <Select
                        value={editForm.priority}
                        onValueChange={(value) => setEditForm(prev => ({ ...prev, priority: value as any }))}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="critical">Critical</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <Badge className={getPriorityColor(task.priority)}>
                        {task.priority}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Due:</span>
                    <span className="text-sm font-medium">
                      {format(task.dueDate, "MMM dd, yyyy")}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Subtasks */}
            <Card className="border-border bg-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Subtasks</CardTitle>
                  <Button size="sm" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Subtask
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {subtasks.map(subtask => (
                    <div key={subtask.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50">
                      <Checkbox
                        checked={subtask.completed}
                        onCheckedChange={() => toggleSubtask(subtask.id)}
                      />
                      <span className={`flex-1 ${subtask.completed ? 'line-through text-muted-foreground' : ''}`}>
                        {subtask.title}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Comments */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle>Comments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {comments.map(comment => (
                    <div key={comment.id} className="flex gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">
                          {comment.author.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-sm">{comment.author}</span>
                          <span className="text-xs text-muted-foreground">
                            {format(comment.timestamp, "MMM dd, yyyy 'at' HH:mm")}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{comment.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Separator className="my-4" />
                <div className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs">ME</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Textarea placeholder="Add a comment..." className="min-h-[80px]" />
                    <Button size="sm" className="mt-2">Post Comment</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Assignee */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-lg">Assignee</CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Select
                    value={editForm.assignee}
                    onValueChange={(value) => setEditForm(prev => ({ ...prev, assignee: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select assignee" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockTeamMembers.map(member => (
                        <SelectItem key={member.id} value={member.id}>
                          {member.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{getAssigneeAvatar(task.assignee)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{getAssigneeName(task.assignee)}</p>
                      <p className="text-sm text-muted-foreground">
                        {mockTeamMembers.find(m => m.id === task.assignee)?.role || "Team Member"}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Activity Log */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-lg">Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activityLog.map(entry => (
                    <div key={entry.id} className="flex gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-semibold">{entry.author}</span>
                          <span className="text-muted-foreground"> {entry.action.toLowerCase()}</span>
                        </p>
                        {entry.details && (
                          <p className="text-xs text-muted-foreground">{entry.details}</p>
                        )}
                        <p className="text-xs text-muted-foreground">
                          {format(entry.timestamp, "MMM dd, yyyy 'at' HH:mm")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;