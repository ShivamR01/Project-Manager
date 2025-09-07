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
  Globe,
  CheckCircle,
  ArrowRight,
  Workflow,
  FileText,
  Bell,
  Archive,
  Settings,
  Smartphone
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HomeHeader } from "@/components/home/HomeHeader";
import { Footer } from "@/components/layout/Footer";
import { useNavigate } from "react-router-dom";

const FeaturesPage = () => {
  const navigate = useNavigate();

  const mainFeatures = [
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "Smart Scheduling",
      description: "AI-powered task scheduling that adapts to your team's workflow and deadlines with intelligent conflict resolution.",
      highlights: ["AI-driven optimization", "Conflict detection", "Resource allocation", "Timeline predictions"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Team Collaboration", 
      description: "Real-time collaboration tools that keep your entire team synchronized across projects and tasks.",
      highlights: ["Real-time updates", "Team chat", "File sharing", "Activity feeds"],
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Advanced Analytics",
      description: "Deep insights into project performance with customizable reports and predictive analytics.",
      highlights: ["Custom dashboards", "Performance metrics", "Trend analysis", "Export capabilities"],
      color: "from-green-500 to-emerald-500"
    }
  ];

  const allFeatures = [
    { icon: <Clock className="h-5 w-5" />, title: "Time Tracking", description: "Precise time logging with productivity insights" },
    { icon: <MessageSquare className="h-5 w-5" />, title: "Communication Hub", description: "Integrated chat and notifications" },
    { icon: <Shield className="h-5 w-5" />, title: "Enterprise Security", description: "Bank-level security and compliance" },
    { icon: <Zap className="h-5 w-5" />, title: "Workflow Automation", description: "Automate repetitive tasks and processes" },
    { icon: <Target className="h-5 w-5" />, title: "Goal Tracking", description: "Set and track project milestones" },
    { icon: <Globe className="h-5 w-5" />, title: "Global Access", description: "Cloud-based with offline capabilities" },
    { icon: <Workflow className="h-5 w-5" />, title: "Custom Workflows", description: "Build workflows that fit your process" },
    { icon: <FileText className="h-5 w-5" />, title: "Document Management", description: "Centralized file storage and versioning" },
    { icon: <Bell className="h-5 w-5" />, title: "Smart Notifications", description: "Intelligent alerts and reminders" },
    { icon: <Archive className="h-5 w-5" />, title: "Project Templates", description: "Pre-built templates for common projects" },
    { icon: <Settings className="h-5 w-5" />, title: "API Integration", description: "Connect with your favorite tools" },
    { icon: <Smartphone className="h-5 w-5" />, title: "Mobile Apps", description: "Full-featured iOS and Android apps" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <HomeHeader />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-blue-500/5"></div>
          <div className="container px-4 mx-auto relative">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <Badge className="mb-4" variant="secondary">
                ✨ Comprehensive Feature Set
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Everything you need to
                <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  {" "}manage projects
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Discover all the powerful features that make ProjectManager the ultimate 
                solution for teams of all sizes, from startups to enterprise organizations.
              </p>
              <Button size="lg" onClick={() => navigate("/signup")}>
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Main Features */}
        <section className="py-20 bg-muted/30">
          <div className="container px-4 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Core Features</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our most powerful capabilities designed to transform how you manage projects
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {mainFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ y: -10 }}
                >
                  <Card className="h-full border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group">
                    <CardHeader>
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color} p-4 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <div className="text-white">
                          {feature.icon}
                        </div>
                      </div>
                      <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                      <ul className="space-y-2">
                        {feature.highlights.map((highlight, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* All Features Grid */}
        <section className="py-20">
          <div className="container px-4 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Complete Feature Set</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Every tool you need to streamline your workflow and boost productivity
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {allFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card className="p-6 border-0 shadow-md hover:shadow-lg transition-all duration-300 group">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <div className="text-primary">
                          {feature.icon}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-muted/30">
          <div className="container px-4 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-2xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to experience all features?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Start your free trial today and see how ProjectManager can transform your workflow.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" onClick={() => navigate("/signup")}>
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg" onClick={() => navigate("/dashboard")}>
                  View Demo
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FeaturesPage;