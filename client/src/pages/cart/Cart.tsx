const Cart = ({ cart, setCart }: any) => {
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
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-teal-600">Rs {item.price}</p>
            </div>

            <button
              className="text-red-500"
              onClick={() => {
                setCart(cart.filter((_: any, i: number) => i !== index));
              }}
            >
              Remove
            </button>
          </div>
        ))
      )}
    </>
  );
};

export default Cart;