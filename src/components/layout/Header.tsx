"use client";

import { useEffect, useRef } from "react";
import { Plus, Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NotificationDropdown } from "./NotificationDropdown";
import { SettingsDropdown } from "./SettingsDropdown";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  onCreateProject: () => void;
  onCreateTask: () => void;
}

export const Header = ({ onCreateProject, onCreateTask }: HeaderProps) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!headerRef.current) return;
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 10; // horizontal tilt
      const y = (e.clientY / innerHeight - 0.5) * 6; // vertical tilt
      headerRef.current.style.transform = `rotateX(${-y}deg) rotateY(${x}deg) translateZ(8px)`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <header
      ref={headerRef}
      className="
        sticky top-0 z-50 w-full 
        bg-gradient-to-r from-background/80 via-background/70 to-background/80
        backdrop-blur-lg 
        border-b border-border/60 
        shadow-lg
        transform-gpu transition-transform duration-300
      "
    >
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Left Section */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Back to Home */}
          <button
            onClick={() => navigate("/")}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-muted-foreground" />
          </button>

          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary to-primary/70 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-primary-foreground font-bold text-xs sm:text-sm">
                PM
              </span>
            </div>
            <h1 className="text-lg sm:text-xl font-extrabold text-foreground hidden xs:block tracking-tight">
              ProjectManager
            </h1>
          </div>

          {/* Search (desktop) */}
          <div className="hidden md:block relative w-56 lg:w-80 xl:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search projects and tasks..."
              className="pl-10 bg-muted/40 border-0 rounded-xl focus:bg-background transition"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-3">
          <NotificationDropdown />
          <SettingsDropdown />

          <div className="hidden sm:block w-px h-6 bg-border" />

          <Button
            onClick={onCreateTask}
            variant="outline"
            size="sm"
            className="flex items-center gap-1 rounded-xl shadow-sm hover:shadow-md transition"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Task</span>
          </Button>

          <Button
            onClick={onCreateProject}
            variant="gradient"
            size="sm"
            className="flex items-center gap-1 rounded-xl shadow-md hover:shadow-lg transition"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Project</span>
          </Button>
        </div>
      </div>

      {/* Mobile search */}
      <div className="md:hidden border-t bg-background px-4 py-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search projects and tasks..."
            className="pl-10 bg-muted/50 border-0 rounded-lg focus:bg-background w-full"
          />
        </div>
      </div>
    </header>
  );
};
