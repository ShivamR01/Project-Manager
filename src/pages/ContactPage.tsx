import { motion } from "framer-motion";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send,
  MessageSquare,
  Headphones,
  Building
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HomeHeader } from "@/components/home/HomeHeader";
import { Footer } from "@/components/layout/Footer";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const ContactPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: ""
  });

  const contactOptions = [
    {
      icon: <MessageSquare className="h-8 w-8" />,
      title: "General Inquiries",
      description: "Questions about our platform, features, or pricing",
      contact: "hello@projectmanager.com",
      responseTime: "Within 24 hours",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Headphones className="h-8 w-8" />,
      title: "Customer Support", 
      description: "Technical support for existing customers",
      contact: "support@projectmanager.com",
      responseTime: "Within 2 hours",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Building className="h-8 w-8" />,
      title: "Enterprise Sales",
      description: "Custom solutions for large organizations",
      contact: "sales@projectmanager.com", 
      responseTime: "Within 1 hour",
      color: "from-purple-500 to-pink-500"
    }
  ];

  const officeInfo = [
    {
      icon: <MapPin className="h-5 w-5" />,
      label: "Address",
      value: "123 Business Street, Suite 100\nSan Francisco, CA 94105"
    },
    {
      icon: <Phone className="h-5 w-5" />,
      label: "Phone",
      value: "+1 (555) 123-4567"
    },
    {
      icon: <Mail className="h-5 w-5" />,
      label: "Email",
      value: "hello@projectmanager.com"
    },
    {
      icon: <Clock className="h-5 w-5" />,
      label: "Business Hours",
      value: "Monday - Friday\n9:00 AM - 6:00 PM PST"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "We'll get back to you within 24 hours.",
    });
    setFormData({ name: "", email: "", company: "", subject: "", message: "" });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

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
                💬 Get in Touch
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                We're here to
                <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  {" "}help you succeed
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Have questions about ProjectManager? Need help getting started? 
                Want to explore enterprise solutions? We'd love to hear from you.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Options */}
        <section className="py-20 bg-muted/30">
          <div className="container px-4 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How can we help?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Choose the best way to reach us based on your needs
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {contactOptions.map((option, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 group text-center">
                    <CardHeader>
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${option.color} p-4 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <div className="text-white">
                          {option.icon}
                        </div>
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {option.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground">
                        {option.description}
                      </p>
                      <div className="space-y-2">
                        <p className="font-medium">{option.contact}</p>
                        <p className="text-sm text-muted-foreground">
                          Response time: {option.responseTime}
                        </p>
                      </div>
                      <Button 
                        variant="outline"
                        className="w-full"
                        onClick={() => window.location.href = `mailto:${option.contact}`}
                      >
                        Send Email
                        <Mail className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-20">
          <div className="container px-4 mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Card className="border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-2xl">Send us a message</CardTitle>
                    <p className="text-muted-foreground">
                      Fill out the form below and we'll get back to you as soon as possible.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Name *</label>
                          <Input
                            placeholder="Your full name"
                            value={formData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Email *</label>
                          <Input
                            type="email"
                            placeholder="your.email@company.com"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Company</label>
                        <Input
                          placeholder="Your company name (optional)"
                          value={formData.company}
                          onChange={(e) => handleInputChange("company", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Subject *</label>
                        <Select onValueChange={(value) => handleInputChange("subject", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="What can we help you with?" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">General Inquiry</SelectItem>
                            <SelectItem value="support">Technical Support</SelectItem>
                            <SelectItem value="sales">Sales Question</SelectItem>
                            <SelectItem value="partnership">Partnership</SelectItem>
                            <SelectItem value="feedback">Feedback</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Message *</label>
                        <Textarea
                          placeholder="Tell us more about your needs..."
                          rows={5}
                          value={formData.message}
                          onChange={(e) => handleInputChange("message", e.target.value)}
                          required
                        />
                      </div>

                      <Button type="submit" size="lg" className="w-full">
                        Send Message
                        <Send className="ml-2 h-4 w-4" />
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Office Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-2xl font-bold mb-4">Visit our office</h2>
                  <p className="text-muted-foreground mb-8">
                    We're located in the heart of San Francisco. Feel free to stop by 
                    during business hours or schedule a meeting with our team.
                  </p>
                </div>

                <div className="space-y-6">
                  {officeInfo.map((info, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <div className="text-primary">
                          {info.icon}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">{info.label}</h3>
                        <p className="text-muted-foreground whitespace-pre-line">
                          {info.value}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Map Placeholder */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-0">
                      <div className="h-64 bg-gradient-to-br from-primary/10 to-blue-500/10 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <MapPin className="h-12 w-12 text-primary mx-auto mb-2" />
                          <p className="text-muted-foreground">Interactive Map</p>
                          <p className="text-sm text-muted-foreground">
                            123 Business Street, San Francisco
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-muted/30">
          <div className="container px-4 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Before you reach out
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Quick answers to common questions that might help you immediately
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                {
                  question: "How quickly do you respond?",
                  answer: "We respond to all inquiries within 24 hours, usually much faster during business hours."
                },
                {
                  question: "Do you offer phone support?",
                  answer: "Yes! Enterprise customers get dedicated phone support. Others can schedule calls through our support system."
                },
                {
                  question: "Can I schedule a demo?",
                  answer: "Absolutely! Contact our sales team to schedule a personalized demo of ProjectManager."
                },
                {
                  question: "Do you have documentation?",
                  answer: "Yes, we have comprehensive documentation and video tutorials available in our help center."
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-2">{faq.question}</h3>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;