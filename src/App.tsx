import { AuthProvider } from "./contexts/AuthContexts"

import { Routes } from "./routes/index"

export function App(){
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  )
}