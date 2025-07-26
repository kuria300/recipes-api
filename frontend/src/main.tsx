import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { AuthProvider } from './context/auth.tsx'
import Login from './components/Login.tsx'
import Restrict from './Restrict.tsx'
import Confirm from './components/Confirm.tsx'
import Remove from './components/Remove.tsx'
const LazyInstruction= lazy(()=> import('./components/Instruction.tsx')) //manual code splitting for loading content omly when user visits


createRoot(document.getElementById('root')!).render(
<StrictMode>
  <BrowserRouter>
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <AuthProvider>
     <Routes>
        <Route path="/" element={<Restrict><App /></Restrict>} />
        <Route path="/login" element={<Login />} />
        <Route path="/instructions/:id" 
        element={
        <Suspense fallback="Loading Recipe...">
          <LazyInstruction />
        </Suspense>} />
        <Route path="/confirm" element={<Confirm />} />
        <Route path="/unsubscribe" element={<Remove />} />
      </Routes>
      </AuthProvider>
  </GoogleOAuthProvider>
  </BrowserRouter>

</StrictMode>,
)
