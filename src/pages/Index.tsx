import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { mockProjects } from "@/data/mockData";
import { Project, Task } from "@/types";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [projects] = useState<Project[]>(mockProjects);
  const { toast } = useToast();

  const handleProjectClick = (project: Project) => {
    toast({
      title: "Project Selected",
      description: `Opening ${project.name} project details...`,
    });
  };

  const handleTaskClick = (task: Task) => {
    toast({
      title: "Task Selected", 
      description: `Opening task: ${task.title}`,
    });
  };

  const handleCreateProject = () => {
    toast({
      title: "Create Project",
      description: "Project creation dialog would open here...",
    });
  };

  const handleCreateTask = () => {
    toast({
      title: "Create Task",
      description: "Task creation dialog would open here...",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onCreateProject={handleCreateProject}
        onCreateTask={handleCreateTask}
      />
      <Dashboard
        projects={projects}
        onProjectClick={handleProjectClick}
        onTaskClick={handleTaskClick}
        onCreateProject={handleCreateProject}
        onCreateTask={handleCreateTask}
      />
    </div>
  );
};

export default Index;
