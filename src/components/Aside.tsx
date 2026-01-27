import { useNavigate, Outlet } from "react-router";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

import { Button } from "./Button";

import LogoOn from "../assets/iconDark.svg"
import LogoOff from "../assets/iconLight.svg"

import UserPhoto from "../assets/user.png"

import clipboardOff from "../assets/icons/inactive/clipboard-list.svg"
import plusOff from "../assets/icons/inactive/plus1.svg"
import usersOff from "../assets/icons/inactive/users.svg"
import briefcaseOff from "../assets/icons/inactive/briefcase-business.svg"
import wrenchOff from "../assets/icons/inactive/wrench.svg"

import clipboardOn from "../assets/icons/hover/hover-clipboard-list.svg"
import plusOn from "../assets/icons/hover/hover-plus.svg"
import usersOn from "../assets/icons/hover/hover-users.svg"
import briefcaseOn from "../assets/icons/hover/hover-briefcase-business.svg"
import wrenchOn from "../assets/icons/hover/hover-wrench.svg"
import Modal from "./Modal";
import { Profile } from "./Profile";

export function Aside() {
    const navigate = useNavigate()
    const [selected, setSelected] = useState<"calls" | "create" | "clients" | "technicals" | "services">("calls");
    const [hover, setHover] = useState(false)
    const [isOpen, setIsOpen] = useState(false);

    const user = useAuth()
    const [profileOpen, setProfileOpen] = useState(false) 
  return (
    <main className=" h-lvh flex bg-gray-100">
        <aside className="w-1/8 flex flex-col p-3 justify-between">
            <div>
                <div className="flex m-2 mb-4 gap-2">
                    <img src={hover? LogoOn : LogoOff} alt="" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className="h-12" />
                    <div className="flex flex-col">
                        <p className="text-lg text-gray-600 m-0 p-0">HelpDesk</p>
                        <span className="text-xs text-blue-light uppercase">
                            {user.session?.user.role==="admin"? "Admin" : ""}
                            {user.session?.user.role==="technical"? "Técnico" : ""}
                            {user.session?.user.role==="client"? "Cliente" : ""}
                        </span>
                    </div>
                </div>

                <div className="h-0.5 bg-gray-200   "></div>
                
                <Button onClick={() => (setSelected("calls") , navigate("/Calls")) } data-selected={selected === "calls"} className="m-1 bg-gray-100 text-gray-400 border-none justify-normal pl-4 data-[selected=true]:bg-blue-dark data-[selected=true]:text-white">
                    <img src={selected === "calls" ? clipboardOn : clipboardOff} alt="Image of paper" className="pr-2"/>
                    {user.session?.user.role==="admin"? "Chamados" : "Meus Chamados"}
                </Button>

                {user.session?.user.role==="client"? 
                    <Button onClick={() => (setSelected("create") , navigate("/NewCalls")) } data-selected={selected === "create"} className="m-1 bg-gray-100 text-gray-400 border-none justify-normal pl-4 data-[selected=true]:bg-blue-dark data-[selected=true]:text-white">
                        <img src={selected === "create" ? plusOn : plusOff} alt="Image of plus" 
                        className="pr-3"/>
                        Criar chamado
                    </Button>
                : 
                    ""
                }


                {user.session?.user.role==="admin"? 
                    <Button onClick={() => (setSelected("clients") , navigate("/Clients")) } data-selected={selected === "clients"} className="m-1 bg-gray-100 text-gray-400 border-none justify-normal pl-4 data-[selected=true]:bg-blue-dark data-[selected=true]:text-white">
                        <img src={selected === "clients" ? briefcaseOn : briefcaseOff} alt="Image of briefcase" 
                        className="pr-3"/>
                        Clientes
                    </Button>
                : 
                    ""
                }

                
                {user.session?.user.role==="admin"? 
                    <Button onClick={() => (setSelected("technicals") , navigate("/Technicals")) } data-selected={selected === "technicals"} className="m-1 bg-gray-100 text-gray-400 border-none justify-normal pl-4 data-[selected=true]:bg-blue-dark data-[selected=true]:text-white">
                        <img src={selected === "technicals" ? usersOn : usersOff} alt="Image of people" 
                        className="pr-3"/>
                        Técnicos
                    </Button>
                :
                    ""
                }      

                {user.session?.user.role==="admin"? 
                    <Button onClick={() => (setSelected("services") , navigate("/Services")) } data-selected={selected === "services"} className="m-1 bg-gray-100 text-gray-400 border-none justify-normal pl-4 data-[selected=true]:bg-blue-dark data-[selected=true]:text-white">
                        <img src={selected === "services" ? wrenchOn : wrenchOff} alt="Image of wrench" 
                        className="pr-3"/>
                        Serviços
                    </Button>
                :
                    ""
                }   
            </div >

            <div className="flex flex-col gap-4">
                <div className="h-0.5 bg-gray-200"></div>

                <div className="flex gap-4" onClick={() => setIsOpen(true)}>
                    <img src={UserPhoto} alt="Profile" className="rounded-full h-10"/>
                    <div>
                        <h2 className="text-sm text-gray-600">{user.session?.user.name}</h2>
                        <span className="text-xs text-gray-400">{user.session?.user.email}</span>
                    </div>
                </div>
            </div>
        </aside>
        
        <section className="w-7/8 borde-none rounded-tl-2xl p-12 pt-2 mt-5 bg-gray-600">
            <Outlet/>
        </section>
        <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      />

      <Profile
        isOpen={profileOpen}
        onClose={() => {
          setProfileOpen(false);
        }}
          children={undefined}
      />
    </main>
  );
}