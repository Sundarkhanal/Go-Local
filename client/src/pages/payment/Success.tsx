import { useNavigate, useSearchParams } from "react-router"
import { useCart } from "../../context/CartContext";
import { useEffect } from "react";
import axiosInstance from "../../lib/http/axios.config";

const Success = () => {
    const [params] = useSearchParams();
    const navigate = useNavigate();
    const {clearCart} = useCart()

    const transaction_uuid = params.get("transaction_uuid");
    const status = params.get("status")

    useEffect(() => {
        const VerifyPayment = async() => {
            try {
                if (!transaction_uuid) {
                    return
                }
                await axiosInstance.get("")

                clearCart()

            } catch (error) {
                console.log("Verification failed:", error);
                
            }
        };
        VerifyPayment()
    }, [transaction_uuid]);

    return(
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
            <h1 className="text-3xl font-bold text-green-600">🎉 Payment Successful</h1>
            <p className="mt-2 text-gray-600">Your order has been palced successfully.</p>

            <button onClick={()=> navigate("/")}
            className="mt-6 bg-green-600 text-white px-6 py-2 rounded-lg"
                >
                Go to home
            </button>


        </div>
    )
}

export default Success