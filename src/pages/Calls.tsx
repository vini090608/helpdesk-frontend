import { useEffect, useState } from "react"
import { api } from "../services/api"
import { useAuth } from "../hooks/useAuth"
import { Button } from "../components/Button";
import { useNavigate } from "react-router";
import { AxiosError } from "axios";
import { ZodError } from "zod";

import Open from "../assets/icons/circle-help.svg"
import Process from "../assets/icons/active-clock-2 .svg"
import Ended from "../assets/icons/active-circle-check-big.svg"
import Eye from "../assets/icons/eye.svg"
import Pencil from "../assets/icons/pen-line.svg"

import Perfil from "../assets/user.png"
import Circle from "../assets/icons/hover/hover-circle-check-big.svg"
import Clock from "../assets/icons/hover/hover-plus.svg"

export function Calls() {
  const [calls, setCalls] = useState<CallAPIResponse[]>([])
  const { session, isLoading } = useAuth()
  const navigate = useNavigate()
  const formatDate = (date: string | Date) =>
    new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(new Date(date));

  
  async function Processing(id: number) {
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

  async function Ending(id: number) {
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

  const id = Number(session?.user.id)

  useEffect(() => {
    if (isLoading) return
    if (!session) return
    if (!id) return
    const endpoint = session.user.role === "client"
        ? `/calls/option/${id}`
        :
          "/calls"
    api.get(endpoint).then(response => {
      setCalls(response.data)
    })
  }, [isLoading, session, id])
  
  return (
    <main className="p-8">
      <h1 className="text-xl text-blue-dark font-semibold mb-4">
        Meus chamados
      </h1>

      <section className={`${session?.user.role==="technical"? null: "w-fit border border-gray-500 rounded-2xl p-2"}`}>
        {session?.user.role ==="admin"?
        <table className="border-collapse">
          <thead>
            <tr className="text-sm text-gray-400 border-b border-gray-500">
              <th className="px-4 py-2 text-left">Atualizado em</th>
              <th className="px-4 py-2 text-left">Id</th>
              <th className="px-4 py-2 text-left">Título</th>
              <th className="px-4 py-2 text-left">Serviço</th>
              <th className="px-4 py-2 text-left">Valor total</th>
              <th className="px-4 py-2 text-left">Cliente</th>
              <th className="px-4 py-2 text-left">Técnico</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {calls.map(call => (
              <tr key={call.id} className="border-b border-gray-500 last:border-b-0" >
                <td className="px-4 py-2 text-xs text-gray-200">
                  <p>{formatDate(call.updatedAt)}</p>
                </td>
                <td className="px-4 py-2 text-xs text-gray-200 font-semibold">
                  {call.id}
                </td>
                <td className="px-4 py-2 text-sm text-gray-200 font-semibold">
                  {call.title}
                </td>
                <td className="px-4 py-2 text-xs text-gray-200">
                  {call.serviceName}
                </td>
                <td className="px-4 py-2 text-sm text-gray-200">
                  R$ {call.serviceAmount.toFixed(2)}
                </td>
                <td className="px-4 py-2 text-sm text-gray-200">
                  {call.client ? call.client.name : null}
                </td>
                <td className="px-4 py-2 text-sm text-gray-200">
                  {call.technical ? call.technical.name : "Técnico não definido"}
                </td>
                <td className="px-4 py-2">
                  <div className={`flex justify-center items-center gap-1 px-1 py-1.5 text-sm text-gray-200 rounded-xl
                  ${call.status === "open" ? " bg-red-200" : null}
                  ${call.status === "processing" ? "bg-blue-200" : null}
                  ${call.status === "ended" ? "bg-green-200" : null} `}>
                    <img src={call.status==="open"? Open : call.status==="processing"? Process : call.status==="ended"? Ended : ""} alt="" />
                    <p className={`font-medium ${call.status === "open" ? " text-feedback-open" : null}
                    ${call.status === "processing" ? "text-feedback-progress" : null}
                    ${call.status === "ended" ? "text-feedback-done" : null} `}>
                      {call.status}
                    </p>
                  </div>
                </td>
                <td className="px-2 py-2">
                  <Button className="bg-gray-500 w-8 h-8" onClick={() => navigate(`/CallDetails/${call.id}`)}>
                    <img src={Pencil} alt="" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        : session?.user.role ==="client"?
        <table className="border-collapse">
          <thead>
            <tr className="text-sm text-gray-400 border-b border-gray-500">
              <th className="px-4 py-2 text-left">Atualizado em</th>
              <th className="px-4 py-2 text-left">Id</th>
              <th className="px-4 py-2 text-left">Título</th>
              <th className="px-4 py-2 text-left">Serviço</th>
              <th className="px-4 py-2 text-left">Valor total</th>
              <th className="px-4 py-2 text-left">Técnico</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {calls.map(call => (
              <tr key={call.id} className="border-b border-gray-500 last:border-b-0" >
                <td className="px-4 py-2 text-xs text-gray-200">
                  {formatDate(call.updatedAt)}
                </td>
                <td className="px-4 py-2 text-xs text-gray-200 font-semibold">
                  {call.id}
                </td>
                <td className="px-4 py-2 text-sm text-gray-200 font-semibold">
                  {call.title}
                </td>
                <td className="px-4 py-2 text-xs text-gray-200">
                  {call.serviceName}
                </td>
                <td className="px-4 py-2 text-sm text-gray-200">
                  R$ {call.serviceAmount.toFixed(2)}
                </td>
                <td className="px-4 py-2 text-sm text-gray-200">
                  {call.technical ? call.technical.name : "Técnico não definido"}
                </td>
                <td className="px-4 py-2">
                  <div className={`flex justify-center items-center gap-1 px-1 py-1.5 text-sm text-gray-200 rounded-xl
                  ${call.status === "open" ? " bg-red-200" : null}
                  ${call.status === "processing" ? "bg-blue-200" : null}
                  ${call.status === "ended" ? "bg-green-200" : null} `}>
                    <img src={call.status==="open"? Open : call.status==="processing"? Process : call.status==="ended"? Ended : ""} alt="" />
                    <p className={`font-medium ${call.status === "open" ? " text-feedback-open" : null}
                    ${call.status === "processing" ? "text-feedback-progress" : null}
                    ${call.status === "ended" ? "text-feedback-done" : null} `}>
                      {call.status}
                    </p>
                  </div>
                </td>
                <td className="px-2 py-2">
                  <Button className="bg-gray-500 w-8 h-8" onClick={() => navigate(`/CallDetails/${call.id}`)}>
                    <img src={Eye} alt="" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        : session?.user.role ==="technical"?
        <section>
          <div>
            <div>
              <div className="flex justify-center items-center gap-1 px-1 py-1.5 w-fit text-sm text-feedback-progress rounded-xl bg-blue-200">
                <img src={Process} alt="" />
                <p>Processing</p>
              </div>
              <div className="flex gap-4 py-6">
                {calls.map(call => (
                  call.status==="processing"?
                  <div className="border border-gray-500 w-fit p-3 rounded-2xl">
                    <div className="flex items-center gap-25 justify-between">
                      <span className="text-xs text-gray-400">{call.id}</span>
                      <div className="flex gap-2">
                        <Button className="bg-gray-500 w-14 h-10" onClick={() => navigate(`/CallDetails/${call.id}`)}>
                          <img src={Pencil} alt="" />
                        </Button>
                        <Button className="bg-gray-200 h-10 gap-1" onClick={() => Ending(call.id)}>
                          <img src={Circle} alt="" />
                          <span>Encerrar</span>
                        </Button>
                      </div>
                    </div>
                    <p className="font-medium tex-xs mt-3">{call.title}</p>
                    <span className="text-xs">{call.serviceName}</span>

                    <div className="flex justify-between mt-3">
                      <p className="text-xs text-gray-300">{formatDate(call.updatedAt)}</p>
                      <p className="text-xs text-gray-300">R$ {call.serviceAmount.toFixed(2)}</p>
                    </div>

                    <div className="h-0.5 bg-gray-500 my-2"></div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <img src={Perfil} alt="perfil" className="rounded-full h-6 w-6"/>
                        <p className="text-xs font-medium">{call.client.name}</p>
                      </div>
                      <div className="flex items-center justify-center rounded-full h-6 w-6 bg-blue-200">
                        <img src={Process} alt="" className="h-4 w-4"/>
                      </div>
                    </div>
                  </div>
                  :
                  null
              ))}
              </div>
            </div>
            
            <div>
              <div className="flex justify-center items-center gap-1 px-1 py-1.5 w-fit text-sm text-feedback-open rounded-xl bg-red-200">
                <img src={Open} alt="" />
                <p>Open</p>
              </div>
              <div className="flex gap-4 py-6">
                {calls.map(call => (
                  call.status==="open"?
                  <div className="border border-gray-500 w-fit p-3 rounded-2xl">
                    <div className="flex items-center gap-25 justify-between">
                      <span className="text-xs text-gray-400">{call.id}</span>
                      <div className="flex gap-2">
                        <Button className="bg-gray-500 w-14 h-10" onClick={() => navigate(`/CallDetails/${call.id}`)}>
                          <img src={Pencil} alt="" />
                        </Button>
                        <Button className="bg-gray-200 h-10 gap-1" onClick={() => Processing(call.id)}>
                          <img src={Clock} alt="" />
                          <span>Iniciar</span>
                        </Button>
                      </div>
                    </div>
                    <p className="font-medium tex-xs mt-3">{call.title}</p>
                    <span className="text-xs">{call.serviceName}</span>

                    <div className="flex justify-between mt-3">
                      <p className="text-xs text-gray-300">{formatDate(call.updatedAt)}</p>
                      <p className="text-xs text-gray-300">R$ {call.serviceAmount.toFixed(2)}</p>
                    </div>

                    <div className="h-0.5 bg-gray-500 my-2"></div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <img src={Perfil} alt="perfil" className="rounded-full h-6 w-6"/>
                        <p className="text-xs font-medium">{call.client.name}</p>
                      </div>
                      <div className="flex items-center justify-center rounded-full h-6 w-6 bg-red-200">
                        <img src={Open} alt="" className="h-4 w-4"/>
                      </div>
                    </div>
                  </div>
                  :
                  null
              ))}
              </div>
            </div>
            
            <div>
              <div className="flex justify-center items-center gap-1 px-1 py-1.5 w-fit text-sm text-feedback-done rounded-xl bg-green-200">
                <img src={Ended} alt="" />
                <p>Ended</p>
              </div>
              <div className="flex gap-4 py-6">
                {calls.map(call => (
                  call.status==="ended"?
                  <div className="border border-gray-500 w-fit p-3 rounded-2xl">
                    <div className="flex items-center gap-25 justify-between">
                      <span className="text-xs text-gray-400">{call.id}</span>
                      <div className="flex gap-2">
                        <Button className="bg-gray-500 w-14 h-10" onClick={() => navigate(`/CallDetails/${call.id}`)}>
                          <img src={Eye} alt="" />
                        </Button>
                      </div>
                    </div>
                    <p className="font-medium tex-xs pt-2">{call.title}</p>
                    <span className="text-xs">{call.serviceName}</span>

                    <div className="flex justify-between mt-3">
                      <p className="text-xs text-gray-300">{formatDate(call.updatedAt)}</p>
                      <p className="text-xs text-gray-300">R$ {call.serviceAmount.toFixed(2)}</p>
                    </div>

                    <div className="h-0.5 bg-gray-500 my-2"></div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <img src={Perfil} alt="perfil" className="rounded-full h-6 w-6"/>
                        <p className="text-xs font-medium">{call.client.name}</p>
                      </div>
                      <div className="flex items-center justify-center rounded-full h-6 w-6 bg-green-200">
                        <img src={Ended} alt="" className="h-4 w-4"/>
                      </div>
                    </div>
                  </div>
                  :
                  null
              ))}
              </div>
            </div>
          </div>  
        </section>
        :
        null
        }
        
      </section>

    </main>
  )
}
