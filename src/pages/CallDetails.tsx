import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { api } from "../services/api";
import { AxiosError } from "axios";
import { z, ZodError } from "zod";
import { Button } from "../components/Button"
import { Select } from "../components/Select";

import left from "../assets/icons/inactive/arrow-left.svg"
import Perfil from "../assets/user.png"
import Circle from "../assets/icons/inactive/circle-check-big.svg"
import Clock from "../assets/icons/inactive/clock-2.svg"
import Interrogation from "../assets/icons/circle-help.svg"

import Plus from "../assets/icons/hover/hover-plus.svg"
import Open from "../assets/icons/circle-help.svg"
import Process from "../assets/icons/active-clock-2 .svg"
import End from "../assets/icons/active-circle-check-big.svg"

const UpdateSchema = z.object({
    servicesArray: z.array(z.string()).optional(),
    amount: z.number().optional()
})

export function CallDetails(){
    const { id } = useParams();
    const { session, isLoading } = useAuth()
    const [calls, setCalls] = useState<CallAPIResponse>()
    const navigate = useNavigate()

    const [selectedService, setSelectedService] = useState<Service>();
    const [services, setServices] = useState<Service[]>([])

    const formatDate = (date: string | Date) =>
        new Intl.DateTimeFormat("pt-BR", {
            dateStyle: "short",
            timeStyle: "short",
        }).format(new Date(date));

    useEffect(() => {
        api.get("/services").then(response => {
        setServices(response.data)
        })
    }, [])

    async function Updating() {
        try {
            if (!selectedService) {
                throw new Error("Serviço não selecionado")
            }

            const data = UpdateSchema.parse({
                servicesArray: selectedService ? [selectedService.name] : [],
                amount: Number(calls?.amount ?? 0) + (selectedService?.amount ?? 0),
            })

            await api.patch(`/calls/pricing/${id}`, data)

            window.location.reload()
        } catch (error) {
            console.log(error)
            
            if(error instanceof ZodError){
                return { message: error.issues[0].message}
            }

            if(error instanceof AxiosError){
                return { message: error.response?.data.message}
            }

            return { message: "Não foi possível entrar!" }
        }
    }
    
    async function Opening() {
        try {
            const data = {
                status : "open"
            }
            

            await api.patch(`/calls/${id}`, data)

            window.location.reload()
        } catch (error) {
            console.log(error)
            
            if(error instanceof ZodError){
                return { message: error.issues[0].message}
            }

            if(error instanceof AxiosError){
                return { message: error.response?.data.message}
            }

            return { message: "Não foi possível entrar!" }
        }
    }

    async function Processing() {
        try {
            const data = {
                status : "processing",
                technical_id: session?.user.id
            }

            await api.patch(`/calls/${id}`, data)
            window.location.reload()
        } catch (error) {
            console.log(error)
            
            if(error instanceof ZodError){
                return { message: error.issues[0].message}
            }

            if(error instanceof AxiosError){
                return { message: error.response?.data.message}
            }

            return { message: "Não foi possível entrar!" }
        }
    }

    async function Ending() {
        try {
            const data = {status : "ended"}

            await api.patch(`/calls/${id}`, data)
            window.location.reload()

        } catch (error) {
            console.log(error)
            
            if(error instanceof ZodError){
                return { message: error.issues[0].message}
            }

            if(error instanceof AxiosError){
                return { message: error.response?.data.message}
            }

            return { message: "Não foi possível entrar!" }
        }
    }    

    useEffect(() => {
        if (isLoading) return
        if (!session) return
        if (!id) return

        api.get(`/calls/${id}`).then(response => {
            setCalls(response.data)
        })
    }, [isLoading, session, id])


    return( 
        <main className="p-8">
            <div className="flex justify-between items-center">
                <div>
                    <Button onClick={() => navigate(-1)} className="justify-start border-transparent bg-transparent flex hover:border-transparent hover:bg-transparent">
                        <img src={left} alt=""/>
                        <span className="text-gray-300 text-xs">Voltar</span>
                    </Button>
                    <h1 className="text-xl text-blue-dark font-semibold mb-4">
                        Detalhes do chamados
                    </h1>
                </div>

                {session?.user.role==="admin" || session?.user.role==="technical" ?
                    <div>
                        {calls?.status==="open"?
                        <div className="flex gap-2">
                            <Button onClick={() => Processing()} className="flex gap-2 p-4 text-nowrap text-gray-200 text-sm font-semibold bg-gray-500 hover:bg-gray-100 hover:text-gray-600" >
                                <img src={Clock} alt=""/>
                                <span>Em atendimento</span>
                            </Button>
                            <Button onClick={() => Ending()} className="flex gap-2 p-2 text-gray-200 text-sm font-semibold bg-gray-500 hover:bg-gray-100 hover:text-gray-600">
                                <img src={Circle} alt=""/>
                                <span>Encerrado</span>
                            </Button>
                        </div>
                    : calls?.status==="processing"?
                        <div className="flex gap-2">
                            <Button onClick={() => Opening()} className="flex gap-2 p-4 text-nowrap text-gray-200 text-sm font-semibold bg-gray-500 hover:bg-gray-100 hover:text-gray-600" >
                                <img src={Interrogation} alt=""/>
                                <span>Não iniciado</span>
                            </Button>
                            <Button onClick={() => Ending()} className="flex gap-2 p-2 text-gray-200 text-sm font-semibold bg-gray-500 hover:bg-gray-100 hover:text-gray-600">
                                <img src={Circle} alt=""/>
                                <span>Encerrado</span>
                            </Button>
                        </div>
                    : 
                        <div className="flex gap-2">
                        <Button onClick={() => Opening()} className="flex gap-2 p-2 text-gray-200 text-sm font-semibold bg-gray-500 hover:bg-gray-100 hover:text-gray-600" >
                                <img src={Interrogation} alt=""/>
                                <span>Não iniciado</span>
                            </Button>
                            <Button onClick={() => Processing()} className="flex gap-2 p-4 text-nowrap text-gray-200 text-sm font-semibold bg-gray-500 hover:bg-gray-100 hover:text-gray-600">
                                <img src={Circle} alt=""/>  
                                <span>Em atendimento</span>
                            </Button>
                        </div>
                    }
                    </div>
                :
                    null
                }

            </div>

            <section className="flex gap-12">
                <div className="flex flex-col gap-6">
                    <div className="border border-gray-500 p-4 rounded-2xl w-120 h-fit">
                        <div className="pb-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xs text-gray-300 font-semibold">{calls?.id}</h2>
                                <div className={`flex justify-center items-center gap-1 px-1 py-1 text-sm text-gray-200 rounded-xl
                                ${calls?.status === "open" ? " bg-red-200" : null}
                                ${calls?.status === "processing" ? "bg-blue-200" : null}
                                ${calls?.status === "ended" ? "bg-green-200" : null} `}>
                                    <img src={calls?.status==="open"? Open : calls?.status==="processing"? Process : End    } alt="" />
                                    <p className={`font-medium ${calls?.status === "open" ? " text-feedback-open" : null}
                                    ${calls?.status === "processing" ? "text-feedback-progress" : null}
                                    ${calls?.status === "ended" ? "text-feedback-done" : null} `}>
                                    {calls?.status}
                                    </p>
                                </div>
                                    </div>
                                    <span className="text-xl text-gray-200">
                                        {calls?.title}
                                    </span>
                            </div>

                        <span className="text-xs text-gray-400 ">Descrição</span>
                        <p className="text-sm text-gray-200 mb-5">{calls?.describe}</p>

                        <span className="text-xs text-gray-400">Categoria</span>
                        <p className="text-sm text-gray-200 mb-5">{calls?.serviceName}</p>

                        <div className="flex justify-between">
                            <div>
                                <span className="text-xs text-gray-400">Criado em</span>
                                <p className="text-sm text-gray-200">{calls?.createdAt && formatDate(calls.createdAt)}</p>
                            </div>
                            <div>
                                <span className="text-xs text-gray-400">Atualizado em</span>
                                <p className="text-sm text-gray-200">{calls?.updatedAt && formatDate(calls.updatedAt)}</p>
                            </div>
                        </div>
                        <div>
                            
                        </div>
                    </div>
                    {session?.user.role==="technical"? 
                        <div className="border border-gray-500 p-4 rounded-2xl w-120 h-fit">
                            <div className="flex items-center justify-between" >
                                <p className="text-sm text-gray-400 font-medium">Serviços adicionais</p>
                                <Button className="h-8 w-8" onClick={() => Updating()}> 
                                    <img src={Plus} alt="" />
                                </Button>
                            </div>
                            <Select required legend="Categoria de serviço" onChange={(e) => { const service = services.find( service => service.name === e.target.value );  setSelectedService(service)}}>
                                {services.map(service => (
                                        <option>
                                        {service.name}
                                        </option>
                                ))}
                            </Select>
                        </div>
                    :
                        null
                    }
                </div>


                <div className="border border-gray-500 p-4 rounded-2xl w-70 h-fit">
                    <p className="text-sm text-gray-400 font-semibold">Técnico responsável</p>
                    <div className="flex gap-4 items-center pt-3 py-6">
                        <img src={Perfil} alt=""  className="rounded-full h-10 w-10"/>
                        <div>
                            <h2 className="text-md text-gray-200">{calls?.technical?.name ?? "Técnico não definido"}</h2>
                            <p className="text-xs text-gray-300 relative">{calls?.technical?.email?? "Técnico não definido"}</p>
                        </div>
                    </div>
                    <p className="text-xs text-gray-400">Valores</p>
                    <div className="flex justify-between">
                        <p className="text-xs text-gray-200 pb-3.5">Preço base</p>
                        <p className="text-xs text-gray-200 pb-3.5">
                            {calls?.serviceAmount? "R$" : ""}
                            <span className="text-xs text-gray-200 relative pb-10">
                                {calls?.serviceAmount.toFixed(2) ?? "0,00"}
                            </span>
                        </p>
                    </div>

                    <p className="text-xs text-gray-400"> Adicionais</p>
                    <div className="pb-6">
                        {calls?.servicesArray.map(servicePast => {
                            const serviceFound = services.find(
                                service => service.name === servicePast
                            )

                            return (
                                <div className="flex justify-between">
                                <p className="text-xs text-gray-200">{servicePast}</p>

                                <p className="text-xs text-gray-200">
                                    {serviceFound ? `R$ ${serviceFound.amount.toFixed(2)}` : "—"}
                                </p>
                                </div>
                            )
                        })}
                        <div className="flex justify-between">
                            <p className="text-xs text-gray-200"> {selectedService?.name}</p>
                            <p className="text-xs text-gray-200 relative">
                                {selectedService?.amount? "R$" : ""}
                                <span className="text-xs text-gray-200 relative pb-10">
                                {selectedService?.amount.toFixed(2)}
                                </span>
                            </p>
                        </div>
                    </div>
                        

                    <div className="bg-gray-500 h-0.5 w-full"/>
                        
                    <div className="flex justify-between">
                        <p className="text-sm text-gray-200 font-semibold"> Total</p>
                        <p className="text-sm text-gray-200 relative font-bold">R$
                            <span className="text-sm text-gray-200 relative pb-10">
                                {(Number(calls?.amount ?? 0) + (selectedService?.amount ?? 0)).toFixed(2)}
                            </span>
                        </p>
                    </div>
                </div>
                
            </section>
        </main>
    )
}
