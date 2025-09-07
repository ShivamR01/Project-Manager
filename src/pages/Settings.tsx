import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  User,
  Mail,
  Lock,
  Bell,
  Palette,
  Save,
  Loader2,
  Shield,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

const profileSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    currentPassword: z.string().optional(),
    newPassword: z.string().optional(),
    confirmPassword: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.newPassword && data.newPassword !== data.confirmPassword) {
        return false;
      }
      return true;
    },
    {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    }
  );

type ProfileForm = z.infer<typeof profileSchema>;

export default function Settings() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: false,
    taskReminders: true,
    projectUpdates: true,
    weeklyReports: false,
  });

  const form = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "John Doe",
      email: "john.doe@example.com",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ProfileForm) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast({
        title: "Settings Updated",
        description: "Your profile settings have been saved successfully.",
      });

      form.reset({
        ...data,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [key]: value }));
    toast({
      title: "Notification Updated",
      description: `${key.replace(/([A-Z])/g, " $1")} is now ${
        value ? "enabled" : "disabled"
      }.`,
    });
  };

  const handleThemeToggle = (value: boolean) => {
    setIsDarkMode(value);
    toast({
      title: "Theme Updated",
      description: `Switched to ${value ? "Dark" : "Light"} mode.`,
    });
  };

  const tabs = [
    { key: "profile", label: "Profile", icon: User },
    { key: "notifications", label: "Notifications", icon: Bell },
    { key: "appearance", label: "Appearance", icon: Palette },
    { key: "security", label: "Security", icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-background pb-16 px-4 py-8 md:px-10">
      <div className="mx-auto max-w-6xl">
        {/* Header with Back Arrow */}
        <div className="mb-8 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              ⚙️ Settings
            </h1>
            <p className="text-muted-foreground mt-1 text-sm md:text-base">
              Manage your account settings and preferences
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar (desktop) */}
          <div className="hidden md:block md:w-64 shrink-0">
            <div className="flex flex-col gap-2 bg-muted/40 p-2 rounded-xl">
              {tabs.map((tab) => (
                <Button
                  key={tab.key}
                  variant={activeTab === tab.key ? "default" : "ghost"}
                  className="w-full justify-start gap-2 rounded-lg"
                  onClick={() => setActiveTab(tab.key)}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 space-y-8">
            {/* Profile */}
            {activeTab === "profile" && (
              <Card className="shadow-2xl rounded-3xl transform transition-transform hover:-translate-y-1 hover:shadow-3xl duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg md:text-xl font-semibold text-primary">
                    <User className="h-5 w-5 text-primary" /> Profile
                    Information
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Update your personal information and profile settings
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  {/* Avatar Section */}
                  <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
                    <div className="relative group">
                      <Avatar className="h-20 w-20 ring-2 ring-primary/20 transition-transform duration-300 group-hover:scale-105">
                        <AvatarImage src="/avatars/user.jpg" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-white/20 backdrop-blur-sm hover:bg-white/30"
                        >
                          Change Avatar
                        </Button>
                      </div>
                    </div>
                    <div className="text-center md:text-left">
                      <p className="text-xs text-muted-foreground mt-2">
                        JPG, GIF, or PNG. Max size 2MB.
                      </p>
                    </div>
                  </div>

                  {/* Form */}
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-6"
                    >
                      {/* Name & Email */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem className="transition-all duration-300">
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  className="rounded-xl border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem className="transition-all duration-300">
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <Input
                                  type="email"
                                  {...field}
                                  className="rounded-xl border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <Separator />

                      {/* Password Section */}
                      <div className="space-y-4">
                        <h3 className="font-semibold text-lg">
                          Change Password
                        </h3>
                        <FormField
                          control={form.control}
                          name="currentPassword"
                          render={({ field }) => (
                            <FormItem className="transition-all duration-300">
                              <FormLabel>Current Password</FormLabel>
                              <FormControl>
                                <Input
                                  type="password"
                                  {...field}
                                  className="rounded-xl border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="grid md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="newPassword"
                            render={({ field }) => (
                              <FormItem className="transition-all duration-300">
                                <FormLabel>New Password</FormLabel>
                                <FormControl>
                                  <Input
                                    type="password"
                                    {...field}
                                    className="rounded-xl border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                              <FormItem className="transition-all duration-300">
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                  <Input
                                    type="password"
                                    {...field}
                                    className="rounded-xl border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      {/* Save Changes Button */}
                      <div className="flex justify-end">
                        <Button
                          type="submit"
                          disabled={isLoading}
                          className="rounded-xl px-6 bg-gradient-to-r from-primary to-indigo-600 text-white shadow-lg hover:scale-105 transition-transform duration-300 flex items-center gap-2"
                        >
                          {isLoading && (
                            <Loader2 className="animate-spin h-4 w-4" />
                          )}
                          <Save className="h-4 w-4" /> Save Changes
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            )}

            {/* Notifications */}
            {activeTab === "notifications" && (
              <Card className="shadow-2xl rounded-3xl transform transition-transform hover:-translate-y-1 hover:shadow-3xl duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg md:text-xl font-semibold text-primary">
                    <Bell className="h-5 w-5 text-primary" /> Notification
                    Preferences
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Configure how you receive notifications
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {Object.entries(notifications).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between p-4 bg-white/10 backdrop-blur-md rounded-xl shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300"
                    >
                      <div>
                        <h4 className="capitalize font-medium text-gray-200">
                          {key.replace(/([A-Z])/g, " $1")}
                        </h4>
                      </div>
                      <Switch
                        checked={value}
                        onCheckedChange={(v) =>
                          handleNotificationChange(key, v)
                        }
                        className="transition-all duration-300"
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Appearance */}
            {activeTab === "appearance" && (
              <Card className="shadow-2xl rounded-3xl transform transition-transform hover:-translate-y-1 hover:shadow-3xl duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg md:text-xl font-semibold text-primary">
                    <Palette className="h-5 w-5 text-primary" /> Appearance
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Customize the look and feel of your workspace
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Dark Mode Toggle */}
                  <div className="flex items-center justify-between p-4 bg-white/10 backdrop-blur-md rounded-xl shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300">
                    <div>
                      <h4 className="font-medium text-gray-200">Dark Mode</h4>
                      <p className="text-sm text-gray-400">
                        Use dark theme for better visibility
                      </p>
                    </div>
                    <Switch
                      checked={isDarkMode}
                      onCheckedChange={handleThemeToggle}
                      className="transition-all duration-300"
                    />
                  </div>

                  {/* Language Selector */}
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-200">Language</h4>
                    <Select defaultValue="en">
                      <SelectTrigger className="w-full rounded-xl border border-gray-300 bg-white/10 backdrop-blur-md focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Security */}
            {activeTab === "security" && (
              <Card className="shadow-2xl rounded-3xl transform transition-transform hover:-translate-y-1 hover:shadow-3xl duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg md:text-xl font-semibold text-primary">
                    <Lock className="h-5 w-5 text-primary" /> Security Settings
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Manage your account security
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Two-Factor Authentication */}
                  <div className="p-4 bg-white/10 backdrop-blur-md rounded-xl shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-200 mb-1">
                        Two-Factor Authentication
                      </h4>
                      <p className="text-sm text-gray-400">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="hover:scale-105 transition-transform duration-300"
                    >
                      Enable 2FA
                    </Button>
                  </div>

                  {/* Active Sessions */}
                  <div className="p-4 bg-white/10 backdrop-blur-md rounded-xl shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-200 mb-1">
                        Active Sessions
                      </h4>
                      <p className="text-sm text-gray-400">
                        View devices currently logged in
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="hover:scale-105 transition-transform duration-300"
                    >
                      View Sessions
                    </Button>
                  </div>

                  {/* Danger Zone */}
                  <div className="p-4 bg-red-600/10 rounded-xl border border-red-500/20 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-red-500 mb-1">
                        Danger Zone
                      </h4>
                      <p className="text-sm text-red-300">
                        Deleting your account is permanent. Proceed with
                        caution.
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="hover:scale-105 transition-transform duration-300"
                    >
                      Delete Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Tab Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/10 backdrop-blur-md border-t border-gray-700/20 flex justify-around py-2 z-50 shadow-inner">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`flex flex-col items-center text-xs relative transition-all duration-300 ${
              activeTab === tab.key
                ? "text-primary scale-110"
                : "text-muted-foreground hover:scale-105"
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            <tab.icon className="h-6 w-6" />
            <span>{tab.label}</span>
            {activeTab === tab.key && (
              <span className="absolute -top-1 w-2 h-2 bg-primary rounded-full animate-pulse" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
