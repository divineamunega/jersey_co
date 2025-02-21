import QuantitySelector from "./QuantitySelector";
import EmptyCart from "./EmptyCart";
import items from "../site_data/shopItems";
import { useEffect, useState } from "react";

const calculateTotal = (cartItems) => {
  return cartItems.reduce((total, item) => {
    const discountedPrice =
      item.price * (1 - item._percentDiscount) * item.quantity;
    return total + discountedPrice; // Accumulate the total discounted price
  }, 0);
};

// Function to format the total with commas
const formatNumber = (number) => {
  return (
    "₦" +
    new Intl.NumberFormat("en-NG", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      currency: "NGN",
    }).format(number)
  );
};

const CartItem = ({ item, setCartItems, cartItems: crtIT }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  useEffect(() => {
    setCartItems((cartItems) => {
      const updatedCartItems = cartItems.map((cItems) => {
        if (cItems.id === item.id) {
          return { ...cItems, quantity }; // Update the quantity for the specific item
        }
        return cItems; // Return unchanged items
      });

      // Save updated cart items to localStorage with only id and quantity
      const itemsToSave = updatedCartItems.map(({ id, quantity }) => ({
        id,
        quantity,
      }));
      localStorage.setItem("cartItems", JSON.stringify(itemsToSave));

      return updatedCartItems; // Return the updated cart items
    });
  }, [quantity, item.id, setCartItems]);

  const handleDelete = () => {
    setCartItems((cartItems) => {
      const updatedCartItems = cartItems.filter(
        (cItems) => cItems.id !== item.id,
      ); // Remove the item with the specified id

      // Save updated cart items to localStorage with only id and quantity
      const itemsToSave = updatedCartItems.map(({ id, quantity }) => ({
        id,
        quantity,
      }));
      localStorage.setItem("cartItems", JSON.stringify(itemsToSave));

      const cartNumber = document.querySelector("#nav-cart-number");
      if (cartNumber) {
        const number = JSON.parse(
          localStorage.getItem("cartItems") || "[]",
        ).length;
        cartNumber.textContent = number;
      }

      return updatedCartItems; // Return the updated cart items
    });
  };

  return (
    <div className="flex gap-4 p-6" key={item.id}>
      <img
        src={item.imagePath}
        alt="Product"
        className="h-24 w-24 rounded-md object-cover"
      />
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex justify-between">
          <h3 className="font-semibold">{item.title}</h3>
          <button
            className="text-gray-400 hover:text-red-500"
            onClick={handleDelete} // Call handleDelete when the button is clicked
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div className="flex items-end justify-between">
          <QuantitySelector
            label={false}
            quantity={quantity}
            setQuantity={setQuantity}
            scale={0.8}
          />
          <span className="font-bold">
            ₦{item.price * (1 - item._percentDiscount)}
          </span>
        </div>
      </div>
    </div>
  );
};

const CartComponent = function () {
  const cartFromLocalStorage = JSON.parse(
    localStorage.getItem("cartItems") || "[]",
  );

  const [cartItems, setCartItems] = useState(
    cartFromLocalStorage.map((inComplete) => {
      return {
        ...items.find((item) => inComplete.id === item.id),
        quantity: inComplete.quantity,
        kkk: 1,
      };
    }),
  );

  const totalCart = formatNumber(calculateTotal(cartItems));

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <div className="rounded-lg bg-white shadow-sm">
          {cartItems.length === 0 && <EmptyCart />}

          <div className="divide-y divide-gray-200">
            {cartItems.map((item) => {
              return (
                <CartItem
                  item={item}
                  setCartItems={setCartItems}
                  key={item.id}
                  cartItems={cartItems}
                />
              );
            })}
          </div>
        </div>
      </div>

      <div className="lg:col-span-1">
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold">Order Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold">{totalCart}</span>
            </div>
            {/* <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span className="font-semibold">₦1,000.00</span>
            </div> */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between">
                <span className="font-bold">Total</span>
                <span className="font-bold">{totalCart}</span>
              </div>
            </div>
            <button className="w-full rounded-full bg-black py-3 text-white transition-colors hover:bg-gray-800">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartComponent;
