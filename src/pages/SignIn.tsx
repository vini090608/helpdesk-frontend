import { useActionState } from "react"
import { z, ZodError} from "zod"
import { AxiosError } from "axios"

import { api } from "../services/api"

import { Input } from "../components/Input"
import { Button } from "../components/Button"
import { useAuth } from "../hooks/useAuth"


const SignInScheme = z.object({
    email: z.string({message: "Invalid Email"}),
    password: z.string().trim().min(1, {message: "Write the password"})
})

export function SignIn(){
    const [state, formAction, isLoading] = useActionState( SignIn, null)

    const auth = useAuth()

    async function SignIn(_: any ,formData: FormData){
        try {
            const data = SignInScheme.parse({
                email: formData.get("email"),
                password: formData.get("password"),
            })

            const response = await api.post("/sessions", data)
            auth.save(response.data)

        } catch (error) {
            console.log(error)

            if(error instanceof ZodError){
                return { message: error.issues[0].message}
            }

            if(error instanceof AxiosError){
                return { message: error.response?.data.message}
            }

            return { message: "Não foi possível entrar!" }
        }
    }

    return (
        <div>
            <form action={formAction} className="bg-white border border-gray-500 rounded-2xl p-15 pt-2 mt-9 mb-8">
                <div className="mb-9 mt-6">
                    <h1 className="text-lg" >Acesse o portal</h1>
                    <span className="text-xs text-gray-300 ">Entre usando seu e-mail e senha cadastrados </span>
                </div>
                
                <Input required legend="E-mail" type="email" placeholder="seu@email.com"/>

                <Input required legend="Senha" type="password" placeholder="Digite sua senha"/>

                <p className="text-sm text-feedback-danger text-center my-4 font-medium">
                    {
                        state?.message
                    }
                </p>

                <Button type="submit" isLoading={isLoading}>
                    Entrar
                </Button>
            </form>
            <div className="bg-white border border-gray-500 rounded-2xl">
                <div className="p-8">
                    <h2 className="text-md text-gray-200">Ainda não tem uma conta?</h2>
                    <span className="text-xs text-gray-300 ">Crie agora mesmo</span>
                    <a href="SignUp">
                        <Button className="mt-4 bg-gray-500 text-gray-200 hover:bg-gray-200 hover:text-white">
                            Criar conta
                        </Button>
                    </a>
                </div>
            </div>
        </div>
    )
}