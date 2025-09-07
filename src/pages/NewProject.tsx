import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { mockTeamMembers } from "@/data/mockData";

const projectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  startDate: z.date({
    required_error: "Start date is required",
  }),
  endDate: z.date({
    required_error: "End date is required",
  }),
  priority: z.enum(["low", "medium", "high"], {
    required_error: "Priority is required",
  }),
  status: z.enum(["planning", "active", "completed", "on-hold"], {
    required_error: "Status is required",
  }),
  teamMembers: z.array(z.string()).min(1, "At least one team member is required"),
});

type ProjectForm = z.infer<typeof projectSchema>;

const NewProject = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  const form = useForm<ProjectForm>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      description: "",
      priority: "medium",
      status: "planning",
      teamMembers: [],
    },
  });

  const onSubmit = async (data: ProjectForm) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Project Created",
        description: `${data.name} has been successfully created!`,
      });
      
      navigate("/projects");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create project. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMember = (memberId: string) => {
    const updated = selectedMembers.includes(memberId)
      ? selectedMembers.filter(id => id !== memberId)
      : [...selectedMembers, memberId];
    
    setSelectedMembers(updated);
    form.setValue("teamMembers", updated);
  };

  const removeMember = (memberId: string) => {
    const updated = selectedMembers.filter(id => id !== memberId);
    setSelectedMembers(updated);
    form.setValue("teamMembers", updated);
  };

  return (
  <div className="min-h-screen flex flex-col md:flex-row">
  {/* LEFT PANEL */}
  <div className="w-full md:w-1/2 relative bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800 p-6 flex items-center justify-center">
    {/* Navigation Arrow */}
    <Button
      variant="ghost"
      size="icon"
      onClick={() => navigate(-1)}
      className="absolute top-6 left-6 text-gray-300 hover:text-teal-400 transition-colors z-20"
    >
      <ArrowLeft className="h-5 w-5" />
    </Button>

    {/* Create Project Card */}
   <Card className="relative w-full max-w-2xl rounded-3xl overflow-hidden shadow-xl group animate-fadeIn">
  {/* Card Inner (Glassmorphism) */}
  <div className="relative rounded-3xl bg-white/5 backdrop-blur-lg border border-white/10 p-6 md:p-8 transition-transform duration-500 group-hover:scale-[1.01] group-hover:border-teal-400/30">
    <CardHeader className="text-white space-y-2">
      <CardTitle className="text-3xl font-extrabold tracking-tight text-white">
        Create New Project
      </CardTitle>
      <CardDescription className="text-gray-400 text-base">
        Fill in the details to start your project journey 🚀
      </CardDescription>
    </CardHeader>

    <CardContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Project Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white/80">Project Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter project name"
                    {...field}
                    className="rounded-xl h-12 border border-white/20 bg-white/10 text-white placeholder-gray-400
                               focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white/80">Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe your project goals"
                    {...field}
                    className="min-h-[100px] rounded-xl border border-white/20 bg-white/10 text-white placeholder-gray-400
                               focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          {/* Start & End Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["startDate", "endDate"].map((dateField) => (
              <FormField
                key={dateField}
                control={form.control}
                name={dateField as "startDate" | "endDate"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/80">
                      {dateField === "startDate" ? "Start Date" : "End Date"}
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={`w-full text-left rounded-xl h-12 bg-white/10 border border-white/20 
                                        text-white placeholder-gray-400 focus:border-teal-400 focus:ring-1 
                                        focus:ring-teal-400 transition-all hover:border-teal-400/40 ${
                                          !field.value && "text-gray-400"
                                        }`}
                          >
                            {field.value
                              ? format(field.value, "PPP")
                              : `Pick ${dateField === "startDate" ? "start" : "end"} date`}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-70" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            ))}
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-teal-500 hover:bg-teal-600 transition-transform hover:scale-105 text-white rounded-xl h-12"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Project
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
              disabled={isLoading}
              className="flex-1 rounded-xl h-12 border border-white/20 text-white hover:bg-white/10 transition-all"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </CardContent>
  </div>
</Card>

{/* Animations */}
<style>
  {`
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fadeIn {
      animation: fadeIn 0.8s ease-out forwards;
    }
  `}
</style>


  </div>

  {/* RIGHT PANEL */}
 <div className="hidden md:flex w-1/2 relative p-12 items-center justify-center bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800 group">
  {/* Subtle Overlay Glow */}
  <div className="absolute inset-0 pointer-events-none rounded-r-3xl group-hover:shadow-[0_0_40px_-10px_rgba(20,184,166,0.4)] transition-all duration-500" />

  {/* Content */}
  <div className="relative max-w-lg text-center space-y-6">
    <h1 className="text-4xl font-extrabold text-white tracking-tight drop-shadow-md group-hover:text-teal-300 transition-colors duration-300">
      Manage Projects Smarter
    </h1>
    <p className="text-lg text-gray-300 leading-relaxed">
      Our project management system helps you stay organized, boost collaboration, 
      and achieve goals faster with a modern and intuitive workflow.
    </p>
  </div>
</div>

</div>


  );
};

export default NewProject;