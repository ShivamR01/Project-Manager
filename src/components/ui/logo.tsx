import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  onClick?: () => void;
}

const sizeMap = {
  sm: { container: "w-6 h-6", text: "text-sm", icon: "text-xs" },
  md: { container: "w-8 h-8", text: "text-lg", icon: "text-sm" },
  lg: { container: "w-10 h-10", text: "text-xl", icon: "text-base" },
  xl: { container: "w-12 h-12", text: "text-2xl", icon: "text-lg" }
};

export const Logo = ({ className, size = "md", showText = true, onClick }: LogoProps) => {
  const sizes = sizeMap[size];

  return (
    <motion.div
      className={cn("flex items-center gap-2", onClick && "cursor-pointer", className)}
      onClick={onClick}
      whileHover={onClick ? { scale: 1.05 } : undefined}
      transition={{ duration: 0.2 }}
    >
      {/* Logo Icon */}
      <div className={cn(
        "bg-gradient-to-br from-primary via-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg relative overflow-hidden",
        sizes.container
      )}>
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-lg"></div>
        
        {/* Main Icon */}
        <div className={cn("relative z-10 font-bold text-primary-foreground", sizes.icon)}>
          <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor">
            <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" opacity="0.8" />
            <path d="M12 8V16M8 10L16 14M16 10L8 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        
        {/* Shine Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
          initial={{ x: '-100%' }}
          animate={{ x: '200%' }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "easeInOut"
          }}
        />
      </div>
      
      {/* Logo Text */}
      {showText && (
        <span className={cn("font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent", sizes.text)}>
          ProjectManager
        </span>
      )}
    </motion.div>
  );
};