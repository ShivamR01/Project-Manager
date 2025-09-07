import { motion } from "framer-motion";
import { 
  Users, 
  Target, 
  Award, 
  Heart,
  ArrowRight,
  Globe,
  Zap,
  Shield
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HomeHeader } from "@/components/home/HomeHeader";
import { Footer } from "@/components/layout/Footer";
import { useNavigate } from "react-router-dom";

const AboutPage = () => {
  const navigate = useNavigate();

  const values = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Customer-First",
      description: "Every decision we make is guided by what's best for our customers and their success.",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Innovation",
      description: "We constantly push the boundaries of what's possible in project management technology.",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Reliability",
      description: "Your projects are critical, and we ensure our platform is always there when you need it.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Accessibility",
      description: "Great project management tools should be accessible to teams of all sizes, everywhere.",
      color: "from-blue-500 to-cyan-500"
    }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Co-Founder",
      bio: "Former VP of Product at leading tech companies. Passionate about building tools that make work more enjoyable.",
      image: "/api/placeholder/150/150"
    },
    {
      name: "Michael Chen", 
      role: "CTO & Co-Founder",
      bio: "20+ years in software engineering. Expert in building scalable, secure platforms that teams love to use.",
      image: "/api/placeholder/150/150"
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Design",
      bio: "Award-winning UX designer focused on creating intuitive, beautiful experiences that enhance productivity.",
      image: "/api/placeholder/150/150"
    },
    {
      name: "David Park",
      role: "Head of Engineering",
      bio: "Former Google engineer passionate about performance, security, and building products at scale.",
      image: "/api/placeholder/150/150"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Active Teams", icon: <Users className="h-5 w-5" /> },
    { number: "50M+", label: "Tasks Completed", icon: <Target className="h-5 w-5" /> },
    { number: "99.9%", label: "Uptime", icon: <Shield className="h-5 w-5" /> },
    { number: "150+", label: "Countries", icon: <Globe className="h-5 w-5" /> }
  ];

  return (
    <div className="min-h-screen bg-background">
      <HomeHeader />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-blue-500/5"></div>
          <div className="container px-4 mx-auto relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Badge className="mb-4" variant="secondary">
                  🚀 Our Story
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  Building the future of
                  <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                    {" "}project management
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                  Founded in 2019 by a team of passionate engineers and designers, 
                  ProjectManager was born from the frustration of using clunky, 
                  overcomplicated project management tools. We believe that great 
                  software should be powerful yet simple, beautiful yet functional.
                </p>
                <Button size="lg" onClick={() => navigate("/contact")}>
                  Get in Touch
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Card className="p-6 text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
                        <div className="flex justify-center mb-3 text-primary">
                          {stat.icon}
                        </div>
                        <div className="text-2xl font-bold mb-1">{stat.number}</div>
                        <div className="text-sm text-muted-foreground">{stat.label}</div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 bg-muted/30">
          <div className="container px-4 mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-primary to-blue-600 flex items-center justify-center mb-6">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  To empower teams worldwide to achieve their goals through 
                  intuitive, powerful project management tools. We believe that 
                  when teams have the right tools, they can focus on what matters 
                  most: creating amazing work together.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Every feature we build, every design decision we make, and every 
                  line of code we write is guided by this simple principle: 
                  make work more human, more collaborative, and more fulfilling.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-primary/10 to-blue-500/10 rounded-2xl p-8">
                  <div className="bg-card rounded-xl shadow-xl p-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                          <Award className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="font-medium">Team Productivity +47%</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Target className="h-4 w-4 text-blue-600" />
                        </div>
                        <span className="font-medium">Project Success Rate 94%</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Heart className="h-4 w-4 text-purple-600" />
                        </div>
                        <span className="font-medium">Customer Satisfaction 4.8/5</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20">
          <div className="container px-4 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we do and every decision we make
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                >
                  <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                    <CardContent className="p-6 text-center">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${value.color} p-4 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <div className="text-white">
                          {value.icon}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                        {value.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-muted/30">
          <div className="container px-4 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The passionate people behind ProjectManager, working every day to make 
                your projects more successful
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                    <CardContent className="p-6 text-center">
                      <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-blue-500/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <Users className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-primary text-sm mb-3">{member.role}</p>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {member.bio}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container px-4 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-2xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to join our mission?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Whether you're looking to improve your team's productivity or interested 
                in joining our team, we'd love to hear from you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" onClick={() => navigate("/signup")}>
                  Start Your Journey
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg" onClick={() => navigate("/contact")}>
                  Get in Touch
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

export default AboutPage;