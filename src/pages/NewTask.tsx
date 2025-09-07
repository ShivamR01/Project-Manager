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
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { mockProjects, mockTeamMembers } from "@/data/mockData";

const taskSchema = z.object({
  title: z.string().min(1, "Task title is required"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  dueDate: z.date({
    required_error: "Due date is required",
  }),
  priority: z.enum(["low", "medium", "high", "critical"], {
    required_error: "Priority is required",
  }),
  assignee: z.string().min(1, "Assignee is required"),
  status: z.enum(["todo", "in-progress", "completed"], {
    required_error: "Status is required",
  }),
  projectId: z.string().min(1, "Project is required"),
});

type TaskForm = z.infer<typeof taskSchema>;

const NewTask = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<TaskForm>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "medium",
      status: "todo",
      assignee: "",
      projectId: "",
    },
  });

  const onSubmit = async (data: TaskForm) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Task Created",
        description: `${data.title} has been successfully created!`,
      });
      
      navigate("/tasks");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create task. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "text-destructive";
      case "high": return "text-warning";
      case "medium": return "text-info";
      case "low": return "text-success";
      default: return "text-muted-foreground";
    }
  };

  return (
   <div className="min-h-screen flex flex-col md:flex-row bg-gray-900">
  
  {/* LEFT PANEL */}
<div className="hidden md:flex w-1/3 relative overflow-hidden rounded-tr-3xl rounded-br-3xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 p-6">
  {/* Soft floating blobs */}
  <div className="absolute w-72 h-72 bg-blue-700/10 rounded-full top-1/4 left-1/4 filter blur-3xl animate-blob" />
  <div className="absolute w-60 h-60 bg-cyan-500/10 rounded-full top-1/2 left-1/2 filter blur-3xl animate-blob animate-delay-2000" />
  <div className="absolute w-80 h-80 bg-indigo-500/10 rounded-full top-1/3 left-2/3 filter blur-3xl animate-blob animate-delay-4000" />

  {/* Overlay for subtle contrast */}
  <div className="absolute inset-0 bg-black/20 rounded-tr-3xl rounded-br-3xl" />

  {/* Centered content */}
  <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
    <h1 className="text-white text-4xl md:text-5xl font-extrabold drop-shadow-lg">
      Add Your <span className="text-cyan-400">Task</span>
    </h1>
    <p className="mt-4 text-gray-300 text-lg md:text-xl max-w-xs">
      Quickly create and manage your tasks efficiently to keep your project on track.
    </p>
  </div>

  <style>
    {`
      @keyframes blob {
        0%, 100% { transform: translate(0px,0px) scale(1); }
        33% { transform: translate(15px,-10px) scale(1.05); }
        66% { transform: translate(-10px,10px) scale(0.95); }
      }
      .animate-blob { animation: blob 8s infinite; }
      .animate-delay-2000 { animation-delay: 2s; }
      .animate-delay-4000 { animation-delay: 4s; }
    `}
  </style>
</div>


  {/* RIGHT PANEL */}
{/* RIGHT PANEL */}
<div className="flex-1 p-6 md:p-10 max-w-2xl mx-auto relative">
  {/* Navigation Arrow */}
  <Button
    variant="ghost"
    size="icon"
    onClick={() => navigate(-1)}
    className="absolute top-6 left-2 z-50 text-white text-3xl font-bold shadow-lg hover:text-teal-400 bg-gray-800/50 rounded-full p-5"
  >
    <ArrowLeft className="h-12 w-12" />
  </Button>

  <Card className="shadow-2xl rounded-2xl border-0 bg-gray-900/80 backdrop-blur-md">
    <CardHeader>
      <CardTitle className="text-2xl font-bold text-white bg-gradient-to-r from-purple-400 via-indigo-400 to-teal-400 bg-clip-text text-transparent">
        Task Details
      </CardTitle>
      <CardDescription className="text-gray-300">
        Fill in the information below to create your new task
      </CardDescription>
    </CardHeader>

    <CardContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Task Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-200 font-medium">Task Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter task title"
                    {...field}
                    className="h-10 rounded-lg bg-gray-800/60 text-white placeholder-gray-400 focus:ring-2 focus:ring-teal-400 hover:bg-gray-800 transition-all"
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
                <FormLabel className="text-gray-200 font-medium">Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe what needs to be done"
                    className="min-h-[80px] rounded-lg bg-gray-800/60 text-white placeholder-gray-400 focus:ring-2 focus:ring-teal-400 hover:bg-gray-800 transition-all"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          {/* Due Date */}
          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-200 font-medium">Due Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={`w-full pl-3 text-left font-normal text-gray-200 hover:bg-gray-800 transition-all`}
                      >
                        {field.value ? format(field.value, "PPP") : "Pick a due date"}
                        <CalendarIcon className="ml-auto h-4 w-4 text-gray-200 opacity-80" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                      className="p-3 pointer-events-auto bg-gray-800/70 text-white rounded-lg"
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          {/* Priority & Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-200 font-medium">Priority</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {["low", "medium", "high", "critical"].map((p) => (
                        <SelectItem key={p} value={p} className={getPriorityColor(p)}>
                          {p.charAt(0).toUpperCase() + p.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-200 font-medium">Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {["todo", "in-progress", "completed"].map((s) => (
                        <SelectItem key={s} value={s}>
                          {s.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
          </div>

          {/* Assignee */}
          <FormField
            control={form.control}
            name="assignee"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-200 font-medium">Assignee</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Assign to team member" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {mockTeamMembers.map((m) => (
                      <SelectItem key={m.id} value={m.id}>
                        {m.name} - {m.role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-gradient-to-r from-purple-600 via-indigo-500 to-teal-400 hover:opacity-90 shadow-lg text-white"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Task
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
              disabled={isLoading}
              className="flex-1 text-gray-200 border-gray-600 hover:bg-gray-700"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </CardContent>
  </Card>
</div>


</div>



  );
};

export default NewTask;