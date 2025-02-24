import { useState, useEffect } from "react";

const NumberCart = () => {
  const [cartItems, setCartItems] = useState(0);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    setCartItems(cartItems.length);
  }, []);

  return (
    <span
      id="nav-cart-number"
      className="absolute top-0 right-0 rounded-full bg-white px-2 py-1 text-sm text-black"
    >
      {cartItems === 0 ? 0 : cartItems}
    </span>
  );
};

export default NumberCart;
