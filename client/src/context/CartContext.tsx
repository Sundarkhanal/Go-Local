import { createContext, useContext, useEffect, useState } from "react"
import axiosInstance from "../lib/http/axios.config"
import { useAuth } from "./AuthContext"

const CartContext = createContext<any>(null)

export const CartProvider = ({ children }: any) => {
  const { user } = useAuth()
  const [cart, setCart] = useState<any[]>([])

  // fetch cart from backend when user logs in
  const fetchCart = async () => {
    try {
      const res = await axiosInstance.get("cart/get-cart")      
      setCart(res.data.data.items ?? [])
    } catch (error) {
      console.log("Fetch cart error:", error)
    }
  }

  // add item to backend cart
  const addToCart = async (product: any) => {
    try {
      await axiosInstance.post("cart/add", {
        productId: product._id,
        quantity: 1,
      })
      await fetchCart()  // refresh cart after adding
    } catch (error) {
      console.log("Add to cart error:", error)
    }
  }

  // remove item from backend cart
  const removeFromCart = async (productId: string) => {
    try {
      const res = await axiosInstance.delete(`cart/remove/${productId}`, {
        withCredentials: true
      })
      await fetchCart()
    } catch (error) {
      console.log("Remove from cart error:", error)
    }
  }
  const updateCartItem = async(productId: string, quantity:number) => {
    if (quantity<1) {
        return
    }
    try {
        await axiosInstance.put(`cart/update/${productId}`, {
            quantity
        })
        await fetchCart()
    } catch (error) {
        console.log(error);
        
    }
  }
  const clearCart = async() => {
    try {
        await axiosInstance.delete("cart/clear")
        await fetchCart()
        
    } catch (error) {
        console.log(error);
        
    }
  }

  // fetch cart whenever user changes (login/logout)
  useEffect(() => {
    if (user) {
      fetchCart()
    } else {
      setCart([])  // clear cart on logout
    }
  }, [user])

  return (
    <CartContext.Provider value={{ cart, fetchCart, addToCart, removeFromCart, updateCartItem, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error("useCart must be used inside CartProvider")
  return context
}