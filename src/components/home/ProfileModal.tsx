import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, UserCircle2, ShieldCheck, Calendar } from "lucide-react";
import { motion } from "framer-motion";

interface ProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: {
    name: string;
    email: string;
    role: string;
    joined: string;
    avatar?: string;
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
      <DialogContent className="sm:max-w-md rounded-2xl shadow-2xl border border-border bg-background/70 backdrop-blur-2xl p-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative flex flex-col items-center p-6"
        >
          {/* Header */}
          <DialogHeader className="w-full text-center">
            <DialogTitle className="text-2xl font-bold tracking-tight">
              Profile
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Manage your account details
            </DialogDescription>
          </DialogHeader>

          {/* Avatar with floating animation */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="mt-6"
          >
            <Avatar className="h-24 w-24 border-4 border-primary/30 shadow-xl">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </motion.div>

          {/* User Info */}
          <div className="mt-4 text-center space-y-1">
            <h2 className="text-lg font-semibold">{user.name}</h2>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mt-6">
            {[
              {
                icon: <UserCircle2 className="w-5 h-5 text-primary" />,
                label: user.role,
              },
              {
                icon: <Mail className="w-5 h-5 text-primary" />,
                label: user.email,
              },
              {
                icon: <ShieldCheck className="w-5 h-5 text-primary" />,
                label: "Verified Account",
              },
              {
                icon: <Calendar className="w-5 h-5 text-primary" />,
                label: `Joined ${user.joined}`,
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 p-4 rounded-xl bg-muted/60 border border-border shadow-sm hover:shadow-md transition-all"
              >
                {item.icon}
                <span className="text-sm font-medium">{item.label}</span>
              </motion.div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 mt-6 w-full">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="rounded-xl"
            >
              Close
            </Button>
            {onGoToSettings && (
              <Button onClick={onGoToSettings} className="rounded-xl">
                Settings
              </Button>
            )}
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};
