import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NotificationDropdown } from "./NotificationDropdown";
import { SettingsDropdown } from "./SettingsDropdown";

interface HeaderProps {
  onCreateProject: () => void;
  onCreateTask: () => void;
}

export const Header = ({ onCreateProject, onCreateTask }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Left Section */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs sm:text-sm">
                PM
              </span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-foreground">
              ProjectManager
            </h1>
          </div>

          {/* Search Bar */}
          <div className="hidden md:block relative w-48 sm:w-72 lg:w-96 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search projects and tasks..."
              className="pl-10 bg-muted/50 border-0 focus:bg-background"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-3">
          <NotificationDropdown />
          <SettingsDropdown />
          <div className="hidden sm:block w-px h-6 bg-border" />

          {/* New Task Button */}
          <Button
            onClick={onCreateTask}
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">New Task</span>
          </Button>

          {/* New Project Button */}
          <Button
            onClick={onCreateProject}
            variant="gradient"
            size="sm"
            className="flex items-center gap-1"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">New Project</span>
          </Button>
        </div>
      </div>
    </header>
  );
};
