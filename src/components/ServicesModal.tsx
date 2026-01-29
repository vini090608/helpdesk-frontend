import { Button } from "./Button";
import { Input } from "./Input";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router";
import { api } from "../services/api";
// import { useAuth } from "../hooks/useAuth";

import close from "../assets/icons/inactive/Button.svg";
import z, { ZodError } from "zod";
import { AxiosError } from "axios";

type UploadProps = {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  Search?: string
};

const ServiceScheme = z.object({
  serviceName: z.string().min(3, { message: "Nome inválido" }),
  amount: z.number().positive({ message: "Valor deve ser positivo" })
});


export function ServicesModal({ isOpen, onClose, Search }: UploadProps) {
  const [serviceName, setServiceName] = useState("")
  const [amount, setAmount] = useState<Number>(0)
  const [isLoading, setIsLoading] = useState(false)
  
//   const navigate = useNavigate()
  
  useEffect(() => {
  if (!Search) return;

    api.get(`/services/${Search}`).then((response) => {
        setServiceName(response.data.name);
        setAmount(response.data.amount);
    });
    }, [Search]);




  if (!isOpen) return null;
  
    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (Search) {
                await api.patch(`/services/${Search}`, {
                    serviceName: serviceName || undefined, 
                    amount: amount || undefined
                });
            } else {
                const data = ServiceScheme.parse({ serviceName, amount });
                await api.post("/services", data);
            }
            onClose()
            window.location.reload()
        } catch (error) {
            console.log(error);
            if (error instanceof ZodError) alert(error.issues[0].message);
            else if (error instanceof AxiosError) alert(error.response?.data.message);
            else alert("Não foi possível cadastrar!");
        } finally {
            setIsLoading(false);
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
          <Input name="name" autoComplete="off" placeholder="Nome do serviço" legend="NOME" type="text" onChange={(e) => setServiceName(e.target.value)} />

          <Input name="amount" autoComplete="off" placeholder="R$ 0.00" legend="Valor" type="text" onChange={(e) => setAmount(Number(e.target.value))}/>

          <Button type="submit" isLoading={isLoading}>Salvar</Button>
        </form>

      </div>
    </main>
  );
}
