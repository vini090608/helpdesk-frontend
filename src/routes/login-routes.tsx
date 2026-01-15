import {Routes, Route} from "react-router"

import { LoginLayout } from "../components/LoginLayout"

import {ClientCalls} from "../pages/client/ClientCalls"
import { ClientNewCalls } from "../pages/client/ClientNewCalls"

export function LoginRoutes(){
    return(
        <Routes>
            <Route path="/" element={<LoginLayout />}>
                <Route index element={<ClientCalls />} />
                <Route path="/clientcall" element={<ClientCalls />} />
                <Route path="/clientnewcalls" element={<ClientNewCalls />} />
            </Route>
        </Routes>
    )
}