import { motion, MotionProps } from "framer-motion";
import { ArrowRight, Play, CheckCircle, Users, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

// Animation variants
const fadeInUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0, transition: { delay, duration: 0.6, ease: "easeOut" } },
});

const floatAnim = (yRange: number, duration: number, delay = 0): MotionProps => ({
  animate: { y: [0, yRange, 0] },
  transition: { duration, repeat: Infinity, repeatType: "mirror", delay, ease: "easeInOut" },
});

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Background orbs */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-primary/20 rounded-full blur-3xl -z-10" />
      <div className="absolute top-1/3 -right-24 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl -z-10" />

      <div className="container px-4 mx-auto relative isolate">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div initial="initial" animate="animate" className="space-y-8">
            <motion.div variants={fadeInUp(0.1)}>
              <Badge variant="secondary" className="mb-4">
                ✨ New Features Available
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
                Manage Projects{" "}
                <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  Effortlessly
                </span>
              </h1>
            </motion.div>

            <motion.p variants={fadeInUp(0.3)} className="text-base md:text-xl text-muted-foreground max-w-xl">
              Streamline your workflow with our powerful project management platform.
              Collaborate seamlessly, track progress, and deliver results faster than ever.
            </motion.p>

            <motion.div variants={fadeInUp(0.5)} className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={() => navigate("/signup")}
                className="group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-primary/30 to-blue-600/30 opacity-0 group-hover:opacity-100"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </Button>

              <Button variant="outline" size="lg" onClick={() => navigate("/login")} className="group">
                <Play className="mr-2 h-4 w-4" />
                Watch Demo
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div variants={fadeInUp(0.7)} className="flex items-center gap-8 pt-8 border-t border-border flex-wrap">
              {[
                { icon: <CheckCircle className="h-5 w-5 text-green-500" />, text: "99% Uptime" },
                { icon: <Users className="h-5 w-5 text-blue-500" />, text: "10k+ Users" },
                { icon: <BarChart3 className="h-5 w-5 text-purple-500" />, text: "50M+ Tasks" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + i * 0.2 }}
                  className="flex items-center gap-2"
                >
                  {stat.icon}
                  <span className="text-sm text-muted-foreground">{stat.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative isolate"
          >
            <div className="relative">
              {/* Floating Cards */}
              <motion.div
                {...floatAnim(-15, 4)}
                className="absolute -top-4 -left-4 w-32 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg p-3 text-white text-xs backdrop-blur-sm z-20 lg:z-30 pointer-events-none"
              >
                <div className="flex items-center gap-1 mb-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="font-medium">Active Projects</span>
                </div>
                <div className="text-xl font-bold">24</div>
              </motion.div>

              <motion.div
                {...floatAnim(15, 3, 1)}
                className="absolute -top-10 -right-10 w-36 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg p-3 text-white text-xs backdrop-blur-sm z-20 lg:z-30 pointer-events-none"
              >
                <div className="flex items-center gap-1 mb-2">
                  <CheckCircle className="w-3 h-3" />
                  <span className="font-medium">Completed</span>
                </div>
                <div className="text-xl font-bold">156</div>
                <div className="text-xs opacity-80">+12% this week</div>
              </motion.div>

              {/* Main Dashboard Card */}
              <div className="bg-card/80 rounded-2xl shadow-xl p-6 border backdrop-blur-md relative z-10">
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
                      transition={{ delay: 0.8 + i * 0.15 }}
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
                {...floatAnim(-10, 2, 2)}
                className="absolute -bottom-6 left-8 w-28 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl shadow-lg p-2 text-white text-xs backdrop-blur-sm z-20 lg:z-30 pointer-events-none"
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
