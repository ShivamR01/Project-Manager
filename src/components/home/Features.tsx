import { motion } from "framer-motion";
import { 
  Calendar, 
  Users, 
  BarChart3, 
  Clock, 
  MessageSquare, 
  Shield,
  Zap,
  Target,
  Globe
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: <Calendar className="h-6 w-6" />,
    title: "Smart Scheduling",
    description: "AI-powered task scheduling that adapts to your team's workflow and deadlines.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Team Collaboration",
    description: "Real-time collaboration tools that keep your entire team synchronized.",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: "Advanced Analytics",
    description: "Deep insights into project performance with customizable reports and metrics.",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Time Tracking",
    description: "Precise time tracking with automatic logging and productivity analytics.",
    color: "from-orange-500 to-red-500"
  },
  {
    icon: <MessageSquare className="h-6 w-6" />,
    title: "Integrated Communication",
    description: "Built-in chat, comments, and notifications to streamline team communication.",
    color: "from-indigo-500 to-blue-500"
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Enterprise Security",
    description: "Bank-level security with role-based access control and data encryption.",
    color: "from-gray-600 to-gray-800"
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Automation",
    description: "Powerful workflow automation to eliminate repetitive tasks and boost efficiency.",
    color: "from-yellow-500 to-orange-500"
  },
  {
    icon: <Target className="h-6 w-6" />,
    title: "Goal Tracking",
    description: "Set, track, and achieve project goals with milestone management and progress tracking.",
    color: "from-teal-500 to-green-500"
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: "Global Access",
    description: "Access your projects anywhere, anytime with our cloud-based platform.",
    color: "from-violet-500 to-purple-500"
  }
];

export const Features = () => {
  return (
    <section className="py-20 md:py-32 bg-muted/30">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything you need to
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              {" "}succeed
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed to streamline your workflow and boost productivity. 
            From planning to execution, we've got you covered.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} p-3 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-white">
                      {feature.icon}
                    </div>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};