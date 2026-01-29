import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import { useAuth } from "../hooks/useAuth";
import { api } from "../services/api";
import { z, ZodError } from "zod";

import Left from "../assets/icons/inactive/arrow-left.svg";
import Cross from "../assets/icons/hover/hover-x.svg"

import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { AxiosError } from "axios";

const technicallsSchema = z.object({
    name: z.string().trim().min(1, {message: "Informe o nome"}),
    email: z.string().email({ message: "Informe o e-mail" }),
    password: z.string().min(6, { message: "Senha deve ter pelo menos 6 dígitos" }),
    role: z.enum(["client", "technical", "admin"]),
    hour: z.array(z.enum(["H07" ,"H08", "H09", "H10", "H11", "H12", "H13", "H14", "H15", "H16", "H17", "H18", "H19", "H20", "H21", "H22", "H23"]))
})

export function LoginTechnicals() {
  const navigate = useNavigate();
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [hour, setHour] = useState<UserAPIHour[]>([])
  const [isLoading, setIsLoading] = useState(false)
  
  // const user = useAuth()

  function toggleHour(value: UserAPIHour, checked: boolean) {
    setHour(prev =>
      checked
        ? [...prev, value] // adiciona
        : prev.filter(h => h !== value) // remove
    );
  }



  async function onSubmit(e: React.FormEvent){
          e.preventDefault()
  
          try {
              setIsLoading(true)
  
              const data = technicallsSchema.parse({
                  name, 
                  email, 
                  password,
                  role: "technical",
                  hour
              })
  
              await api.post("/users", data)
              console.log(data)
              // navigate(-1)  
  
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
     <main className="p-8">
      <form onSubmit={onSubmit}>
        <div className="flex justify-between items-center">
          <div>
            <Button isLoading={isLoading} onClick={() => navigate(-1)} className="justify-start border-transparent bg-transparent flex hover:border-transparent hover:bg-transparent">
                <img src={Left} alt=""/>
                <span className="text-gray-300 text-xs">Voltar</span>
            </Button>
            <h1 className="text-xl text-blue-dark font-semibold mb-4">
                Perfil Técnico
            </h1>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => navigate(-1)} isLoading={isLoading} className="gap-2 p-4 text-nowrap text-gray-200 text-sm font-semibold bg-gray-500 hover:bg-gray-100 hover:text-gray-600" >
                <span>Cancelar</span>
            </Button>
            <Button type="submit" isLoading={isLoading} className="gap-2 p-4 text-gray-600 text-sm font-semibold bg-gray-100 hover:bg-gray-500 hover:text-gray-200">
                <span>Salvar</span>
            </Button>
          </div>  
        </div>
        <section className="flex gap-12 mb-10">
          <div className="border border-gray-500 p-4 w-80 rounded-2xl">
            <div className="pb-6">
                <h2 className="text-md text-gray-200 font-semibold">Dados pessoais</h2 >
                <span className="text-xs text-gray-300">
                    Defina as informações do perfil de técnico
                </span>
            </div>
            <Input name="name" required legend="Nome" type="text" placeholder="Nome completo" onChange={(e) => setName(e.target.value)}/>
            <Input name="e-mail" required legend="E-mail" type="email" placeholder="exemplo@mail.com" onChange={(e) => setEmail(e.target.value)}/>
            <Input name="password" required legend="Senha" type="password" placeholder="Defina a senha de acesso" onChange={(e) => setPassword(e.target.value)}/>
            <span className="text-xs text-gray-400 italic">Mínimo de 6 dígitos  </span>
          </div>
          <div className="border border-gray-500 p-4 rounded-2xl w-120 h-fit">
            <div className="pb-6">
              <h2 className="text-md text-gray-200 font-semibold">Horários de atendimento</h2 >
              <span className="text-xs text-gray-300 text-wrap">
                  Selecione os horários de disponibilidade do técnico para atendimento
              </span>
            </div>
            <p className="uppercase text-xxs text-gray-300">Manhã</p>
            <div className="flex gap-2 p-2 items-center text-xs text-gray-200 font-medium">
              <label htmlFor="hour07" className="group cursor-pointer flex items-center gap-1">

                <input name="hour" id="hour07" type="checkbox" className="hidden peer" onChange={(e) => toggleHour("H07", e.target.checked)}/>
                <div className="py-1 px-2 border border-gray-400 rounded-2xl text-xs group-has-checked:bg-blue-base group-has-checked:border-blue-base group-has-checked:text-gray-600 flex gap-1">
                  07:00
                  <img src={Cross} className="hidden group-has-checked:inline" />
                </div>
              </label>

              <label htmlFor="hour08" className="group cursor-pointer flex items-center gap-1">
                <input name="hour" id="hour08" type="checkbox" className="hidden peer" onChange={(e) => toggleHour("H08", e.target.checked)}/>
                <div className="py-1 px-2 border border-gray-400 rounded-2xl text-xs group-has-checked:bg-blue-base group-has-checked:border-blue-base group-has-checked:text-gray-600 flex gap-1">
                  08:00
                  <img src={Cross} className="hidden group-has-checked:inline" />
                </div>
              </label>
              <label htmlFor="hour09" className="group cursor-pointer flex items-center gap-1">
                <input name="hour" id="hour09" type="checkbox" className="hidden peer" onChange={(e) => toggleHour("H09", e.target.checked)}/>
                <div className="py-1 px-2 border border-gray-400 rounded-2xl text-xs group-has-checked:bg-blue-base group-has-checked:border-blue-base group-has-checked:text-gray-600 flex gap-1">
                  09:00
                  <img src={Cross} className="hidden group-has-checked:inline" />
                </div>
              </label>
              <label htmlFor="hour10" className="group cursor-pointer flex items-center gap-1">
                <input name="hour" id="hour10" type="checkbox" className="hidden peer" onChange={(e) => toggleHour("H10", e.target.checked)}/>
                <div className="py-1 px-2 border border-gray-400 rounded-2xl text-xs group-has-checked:bg-blue-base group-has-checked:border-blue-base group-has-checked:text-gray-600 flex gap-1">
                  10:00
                  <img src={Cross} className="hidden group-has-checked:inline" />
                </div>
              </label>
              <label htmlFor="hour11" className="group cursor-pointer flex items-center gap-1">
                <input name="hour" id="hour11" type="checkbox" className="hidden peer" onChange={(e) => toggleHour("H11", e.target.checked)}/>
                <div className="py-1 px-2 border border-gray-400 rounded-2xl text-xs group-has-checked:bg-blue-base group-has-checked:border-blue-base group-has-checked:text-gray-600 flex gap-1">
                  11:00
                  <img src={Cross} className="hidden group-has-checked:inline" />
                </div>
              </label>
              <label htmlFor="hour12" className="group cursor-pointer flex items-center gap-1">
                <input name="hour" id="hour12" type="checkbox" className="hidden peer" onChange={(e) => toggleHour("H12", e.target.checked)}/>
                <div className="py-1 px-2 border border-gray-400 rounded-2xl text-xs group-has-checked:bg-blue-base group-has-checked:border-blue-base group-has-checked:text-gray-600 flex gap-1">
                  12:00
                  <img src={Cross} className="hidden group-has-checked:inline" />
                </div>
              </label>

            </div>
            <p className="uppercase text-xxs text-gray-300">Tarde</p>
            <div className="flex gap-2 p-2 items-center text-xs text-gray-200 font-medium">

              <label htmlFor="hour13" className="group cursor-pointer flex items-center gap-1">
                <input name="hour" id="hour13" type="checkbox" className="hidden peer" onChange={(e) => toggleHour("H13", e.target.checked)}/>
                <div className="py-1 px-2 border border-gray-400 rounded-2xl text-xs group-has-checked:bg-blue-base group-has-checked:border-blue-base group-has-checked:text-gray-600 flex gap-1">
                  13:00
                  <img src={Cross} className="hidden group-has-checked:inline" />
                </div>
              </label>
              <label htmlFor="hour14" className="group cursor-pointer flex items-center gap-1">
                <input name="hour" id="hour14" type="checkbox" className="hidden peer" onChange={(e) => toggleHour("H14", e.target.checked)}/>
                <div className="py-1 px-2 border border-gray-400 rounded-2xl text-xs group-has-checked:bg-blue-base group-has-checked:border-blue-base group-has-checked:text-gray-600 flex gap-1">
                  14:00
                  <img src={Cross} className="hidden group-has-checked:inline" />
                </div>
              </label>
              <label htmlFor="hour15" className="group cursor-pointer flex items-center gap-1">
                <input name="hour" id="hour15" type="checkbox" className="hidden peer" onChange={(e) => toggleHour("H15", e.target.checked)}/>
                <div className="py-1 px-2 border border-gray-400 rounded-2xl text-xs group-has-checked:bg-blue-base group-has-checked:border-blue-base group-has-checked:text-gray-600 flex gap-1">
                  15:00
                  <img src={Cross} className="hidden group-has-checked:inline" />
                </div>
              </label>
              <label htmlFor="hour16" className="group cursor-pointer flex items-center gap-1">
                <input name="hour" id="hour16" type="checkbox" className="hidden peer" onChange={(e) => toggleHour("H16", e.target.checked)}/>
                <div className="py-1 px-2 border border-gray-400 rounded-2xl text-xs group-has-checked:bg-blue-base group-has-checked:border-blue-base group-has-checked:text-gray-600 flex gap-1">
                  16:00
                  <img src={Cross} className="hidden group-has-checked:inline" />
                </div>
              </label>
              <label htmlFor="hour17" className="group cursor-pointer flex items-center gap-1">
                <input name="hour" id="hour17" type="checkbox" className="hidden peer" onChange={(e) => toggleHour("H17", e.target.checked)}/>
                <div className="py-1 px-2 border border-gray-400 rounded-2xl text-xs group-has-checked:bg-blue-base group-has-checked:border-blue-base group-has-checked:text-gray-600 flex gap-1">
                  17:00
                  <img src={Cross} className="hidden group-has-checked:inline" />
                </div>
              </label>
              <label htmlFor="hour18" className="group cursor-pointer flex items-center gap-1">
                <input name="hour" id="hour18" type="checkbox" className="hidden peer" onChange={(e) => toggleHour("H18", e.target.checked)}/>
                <div className="py-1 px-2 border border-gray-400 rounded-2xl text-xs group-has-checked:bg-blue-base group-has-checked:border-blue-base group-has-checked:text-gray-600 flex gap-1">
                  18:00
                  <img src={Cross} className="hidden group-has-checked:inline" />
                </div>
              </label>
            </div>

            <p className="uppercase text-xxs text-gray-300">Noite</p>
            <div className="flex gap-2 p-2 items-center text-xs text-gray-200 font-medium">

              <label htmlFor="hour19" className="group cursor-pointer flex items-center gap-1">
                <input name="hour" id="hour19" type="checkbox" className="hidden peer" onChange={(e) => toggleHour("H19", e.target.checked)}/>
                <div className="py-1 px-2 border border-gray-400 rounded-2xl text-xs group-has-checked:bg-blue-base group-has-checked:border-blue-base group-has-checked:text-gray-600 flex gap-1">
                  19:00
                  <img src={Cross} className="hidden group-has-checked:inline" />
                </div>
              </label>
              <label htmlFor="hour20" className="group cursor-pointer flex items-center gap-1">
                <input name="hour" id="hour20" type="checkbox" className="hidden peer" onChange={(e) => toggleHour("H20", e.target.checked)}/>
                <div className="py-1 px-2 border border-gray-400 rounded-2xl text-xs group-has-checked:bg-blue-base group-has-checked:border-blue-base group-has-checked:text-gray-600 flex gap-1">
                  20:00
                  <img src={Cross} className="hidden group-has-checked:inline" />
                </div>
              </label>
              <label htmlFor="hour21" className="group cursor-pointer flex items-center gap-1">
                <input name="hour" id="hour21" type="checkbox" className="hidden peer" onChange={(e) => toggleHour("H21", e.target.checked)}/>
                <div className="py-1 px-2 border border-gray-400 rounded-2xl text-xs group-has-checked:bg-blue-base group-has-checked:border-blue-base group-has-checked:text-gray-600 flex gap-1">
                  21:00
                  <img src={Cross} className="hidden group-has-checked:inline" />
                </div>
              </label>
              <label htmlFor="hour22" className="group cursor-pointer flex items-center gap-1">
                <input name="hour" id="hour22" type="checkbox" className="hidden peer" onChange={(e) => toggleHour("H22", e.target.checked)}/>
                <div className="py-1 px-2 border border-gray-400 rounded-2xl text-xs group-has-checked:bg-blue-base group-has-checked:border-blue-base group-has-checked:text-gray-600 flex gap-1">
                  22:00
                  <img src={Cross} className="hidden group-has-checked:inline" />
                </div>
              </label>
              <label htmlFor="hour23" className="group cursor-pointer flex items-center gap-1">
                <input name="hour" id="hour23" type="checkbox" className="hidden peer" onChange={(e) => toggleHour("H23", e.target.checked)}/>
                <div className="py-1 px-2 border border-gray-400 rounded-2xl text-xs group-has-checked:bg-blue-base group-has-checked:border-blue-base group-has-checked:text-gray-600 flex gap-1">
                  23:00
                  <img src={Cross} className="hidden group-has-checked:inline" />
                </div>
              </label>

            </div>
          </div>
        </section>
      </form>
    </main>
  );
}