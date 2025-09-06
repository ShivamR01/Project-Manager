import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { mockProjects } from "@/data/mockData";
import { Project, Task } from "@/types";

const Index = () => {
  const [projects] = useState<Project[]>(mockProjects);
  const navigate = useNavigate();

  const handleProjectClick = (project: Project) => {
    navigate(`/projects/${project.id}`);
  };

  const handleTaskClick = (task: Task) => {
    navigate(`/tasks/${task.id}`);
  };

  const handleCreateProject = () => {
    navigate("/projects/new");
  };

  const handleCreateTask = () => {
    navigate("/tasks/new");
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
