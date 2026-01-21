import { useNavigate } from "react-router";
import { useState } from "react";

import { Outlet } from "react-router";
import { Button } from "./Button";

import LogoOn from "../assets/iconDark.svg"
import LogoOff from "../assets/iconLight.svg"

import UserPhoto from "../assets/user.png"

import clipboardOff from "../assets/icons/inative/clipboard-list.svg"
import plusOff from "../assets/icons/inative/plus1.svg"
import usersOff from "../assets/icons/inative/users.svg"
import briefcaseOff from "../assets/icons/inative/briefcase-business.svg"
import wrenchOff from "../assets/icons/inative/wrench.svg"

import clipboardOn from "../assets/icons/hover/hover-clipboard-list.svg"
import plusOn from "../assets/icons/hover/hover-plus.svg"
import usersOn from "../assets/icons/hover/hover-users.svg"
import briefcaseOn from "../assets/icons/hover/hover-briefcase-business.svg"
import wrenchOn from "../assets/icons/hover/hover-wrench.svg"
import { useAuth } from "../hooks/useAuth";

export function Aside() {
    const navigate = useNavigate()
    const [selected, setSelected] = useState<"calls" | "create" | "clients" | "technicals" | "services">("calls");
    const [hover, setHover] = useState(false)

    const users = useAuth()
  return (
    <main className=" h-lvh flex bg-gray-100">
        <aside className="w-1/8 flex flex-col p-3 justify-between">

            <div>
                <div className="flex m-2 mb-4 gap-2">
                    <img src={hover? LogoOn : LogoOff} alt="" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className="h-12" />
                    <div className="flex flex-col">
                        <p className="text-lg text-gray-600 m-0 p-0">HelpDesk</p>
                        <span className="text-xs text-blue-light uppercase">Admin</span>
                    </div>
                </div>

                <div className="h-0.5 bg-gray-200   "></div>
                
                <Button onClick={() => (setSelected("calls") , navigate("/Calls")) } data-selected={selected === "calls"} className="m-1 bg-gray-100 text-gray-400 border-none justify-normal pl-4 data-[selected=true]:bg-blue-dark data-[selected=true]:text-white">
                    <img src={selected === "calls" ? clipboardOn : clipboardOff} alt="Image of paper" className="pr-2"/>
                    Meus chamados
                </Button>
            
                <Button onClick={() => (setSelected("create") , navigate("/NewCalls")) } data-selected={selected === "create"} className="m-1 bg-gray-100 text-gray-400 border-none justify-normal pl-4 data-[selected=true]:bg-blue-dark data-[selected=true]:text-white">
                    <img src={selected === "create" ? plusOn : plusOff} alt="Image of plus" 
                    className="pr-3"/>
                    Criar chamado
                </Button>

                <Button onClick={() => (setSelected("clients") , navigate("/Clients")) } data-selected={selected === "clients"} className="m-1 bg-gray-100 text-gray-400 border-none justify-normal pl-4 data-[selected=true]:bg-blue-dark data-[selected=true]:text-white">
                    <img src={selected === "clients" ? briefcaseOn : briefcaseOff} alt="Image of briefcase" 
                    className="pr-3"/>
                    Clientes
                </Button>

                <Button onClick={() => (setSelected("technicals") , navigate("/Technicals")) } data-selected={selected === "technicals"} className="m-1 bg-gray-100 text-gray-400 border-none justify-normal pl-4 data-[selected=true]:bg-blue-dark data-[selected=true]:text-white">
                    <img src={selected === "technicals" ? usersOn : usersOff} alt="Image of people" 
                    className="pr-3"/>
                    Técnicos
                </Button>

                <Button onClick={() => (setSelected("services") , navigate("/Services")) } data-selected={selected === "services"} className="m-1 bg-gray-100 text-gray-400 border-none justify-normal pl-4 data-[selected=true]:bg-blue-dark data-[selected=true]:text-white">
                    <img src={selected === "services" ? wrenchOn : wrenchOff} alt="Image of wrench" 
                    className="pr-3"/>
                    Serviços
                </Button>
            </div >

            <div className="flex flex-col gap-4">
                <div className="h-0.5 bg-gray-200"></div>

                <div className="flex gap-4" onClick={() => (navigate("/Profile"))}>
                    <img src={UserPhoto} alt="Profile" className="rounded-full h-10"/>
                    <div>
                        <h2 className="text-sm text-gray-600">Usuário Cliente</h2>
                        <span className="text-xs text-gray-400">user.client@test.com</span>
                    </div>
                </div>
            </div>
        </aside>

        <Outlet/>
    </main>
  );
}