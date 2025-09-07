import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X, LayoutDashboard, User } from "lucide-react";
import { ProfileModal } from "@/components/home/ProfileModal"; // 👈 import modal




// Replace your static `isLoggedIn = true` with the context value


export const HomeHeader = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  

  // Example user (replace with AuthContext)
  const isLoggedIn = true;
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    role: "Pro User",
    joined: "Jan 2023",
    avatar: "https://i.pravatar.cc/150?img=32", // demo avatar
  };

  const navLinks = [
    { label: "Features", path: "/features" },
    { label: "Pricing", path: "/pricing" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-lg border-b border-border"
      >
        <div className="container flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <Logo onClick={() => navigate("/")} />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Auth / Dashboard + Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            {!isLoggedIn ? (
              <>
                <Button
                  variant="ghost"
                  onClick={() => navigate("/login")}
                  className="hidden sm:inline-flex"
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => navigate("/signup")}
                  className="hidden sm:inline-flex"
                >
                  Get Started
                </Button>
              </>
            ) : (
              <>
                {/* Dashboard Icon */}
                <button
                  onClick={() => navigate("/dashboard")}
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <LayoutDashboard className="w-6 h-6" />
                </button>

                {/* User Profile Icon -> opens modal */}
                <button
                  onClick={() => setProfileModal(true)}
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <User className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Mobile Hamburger */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-muted"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-background border-t border-border px-4 py-4"
            >
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <button
                    key={link.path}
                    onClick={() => {
                      navigate(link.path);
                      setIsOpen(false);
                    }}
                    className="text-base font-medium text-left hover:text-primary transition-colors"
                  >
                    {link.label}
                  </button>
                ))}

                <div className="flex flex-col gap-3 mt-4">
                  {!isLoggedIn ? (
                    <>
                      <Button
                        variant="ghost"
                        onClick={() => {
                          navigate("/login");
                          setIsOpen(false);
                        }}
                      >
                        Sign In
                      </Button>
                      <Button
                        onClick={() => {
                          navigate("/signup");
                          setIsOpen(false);
                        }}
                      >
                        Get Started
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        onClick={() => {
                          navigate("/dashboard");
                          setIsOpen(false);
                        }}
                        variant="outline"
                      >
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        Dashboard
                      </Button>
                      <Button
                        onClick={() => {
                          setProfileModal(true);
                          setIsOpen(false);
                        }}
                      >
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Profile Modal */}
      <ProfileModal
        open={profileModal}
        onOpenChange={setProfileModal}
        user={user}
        onGoToSettings={() => navigate("/settings")}
      />
    </>
  );
};
