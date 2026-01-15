import { Outlet } from "react-router";

import logo from "../assets/NavHeader.svg"

import LoginBackground from "../assets/LoginBackground.svg"

export function AuthLayout() {
  return (
    <main style={{ backgroundImage: `url(${LoginBackground})` }} className="h-lvh flex justify-end bg-cover pt-8">

      <div className="bg-white p-12 flex flex-col items-center rounded-t-4xl md:w-1/2 sm:w-full md:rounded-tr-none">

        <header>
          <img src={logo} alt="HelpDesk Logo" className=""/>
        </header>
        <Outlet />

      </div>

    </main>
  );
}
