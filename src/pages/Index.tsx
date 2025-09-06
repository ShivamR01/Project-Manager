import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { mockProjects } from "@/data/mockData";
import { Project, Task } from "@/types";
import { Background } from "@/components/layout/Background"; // import the background

const Index = () => {
  const [projects] = useState<Project[]>(mockProjects);
  const navigate = useNavigate();

  const handleProjectClick = (project: Project) => navigate(`/projects/${project.id}`);
  const handleTaskClick = (task: Task) => navigate(`/tasks/${task.id}`);
  const handleCreateProject = () => navigate("/projects/new");
  const handleCreateTask = () => navigate("/tasks/new");

  return (
    <div className="min-h-screen relative">
      {/* 3D Background */}
      <Background />

      <div className="relative z-10">
        <Header onCreateProject={handleCreateProject} onCreateTask={handleCreateTask} />
        <Dashboard
          projects={projects}
          onProjectClick={handleProjectClick}
          onTaskClick={handleTaskClick}
          onCreateProject={handleCreateProject}
          onCreateTask={handleCreateTask}
        />
      </div>
    </div>
  );
};

export default Index;

