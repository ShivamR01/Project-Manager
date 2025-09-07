import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { useNavigate } from "react-router-dom";

export const HomeHeader = () => {
  const navigate = useNavigate();

  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-lg border-b border-border"
    >
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Logo onClick={() => navigate("/")} />

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => navigate("/features")}
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Features
          </button>
          <button 
            onClick={() => navigate("/pricing")}
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Pricing
          </button>
          <button 
            onClick={() => navigate("/about")}
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            About
          </button>
          <button 
            onClick={() => navigate("/contact")}
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Contact
          </button>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            onClick={() => navigate("/login")}
            className="hidden sm:inline-flex"
          >
            Sign In
          </Button>
          <Button onClick={() => navigate("/signup")}>
            Get Started
          </Button>
        </div>
      </div>
    </motion.header>
  );
};