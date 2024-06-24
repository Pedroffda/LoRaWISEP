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

const formSchema = z.object({
  simTime: z.string({required_error: "Simulation name is required."}).min(2),
  simPacketNumber: z.string({required_error: "Simulation type is required."}),
  simPropLoss: z.string({required_error: "Simulation description must be at least 2 characters."}).optional()
})

interface SimEnvConfigFormProps {
  onOpenChange?: (open: boolean) => void
}

export function SimParamsForm({ onOpenChange }: SimEnvConfigFormProps) {

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
        name="simTime"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Simulation Time</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="Enter the simulation time in seconds" onChange={field.onChange} defaultValue={field.value} />
            </FormControl>
            <FormDescription>
              This value will determine the total period of the simulation.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="simPacketNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Number of Packets</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="Enter the number of packets to send" onChange={field.onChange} defaultValue={field.value} />
            </FormControl>
            <FormDescription>
              Specify how many packets should be sent during the simulation.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="simPropLoss"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Propagation Loss Model</FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a propagation loss model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem key={"1"} value="apple">Propagation Loss Model (NS-3)</SelectItem>
                  <SelectItem key={"2"} value="banana">Okumura Hata Model</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormDescription>
              Choose the propagation loss model suitable for your simulation
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
