const Cart = ({ cart, setCart }: any) => {
    const total = cart.reduce((sum:number, item:any) => {
        return sum + item.price * item.quantity
    }, 0)
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
              <p className="text-teal-600">
                Rs {item.price} * {item.quantity} = Rs{item.price * item.quantity}
                 </p>
            </div>
            <div className="flex items-center gap-w mt-2">
              <button className="px-2 bg-gray-200 rounded cursor-pointer"
              onClick={() => {
                const updated = cart.map((item:any, i:number) => 
                  i === index && item.quantity > 1
                ? {...item, quantity: item.quantity -1}
                : item
              );
              setCart(updated)
              }}
              
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button className="px-2 bg-gray-200 rounded cursor-pointer"
              onClick={() => {
                const updated = cart.map((item:any, i:number) =>
                  i === index ? {...item, quantity:item.quantity + 1}
                :item
                );
                setCart(updated)
              }}
              >
                +
              </button>

            </div>

            <button
              className="text-red-500"
              onClick={() => {
                setCart(cart.filter((_: any, i: number) => i !== index)); //_ = item and 
              }}
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
        onClick={() => setCart([])}
      >
        Clear Cart
      </button>

      <button className="mt-4 bg-teal-600 px-4 py-2 rounded-md text-white cursor-pointer">
        Checkout
      </button>
     </div>
    </>
  );
};

export default Cart;