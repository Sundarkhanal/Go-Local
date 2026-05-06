import { createRoot } from 'react-dom/client'
import './assets/globals.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.tsx'
import { CartProvider } from './context/CartContext.tsx'
import { Toaster } from 'sonner'
import App from './App.tsx'
import {Provider} from "react-redux"
import store from './config/store.config.tsx'


createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <BrowserRouter>
      <CartProvider>
       <Toaster richColors />
       <Provider store={store}>
        <App />
       </Provider>
      </CartProvider>
    </BrowserRouter>
  </AuthProvider>
)