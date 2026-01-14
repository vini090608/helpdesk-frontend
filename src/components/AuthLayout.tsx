import { Outlet } from "react-router";

import logo from "../assets/NavHeader.svg"

import LoginBackground from "../assets/LoginBackground.svg"

export function AuthLayout() {
  return (
    <main style={{ backgroundImage: `url(${LoginBackground})` }} className="min-h-screen w-full grid grid-cols-2 bg-cover">

      <div/>

      <div className="flex flex-col items-center justify-center bg-white rounded-tl-4xl">

        <img src={logo} alt="HelpDesk Logo" className="mb-10 w-40 rounded-l-full"/>
        <Outlet />

      </div>

    </main>
  );
}
