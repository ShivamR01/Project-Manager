import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Eye,
  EyeOff,
  Loader2,
  Mail,
  Lock,
  Chrome,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import * as THREE from "three";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  rememberMe: z.boolean().default(false),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const leftPanelRef = useRef<HTMLDivElement>(null);

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", rememberMe: false },
  });

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    await new Promise((res) => setTimeout(res, 1500));
    if (data.email === "demo@example.com" && data.password === "password123") {
      toast({
        title: "Login Successful",
        description: "Redirecting to dashboard...",
      });
      navigate("/dashboard");
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    await new Promise((res) => setTimeout(res, 1500));
    toast({
      title: "Login Successful",
      description: "Google login successful!",
    });
    navigate("/dashboard");
    setIsLoading(false);
  };

  // Three.js setup for left panel
  useEffect(() => {
    if (!leftPanelRef.current) return;

    const scene = new THREE.Scene();

    // Load space background texture
    const loader = new THREE.TextureLoader();
    loader.load(
      "/path/to/space.jpg", // replace with your star/space image path
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

  return (
    <div className="min-h-screen flex overflow-hidden">
      {/* LEFT PANEL */}
      <div className="hidden md:flex w-1/3 relative flex-col items-center justify-center">
  {/* Text content above the globe */}
  <div className="absolute top-10 left-1/2 transform -translate-x-1/2 text-center z-20">
    <h1 className="text-4xl font-extrabold text-white drop-shadow-lg">
      Welcome to <span className="text-teal-300">ProjectManager</span>
    </h1>
    <p className="mt-2 text-gray-300 text-lg max-w-xs mx-auto">
      Organize your projects, tasks, and team efficiently with a modern and intuitive interface.
    </p>
  </div>

  {/* Three.js canvas shifted downward */}
  <div ref={leftPanelRef} className="absolute inset-0 z-10 translate-y-16" />

  {/* Optional overlay to improve text contrast */}
  <div className="absolute inset-0 bg-black/30 z-0" />
</div>



      {/* CENTER PANEL - LOGIN CARD */}
      {/* RIGHT PANEL (Full login form, no card) */}
  {/* RIGHT PANEL (Dark background + Card for login) */}
<div className="flex-1 flex items-center justify-center px-6 bg-gray-900 text-white relative">
  {/* Back button */}
  <button
    onClick={() => navigate("/")}
    className="absolute top-4 left-4 text-gray-400 hover:text-gray-200 transition-colors"
  >
    <ArrowLeft className="w-6 h-6" />
  </button>

  {/* Login Card */}
  <Card className="w-full max-w-md bg-gray-800/90 backdrop-blur-md rounded-2xl border border-gray-700 shadow-xl p-6">
    <CardHeader className="text-center space-y-2">
      <CardTitle className="text-3xl font-bold text-white">
        Sign In
      </CardTitle>
      <CardDescription className="text-gray-400 text-base">
        Access your account to continue
      </CardDescription>
    </CardHeader>

    <CardContent className="space-y-6">
      {/* Google Button */}
      <Button
        variant="outline"
        className="w-full flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 border border-gray-600 text-gray-200 font-medium shadow-sm transition-transform transform hover:scale-105"
        onClick={handleGoogleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="animate-spin h-5 w-5" />
        ) : (
          <Chrome className="h-5 w-5 text-blue-400" />
        )}
        Continue with Google
      </Button>

      {/* Divider */}
      <div className="relative text-center my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="border-t w-full border-gray-700" />
        </div>
        <span className="relative px-2 bg-gray-800 text-sm text-gray-400">
          Or use email
        </span>
      </div>

      {/* Login Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300">Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
                    <Input
                      {...field}
                      className="pl-12 h-12 rounded-xl border border-gray-700 bg-gray-900 text-white placeholder-gray-500 focus:border-teal-500 focus:ring-1 focus:ring-teal-400"
                      placeholder="Enter your email"
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-red-400 text-sm mt-1" />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300">Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      className="pl-12 pr-12 h-12 rounded-xl border border-gray-700 bg-gray-900 text-white placeholder-gray-500 focus:border-teal-500 focus:ring-1 focus:ring-teal-400"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage className="text-red-400 text-sm mt-1" />
              </FormItem>
            )}
          />

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between">
            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-3">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="border-gray-600 text-teal-400"
                    />
                  </FormControl>
                  <FormLabel className="text-sm text-gray-400 font-normal">
                    Remember me
                  </FormLabel>
                </FormItem>
              )}
            />
            <Link
              to="/forgot-password"
              className="text-sm text-teal-400 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full h-12 rounded-xl text-lg font-semibold shadow-lg bg-teal-500 hover:bg-teal-400 text-white transition-transform transform hover:scale-105"
          >
            {isLoading ? (
              <Loader2 className="animate-spin h-5 w-5" />
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
      </Form>
    </CardContent>
  </Card>
</div>

    </div>
  );
}
