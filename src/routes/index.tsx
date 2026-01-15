import { BrowserRouter } from "react-router";

import { AuthRoutes } from "./auth-routes";
import { LoginRoutes } from "./clogin-routes";

export function Routes(){
    return (
        <BrowserRouter>
            <LoginRoutes />
        </BrowserRouter>
    )
}