import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { api } from "../services/api";

import Perfil from "../assets/user.png"
import trash from "../assets/icons/trash.svg";
import Pencil from "../assets/icons/pen-line.svg";
import { Button } from "../components/Button";



export function Clients() {
    const [user, setUser] = useState<Client[]>([]);
    const { session, isLoading } = useAuth();
    // const navigate = useNavigate();

    useEffect(() => {
    if (isLoading) return;
    if (!session) return;

    api.get("/users/").then((response) => {
    setUser(response.data.clients);
    });
    }, [isLoading, session]);

return (
    <main className="p-12">
        <h1 className="text-xl text-blue-dark font-semibold mb-4">
        Clientes
        </h1>

        <section className="w-fit border border-gray-500 rounded-xl p-2">
            <table className="border-collapse">
                <thead>
                    <tr className="text-sm text-gray-400 border-b border-gray-500">
                        <th className="px-7 py-2 text-left">Nome</th>
                        <th className="px-70 py-2 text-left">Email</th>
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
                        <td className="px-70 py-2 text-xs text-gray-200">
                        {user.email}
                        </td>

                        <td className="px-2 py-2">
                            <Button className="bg-gray-500 w-8 h-8">
                            <img src={trash} alt="" />
                            </Button>
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