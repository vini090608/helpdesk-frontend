import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { api } from "../services/api";

import Pencil from "../assets/icons/pen-line.svg";
import { Button } from "../components/Button";
import plus from "../assets/icons/inative/plus1.svg";
import ban from "../assets/icons/inative/ban.svg"
import check from "../assets/icons/inative/circle-check.svg"

export function Services() {
    const [service, setServices] = useState<Service[]>([]);
    const { session, isLoading } = useAuth();
    // const navigate = useNavigate();

    useEffect(() => {
        if (isLoading) return;
        if (!session) return;

        api.get("/services/").then((response) => {
        setServices(response.data);
        console.log(service);
        });
        }, [isLoading, session]);

    return (
        <main className="p-12">
            <div className="flex justify-between">
                <h1 className="text-xl text-blue-dark font-semibold mb-4">Serviços</h1>
                <Button className="w-fit h-fit py-3 px-3">
                    <img src={plus} alt="" />
                    Novo
                </Button>
                </div>

                <section className="w-fit border border-gray-500 rounded-xl p-2">
                    <table className="border-collapse">
                        <thead>
                            <tr className="text-sm text-gray-400 border-b border-gray-500">
                                <th className="px-7 py-2 text-left">Nome</th>
                                <th className="px-7 py-2 text-left">Valor</th>
                                <th className="px-60 py-2 text-left">Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {service.map((service) => (
                            <tr className="border-b border-gray-500 last:border-b-0">
                                <td className="px-7 py-2 text-xs text-gray-200">
                                    {service.name}
                                </td>
                                <td className="px-7 py-2 text-xs text-gray-200 ">
                                    R$ {service.amount.toFixed(2)}
                                </td>
                                <td className="px-60 py-2">
                                <div className={`flex justify-center items-center gap-1 px-1 py-1.5 text-xs text-gray-200 font-medium rounded-xl ${service.status === "inative" ? " bg-red-200 text-red-800" : "bg-green-200 text-green-800"} `}>
                                    {service.status === "active" ? "Ativo" : "Inativo"}
                                </div>
                                </td>
                                <td className="px-7 py-2 ">
                                    {service.status === "active" ?
                                    <button className="flex gap-2 text-xs text-gray-300">
                                        <img src={ban} alt="" />
                                        Desativar
                                    </button>
                                :
                                    <button className="flex gap-2 text-xs text-gray-300">
                                        <img src={check} alt="" />
                                        Reativar
                                    </button>
                                }

                                </td>

                                <td className="px-2 py-2">
                                    <Button className="bg-gray-500 w-8 h-8">
                                        <img src={Pencil} alt="" />
                                    </Button>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
        </main>
    );
}