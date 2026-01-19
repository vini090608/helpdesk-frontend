import { useState } from "react"
import { z, ZodError } from "zod"
import { AxiosError } from "axios"
import { useNavigate } from "react-router"

import { api } from "../services/api"

import { Input } from "../components/Input"
import { Button } from "../components/Button"

const signUpSchema = z.object({
    name: z.string().trim().min(1, {message: "Informe o nome"}),
    email: z.string().email({ message: "Informe o e-mail" }),
    password: z.string().min(6, { message: "Senha deve ter pelo menos 6 dígitos" }),
    passwordConfirm: z.string({message: "Confirme a senha"})
}).refine((data) => data.password === data.passwordConfirm, {
    message: "As senhas não são iguais",
    path: ["passwordConfirm"]
})

export function SignUp(){
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    async function onSubmit(e: React.FormEvent){
        e.preventDefault()

        try {
            setIsLoading(true)

            const data = signUpSchema.parse({
                name, 
                email, 
                password,
            })

            await api.post("/users", data)
            if(confirm("Cadastrado com sucesso, Ir para tela de entrar?")){
                navigate("/")
            }   

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
            <form onSubmit={onSubmit} className="border border-gray-500 rounded-2xl p-15 pt-2 mt-9 mb-8">
                <div className="mb-9 mt-6">
                    <h1 className="text-lg" >Crie sua conta</h1>
                    <span className="text-xs text-gray-300 ">Informe seu nome, e-mail e senha </span>
                </div>
                <Input required legend="Nome" placeholder="seu nome" onChange={(e) => setName(e.target.value)}/>
                
                <Input required legend="E-mail" type="email" placeholder="seu@email.com" onChange={(e) => setEmail(e.target.value)}/>

                <Input required legend="Senha" type="password" placeholder="123456" onChange={(e) => setPassword(e.target.value)}/>

                <span className="text-xs text-gray-300 italic st">Minimo de 6 dígitos</span>

                <Button type="submit" isLoading={isLoading}>
                    Cadastrar
                </Button>
            </form>
            <div className="border border-gray-500 rounded-2xl">
                <div className="p-8">
                    <h2 className="text-md text-gray-200">Já tem uma conta?</h2>
                    <span className="text-xs text-gray-300 ">Entre agora mesmo</span>
                    <a href="/">
                        <Button isLoading={isLoading} className="mt-4 bg-gray-500 text-gray-200 hover:bg-gray-200 hover:text-white">
                            Acessar a conta
                        </Button>
                    </a>
                </div>
            </div>
        </div>
    )
}