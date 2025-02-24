import { useState } from "react";
import items from "../site_data/shopItems";
import { toast, ToastContainer } from "react-toastify";
const OrderConfirmation = ({ URL }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const cart = JSON.parse(localStorage.getItem("cartItems") || "[]").map(
    (it) => {
      return {
        ...items.find((item) => item.id === it.id),
        quantity: it.quantity,
      };
    },
  );
  console.log(cart);

  const handleOrder = async (e) => {
    setIsLoading(true);
    // Logic to handle order placement

    if (cart.length === 0) {
      toast.error("Add an item to cart first");
      return;
    }
    console.log(
      [
        ...cart.map(
          (item) => `
      ${item.quantity} ${item.title} at ${item.currency}${(item.price * (1 - item._percentDiscount)).toFixed(2)} you can check out the image at ${"https://jerseyco.vercel.app" + item.imagePath}
  `,
        ),
      ].join("\n"),
    );
    const formData = new FormData(e.target);
    formData.set(
      "products",
      [
        ...cart.map(
          (item) => `
        ${item.quantity} ${item.title} at ${item.currency}${(item.price * (1 - item._percentDiscount)).toFixed(2)} you can check out the image at ${"https://jerseyco.vercel.app" + item.imagePath}
    `,
        ),
      ].join("\n"),
    );

    const res = await fetch(event.target.action, {
      method: e.target.method,
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok) {
      setIsLoading(false);
      toast.error("An error occured while submitting the form");
      return;
    }

    if (Object.hasOwn(data, "errors")) {
      setIsLoading(false);
      const message = data["errors"]
        .map((error) => error["message"])
        .join(", ");

      toast.error(message);
      return;
    }

    setIsLoading(false);
    setIsModalOpen(true);
    localStorage.clear();
    // Open the confirmation modal
  };

  return (
    <div className="px-6 pt-[10rem] pb-6 sm:px-20 md:px-50 lg:px-75">
      <ToastContainer />
      <h2 className="mb-4 text-3xl font-bold">Order Confirmation</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleOrder(e);
        }}
        action="https://formspree.io/f/xqaewddd"
        method="POST"
      >
        <div className="mb-4">
          <label className="block text-gray-700">Name:</label>
          <input
            type="text"
            name="name"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Phone:</label>
          <input
            type="number"
            name="number"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            required
            name="email"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Address:</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            required
            name="address"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Message (optional):</label>
          <textarea
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            rows="3"
            name="message"
          />
        </div>
        <button
          type="submit"
          className={`w-full rounded-full bg-black py-3 text-white transition-colors hover:bg-black/90 ${isLoading ? "hover:bg-dark/50" : ""}`}
        >
          Place Order
        </button>
      </form>

      {isModalOpen && (
        <div className="fixed top-0 left-0 z-50 flex h-[100vh] w-[100vw] items-center justify-center bg-black/30">
          <div className="rounded-lg bg-white p-4 shadow-lg md:p-6">
            <h3 className="text-lg font-bold">Order Placed!</h3>
            <p>Your order has been successfully placed.</p>
            <p>You will recieve an update shortly</p>
            <button
              onClick={() => {
                location.reload();
              }}
              className="mt-4 rounded-full bg-black px-4 py-2 text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderConfirmation;
