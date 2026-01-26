import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { api } from "../services/api";

import Perfil from "../assets/user.png"
import Pencil from "../assets/icons/pen-line.svg";
import plus from "../assets/icons/inative/plus1.svg";
import { Button } from "../components/Button";

export function Technicals() {
    const [user, setUser] = useState<Technical[]>([]);
    const { session, isLoading } = useAuth();
    // const navigate = useNavigate();

    useEffect(() => {
    if (isLoading) return;
    if (!session) return;

    api.get("/users/").then((response) => {
    setUser(response.data.technicals);
    console.log(response.data.technicals.hour)
    });
    }, [isLoading, session]);

return (
    <main className="p-12">
        <div className="flex justify-between">
            <h1 className="text-xl text-blue-dark font-semibold mb-4">
            Técnicos
            </h1>
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
                        <th className="px-7 py-2 text-left">Email</th>
                        <th className="px-7 py-2 text-left">Disponibilidade</th>
                    </tr>
                </thead>

                <tbody>
                    {user.map((user) => (
                    <tr className="border-b border-gray-500 last:border-b-0">
                        <td className="px-7 py-2">
                            <div className="flex items-center gap-1">
                                <img src={Perfil} alt="perfil" className="rounded-full h-6 w-6"/>
                                <p className="text-xs font-medium">{user.name}</p>
                            </div>
                        </td>
                        <td className="px-7 py-2 text-xs text-gray-200">
                            {user.email}    
                        </td>
                        <td className="px-7 py-2 flex gap-1 items-center center text-xs text-gray-200 font-semibold">
                            {user.hour.map((hour) =>
                                <div className="border border-gray-500 rounded-2xl px-1 py-0.5 text-gray-400 font-normal">
                                    {hour.split("H")}:00
                                </div>
                            )}
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