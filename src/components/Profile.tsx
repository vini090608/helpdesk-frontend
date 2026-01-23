import close from "../assets/icons/inative/Button.svg";
import { Button } from "./Button";
import { Input } from "./Input";
import User from "../assets/user.png"
import { useState } from "react";
import { useNavigate } from "react-router";
import { api } from "../services/api";
import { z, ZodError } from "zod";
import { AxiosError } from "axios";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
};

const profileSchema = z.object({
    name: z.string().trim().min(1, {message: "Informe  ail" }),
    password: z.string().min(6, { message: "Senha deve ter pelo menos 6 dígitos" })
})

export function Profile({ isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;

  const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    async function onSubmit(e: React.FormEvent){
        e.preventDefault()

        try {
            setIsLoading(true)

            const data = profileSchema.parse({
                name, 
                email, 
                password,
            })

            await api.patch("/users", data)

            navigate("/")
        } catch (error) {
            console.log(error)

            if (error instanceof ZodError){
                return alert(error.issues[0].message)
            }

            if (error instanceof AxiosError){
                return alert(error.response?.data.message)
            }

            alert("Não foi possível cadastrar!")
        } finally {
            setIsLoading(false)
        }

    }
return (
    <div>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="fixed left-200 top-40 w-120 h-135 
                   bg-gray-600 rounded-2xl z-50 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <button onClick={onClose} className="absolute top-4 right-4">
            <img src={close} alt="Fechar" />
          </button>
          <h1 className="text-gray-200 text-heading-md mb-5">Perfil</h1>
          <div className="h-0.5 bg-gray-500 mb-5"/>
          <img src={User} alt="" className="rounded-full h-12 mb-5" />
        </div>
        <form onSubmit={onSubmit}>
          <Input 
            name="name" 
            required 
            legend="NOME"
            type="name"
            onChange={(e) => setName(e.target.value)}>
          </Input>
         
          <Input 
            name="email"
            required
            legend="E-MAIL"
            type="email"
            onChange={(e) => setEmail(e.target.value)}>
          </Input>
          
          <Input 
            name="password"
            required
            legend="SENHA"
            type="password"
            onChange={(e) => setPassword(e.target.value) }>
          </Input>
        </form>
      

        <div className="h-0.5 bg-gray-500 mb-10"/>
        <div>
          <Button type="submit" isLoading={isLoading} >Salvar</Button>
        </div>
      </div>
    </div>
  );
}