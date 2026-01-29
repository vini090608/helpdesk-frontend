import { Button } from "./Button";
import { Input } from "./Input";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { api } from "../services/api";

import User from "../assets/user.png"
import close from "../assets/icons/inactive/Button.svg";

type UploadProps = {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  Search: Number
};

export function UploadUsers({ isOpen, onClose, Search }: UploadProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  
  const navigate = useNavigate()
  const [user, setUser] = useState<UserAPIResponse>() 

  
  useEffect(() => {
    if (isLoading) return;
    if (!Search) return;
    
    api.get(`/users/${Search}`).then((response) => {
      setUser(response.data);
    });
  }, [isLoading, Search]);

  if (!isOpen) return null;
  
  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!user?.user.id) return

    setIsLoading(true)

    try {
      await api.patch(`/users/${Search}`, {
        name: name || undefined,
        email: email || undefined,
        password: password || undefined,
      })
      navigate(-1)
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <main>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/40 z-40"/>

      {/* Modal */}
      <div className="fixed left-170 top-40 w-fit h-fit min-w-100 bg-gray-600 rounded-2xl z-50 p-6">
        <div>
          <button onClick={onClose} className="absolute top-4 right-4">
            <img src={close} alt="Fechar" />
          </button>
          <h1 className="text-gray-200 text-heading-md mb-5">Perfil</h1>
          <div className="h-0.5 bg-gray-500 mb-5"/>
        </div>
        <form onSubmit={onSubmit}>
          <div className="flex gap-2">
            <img src={User} alt="" className="rounded-full h-12 mb-5 border border-gray-400" />
            <div>
              <p className="text-gray-300">{user?.user.name}</p>
              <p className="text-gray-400">{user?.user.email}</p>
            </div>
          </div>
          <Input name="name" autoComplete="off" defaultValue={user?.user.name} legend="NOME" type="text" onChange={(e) => setName(e.target.value)} />

          <Input name="email" autoComplete="off" defaultValue={user?.user.email} legend="E-MAIL" type="email" onChange={(e) => setEmail(e.target.value)}/>

          <Input name="password" autoComplete="off" legend="SENHA" type="password" onChange={(e) => setPassword(e.target.value) }/>

          <div className="h-0.5 bg-gray-500"/>
          {user?.user.role === "technical" ? (
            <div className="flex flex-col gap-0.5 p-2">
              <div className="flex flex-col">
                <h2 className="text-sm text-gray-200">Disponibilidade</h2>
                <p className="text-xs text-gray-300">Horários de atendimento definidos pelo admin</p>
              </div>
              <div className="flex pt-2">
                {user?.user.hour.map((hour) => (
                  <div key={hour} className="border border-gray-500 rounded-2xl px-1 py-0.5 w-fit text-gray-400 font-normal" >
                    {hour.replace("H", "")}:00
                  </div>
                ))}
              </div>
              <div className="h-0.5 bg-gray-500 my-3"/>
            </div>)
          : 
            null
          }
          <Button type="submit" isLoading={isLoading}>Salvar</Button>
        </form>

      </div>
    </main>
  );
}