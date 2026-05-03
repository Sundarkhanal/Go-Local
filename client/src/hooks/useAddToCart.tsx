import { useNavigate } from "react-router"
import { useAuth } from "../context/AuthContext"
import { useCart } from "../context/CartContext"

export const useAddToCart = () => {
    const navigate = useNavigate()
    const {user} = useAuth()
    const {addToCart} = useCart()
    const handleAddToCart = (product:any) => {
    
        if (!user) {
            const existing = JSON.parse(localStorage.getItem("guest_cart") || "[]")
            const updatedCart = [...existing, {...product, quantity: 1}]
            localStorage.setItem("guest_cart", JSON.stringify(updatedCart))
            navigate("/login", {state: {from: window.location.pathname}})
            return
        }
        addToCart(product)
    }
    return {handleAddToCart}
}