import { useNavigate } from "react-router-dom";

const Failure = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-3xl font-bold text-red-600">
        Payment Failed
      </h1>

      <p className="mt-2 text-gray-600">
        Your payment was not completed. Please try again.
      </p>

      <button
        onClick={() => navigate("/cart")}
        className="mt-6 bg-red-600 text-white px-6 py-2 rounded-lg"
      >
        Back to Cart
      </button>
    </div>
  );
};

export default Failure;