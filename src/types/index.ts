export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'active' | 'completed' | 'on-hold';
  progress: number;
  dueDate: Date;
  createdAt: Date;
  tasks: Task[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  assignee: string;
  dueDate: Date;
  createdAt: Date;
  projectId: string;
}

export type TaskStatus = 'todo' | 'in-progress' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high';
export type ProjectStatus = 'planning' | 'active' | 'completed' | 'on-hold';