import {Routes, Route} from "react-router"

import { Aside } from "../components/Aside"

import { NotFound } from "../pages/Notfound"
import {Calls} from "../pages/Calls"
import { NewCalls } from "../pages/NewCalls"

export function ClientRoutes(){
    return(
        <Routes>
            <Route path="/" element={<Aside />}>
                <Route path="/" element={<Calls />} />
                <Route path="/NewCalls" element={<NewCalls />} />
            </Route>

            <Route path="*" element={<NotFound/>}/>
    
        </Routes>
    )
}