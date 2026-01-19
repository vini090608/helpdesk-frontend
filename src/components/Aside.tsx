import { Outlet } from "react-router";
import { Button } from "./Button";


import ClientLogo from "../assets/ClientLogo.svg"
import clipboardOff from "../assets/icons/inative/clipboard-list.svg"
import plusOff from "../assets/icons/inative/plus1.svg"

// import clipboardOn from "../assets/icons/hover/hover-clipboard-list.svg"
// import plusOn from "../assets/icons/hover/hover-clipboard-list.svg"


export function Aside() {
  return (
    <main className=" h-lvh flex bg-gray-100">
        <aside className="w-1/8 flex flex-col p-3 justify-between">

            <div >
                <img src={ClientLogo} alt="" />
               <a href="">
                    <Button className="bg-gray-100 border-none hover:bg-blue-dark">
                        <img src={clipboardOff} alt="" className="pr-2 fill-white stroke-white"/>
                        Meus chamados
                    </Button>
               </a>
            
                <a href="">
                    <Button className="bg-gray-100 border-none focus:bg-blue-dark">
                        <img src={plusOff} alt="" 
                        className="pr-4"/>
                        Criar chamado
                    </Button>
               </a>
            </div >

            <div className="h-16">
                <div className="h-0.5 bg-gray-200"></div>
                <img src="" alt="" />

                <div>
                    <h2 className="text-sm text-gray-600">Usuário Cliente</h2>

                    <span className="text-xs text-gray-400">user.client@test.com</span>
                </div>
            </div>
        </aside>

        <Outlet/>
    </main>
  );
}