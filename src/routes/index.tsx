import { Route, Routes } from "react-router"
import { BrowserRouter } from "react-router"

import { AuthLayout } from "../components/AuthLayout"

import { NotFound } from "../pages/Notfound"
import { SignIn } from "../pages/SignIn"
import { SignUp } from "../pages/SignUp"

import { useAuth } from "../hooks/useAuth";

import { Aside } from "../components/Aside"

import {Calls} from "../pages/Calls"
import { NewCalls } from "../pages/NewCalls"
import { CallDetails } from "../pages/CallDetails"

import { Technicals } from "../pages/Technicals"
import { Services } from "../pages/Services"
import { Clients } from "../pages/Clients"
import { Profile } from "../pages/Profile"

export function Index(){
    const user = useAuth()

    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<AuthLayout />}>
                <Route path="/" element={<SignIn/>}/>
                <Route path="/SignUp" element={<SignUp/>}/>
            </Route>
            <Route path="/" element={<Aside />}>
                <Route path="/Calls" element={<Calls />} />
                <Route path="/CallDetails/:id" element={<CallDetails />} />

                {user.session?.user.role==="client"? 
                    <Route path="/NewCalls" element={<NewCalls />} />
                : 
                    ""
                }

                {user.session?.user.role==="admin"? 
                    <Route path="/Technicals" element={<Technicals />} />
                :
                    ""
                }
                
                {user.session?.user.role==="admin"? 
                    <Route path="/Services" element={<Services />} />
                :
                    ""
                }   
                {user.session?.user.role==="admin"?                     
                    <Route path="/Clients" element={<Clients />} />
                :
                    ""
                }


                <Route path="/Profile" element={<Profile />} />
            </Route>

            <Route path="*" element={<NotFound/>}/>
        </Routes>
        </BrowserRouter>
    )
}