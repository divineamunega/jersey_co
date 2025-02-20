import { useState } from "react";

interface QuickViewModalProps {
  item: {
    imagePath: string;
    title: string;
    discountedPrice: string;
    originalPrice: string;
    price: number;
    _percentDiscount: number;
    currency: string;
  };
  handleQuickView: (item: any) => void;
  handleAddToCart: (item: any) => void;
}

const ExploreGridItem = function ({
  item,
  handleAddToCart,
  handleQuickView,
}: QuickViewModalProps) {
  const discountedPrice = item.price * (1 - item._percentDiscount / 100);

  return (
    <div className="item-card flex flex-col gap-4">
      <div className="group relative h-80 w-full overflow-hidden">
        <img
          width={300}
          height={300}
          src={item?.imagePath}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
          alt={item.title}
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <button
          onClick={() => handleQuickView(item)}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-white px-6 py-2 text-sm font-medium text-black opacity-0 transition-all duration-300 group-hover:opacity-100 hover:bg-transparent hover:text-white"
        >
          Quick View
        </button>
      </div>
      <div className="flex flex-col gap-3">
        <p className="searchable-title text-left font-bold">{item.title}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold">{discountedPrice}</span>
          <div>
            {item._percentDiscount > 0 && (
              <>
                <span className="text-xl text-gray-500 line-through">
                  {item.originalPrice}
                </span>
                <span className="text-sm text-green-500">
                  -{item._percentDiscount}%
                </span>
              </>
            )}
          </div>
        </div>
        <button
          onClick={() => {
            handleAddToCart(item);
          }}
          className="cursor-pointer rounded-full border-2 border-black bg-black py-2 text-white transition-colors duration-300 hover:bg-white hover:text-black"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ExploreGridItem;
