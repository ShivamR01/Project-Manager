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
      <div className="hidden md:flex w-1/3 relative">
        {/* Three.js canvas will be injected here */}
        <div ref={leftPanelRef} className="absolute inset-0" />

        {/* Optional overlay to improve text contrast */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Text content */}
        <div className="absolute bottom-10 left-10 text-white text-3xl font-bold drop-shadow-lg">
          Welcome to <span className="text-teal-300">ProjectManager</span>
        </div>
      </div>

      {/* CENTER PANEL - LOGIN CARD */}
      <div className="flex-1 flex items-center justify-center p-8 relative z-10 bg-gray-50 perspective-1000">
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 left-4 text-gray-700 hover:text-gray-500 transition-colors z-20"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        <Card
          className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-3xl border border-gray-200/30 shadow-2xl transform transition-transform duration-300 hover:rotate-y-2 hover:-rotate-x-2 hover:shadow-3xl"
          style={{ perspective: "1000px" }}
        >
          <CardHeader className="text-center space-y-2 p-6">
            <CardTitle className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Sign In
            </CardTitle>
            <CardDescription className="text-gray-600 text-lg">
              Access your account to continue
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 px-6 pb-6">
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-100 border border-gray-300 text-gray-700 font-medium shadow-sm transition-transform transform hover:scale-105"
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="animate-spin h-5 w-5" />
              ) : (
                <Chrome className="h-5 w-5 text-blue-500" />
              )}
              Continue with Google
            </Button>

            {/* Divider */}
            <div className="relative text-center my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="border-t w-full border-gray-300/50" />
              </div>
              <span className="relative px-2 bg-white text-sm text-gray-500 font-medium">
                Or use email
              </span>
            </div>

            {/* Form */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">
                        Email
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                          <Input
                            {...field}
                            className="pl-12 h-12 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-400 transition bg-white"
                            placeholder="Enter your email"
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm mt-1" />
                    </FormItem>
                  )}
                />

                {/* Password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">
                        Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                          <Input
                            {...field}
                            type={showPassword ? "text" : "password"}
                            className="pl-12 pr-12 h-12 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-400 transition bg-white"
                            placeholder="Enter your password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors"
                          >
                            {showPassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm mt-1" />
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
                          />
                        </FormControl>
                        <FormLabel className="text-sm text-gray-600 font-normal">
                          Remember me
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                  <Link
                    to="/forgot-password"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  variant="gradient"
                  className="w-full h-12 rounded-xl text-lg font-semibold shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
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
