import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as THREE from "three";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Loader2, Mail, Lock, User, Chrome, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

// Validation schema
const signupSchema = z
  .object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string(),
    acceptTerms: z.boolean().refine((val) => val === true),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
  });

type SignupForm = z.infer<typeof signupSchema>;

const Signup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const leftPanelRef = useRef<HTMLDivElement>(null);

  const form = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  // Three.js globe setup
  useEffect(() => {
    if (!leftPanelRef.current) return;

    const scene = new THREE.Scene();

    // Optional background
    const loader = new THREE.TextureLoader();
    loader.load(
      "/path/to/space.jpg",
      (texture) => {
        scene.background = texture;
      },
      undefined,
      (err) => console.error("Error loading texture", err)
    );

    const camera = new THREE.PerspectiveCamera(
      75,
      leftPanelRef.current.clientWidth / leftPanelRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(
      leftPanelRef.current.clientWidth,
      leftPanelRef.current.clientHeight
    );
    leftPanelRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshStandardMaterial({
      color: 0x14b8a6,
      wireframe: true,
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    scene.add(light);

    const animate = () => {
      requestAnimationFrame(animate);
      sphere.rotation.y += 0.005;
      sphere.rotation.x += 0.003;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!leftPanelRef.current) return;
      camera.aspect =
        leftPanelRef.current.clientWidth / leftPanelRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(
        leftPanelRef.current.clientWidth,
        leftPanelRef.current.clientHeight
      );
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  const onSubmit = async (data: SignupForm) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast({
        title: "Account Created",
        description:
          "Your account has been created successfully! Redirecting to login...",
      });
      setTimeout(() => navigate("/login"), 1000);
    } catch {
      toast({
        title: "Error",
        description: "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast({
        title: "Account Created",
        description: "Google signup successful! Welcome to ProjectManager!",
      });
      navigate("/");
    } catch {
      toast({
        title: "Error",
        description: "Google signup failed.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* LEFT PANEL */}
      <div className="hidden md:flex w-1/3 relative flex-col items-center justify-center overflow-hidden bg-black">
        {/* Heading + description */}
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 text-center z-20 px-6">
          <h1 className="text-3xl lg:text-4xl font-extrabold text-white drop-shadow-lg">
            Welcome to <span className="text-teal-400">ProjectManager</span>
          </h1>
          <p className="mt-2 text-gray-300 text-base lg:text-lg max-w-xs">
            Manage your projects, collaborate with your team, and stay
            productive — all in one place.
          </p>
        </div>

        {/* Globe shifted downward */}
        <div
          ref={leftPanelRef}
          className="absolute inset-0 translate-y-20 z-10"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 z-0" />
      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-10 relative z-10">
        {/* Arrow Back Button */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 left-4 text-white bg-black/50 p-3 rounded-full shadow-md hover:bg-black/70 transition-colors z-20"
        >
          <ArrowLeft className="w-7 h-7 font-bold" />
        </button>

        {/* Signup Card */}
        <Card className="w-full max-w-lg bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl">
          <CardHeader className="text-center space-y-2 p-6">
            <CardTitle className="text-3xl font-bold text-gray-900">
              Create Account
            </CardTitle>
            <CardDescription className="text-gray-700 text-lg">
              Join thousands of users managing projects efficiently
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-5">
            {/* Google Signup */}
            <Button
              type="button"
              variant="outline"
              className="w-full h-11 flex items-center justify-center gap-2 bg-white hover:bg-gray-50 border border-gray-300 text-gray-800 font-medium shadow-sm transition-transform transform hover:scale-105"
              onClick={handleGoogleSignup}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="animate-spin h-5 w-5" />
              ) : (
                <Chrome className="h-5 w-5 text-blue-500" />
              )}
              Continue with Google
            </Button>

            {/* Separator */}
            <div className="relative text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="border-t w-full border-gray-300" />
              </div>
              <span className="relative px-2 bg-white text-sm text-gray-500">
                Or use email
              </span>
            </div>

            {/* Form */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-3"
              >
                {/* Full Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900 font-semibold">
                        Full Name
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            {...field}
                            placeholder="Enter your full name"
                            className="pl-10 h-10 rounded-lg border border-gray-300 focus:ring-1 focus:ring-teal-400 focus:border-teal-500 bg-white text-gray-900"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900 font-semibold">
                        Email
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            {...field}
                            placeholder="Enter your email"
                            className="pl-10 h-10 rounded-lg border border-gray-300 focus:ring-1 focus:ring-teal-400 focus:border-teal-500 bg-white text-gray-900"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900 font-semibold">
                        Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            {...field}
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a password"
                            className="pl-10 pr-10 h-10 rounded-lg border border-gray-300 focus:ring-1 focus:ring-teal-400 focus:border-teal-500 bg-white text-gray-900"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors"
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Confirm Password */}
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900 font-semibold">
                        Confirm Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            {...field}
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm your password"
                            className="pl-10 pr-10 h-10 rounded-lg border border-gray-300 focus:ring-1 focus:ring-teal-400 focus:border-teal-500 bg-white text-gray-900"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors"
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Terms */}
                <FormField
                  control={form.control}
                  name="acceptTerms"
                  render={({ field }) => (
                    <FormItem className="flex items-start space-x-3">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm text-gray-900">
                          I accept the{" "}
                          <Link
                            to="/terms"
                            className="text-teal-500 hover:underline"
                          >
                            Terms
                          </Link>{" "}
                          and{" "}
                          <Link
                            to="/privacy"
                            className="text-teal-500 hover:underline"
                          >
                            Privacy Policy
                          </Link>
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  variant="gradient"
                  className="w-full h-11 rounded-lg font-semibold hover:scale-105 transition-transform"
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin h-4 w-4 mr-2 inline-block" />
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </form>
            </Form>

            <div className="text-center mt-2">
              <p className="text-sm text-gray-700">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-teal-500 font-medium hover:underline"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
