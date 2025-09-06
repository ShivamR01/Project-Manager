"use client";

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  ArrowLeft,
  Plus,
  Calendar,
  Users,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { mockProjects, mockTeamMembers } from "@/data/mockData";
import { TaskStatus, Task } from "@/types";
import { format } from "date-fns";
import { TaskCard } from "@/components/task/TaskCard";

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const project = mockProjects.find((p) => p.id === id);
  const [tasks, setTasks] = useState<Task[]>(project?.tasks || []);

  // ✅ Fix: Arrow now goes back or to dashboard
  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1); // go back
    } else {
      navigate("/dashboard"); // fallback
    }
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Project Not Found
          </h1>
          <p className="text-muted-foreground mb-4">
            The project you're looking for doesn't exist.
          </p>
          <Button onClick={() => navigate("/projects")}>Back to Projects</Button>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-success text-success-foreground";
      case "active":
        return "bg-info text-info-foreground";
      case "on-hold":
        return "bg-warning text-warning-foreground";
      case "planning":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-destructive text-destructive-foreground";
      case "medium":
        return "bg-warning text-warning-foreground";
      case "low":
        return "bg-success text-success-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getTasksByStatus = (status: TaskStatus) => {
    return tasks.filter((task) => task.status === status);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeTask = tasks.find((task) => task.id === active.id);
    const overColumn = over.id as TaskStatus;

    if (activeTask && activeTask.status !== overColumn) {
      const updatedTasks = tasks.map((task) =>
        task.id === active.id ? { ...task, status: overColumn } : task
      );
      setTasks(updatedTasks);

      toast({
        title: "Task Updated",
        description: `${activeTask.title} moved to ${overColumn.replace("-", " ")}`,
      });
    }
  };

  const handleTaskClick = (task: Task) => {
    navigate(`/tasks/${task.id}`);
  };

  const handleAddTask = () => {
    navigate(`/tasks/new?project=${project.id}`);
  };

  const columns = [
    { id: "todo" as TaskStatus, title: "To Do", color: "bg-muted/20" },
    { id: "in-progress" as TaskStatus, title: "In Progress", color: "bg-info/10" },
    { id: "completed" as TaskStatus, title: "Done", color: "bg-success/10" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4 border-b pb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBack}
            className="shrink-0 hover:bg-muted"
          >
            <ArrowLeft className="h-5 w-5 text-muted-foreground" />
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-foreground">{project.name}</h1>
            <p className="text-muted-foreground">{project.description}</p>
          </div>
          <Button
            onClick={handleAddTask}
            className="bg-gradient-primary hover:opacity-90 shadow-sm"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </Button>
        </div>

        {/* Project Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <BarChart3 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Progress</p>
                  <p className="text-2xl font-bold">{project.progress}%</p>
                </div>
              </div>
              <Progress value={project.progress} className="mt-3" />
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-info/10 rounded-lg">
                  <Calendar className="h-5 w-5 text-info" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Due Date</p>
                  <p className="text-lg font-semibold">
                    {format(project.dueDate, "MMM dd, yyyy")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-success/10 rounded-lg">
                  <Users className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Team Size</p>
                  <p className="text-2xl font-bold">{mockTeamMembers.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6 space-y-2">
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge className={getStatusColor(project.status)}>
                  {project.status.replace("-", " ")}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Priority</p>
                <Badge variant="outline" className={getPriorityColor("medium")}>
                  Medium
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Kanban Board */}
        <Card className="border-border bg-card shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-semibold">Task Board</CardTitle>
          </CardHeader>
          <CardContent>
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {columns.map((column) => (
                  <div
                    key={column.id}
                    className={`rounded-lg p-4 ${column.color} border border-border/50`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-foreground">
                        {column.title}
                      </h3>
                      <Badge variant="secondary" className="text-xs">
                        {getTasksByStatus(column.id).length}
                      </Badge>
                    </div>

                    <SortableContext
                      items={getTasksByStatus(column.id).map((task) => task.id)}
                      strategy={verticalListSortingStrategy}
                    >
                      <div className="space-y-3 min-h-[220px]">
                        {getTasksByStatus(column.id).map((task) => (
                          <TaskCard
                            key={task.id}
                            task={task}
                            onClick={() => handleTaskClick(task)}
                          />
                        ))}
                      </div>
                    </SortableContext>
                  </div>
                ))}
              </div>
            </DndContext>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProjectDetail;
