import { BrowserRouter } from "react-router";

import { Loading } from "../components/Loading";

import { useAuth } from "../hooks/useAuth";

import { AuthRoutes } from "./auth-routes";
import { ClientRoutes } from "./client-routes";

export function Routes(){
    const {session, isLoading} = useAuth()

    function Route(){
        switch(session?.user.role){
            case "client":
                return <ClientRoutes />   
            // case "technical":
            //     return <TechnicalRoutes />
            // case "admin":
            //     return <AdminRoutes />
            default:
                return <AuthRoutes />
        }
    }

    if(isLoading){
        return <Loading/>
    }

    return (
        <BrowserRouter>
            <Route />
        </BrowserRouter>
    )
}