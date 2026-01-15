import { Outlet } from "react-router";
import { Button } from "./Button";


import ClientLogo from "../assets/ClientLogo.svg"
import clipboard from "../assets/icon/clipboard-list.svg"
import plus from "../assets/icon/plus.svg"


export function LoginLayout() {
  return (
    <main className=" h-lvh flex bg-gray-100">
        <aside className="w-1/8 flex flex-col p-3">
            <img src={ClientLogo} alt="" />

            <div >
               <a href="">
                    <Button className="bg-gray-100 border-none hover:bg-blue-dark">
                        <img src={clipboard} alt="" className="pr-2 fill-white stroke-white"/>
                        Meus chamados
                    </Button>
               </a>
            </div>

            <div >
                <a href="">
                    <Button className="bg-gray-100 border-none hover:bg-blue-dark">
                        <img src={plus} alt="" 
                        className="pr-4"/>
                        Criar chamado
                    </Button>
               </a>
            </div >

            <div className="h-0.5 bg-gray-200"></div>


            <div>
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