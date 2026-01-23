import { useEffect, useState } from "react"
import { api } from "../services/api"
import { useAuth } from "../hooks/useAuth"
import { formatCurrency } from "../utils/formatCurrency"

export function Calls() {
  const [calls, setCalls] = useState<CallAPIResponse[]>([])
  const { session, isLoading } = useAuth()

  const id = Number(session?.user.id)

  useEffect(() => {
    if (isLoading) return
    if (!session) return
    if (!id) return

    api.get(`/calls/option/${id}`).then(response => {
      setCalls(response.data)
    })
    
    
  }, [isLoading, session, id])
  console.log(calls)

  return (
    <div className="p-12">
      <h1 className="text-xl text-blue-dark font-semibold mb-4">
        Meus chamados
      </h1>

      <table>
        <thead>
          <tr className="text-xs text-gray-400 gap-8">
            <td>Atualizado em</td>
            <td>Id</td>
            <td>Título e Serviço</td>
            <td>Valor total</td>
            <td>Técnico</td>
            <td>Status</td>
          </tr>
        </thead>

        <tbody>
          {calls.map(call => (
            <tr>
              <td className="text-xs text-gray-200">{call.updatedAt}</td>
              <td className="text-xs text-gray-200 font-bold">{call.id}</td>
              <td><p className="text-sm text-gray-200 font-bold">{call.title}</p><span className="text-xs text-gray-200 font-bold">{call.category}</span></td>
              <td>{call.amount}</td>
              <td>{call.technical=== null ? "T" : call.technical.name}</td>
              <td>{call.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
