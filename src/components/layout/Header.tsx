import { Plus, Search, Bell, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  onCreateProject: () => void;
  onCreateTask: () => void;
}

export const Header = ({ onCreateProject, onCreateTask }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">PM</span>
            </div>
            <h1 className="text-xl font-bold text-foreground">ProjectManager</h1>
          </div>
          
          <div className="relative w-96 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search projects and tasks..."
              className="pl-10 bg-muted/50 border-0 focus:bg-background"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon">
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
          <div className="w-px h-6 bg-border" />
          <Button 
            onClick={onCreateTask}
            variant="outline" 
            size="sm"
          >
            <Plus className="h-4 w-4" />
            New Task
          </Button>
          <Button 
            onClick={onCreateProject}
            variant="gradient" 
            size="sm"
          >
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </div>
      </div>
    </header>
  );
};