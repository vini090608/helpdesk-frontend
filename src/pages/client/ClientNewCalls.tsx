// import { useActionState } from "react"
// import { z, ZodError} from "zod"
// import { AxiosError } from "axios"

// import { api } from "../../services/api"
// import { useAuth } from "../../hooks/useAuth"

// import { Input } from "../../components/Input";
// import { Button } from "../../components/Button";
// import { Select } from "../../components/Select";

// const CallScheme = z.object({
//     email: z.string({message: "Invalid Email"}),
//     password: z.string().trim().min(1, {message: "Write the password"})
// })

// export function ClientNewCalls() {
//     const [state, formAction, isLoading] = useActionState( Call, null)
    
//         const auth = useAuth()
    
//         async function Call(_: any ,formData: FormData){
//             try {
//                 const data = CallScheme.parse({
//                     email: formData.get("email"),
//                     password: formData.get("password"),
//                 })
    
//                 const response = await api.post("/sessions", data)
//                 auth.save(response.data)
    
//             } catch (error) {
//                 console.log(error)
    
//                 if(error instanceof ZodError){
//                     return { message: error.issues[0].message}
//                 }
    
//                 if(error instanceof AxiosError){
//                     return { message: error.response?.data.message}
//                 }
    
//                 return { message: "Não foi possível entrar!" }
//             }
//         }
//   return (
//     <main className="bg-gray-600 w-7/8 flex flex-col items-center">
//         <div className="p-12">
//             <h1 className="text-xl text-blue-dark pb-10"> Novo Chamado</h1>
//             <form action={formAction} className="flex gap-12">
//                 <div className="border border-gray-500 p-4 rounded-2xl">
//                     <div className="pb-6">
//                         <h2 className="text-md text-gray-200">Informações</h2 >
//                         <span className="text-xs text-gray-300">
//                             Configure os dias e horários em que você está disponível para
//                             atender chamados
//                         </span>
//                     </div>

//                     <Input required legend="Título" type="text" name="" placeholder="Digite um título para o chamado" />
//                     <br />
//                     <Input required legend="Descrição" type="text" name="" placeholder="Descreva o que está acontecendo" />
//                     <br />
//                     <Select required legend="Categoria de serviço"></Select>
//                     <p className="text-sm text-feedback-danger text-center my-4 font-medium">
//                         {
//                             state?.message
//                         }   
//                     </p>
//                 </div>
//                 <div className="border border-gray-500 p-4 rounded-2xl w-75 h-82">
//                     <h2 className="text-md text-gray-200">Resumo</h2 >
//                     <p className="text-xs text-gray-300 relative pb-5">Valores e detalhes</p>

//                     <p className="text-xs text-gray-400">Categoria de serviço</p>
//                     <p className="text-sm text-gray-200 relative pb-5"> Erro de rede</p>
//                     <p className="text-xs text-gray-400">Custo inicial</p>
//                     <p className="text-xs text-gray-200 relative pb-5">R$ <span className="text-lg text-gray-200 relative pb-10">200,00</span></p>

//                     <span className="text-xs text-gray-300"> O chamado será automaticamente atribuído a um técnico disponível</span>

//                     <br />
//                     <br />

//                     <Button variant="md" isLoading={isLoading}>
//                         Criar chamado
//                     </Button>
//                 </div>
//             </form>
//         </div>
//     </main>
//   );
// }