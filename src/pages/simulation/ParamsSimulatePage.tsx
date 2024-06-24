// import { ProjectConfigForm } from "@/components/forms/ProjectConfigForm"
import { Form } from "@/components/forms"
import { MainLayout } from "@/components/layout"
// import { EnvironmentForm } from "@/components/modal/environmentForm"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useState } from "react"

export function ParamsSimulatePage() {

  const [openEnvConfig, setOpenEnvConfig] = useState(false);

  return (
    <MainLayout>
      <div className="px-10">
        <h2 className="text-3xl font-bold tracking-tight">
          Parâmetros da Simulação
        </h2>
        <p className="text-lg text-gray-500">
          Configure os parâmetros da simulação.
        </p>

        <Button className="mt-10 w-full bg-sky-200	" variant='outline'>
          Preencher automaticamente
        </Button>

        <Accordion type="single" collapsible className="mt-10 w-full">
          <AccordionItem value="item-1" >
            <AccordionTrigger>Project Configuration</AccordionTrigger>
            <AccordionContent >
              <div className="grid grid-rows-2 text-justify">
                Nesta aba você pode configurar o ambiente da simulação.
                Como o nome da simulação, a descrição, o tipo, o ambiente, a quantidade de dispositivos, a largura e a altura.
                <Sheet open={openEnvConfig} onOpenChange={setOpenEnvConfig}>
                  <SheetTrigger><Button variant={"default"} className="w-full bg-cyan-800">Open to Configure</Button></SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle> Project Configuration </SheetTitle>
                      <SheetDescription>
                        Here you can configure the project settings.
                      </SheetDescription>
                    </SheetHeader>
                    <div className="mt-10" ><Form.ProjectConfigForm onOpenChange={setOpenEnvConfig} /></div>
                  </SheetContent>
                </Sheet>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>Configure os parâmetros</AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-rows-2 text-justify">
              Nesta aba você pode configurar os parâmetros da simulação.
                Como a quantidade de pacotes por segundo, o tempo de simulação,
                modelo de propagação, etc.
                <Sheet open={openEnvConfig} onOpenChange={setOpenEnvConfig}>
                  <SheetTrigger><Button variant={"default"} className="w-full bg-cyan-800">Open to Configure</Button></SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle> Project Configuration </SheetTitle>
                      <SheetDescription>
                        Here you can configure the project settings.
                      </SheetDescription>
                    </SheetHeader>
                    <div className="mt-10" ><Form.SimParamsForm onOpenChange={setOpenEnvConfig} /></div>
                  </SheetContent>
                </Sheet>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>Selecione os algoritmos de otimização</AccordionTrigger>
            <AccordionContent>
            <div className="grid grid-rows-2 text-justify">
              Nesta aba você pode configurar os parâmetros da simulação.
                Como a quantidade de pacotes por segundo, o tempo de simulação,
                modelo de propagação, etc.
                <Sheet open={openEnvConfig} onOpenChange={setOpenEnvConfig}>
                  <SheetTrigger><Button variant={"default"} className="w-full bg-cyan-800">Open to Configure</Button></SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle> Project Configuration </SheetTitle>
                      <SheetDescription>
                        Here you can configure the project settings.
                      </SheetDescription>
                    </SheetHeader>
                    <div className="mt-10" ><Form.OptmAlgorithmsForm onOpenChange={setOpenEnvConfig} /></div>
                  </SheetContent>
                </Sheet>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Button className="mt-10 w-full">
          Simular
        </Button>

        <Button className="mt-2 w-full" variant="outline">
          Limpar
        </Button>
      </div>

    </MainLayout>
  )
}
