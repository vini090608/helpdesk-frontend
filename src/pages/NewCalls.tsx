import { useState } from "react"
import { z, ZodError } from "zod"
import { AxiosError } from "axios"

import { api } from "../services/api"

import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Select } from "../components/Select";

const NewCallSchema = z.object({
    title: z.string(),
    describe: z.string(),
    status: z.enum(["open", "processing", "ended"]),
    serviceAmount: z.number().positive(),
    client_id: z.number(),
    technical_id: z.number(),
    service_name: z.string()
})

export function NewCalls() {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [status, setStatus] = useState("")
    const [serviceAmount, setServiceAmount] = useState("")
    const [options, setOptions] = useState<Service[]>([])
    const [isLoading, setIsLoading] = useState(false)

    async function getOptions() {
        try {
            const response = await api.get("sessions")
            
            setOptions(
                response.data.calls.map((call) => ({
                    title: call.title,
                    description: service.description,
                    service: service,
                }))
            )
        } catch (error) {
            
        }
    }

    async function onSubmit(e: React.FormEvent){
        e.preventDefault()

        try {
            setIsLoading(true)

            const data = NewCallSchema.parse({
                title, 
                description, 
                service,
            })

            await api.post("/calls", data)
            
            
        } catch (error) {
            console.log(error)

            if (error instanceof ZodError){
                return alert(error.issues[0].message)
            }

            if (error instanceof AxiosError){
                return alert(error.response?.data.message)
            }

            alert("Não foi possível cadastrar!")
        } finally {
            setIsLoading(false)
            getOptions()
        }

    }

  return (
    <main className="flex flex-col items-center">
        <div className="p-12">
            <h1 className="text-xl text-blue-dark pb-10 font-semibold"> Novo Chamado</h1>
            {/* Colocar action={formAction} */}
            <form onSubmit={onSubmit} className="flex gap-12">
                <div className="border border-gray-500 p-4 rounded-2xl">
                    <div className="pb-6">
                        <h2 className="text-md text-gray-200">Informações</h2 >
                        <span className="text-xs text-gray-300">
                            Configure os dias e horários em que você está disponível para
                            atender chamados
                        </span>
                    </div>

                    <Input name="title" required legend="Título" type="text" placeholder="Digite um título para o chamado" onChange={(e) => setTitle(e.target.value)}/>
                    <br />
                    <Input name="description" required legend="Descrição" type="text" placeholder="Descreva o que está acontecendo" onChange={(e) => setDescription(e.target.value)}/>
                    <br />
                    <Select required legend="Categoria de serviço" onChange={(e) => setService(e.target.value)}>
                        {

                        }
                    </Select>
                </div>
                <div className="border border-gray-500 p-4 rounded-2xl w-75 h-84">
                    <h2 className="text-md text-gray-200">Resumo</h2 >
                    <p className="text-xs text-gray-300 relative pb-5">Valores e detalhes</p>

                    <p className="text-xs text-gray-400">Categoria de serviço</p>   
                    <input type="text" />
                    <p className="text-xs text-gray-400">Custo inicial</p>
                    <p className="text-xs text-gray-200 relative pb-5">R$ 
                        <input name="amount" type="text" readOnly className="w-full inline border-none px-4 text-lg text-gray-100 outline-none bg-transparent" />
                    </p>

                    <span className="text-xs text-gray-300"> O chamado será automaticamente atribuído a um técnico disponível</span>

                    <br />
                    <br />

                    {/* Add propriedade isloading={isLoading} */}
                    <Button variant="md" isLoading={isLoading}>
                        Criar chamado
                    </Button>
                </div>
            </form>
        </div>
    </main>
  );
}