import { useAuth } from "../hooks/useAuth";
import { useState, useEffect } from "react"
import { z, ZodError } from "zod"
import { AxiosError } from "axios"

import { api } from "../services/api"

import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Select } from "../components/Select";

import Right from "../assets/icons/active-circle-check-big.svg"

const NewCallSchema = z.object({
    title: z.string(),
    describe: z.string(),
    service_name: z.string(),
    service_amount: z.number().positive(),
    client_id: z.number(),
})

export function NewCalls() {
    const [title, setTitle] = useState("")
    const [describe, setDescribe] = useState("")
    const [selectedService, setSelectedService] = useState<Service>();
    const [isLoading, setIsLoading] = useState(false)

    const user = useAuth()

    const [services, setServices] = useState<Service[]>([])

    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        if (!showAlert) return;

        const timer = setTimeout(() => {
            setShowAlert(false);
        }, 1000);

        return () => clearTimeout(timer);
        }, [showAlert]);

    useEffect(() => {
        api.get("/services").then(response => {
        setServices(response.data)
        })
    }, [])

    async function onSubmit(e: React.FormEvent) {
    e.preventDefault()

    try {
        setIsLoading(true)

        const clientId = Number(user.session?.user.id)

        const data = NewCallSchema.parse({
            title,
            describe,
            service_name: selectedService?.name,
            service_amount: selectedService?.amount,
            client_id: clientId,
        })
        
        await api.post("/calls", data) 
        setShowAlert(true)
    } catch (error) {
        console.log(error)

        if (error instanceof ZodError) {
            return alert(error.issues[0].message)
        }

        if (error instanceof AxiosError) {
            return alert(error.response?.data.message)
        }

        return { message: "Não foi possível criar o chamado!!" }
    } finally {
        setIsLoading(false)
    }
}
  return (
    <main className="flex flex-col items-center">
        <div className="p-12">
            <h1 className="text-xl text-blue-dark pb-10 font-semibold"> Novo Chamado</h1>
            <form onSubmit={onSubmit} className="flex gap-12 mb-10">
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
                    <Input name="description" required legend="Descrição" type="text" placeholder="Descreva o que está acontecendo" onChange={(e) => setDescribe(e.target.value)}/>
                    <br />
                    <Select required legend="Categoria de serviço" onChange={(e) => { const service = services.find( service => service.name === e.target.value );  setSelectedService(service)}}>
                        {services.map(service => (
                            <option>
                            {service.name}
                            </option>
                        ))}
                    </Select>
                </div>
                <div className="border border-gray-500 p-4 rounded-2xl w-75 h-84">
                    <h2 className="text-md text-gray-200">Resumo</h2 >
                    <p className="text-xs text-gray-300 relative pb-5">Valores e detalhes</p>
                    <p className="text-xs text-gray-400">Categoria de serviço</p>   
                    <p className="tesxt-sm text-gray-200 pb-3.5">{selectedService?.name ?? "Escolha um serviço"} </p>
                    <p className="text-xs text-gray-400">Custo inicial</p>
                    <p className="text-xs text-gray-200 relative pb-5">R$ <span className="text-lg text-gray-200 relative pb-10">{selectedService?.amount?.toFixed(2) ?? "0,00"}</span></p>

                    <span className="text-xs text-gray-300"> O chamado será automaticamente atribuído a um técnico disponível</span>

                    <br />
                    <br />

                    <Button type="submit" variant="md" isLoading={isLoading}>
                        Criar chamado
                    </Button>
                </div>
            </form>
            <div
                className={`border border-gray-500 p-4 rounded-2xl w-70 h-25 flex gap-6 items-center transition-all duration-300 ${showAlert  ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"} `} >
                <img src={Right} className="h-10" />
                <p className="text-xl text-green-700 font-bold">
                    Chamado criado com sucesso
                </p>
                </div>
        </div>
    </main>
  );
}