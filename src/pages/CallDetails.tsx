import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { Button } from "../components/Button"
import { useAuth } from "../hooks/useAuth";
import { api } from "../services/api";

import left from "../assets/icons/inactive/arrow-left.svg"

export function CallDetails(){
    const navigate = useNavigate()
    const { id } = useParams();
    const [calls, setCalls] = useState<CallAPIResponse>()
    const { session, isLoading } = useAuth()


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
            <div>
                <Button onClick={() => navigate(-1)} className="justify-start border-transparent bg-transparent flex hover:border-transparent hover:bg-transparent">
                    <img src={left} alt="" className="flex"/>
                    <span className="text-gray-300 text-xs mt-0.5">Voltar</span>
                </Button>
                <h1 className="text-xl text-blue-dark font-semibold mb-4">
                    Detalhes do chamados
                </h1>
            </div>

          <section className="flex gap-12 mb-10">
            <div className="border border-gray-500 p-4 rounded-2xl w-120 h-75">
                <div className="pb-6">
                <div>
                    <h2 className="text-xs text-gray-300 font-semibold">{calls?.id}</h2>
                </div>
                <span className="text-mb text-gray-200">
                    {calls?.title}
                </span>
                </div>

                <span className="text-xs text-gray-400 ">Descrição</span>
                <p className="text-sm text-gray-200 mb-5">{calls?.description}</p>

                <span className="text-xs text-gray-400">Categoria</span>
                <p className="text-sm text-gray-200 mb-5">{calls?.serviceName}</p>

                <div className="flex justify-between">
                    <div>
                        <span className="text-xs text-gray-400">Criado em</span>
                        <p className="text-sm text-gray-200 mb-5">12/04/25 09:12</p>
                    </div>
                    <div>
                        <span className="text-xs text-gray-400">Atualizado em</span>
                        <p className="text-sm text-gray-200">{calls?.updatedAt}</p>
                    </div>
                </div>
                <div>
                    
                </div>
            </div>


            <div className="border border-gray-500 p-4 rounded-2xl w-100 h-70">
                <p className="text-sm text-gray-200">Técnico responsável</p>
                <h2 className="text-md text-gray-200">{calls?.technical?.name}</h2>
                <p className="text-xs text-gray-300 relative pb-5">{calls?.technical?.email}</p>
                <p className="text-xs text-gray-400">Valores</p>
                <div className="flex justify-between">
                    <p className="text-xs text-gray-200 pb-3.5">Preço base</p>
                    <p className="text-xs text-gray-200 pb-3.5">
                        R${calls?.serviceAmount}
                        <span className="text-xs text-gray-200 relative pb-10">

                        </span>
                    </p>
                </div>

                <p className="text-xs text-gray-400"> Adicionais</p>
                <div className="flex justify-between">
                <p className="text-xs text-gray-200"> Assinatura de backup</p>
                <p className="text-xs text-gray-200 relative pb-5">
                    R${" "}
                    <span className="text-xs text-gray-200 relative pb-10">

                    </span>
                </p>
                </div>
                <div className="flex justify-between">
                <p className="text-xs text-gray-200"> Formatação do PC</p>
                <p className="text-xs text-gray-200 relative pb-5">
                    R${" "}
                    <span className="text-xs text-gray-200 relative pb-10">

                    </span>
                </p>
                </div>

                <div className="bg-gray-500 h-0.5 w-full"/>
                
                <div className="flex justify-between">
                <p className="text-sm text-gray-200"> Total</p>
                <p className="text-sm text-gray-200 relative pb-5">
                    R${" "}
                    <span className="text-sm text-gray-200 relative pb-10">

                    </span>
                </p>
                </div>
            </div>
            </section>
        </main>
    )
}
