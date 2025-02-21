import { useState } from "react";
import ExploreGridItem from "./ExploreGridItem";
import QuickViewModal from "./QuickViewModal";
import { toast, ToastContainer } from "react-toastify";
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

const ExploreGrid = function ({ items }: ShopGridProps) {
  console.log(items);

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
    console.log(cartNumber, "CARTNUMBER", cartItems.length);

    if (cartNumber) {
      cartNumber.textContent = cartItems.length.toString();
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item) => (
          <ExploreGridItem
            key={item.title}
            item={item}
            handleAddToCart={handleAddToCart}
            handleQuickView={handleQuickView}
          />
        ))}
        <QuickViewModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          item={selectedItem || undefined}
          onAddToCart={handleAddToCart}
        />
      </div>
    </>
  );
};

export default ExploreGrid;
