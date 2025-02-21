import { useState } from "react";
import MobileCarousel from "./MobileCarousel";
import QuickViewModal from "./QuickViewModal";
import { toast, ToastContainer } from "react-toastify";
import ShopGridItem from "./ShopGridItem";
import "react-toastify/dist/ReactToastify.css";

interface Item {
  image: string;
  title: string;
  discountedPrice: string;
  originalPrice: string;
  _percentDiscount: number;
  percentDiscount: string;
  imagePath: string;
  currency: string;
  price: number;
}

interface ShopGridProps {
  items: Item[];
}

const ShopGrid = ({ items }: ShopGridProps) => {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleQuickView = (item: Item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleAddToCart = (item: any, quantity = 1) => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");

    // Toastify notification
    if (cartItems.some((cartItem: any) => cartItem.id === item.id)) {
      toast.dark("Item already in cart", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      return;
    }

    toast.success("Item added to cart", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      progressClassName: "bg-green-600 text-white",
    });
    cartItems.push({ id: item.id, quantity: quantity });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    const cartNumber = document.querySelector("#nav-cart-number");
    if (cartNumber) {
      cartNumber.textContent = cartItems.length.toString();
    }
  };

  return (
    <div className="flex w-full flex-col gap-7">
      <MobileCarousel items={items} onAddToCart={handleAddToCart} />

      {/* Desktop Grid */}
      <ToastContainer />
      <ul className="hidden flex-wrap justify-between overflow-hidden sm:flex">
        {items.map((item, index) => (
          <ShopGridItem
            handleQuickView={handleQuickView}
            handleAddToCart={handleAddToCart}
            key={index}
            item={item}
          />
        ))}
      </ul>

      <QuickViewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={selectedItem || undefined}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default ShopGrid;
