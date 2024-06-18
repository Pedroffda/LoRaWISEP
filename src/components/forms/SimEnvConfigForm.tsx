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

const formSchema = z.object({
  simName: z.string().min(2, {
    message: "Simulation name must be at least 2 characters.",
  }),
  simDescription: z.string().min(2, {
    message: "Simulation description must be at least 2 characters.",
  }),
  simType: z.string().min(2, {
    message: "Simulation type must be at least 2 characters.",
  }),
  simEnv: z.string().min(2, {
    message: "Simulation environment must be at least 2 characters.",
  }),
  qtdDevices: z.number().int().positive({
    message: "Quantity of devices must be a positive integer.",
  }),
  simWidth: z.number().int().positive({
    message: "Simulation width must be a positive integer.",
  }),
  simHeight: z.number().int().positive({
    message: "Simulation height must be a positive integer.",
  }),

})

export function SimEnvConfigForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="simName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome da Simulação</FormLabel>
              <FormControl>
                <Input placeholder="Digite o nome da simulação" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="simDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Input placeholder="Escreva uma breve descrição" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="simType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cenário de Simulação</FormLabel>
              <FormControl>
                <Select {...field} >
                  <SelectTrigger>
                    <SelectValue placeholder="Informe o tipo de cenário a ser simulado"   />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
