import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useToast } from "@/components/ui/use-toast"
import { Textarea } from "../ui/textarea"

const formSchema = z.object({
  simName: z.string({ required_error: "Simulation name is required." }).min(2),
  simDescription: z.string({ required_error: "Simulation description must be at least 2 characters." }).optional(),
  simEnv: z.string({ required_error: "Simulation type is required." })
})

interface SimEnvConfigFormProps {
  onOpenChange?: (open: boolean) => void
}

export function ProjectConfigForm({ onOpenChange }: SimEnvConfigFormProps) {

  const { toast } = useToast()

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),

  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    toast({
      // style: { background: "green", color: "white", border: "1px solid green"},
      title: "Form submitted",
      // description: "Check the console for the form values.",
      description:
        (<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>),
      variant: "default",
    })
    if (onOpenChange) {
      onOpenChange(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="simName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Simulation Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter the simulation name" onChange={field.onChange} defaultValue={field.value} />
              </FormControl>
              <FormDescription>
                Enter a unique name for your simulation to identify it easily in future references.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="simDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Simulation Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Write a brief description of the simulation" onChange={field.onChange} defaultValue={field.value} />
              </FormControl>
              <FormDescription>
                Provide a short description of what your simulation will analyze.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="simEnv"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Simulation Scenario</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select the scenario type to be simulated" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="urban">Urban</SelectItem>
                    <SelectItem value="rural">Rural</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>
                Different settings can significantly affect results and model behavior.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">Submit</Button>
      </form>
    </Form>
  )
}
