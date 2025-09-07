import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/ui/logo";
import { useNavigate } from "react-router-dom";

export const Footer = () => {
  const navigate = useNavigate();

  const footerLinks = {
    product: [
      { label: "Features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
      { label: "Dashboard", href: "/dashboard" },
      { label: "Integrations", href: "#" }
    ],
    company: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Careers", href: "#" },
      { label: "Blog", href: "#" }
    ],
    support: [
      { label: "Help Center", href: "#" },
      { label: "Documentation", href: "#" },
      { label: "API Reference", href: "#" },
      { label: "Status", href: "#" }
    ],
    legal: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookie Policy", href: "#" },
      { label: "Security", href: "#" }
    ]
  };

  const socialLinks = [
    { icon: <Twitter className="h-5 w-5" />, href: "#", label: "Twitter" },
    { icon: <Linkedin className="h-5 w-5" />, href: "#", label: "LinkedIn" },
    { icon: <Github className="h-5 w-5" />, href: "#", label: "GitHub" },
    { icon: <Mail className="h-5 w-5" />, href: "mailto:hello@projectmanager.com", label: "Email" }
  ];

  return (
   <footer className="bg-background/80 backdrop-blur-lg border-t border-border">
  <div className="container mx-auto px-4">
    {/* Newsletter Section */}
    <div className="py-8 border-b border-border">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center lg:text-left"
        >
          <h3 className="text-xl font-bold mb-1">Stay Updated</h3>
          <p className="text-muted-foreground text-sm max-w-sm">
            Get updates and insights delivered to your inbox.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex w-full sm:w-auto gap-2"
        >
          <Input
            placeholder="Your email"
            type="email"
            className="flex-1 min-w-0"
          />
          <Button className="whitespace-nowrap">Subscribe</Button>
        </motion.form>
      </div>
    </div>

    {/* Main Footer Content */}
    <div className="py-10 grid grid-cols-1 md:grid-cols-3 gap-10">
      {/* Company Info */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Logo size="lg" onClick={() => navigate("/")} className="mb-4" />
        <p className="text-muted-foreground text-sm mb-4 max-w-sm">
          Streamline your workflow and boost productivity with our project
          management solution.
        </p>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 shrink-0" />
            <span>123 Business St, Suite 100, City, ST</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 shrink-0" />
            <span>+1 (555) 123-4567</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 shrink-0" />
            <span>hello@projectmanager.com</span>
          </div>
        </div>
      </motion.div>

      {/* Quick Links */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-2 gap-6 sm:gap-10 text-sm"
      >
        {Object.entries(footerLinks).slice(0, 2).map(([category, links]) => (
          <div key={category}>
            <h4 className="font-semibold mb-3 capitalize">{category}</h4>
            <ul className="space-y-2">
              {links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <button
                    onClick={() =>
                      link.href.startsWith("/")
                        ? navigate(link.href)
                        : window.open(link.href, "_blank")
                    }
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </motion.div>

      {/* Social + Extra Links */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-col gap-4"
      >
        <h4 className="font-semibold mb-2">Follow Us</h4>
        <div className="flex gap-3">
          {socialLinks.map((social, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              onClick={() => window.open(social.href, "_blank")}
              className="hover:text-primary"
              aria-label={social.label}
            >
              {social.icon}
            </Button>
          ))}
        </div>
      </motion.div>
    </div>

    {/* Bottom Section */}
    <div className="py-5 border-t border-border text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        © 2024 ProjectManager. All rights reserved.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-wrap gap-4"
      >
        {Object.entries(footerLinks)
          .slice(2)
          .map(([category, links]) =>
            links.map((link, i) => (
              <button
                key={i}
                onClick={() =>
                  link.href.startsWith("/")
                    ? navigate(link.href)
                    : window.open(link.href, "_blank")
                }
                className="hover:text-primary transition-colors"
              >
                {link.label}
              </button>
            ))
          )}
      </motion.div>
    </div>
  </div>
</footer>

  );
};