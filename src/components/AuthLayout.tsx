import { Outlet } from "react-router";

import iconLight from "../../public/iconLight.svg"

export function AuthLayout(){
    return(
        <div>
            <main>
                <img src={iconLight} alt="Logo" />
                <Outlet/>
            </main>
        </div>
    )
}
