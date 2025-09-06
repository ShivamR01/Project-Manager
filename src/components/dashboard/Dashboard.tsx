import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  onCreateTask,
}: DashboardProps) => {
  const [activeTab, setActiveTab] = useState<"overview" | "projects" | "tasks">(
    "overview"
  );

  // Stats
  const totalProjects = projects.length;
  const activeProjects = projects.filter((p) => p.status === "active").length;
  const completedProjects = projects.filter((p) => p.status === "completed").length;

  const allTasks = projects.flatMap((p) => p.tasks);
  const totalTasks = allTasks.length;
  const completedTasks = allTasks.filter((t) => t.status === "completed").length;
  const overdueTasks = allTasks.filter(
    (t) => new Date() > t.dueDate && t.status !== "completed"
  ).length;

  const recentTasks = allTasks
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 6);

  // Motion Variants
  const fadeUp = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const renderOverview = () => (
    <motion.div
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={fadeUp}
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: "Total Projects",
            value: totalProjects,
            subtitle: `${activeProjects} active`,
            icon: <BarChart3 className="h-4 w-4 text-primary-foreground" />,
            className: "bg-gradient-to-r from-indigo-500 to-blue-600 text-white",
          },
          {
            title: "Completed",
            value: completedProjects,
            subtitle: `${completedTasks} tasks done`,
            icon: <CheckCircle2 className="h-4 w-4 text-white" />,
            className: "bg-gradient-to-r from-green-500 to-emerald-600 text-white",
          },
          {
            title: "Total Tasks",
            value: totalTasks,
            subtitle: `${Math.round((completedTasks / totalTasks) * 100) || 0}% complete`,
            icon: <Calendar className="h-4 w-4 text-muted-foreground" />,
            className: "bg-card shadow-md",
          },
          {
            title: "Overdue",
            value: overdueTasks,
            subtitle: "Need attention",
            icon: <Clock className="h-4 w-4 text-red-500" />,
            className: "bg-card shadow-md",
          },
        ].map((stat, i) => (
          <motion.div key={i} whileHover={{ scale: 1.03 }} transition={{ duration: 0.2 }}>
            <Card className={`${stat.className} rounded-xl shadow-lg`}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <motion.div
                  className="text-2xl font-bold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 * i }}
                >
                  {stat.value}
                </motion.div>
                <p className="text-xs opacity-80">{stat.subtitle}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Recent Projects & Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Projects */}
        <motion.div
          className="space-y-4"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Recent Projects</h3>
            <Button variant="ghost" size="sm" onClick={() => setActiveTab("projects")}>
              View All
            </Button>
          </div>
          <div className="space-y-3">
            <AnimatePresence>
              {projects.slice(0, 3).map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                >
                  <ProjectCard project={project} onClick={() => onProjectClick(project)} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Tasks */}
        <motion.div
          className="space-y-4"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Recent Tasks</h3>
            <Button variant="ghost" size="sm" onClick={() => setActiveTab("tasks")}>
              View All
            </Button>
          </div>
          <div className="space-y-3">
            <AnimatePresence>
              {recentTasks.slice(0, 3).map((task) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                >
                  <TaskCard task={task} onClick={() => onTaskClick(task)} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 bg-muted p-2 rounded-lg w-fit relative">
        {["overview", "projects", "tasks"].map((tab) => (
          <Button
            key={tab}
            variant={activeTab === tab ? "default" : "ghost"}
            size="sm"
            className="relative"
            onClick={() => setActiveTab(tab as any)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            {activeTab === tab && (
              <motion.div
                layoutId="underline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
              />
            )}
          </Button>
        ))}
      </div>

      {/* Tab Content with Animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "overview" && renderOverview()}
          {activeTab === "projects" && (
            <motion.div variants={fadeUp} initial="hidden" animate="visible">
              {/* Projects View */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">All Projects</h3>
                <Button variant="gradient" onClick={onCreateProject}>
                  <Plus className="h-4 w-4" /> New Project
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((project) => (
                  <motion.div
                    key={project.id}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ProjectCard project={project} onClick={() => onProjectClick(project)} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
          {activeTab === "tasks" && (
            <motion.div variants={fadeUp} initial="hidden" animate="visible">
              {/* Tasks View */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">All Tasks</h3>
                <Button variant="gradient" onClick={onCreateTask}>
                  <Plus className="h-4 w-4" /> New Task
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {allTasks.map((task) => (
                  <motion.div
                    key={task.id}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <TaskCard task={task} onClick={() => onTaskClick(task)} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
