import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Select } from "../../components/Select";

export function ClientNewCalls() {
  return (
    <main className="bg-gray-600 w-7/8 flex flex-col items-center">
        <div className="p-12">
            <h1 className="text-xl text-blue-dark pb-10"> Novo Chamado</h1>
            <form className="flex gap-12">
                <div className="border border-gray-500 p-4 rounded-2xl">
                    <div className="pb-6">
                        <h2 className="text-md text-gray-200">Informações</h2 >
                        <span className="text-xs text-gray-300">
                            Configure os dias e horários em que você está disponível para
                            atender chamados
                        </span>
                    </div>

                    <Input required legend="Título" type="text" name="" placeholder="Digite um título para o chamado" />
                    <br />
                    <Input required legend="Descrição" type="text" name="" placeholder="Descreva o que está acontecendo" />
                    <br />
                    <Select required legend="Categoria de serviço"></Select>
                </div>
                <div className="border border-gray-500 p-4 rounded-2xl w-75 h-75">
                    <h2 className="text-md text-gray-200">Resumo</h2 >
                    <span className="text-xs text-gray-300">Valores e detalhes</span>

                    <br />
                    <br />

                    <p className="text-xs text-gray-400 ">Categoria de serviço</p>


                    <p className="text-xs text-gray-400">Custo inicial</p>

                    <span className="text-xs text-gray-300"> O chamado será automaticamente atribuído a um técnico disponível</span>
                    <br />
                    <br />

                    <Button variant="md">
                        Criar chamado
                    </Button>
                </div>
            </form>
        </div>
    </main>
  );
}