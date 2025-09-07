import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// Icons from lucide-react
import {
  Mail,
  UserCircle2,
  ShieldCheck,
  Calendar,
  Clock,
  Activity,
} from "lucide-react";

interface ProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: {
    name: string;
    email: string;
    role: string;
    joined: string;
    avatar?: string;
    plan?: string;
    lastLogin?: string;
    projects?: number;
  };
  onGoToSettings?: () => void;
}

export const ProfileModal = ({
  open,
  onOpenChange,
  user,
  onGoToSettings,
}: ProfileModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md w-[90%] rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl p-4 overflow-hidden">
        <div className="relative flex flex-col items-center space-y-4 bg-transparent">
          {/* Header */}
          <DialogHeader className="w-full text-center relative">
            <DialogTitle className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Profile
            </DialogTitle>
            <DialogDescription className="text-white/70 text-xs sm:text-sm">
              Manage your account details & preferences
            </DialogDescription>

            
          </DialogHeader>

          {/* Avatar */}
          <div className="mt-2 relative">
            <Avatar className="h-28 w-28 sm:h-32 sm:w-32 border-2 border-white/30 shadow-lg ring-2 ring-white/20">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="text-3xl sm:text-4xl text-white/80">
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-green-400 border-2 border-white/20" />
          </div>

          {/* User Info */}
          <div className="text-center space-y-1">
            <h2 className="text-lg sm:text-xl font-semibold text-white">
              {user.name}
            </h2>
            <p className="text-xs sm:text-sm text-white/70">{user.email}</p>
            <Badge className="mt-1 px-2 py-1 text-xs bg-white/10 text-white rounded-full backdrop-blur-sm">
              {user.plan || "Free Plan"}
            </Badge>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 w-full max-h-60 overflow-y-auto mt-4">
            {[
              {
                icon: <UserCircle2 className="w-5 h-5 text-white" />,
                label: user.role,
              },
              {
                icon: <Mail className="w-5 h-5 text-white" />,
                label: user.email,
              },
              {
                icon: <ShieldCheck className="w-5 h-5 text-white" />,
                label: "Verified Account",
              },
              {
                icon: <Calendar className="w-5 h-5 text-white" />,
                label: `Joined ${user.joined}`,
              },
              {
                icon: <Clock className="w-5 h-5 text-white" />,
                label: `Last login ${user.lastLogin || "2 days ago"}`,
              },
              {
                icon: <Activity className="w-5 h-5 text-white" />,
                label: `Active Projects: ${user.projects || 0}`,
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 p-3 sm:p-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 shadow-sm hover:shadow-md transition-all text-xs sm:text-sm"
              >
                {item.icon}
                <span className="font-medium text-white">{item.label}</span>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="w-full my-3 h-px bg-white/20" />

          {/* Actions */}
          <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 w-full">
            {onGoToSettings && (
              <Button
                onClick={onGoToSettings}
                className="rounded-lg bg-white/10 text-white border border-white/20 backdrop-blur-sm hover:bg-white/20 flex-1 sm:flex-none text-sm sm:text-base"
              >
                Settings
              </Button>
            )}
            <Button
              variant="secondary"
              className="rounded-lg bg-white/10 text-white border border-white/20 backdrop-blur-sm hover:bg-white/20 flex-1 sm:flex-none text-sm sm:text-base"
              onClick={() => onOpenChange(false)}
            >
              Logout
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
