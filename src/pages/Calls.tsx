// import { useEffect, useState } from "react"
// // import { AxiosError } from "axios"

// import { api } from "../../services/api"
// import { formatCurrency } from "../../utils/formatCurrency"
// import type { CallItemProps } from "../../components/CallTable"

// // interface CallAPIResponse {
// //   calls: CallItemProps[]
// // }

export function Calls() {
//   const [calls, setCalls] = useState<CallItemProps[]>([])

//   const [updatedAt, setUpdatedAt] = useState("")
//   const [id, setId] = useState("")
//   const [title, setTitle] = useState("")
//   const [category, setCategory] = useState("")
//   const [amount, setAmount] = useState("")
//   const [technicalName, setTechnicalName] = useState("")
//   const [status, setStatus] = useState("")

//   async function fetchCalls() {
//     try {
//       const response = await api.get<CallAPIResponse>("/calls", {
//         params: {
//           updatedAt: updatedAt,
//           id: id,
//           title: title,
//           category: category,
//           amount: amount,
//           technicalName: technicalName,
//           status: status,
//         },
//       })

//       setCalls(response.data.calls)

//     } catch (error) {
//       if (error instanceof AxiosError) {
//         alert(error.response?.data?.message ?? "Erro ao buscar chamados")
//         return
//       }
//     }
//   }

//   useEffect(() => {
//     fetchCalls()
//   }, [])

  return (
    <div className="bg-gray-600 w-7/8 p-12">
      <h1 className="text-xl text-blue-dark font-semibold mb-4">
        Meus chamados
      </h1>

      {/* <table className="w-full border-collapse">
        <thead>
          <tr>
            <th>Atualizado em</th>
            <th>ID</th>
            <th>Título</th>
            <th>Serviço</th>
            <th>Valor total</th>
            <th>Técnico</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {calls.map(call => (
            <tr key={call.id}>
              <td>{call.updatedAt}</td>
              <td>{call.id}</td>
              <td>{call.title}</td>
              <td>{call.category}</td>
              <td>{formatCurrency(call.amount)}</td>
              <td>{call.technicalName}</td>
              <td>{call.status}</td>
            </tr>
          ))}

          {calls.length === 0 && (
            <tr>
              <td colSpan={7} className="text-center">
                Nenhum chamado encontrado
              </td>
            </tr>
          )}
        </tbody>
      </table> */}
    </div>
  )
}
