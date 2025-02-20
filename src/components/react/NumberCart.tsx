import { useState, useEffect } from "react";

const NumberCart = () => {
  const [cartItems, setCartItems] = useState(0);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    setCartItems(cartItems.length);
  }, []);

  return (
    <span className="nav-cart-number absolute top-0 right-0 rounded-full bg-white px-2 py-1 text-xs text-black">
      {cartItems === 0 ? null : cartItems}
    </span>
  );
};

export default NumberCart;
