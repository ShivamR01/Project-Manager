import { Project, TeamMember } from "@/types";

export const mockProjects: Project[] = [
  {
    id: "1",
    name: "Website Redesign",
    description: "Complete overhaul of the company website with modern design and improved user experience",
    status: "active",
    progress: 65,
    dueDate: new Date("2024-12-15"),
    createdAt: new Date("2024-10-01"),
    tasks: [
      {
        id: "t1",
        title: "Create wireframes",
        description: "Design wireframes for all main pages",
        status: "completed",
        priority: "high",
        assignee: "Sarah Chen",
        dueDate: new Date("2024-11-20"),
        createdAt: new Date("2024-10-05"),
        projectId: "1"
      },
      {
        id: "t2",
        title: "Implement responsive design",
        description: "Make the website mobile-friendly across all devices",
        status: "in-progress",
        priority: "high",
        assignee: "Mike Johnson",
        dueDate: new Date("2024-12-01"),
        createdAt: new Date("2024-10-10"),
        projectId: "1"
      },
      {
        id: "t3",
        title: "Content migration",
        description: "Move existing content to new CMS structure",
        status: "todo",
        priority: "medium",
        assignee: "Emma Davis",
        dueDate: new Date("2024-12-10"),
        createdAt: new Date("2024-10-15"),
        projectId: "1"
      }
    ]
  },
  {
    id: "2",
    name: "Mobile App Development",
    description: "Native mobile application for iOS and Android platforms",
    status: "planning",
    progress: 25,
    dueDate: new Date("2025-03-30"),
    createdAt: new Date("2024-11-01"),
    tasks: [
      {
        id: "t4",
        title: "Market research",
        description: "Analyze competitor apps and user requirements",
        status: "completed",
        priority: "high",
        assignee: "Alex Thompson",
        dueDate: new Date("2024-11-30"),
        createdAt: new Date("2024-11-05"),
        projectId: "2"
      },
      {
        id: "t5",
        title: "UI/UX Design",
        description: "Create app mockups and user interface designs",
        status: "in-progress",
        priority: "high",
        assignee: "Sarah Chen",
        dueDate: new Date("2024-12-20"),
        createdAt: new Date("2024-11-10"),
        projectId: "2"
      },
      {
        id: "t6",
        title: "Backend API setup",
        description: "Set up REST API endpoints for mobile app",
        status: "todo",
        priority: "medium",
        assignee: "Mike Johnson",
        dueDate: new Date("2025-01-15"),
        createdAt: new Date("2024-11-15"),
        projectId: "2"
      }
    ]
  },
  {
    id: "3",
    name: "Marketing Campaign Q1",
    description: "Launch comprehensive marketing campaign for Q1 2025",
    status: "completed",
    progress: 100,
    dueDate: new Date("2024-11-30"),
    createdAt: new Date("2024-09-01"),
    tasks: [
      {
        id: "t7",
        title: "Social media strategy",
        description: "Develop social media content calendar and strategy",
        status: "completed",
        priority: "medium",
        assignee: "Emma Davis",
        dueDate: new Date("2024-10-15"),
        createdAt: new Date("2024-09-05"),
        projectId: "3"
      },
      {
        id: "t8",
        title: "Campaign graphics",
        description: "Create visual assets for all marketing materials",
        status: "completed",
        priority: "high",
        assignee: "Sarah Chen",
        dueDate: new Date("2024-11-01"),
        createdAt: new Date("2024-09-10"),
        projectId: "3"
      },
      {
        id: "t9",
        title: "Launch execution",
        description: "Execute the full marketing campaign launch",
        status: "completed",
        priority: "high",
        assignee: "Alex Thompson",
        dueDate: new Date("2024-11-25"),
        createdAt: new Date("2024-09-20"),
        projectId: "3"
      }
    ]
  },
  {
    id: "4",
    name: "Database Migration",
    description: "Migrate legacy database to modern cloud infrastructure",
    status: "on-hold",
    progress: 40,
    dueDate: new Date("2025-02-28"),
    createdAt: new Date("2024-08-15"),
    tasks: [
      {
        id: "t10",
        title: "Data audit",
        description: "Comprehensive audit of existing database structure",
        status: "completed",
        priority: "high",
        assignee: "Mike Johnson",
        dueDate: new Date("2024-10-01"),
        createdAt: new Date("2024-08-20"),
        projectId: "4"
      },
      {
        id: "t11",
        title: "Migration script development",
        description: "Develop automated migration scripts",
        status: "in-progress",
        priority: "high",
        assignee: "Alex Thompson",
        dueDate: new Date("2024-12-15"),
        createdAt: new Date("2024-09-01"),
        projectId: "4"
      },
      {
        id: "t12",
        title: "Testing and validation",
        description: "Comprehensive testing of migrated data",
        status: "todo",
        priority: "medium",
        assignee: "Emma Davis",
        dueDate: new Date("2025-01-30"),
        createdAt: new Date("2024-10-01"),
        projectId: "4"
      }
    ]
  }
];

export const mockTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Sarah Chen",
    email: "sarah.chen@example.com",
    role: "UI/UX Designer",
    avatar: "SC",
    assignedProjects: 3
  },
  {
    id: "2", 
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    role: "Full Stack Developer",
    avatar: "MJ",
    assignedProjects: 2
  },
  {
    id: "3",
    name: "Emma Davis", 
    email: "emma.davis@example.com",
    role: "Project Manager",
    avatar: "ED",
    assignedProjects: 4
  },
  {
    id: "4",
    name: "Alex Thompson",
    email: "alex.thompson@example.com", 
    role: "Backend Developer",
    avatar: "AT",
    assignedProjects: 2
  }
];