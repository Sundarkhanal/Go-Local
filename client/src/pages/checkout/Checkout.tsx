import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import axiosInstance from "../../lib/http/axios.config";

const Checkout = async() => {
    const{cart, clearCart} = useCart()
    const{user} = useAuth()
    const [form, setForm] = useState({
        fullname: user?.name ||"",
        phone: user?.phone ||"",
        address: user?.address ||"",
        notes:""
    })
    const [loading, setLoading] = useState(false)
    
    const total = cart.reduce((sum:number, item:any) => {
        return sum + item.price * item.quantity
    }, 0 )

    const handleOrder = async() => {
        try {
            if (!form.fullname || !form.address || form.phone || form.notes) {
                alert("Please Enter all fields")
                return
            }
            setLoading(true)

            const orderRes = await axiosInstance.post("orders/create-order", {
                shippingAddress: form,
                items: cart,
                totalAmount: total
            }, {
                withCredentials: true
            });
            const orderId = orderRes.data.data._id

            const paymentRes = await axiosInstance.post("payment/initiate", {
                orderId,
                amount: total
            }, {
                withCredentials: true
            })

            window.location.href = paymentRes.data.paymentUrl
            
        } catch (error: any) {
            console.log('Checkout Error:', error.response?.data);
            
        }
    }
    return (

  <div className="bg-[#faf7f2] min-h-screen py-12 px-6">
    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10">


    {/* LEFT → SHIPPING FORM */}
    <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-6 text-teal-600">
        Shipping Details
        </h2>

        <input
        type="text"
        placeholder="Full Name"
        className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        value={form.fullname}
        onChange={(e) =>
            setForm({ ...form, fullname: e.target.value })
        }
        />

        <input
        type="text"
        placeholder="Phone Number"
        className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        value={form.phone}
        onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
        }
        />

        <textarea
        placeholder="Address"
        rows={3}
        className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        value={form.address}
        onChange={(e) =>
            setForm({ ...form, address: e.target.value })
        }
        />

        <textarea
        placeholder="Notes (optional)"
        rows={2}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        value={form.notes}
        onChange={(e) =>
            setForm({ ...form, notes: e.target.value })
        }
        />
    </div>

    {/* RIGHT → ORDER SUMMARY */}
    <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-6 text-teal-600">
        Order Summary
        </h2>

        <div className="space-y-3 max-h-[300px] overflow-y-auto">
            
        {cart.map((item: any) => (
            <div
            key={item._id || item.id}
            className="flex justify-between text-sm"
            >
            <span>
                {item.productId.name} x {item.quantity}
            </span>
            <span>Rs {item.price * item.quantity}</span>
            </div>
        ))}
        </div>

        <hr className="my-4" />

        <div className="flex justify-between font-bold text-lg">
        <span>Total</span>
        <span>Rs {total}</span>
        </div>

        <button
        onClick={handleOrder}
        disabled={loading}
        className="w-full mt-6 bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition"
        >
        {loading ? "Processing..." : "Place Order"}
        </button>
    </div>

    </div>

    </div>
    );


}

export default Checkout