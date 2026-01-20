import {Routes, Route} from "react-router"

import { Aside } from "../components/Aside"

import { NotFound } from "../pages/Notfound"
// import {ClientCalls} from "../pages/client/ClientCalls"
// import { ClientNewCalls } from "../pages/client/ClientNewCalls"

export function ClientRoutes(){
    return(
        <Routes>
            <Route path="/" element={<Aside />}>
                {/* <Route path="/" element={<ClientCalls />} /> */}
                {/* <Route path="/clientnewcalls" element={<ClientNewCalls />} /> */}
            </Route>

            <Route path="*" element={<NotFound/>}/>
    
        </Routes>
    )
}