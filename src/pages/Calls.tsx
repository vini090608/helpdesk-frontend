import { useEffect, useState } from "react"
import { api } from "../services/api"
import { useAuth } from "../hooks/useAuth"
import { Button } from "../components/Button";
import { useNavigate } from "react-router";

import Open from "../assets/icons/circle-help.svg"
import Process from "../assets/icons/active-clock-2 .svg"
import Ended from "../assets/icons/active-circle-check-big.svg"
import Eye from "../assets/icons/eye.svg"
import Pencil from "../assets/icons/pen-line.svg"

export function Calls() {
  const [calls, setCalls] = useState<CallAPIResponse[]>([])
  const { session, isLoading } = useAuth()
  const navigate = useNavigate()

  const id = Number(session?.user.id)

  useEffect(() => {
    if (isLoading) return
    if (!session) return
    if (!id) return
    const endpoint =
      session.user.role === "admin"
        ? "/calls/"
        : session.user.role === "client" || session.user.role === "technical"
          ? `/calls/option/${id}`
          : ""
    
    api.get(endpoint).then(response => {
      setCalls(response.data)
    })
  }, [isLoading, session, id])
  
  return (
    <main className="p-12">
      <h1 className="text-xl text-blue-dark font-semibold mb-4">
        Meus chamados
      </h1>

      <section className="w-fit border border-gray-400 rounded-2xl p-2">
        {session?.user.role ==="admin"?
        <table className="border-collapse">
          <thead>
            <tr className="text-sm text-gray-400 border-b border-gray-400">
              <th className="px-4 py-2 text-left">Atualizado em</th>
              <th className="px-4 py-2 text-left">Id</th>
              <th className="px-4 py-2 text-left">Título e Serviço</th>
              <th className="px-4 py-2 text-left">Valor total</th>
              <th className="px-4 py-2 text-left">Técnico</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {calls.map(call => (
              <tr key={call.id} className="border-b border-gray-400 last:border-b-0" >
                <td className="px-4 py-2 text-xs text-gray-200">
                  {call.updatedAt}
                </td>
                <td className="px-4 py-2 text-xs text-gray-200 font-bold">
                  {call.id}
                </td>
                <td className="px-4 py-2">
                  <p className="text-sm text-gray-200 font-bold">
                    {call.title}
                  </p>
                  <span className="text-xs text-gray-200">
                    {call.serviceName}
                  </span>
                </td>
                <td className="px-4 py-2 text-sm text-gray-200">
                  R$ {call.serviceAmount.toFixed(2)}
                </td>
                <td className="px-4 py-2 text-sm text-gray-200">
                  {call.technical ? call.technical.name : "Técnico não definido"}
                </td>
                <td className="px-4 py-2">
                  <div className={`flex justify-center items-center gap-1 px-1 py-1.5 text-sm text-gray-200 rounded-xl
                  ${call.status === "open" ? " bg-red-200" : ""}
                  ${call.status === "processing" ? "bg-blue-200" : ""}
                  ${call.status === "ended" ? "bg-green-200" : ""} `}>
                    <img src={call.status==="open"? Open : call.status==="processing"? Process : call.status==="ended"? Ended : ""} alt="" />
                    <p className={`font-medium ${call.status === "open" ? " text-feedback-open" : ""}
                    ${call.status === "processing" ? "text-feedback-progress" : ""}
                    ${call.status === "ended" ? "text-feedback-done" : ""} `}>
                      {call.status}
                    </p>
                  </div>
                </td>
                <td className="px-2 py-2">
                  <Button className="bg-gray-500 w-8 h-8" onClick={() => navigate(-1)}>
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
            <tr className="text-sm text-gray-400 border-b border-gray-400">
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
              <tr key={call.id} className="border-b border-gray-400 last:border-b-0" >
                <td className="px-4 py-2 text-xs text-gray-200">
                  {call.updatedAt}
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
                  ${call.status === "open" ? " bg-red-200" : ""}
                  ${call.status === "processing" ? "bg-blue-200" : ""}
                  ${call.status === "ended" ? "bg-green-200" : ""} `}>
                    <img src={call.status==="open"? Open : call.status==="processing"? Process : call.status==="ended"? Ended : ""} alt="" />
                    <p className={`font-medium ${call.status === "open" ? " text-feedback-open" : ""}
                    ${call.status === "processing" ? "text-feedback-progress" : ""}
                    ${call.status === "ended" ? "text-feedback-done" : ""} `}>
                      {call.status}
                    </p>
                  </div>
                </td>
                <td className="px-2 py-2">
                  <Button className="bg-gray-500 w-8 h-8" onClick={() => navigate(-1)}>
                    <img src={Eye} alt="" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        : session?.user.role ==="technical"?
        ""
        :
        ""
        }
        
      </section>

    </main>
  )
}
