import { Input } from "../components/Input"
import { Button } from "../components/Button"

export function SignUp(){
    function onSubmit(e: React.FormEvent){
        e.preventDefault()
    }

    return (
        <div>
            <form onSubmit={onSubmit} className="border border-gray-500 rounded-2xl p-15 pt-2 mt-9 mb-8">
                <div className="mb-9 mt-6">
                    <h1 className="text-lg" >Crie sua conta</h1>
                    <span className="text-xs text-gray-300 ">Informe seu nome, e-mail e senha </span>
                </div>
                <Input required legend="Nome" placeholder="seu nome" />
                
                <Input required legend="E-mail" type="email" placeholder="seu@email.com"/>

                <Input required legend="Senha" type="password" placeholder="123456"/>

                <span className="text-xs text-gray-300 italic st">Minimo de 6 dígitos</span>

                <Button type="submit">
                    Cadastrar
                </Button>
            </form>
            <div className="border border-gray-500 rounded-2xl">
                <div className="p-8">
                    <h2 className="text-md text-gray-200">Já tem uma conta?</h2>
                    <span className="text-xs text-gray-300 ">Entre agora mesmo</span>
                    <a href="SignIn">
                        <Button className="mt-4 bg-gray-500 text-gray-200 hover:bg-gray-200 hover:text-white">
                            Acessar a conta
                        </Button>
                    </a>
                </div>
            </div>
        </div>
    )
}