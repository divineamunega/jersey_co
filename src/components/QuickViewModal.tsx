import { useState, useEffect } from "react";

interface QuickViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  item?: {
    imagePath: string;
    title: string;
    discountedPrice: string;
    originalPrice: string;
    price: number;
    _percentDiscount: number;
    currency: string;
  };
  onAddToCart?: (item: any, quantity: number) => void;
}

const QuickViewModal = ({
  isOpen,
  onClose,
  item,
  onAddToCart,
}: QuickViewModalProps) => {
  const [quantity, setQuantity] = useState(1);
  console.log(item, "ITEM");

  // Reset quantity when modal opens
  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
    }
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!isOpen || !item) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const discountedPrice = `${item.currency}${item.price * (1 - item._percentDiscount / 100)}`;

  return (
    <div
      className="animate-fadeIn fixed inset-0 z-50"
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal */}
      <div className="absolute top-1/2 left-1/2 w-[90%] max-w-4xl -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="aspect-square w-full overflow-hidden">
            <img
              src={item.imagePath}
              alt={item.title}
              className="h-full w-full object-cover"
              width={500}
              height={500}
            />
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">{item.title}</h2>
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold">{discountedPrice}</span>
              {item._percentDiscount > 0 && (
                <>
                  <span className="text-xl text-gray-500 line-through">
                    {item.originalPrice}
                  </span>
                  <span className="text-sm text-green-500">
                    -{item._percentDiscount}
                  </span>
                </>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="mt-4 flex items-center gap-4">
              <span className="text-gray-600">Quantity:</span>
              <div className="flex items-center rounded-lg border border-gray-300">
                <button
                  onClick={decreaseQuantity}
                  className="px-3 py-1 text-xl transition-colors hover:bg-gray-100"
                >
                  -
                </button>
                <span className="border-x border-gray-300 px-4 py-1">
                  {quantity}
                </span>
                <button
                  onClick={increaseQuantity}
                  className="px-3 py-1 text-xl transition-colors hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={() => {
                onAddToCart?.(item, quantity);
                onClose();
              }}
              className="mt-4 cursor-pointer rounded-full border-2 border-black bg-black py-3 text-white transition-colors duration-300 hover:bg-white hover:text-black"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
