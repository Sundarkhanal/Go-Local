import { createRoot } from 'react-dom/client'
import './assets/globals.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.tsx'
import { CartProvider } from './context/CartContext.tsx'
import { Toaster } from 'sonner'
import App from './App.tsx'


createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <BrowserRouter>
      <CartProvider>
       <Toaster richColors />
        <App />
      </CartProvider>
    </BrowserRouter>
  </AuthProvider>
)