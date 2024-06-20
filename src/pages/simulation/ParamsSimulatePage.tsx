import { SimEnvConfigForm } from "@/components/forms/SimEnvConfigForm"
import { MainLayout } from "@/components/layout"
import { EnvironmentForm } from "@/components/modal/environmentForm"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"

import { useState } from "react"

export function ParamsSimulatePage() {

  const [openEnvConfig, setOpenEnvConfig] = useState(false)

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

        <Accordion type="single" collapsible className="mt-10 w-full" orientation="vertical">
          <AccordionItem value="item-1" >
            <AccordionTrigger>Configure o ambiente</AccordionTrigger>
            <AccordionContent >
              <div className="grid grid-rows-2 text-justify">
                Nesta aba você pode configurar o ambiente da simulação.
                Como o nome da simulação, a descrição, o tipo, o ambiente, a quantidade de dispositivos, a largura e a altura.
                <EnvironmentForm openEnvConfig={openEnvConfig} setOpenEnvConfig={setOpenEnvConfig} />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Accordion type="single" collapsible className="mt-10 w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Configure os parâmetros</AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-rows-2 text-justify">
                Nesta aba você pode configurar os parâmetros da simulação.
                Como a quantidade de pacotes por segundo, o tempo de simulação,
                modelo de propagação, etc.
                <EnvironmentForm openEnvConfig={openEnvConfig} setOpenEnvConfig={setOpenEnvConfig} />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Accordion type="single" collapsible className="mt-10 w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Selecione os algoritmos de otimização</AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-rows-2 text-justify">
                Nesta aba você deverá selecionar os algoritmos de otimização que deseja utilizar.
                <EnvironmentForm openEnvConfig={openEnvConfig} setOpenEnvConfig={setOpenEnvConfig} />
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
