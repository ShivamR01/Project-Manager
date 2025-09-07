import { motion } from "framer-motion";
import { ArrowRight, Play, CheckCircle, Users, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <div className="container px-4 mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Badge variant="secondary" className="mb-4">
                ✨ New Features Available
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Manage Projects
                <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  {" "}Effortlessly
                </span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg md:text-xl text-muted-foreground max-w-xl"
            >
              Streamline your workflow with our powerful project management platform. 
              Collaborate seamlessly, track progress, and deliver results faster than ever.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="lg"
                onClick={() => navigate("/signup")}
                className="group"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate("/login")}
                className="group"
              >
                <Play className="mr-2 h-4 w-4" />
                Watch Demo
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex items-center gap-8 pt-8 border-t border-border"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-sm text-muted-foreground">99% Uptime</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-500" />
                <span className="text-sm text-muted-foreground">10k+ Users</span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-purple-500" />
                <span className="text-sm text-muted-foreground">50M+ Tasks</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative">
              {/* Floating Cards */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-4 -left-4 w-32 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-xl p-3 text-white text-xs"
              >
                <div className="flex items-center gap-1 mb-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="font-medium">Active Projects</span>
                </div>
                <div className="text-xl font-bold">24</div>
              </motion.div>

              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className="absolute -top-8 -right-8 w-36 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg shadow-xl p-3 text-white text-xs"
              >
                <div className="flex items-center gap-1 mb-2">
                  <CheckCircle className="w-3 h-3" />
                  <span className="font-medium">Completed</span>
                </div>
                <div className="text-xl font-bold">156</div>
                <div className="text-xs opacity-80">+12% this week</div>
              </motion.div>

              {/* Main Dashboard Preview */}
              <div className="bg-card rounded-2xl shadow-2xl p-6 border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-primary to-blue-600 rounded-lg"></div>
                  <div className="h-2 bg-muted rounded flex-1 max-w-32"></div>
                </div>
                
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                      className="flex items-center gap-3 p-2 bg-muted/50 rounded-lg"
                    >
                      <div className="w-4 h-4 bg-primary/20 rounded"></div>
                      <div className="flex-1 space-y-1">
                        <div className="h-2 bg-foreground/20 rounded w-3/4"></div>
                        <div className="h-1.5 bg-muted rounded w-1/2"></div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 2 }}
                className="absolute -bottom-6 left-8 w-28 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg shadow-xl p-2 text-white text-xs"
              >
                <div className="font-medium mb-1">Due Today</div>
                <div className="text-lg font-bold">8</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};