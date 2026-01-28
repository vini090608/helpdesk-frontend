// import { z, ZodError } from "zod";
// import { AxiosError } from "axios";
// import { api } from "../services/api";
// import { useEffect, useState } from "react";
// import { useAuth } from "../hooks/useAuth";

import left from "../assets/icons/inative/arrow-left.svg";

import { useNavigate } from "react-router-dom";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export function UploadTechnical() {
  const navigate = useNavigate();

  return (
    <main className="p-10">
      <button
        onClick={() => navigate(-1)}
        className="border-transparent bg-transparent flex "
      >
        <img src={left} alt="" className="flex flex-col" />
        <span className="text-gray-300 text-xs mt-0.5">Voltar</span>
      </button>

      <h1 className="text-xl text-blue-dark font-semibold mt-3">
        Perfil técnico
      </h1>

    <div className="flex justify-end gap-2">
      <Button  onClick={() => navigate(-1)} variant="sm" className="bg-gray-500 text-gray-200">
        Cancelar
      </Button>

      <Button variant="sm" className="">
        Salvar
      </Button>
    </div>

      <form className="flex gap-12 mb-10">
        <div className="border border-gray-500 p-4 rounded-2xl w-120 h-70">
          <div className="pb-6">
            <h2 className="text-mb text-gray-200">Dados pessoais</h2>
            <span className="text-xs text-gray-300">
              Defina as informações do perfil de técnico
            </span>
          </div>

          <Input
            name="name"
            required
            legend="NOME"
            type="name"
            placeholder="Nome completo"
          />
          <br />
          <Input
            name="email"
            required
            legend="EMAIL"
            type="email"
            placeholder="exemplo@mail.com"
          />

        </div>

        <div className="border border-gray-500 p-4 rounded-2xl w-100 h-80">
            <h2 className="text-md text-gray-200">Horários de atendimento</h2>
            <p className="text-xs text-gray-300">
              Selecione os horários de disponibilidade do técnico para
              atendimento
            </p>
            <br />
            <Input
            name="text"
            required
            legend="MANHÃ"
            type="text"
          />

           <Input
            name="text"
            required
            legend="TARDE"
            type="text"
          />

           <Input
            name="text"
            required
            legend="NOITE"
            type="text"
          />

        </div>
        
      </form>
    </main>
  );
}