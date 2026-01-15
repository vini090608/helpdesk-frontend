import {Routes, Route} from "react-router"

import { AuthLayout } from "../components/AuthLayout"

import { SignIn } from "../pages/SignIn"
import { SignUp } from "../pages/SignUp"

export function AuthRoutes(){
    return(
        <Routes>
            <Route path="/" element={<AuthLayout />}>
                <Route index element={<SignIn />} />
                <Route path="/SignIn" element={<SignIn/>}/>
                <Route path="/SignUp" element={<SignUp/>}/>
            </Route>
        </Routes>
    )
}