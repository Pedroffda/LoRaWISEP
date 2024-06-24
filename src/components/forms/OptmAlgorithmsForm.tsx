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
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useToast } from "@/components/ui/use-toast"

const formSchema = z.object({
  gwQuant: z.string({ required_error: "Simulation name is required." }).min(2),
  gwPos: z.string({ required_error: "Simulation description must be at least 2 characters." }).optional(),
})

interface SimEnvConfigFormProps {
  onOpenChange?: (open: boolean) => void
}

export function OptmAlgorithmsForm({ onOpenChange }: SimEnvConfigFormProps) {

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
          name="gwQuant"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gateway Quantity Algorithm</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an algorithm" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="elbow">Elbow Method</SelectItem>
                    <SelectItem value="gap">Gap-Statistic Method</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>
                Choose an algorithm to determine the optimal number of gateways based on statistical methods. The Elbow Method and Gap-Statistic are used to find the most efficient configuration.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gwPos"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gateway Positioning Algorithm</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an algorithm" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kmeans">K-Means Approach</SelectItem>
                    <SelectItem value="genetic">Genetic Algorithm Approach</SelectItem>
                    <SelectItem value="pso">Particle Swarm Optimization (PSO) Approach</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>
                Select an algorithm for optimal gateway positioning to ensure effective coverage and connectivity. Each method provides a different approach to solving the positioning problem.
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
