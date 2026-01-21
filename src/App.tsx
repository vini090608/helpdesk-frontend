import { AuthProvider } from "./contexts/AuthContexts"

import { Index } from "./routes/index"

export function App(){
  return (
    <AuthProvider>
      <Index />
    </AuthProvider>
  )
}