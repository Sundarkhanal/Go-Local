import { useNavigate } from "react-router";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { toast } from "sonner";

const Cart = () => {
  const {cart, removeFromCart, updateCartItem, fetchCart, clearCart} = useCart()
  const {user} = useAuth()
  const navigate = useNavigate()
  const total = cart.reduce((sum:number, item:any) => {
        return sum + item.price * item.quantity
    }, 0)
  const handleCheckout = () => {
    if (!user) {
      toast.error("Please Login to do Checkout")
      navigate("/login")
      return;
    }
    navigate("/checkout")
  }

  return (
    <>
      {cart.length === 0 ? (
        <div className="flex items-center justify-center h-[60vh]">
          <p className="text-gray-500 text-lg">Your cart is empty</p>
        </div>
      ) : (
        cart.map((item: any, index: number) => (
          <div
            key={index}
            className="flex justify-between items-center bg-white shadow p-4 rounded mb-3"
          >
            <div>
              <h3 className="font-semibold">{item.productId?.name}</h3>
              <p className="text-teal-600">
                Rs {item.productId?.price} * {item.quantity} = Rs{item.productId?.price * item.quantity}
                 </p>
            </div>
            <div className="flex items-center gap-w mt-2">
              <button className="px-2 bg-gray-200 rounded cursor-pointer"
              onClick={() => updateCartItem(item.productId?._id, item.quantity - 1)}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button className="px-2 bg-gray-200 rounded cursor-pointer"
              onClick={() => updateCartItem(item.productId?._id, item.quantity + 1)}
              >
                +
              </button>

            </div>

            <button
              className="text-red-500 cursor-pointer"
              onClick={() => removeFromCart(item.productId?._id)}
            >
              Remove
            </button>
          </div>
        ))
      )}
      <div className="mt-6 p-4 bg-gray-100 rounded text-right font-bold text-xl">
        Total: Rs {total}
        </div>
     
     <div className="mt-4 px-4 flex justify-between items-center">
       <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer"
        onClick={() => clearCart()}
      >
        Clear Cart
      </button>

      
      <button className="mt-4 bg-teal-600 px-4 py-2 rounded-md text-white cursor-pointer"
      onClick={handleCheckout}
       >
        Checkout
      </button>
     </div>
    </>
  );
};

export default Cart;