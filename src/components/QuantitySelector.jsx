import { useState } from "react";

const QuantitySelector = ({ label = true, quantity, setQuantity }) => {
  console.log(quantity);

  const decrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increase = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="flex items-center gap-4">
      {label && <span className="text-gray-600">Quantity:</span>}
      <div className="flex items-center rounded-lg border border-gray-300">
        <button
          onClick={decrease}
          className="px-3 py-1 text-xl transition-colors hover:bg-gray-100"
          aria-label="Decrease quantity"
        >
          -
        </button>
        <span className="border-x border-gray-300 px-4 py-1">{quantity}</span>
        <button
          onClick={increase}
          className="px-3 py-1 text-xl transition-colors hover:bg-gray-100"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default QuantitySelector;
