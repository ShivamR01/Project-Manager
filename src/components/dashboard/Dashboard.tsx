import { useState } from "react";
import { BarChart3, Calendar, CheckCircle2, Clock, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProjectCard } from "@/components/project/ProjectCard";
import { TaskCard } from "@/components/task/TaskCard";
import { Project, Task } from "@/types";

interface DashboardProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
  onTaskClick: (task: Task) => void;
  onCreateProject: () => void;
  onCreateTask: () => void;
}

export const Dashboard = ({ 
  projects, 
  onProjectClick, 
  onTaskClick, 
  onCreateProject, 
  onCreateTask 
}: DashboardProps) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'tasks'>('overview');

  // Calculate stats
  const totalProjects = projects.length;
  const activeProjects = projects.filter(p => p.status === 'active').length;
  const completedProjects = projects.filter(p => p.status === 'completed').length;
  
  const allTasks = projects.flatMap(p => p.tasks);
  const totalTasks = allTasks.length;
  const completedTasks = allTasks.filter(t => t.status === 'completed').length;
  const overdueTasks = allTasks.filter(t => new Date() > t.dueDate && t.status !== 'completed').length;

  const recentTasks = allTasks
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 6);

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-primary shadow-glow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-primary-foreground">
              Total Projects
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-primary-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary-foreground">{totalProjects}</div>
            <p className="text-xs text-primary-foreground/80">
              {activeProjects} active
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-success">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-success-foreground">
              Completed
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-success-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success-foreground">{completedProjects}</div>
            <p className="text-xs text-success-foreground/80">
              {completedTasks} tasks done
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTasks}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((completedTasks / totalTasks) * 100) || 0}% complete
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <Clock className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{overdueTasks}</div>
            <p className="text-xs text-muted-foreground">
              Need attention
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Projects and Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Recent Projects</h3>
            <Button variant="ghost" size="sm" onClick={() => setActiveTab('projects')}>
              View All
            </Button>
          </div>
          <div className="space-y-3">
            {projects.slice(0, 3).map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onClick={() => onProjectClick(project)} 
              />
            ))}
            {projects.length === 0 && (
              <Card className="border-dashed border-2 bg-muted/50">
                <CardContent className="flex flex-col items-center justify-center py-8">
                  <BarChart3 className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground text-center">No projects yet</p>
                  <Button variant="outline" size="sm" className="mt-2" onClick={onCreateProject}>
                    <Plus className="h-4 w-4" />
                    Create your first project
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Recent Tasks</h3>
            <Button variant="ghost" size="sm" onClick={() => setActiveTab('tasks')}>
              View All
            </Button>
          </div>
          <div className="space-y-3">
            {recentTasks.slice(0, 3).map((task) => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onClick={() => onTaskClick(task)} 
              />
            ))}
            {recentTasks.length === 0 && (
              <Card className="border-dashed border-2 bg-muted/50">
                <CardContent className="flex flex-col items-center justify-center py-8">
                  <CheckCircle2 className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground text-center">No tasks yet</p>
                  <Button variant="outline" size="sm" className="mt-2" onClick={onCreateTask}>
                    <Plus className="h-4 w-4" />
                    Create your first task
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderProjects = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">All Projects</h3>
        <Button variant="gradient" onClick={onCreateProject}>
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            onClick={() => onProjectClick(project)} 
          />
        ))}
      </div>
    </div>
  );

  const renderTasks = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">All Tasks</h3>
        <Button variant="gradient" onClick={onCreateTask}>
          <Plus className="h-4 w-4" />
          New Task
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {allTasks.map((task) => (
          <TaskCard 
            key={task.id} 
            task={task} 
            onClick={() => onTaskClick(task)} 
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
        <Button
          variant={activeTab === 'overview' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </Button>
        <Button
          variant={activeTab === 'projects' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('projects')}
        >
          Projects
        </Button>
        <Button
          variant={activeTab === 'tasks' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('tasks')}
        >
          Tasks
        </Button>
      </div>

      {/* Content */}
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'projects' && renderProjects()}
      {activeTab === 'tasks' && renderTasks()}
    </div>
  );
};