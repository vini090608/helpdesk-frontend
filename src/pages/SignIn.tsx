import { Input } from "../components/Input"
import { Button } from "../components/Button"

export function SignIn(){
    function onSubmit(e: React.FormEvent){
        e.preventDefault()
    }

    return (
        <div>
            <form onSubmit={onSubmit} className="bg-white border border-gray-500 rounded-2xl p-15 pt-2 mt-9 mb-8">
                <div className="mb-9 mt-6">
                    <h1 className="text-lg" >Acesse o portal</h1>
                    <span className="text-xs text-gray-300 ">Entre usando seu e-mail e senha cadastrados </span>
                </div>
                
                <Input required legend="E-mail" type="email" placeholder="seu@email.com"/>

                <Input required legend="Senha" type="password" placeholder="Digite sua senha"/>

                <Button type="submit">
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