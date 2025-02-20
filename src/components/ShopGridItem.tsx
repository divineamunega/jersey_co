interface ShopItemProps {
  item: {
    image: string;
    title: string;
    price: number;
    _percentDiscount: number;
    percentDiscount: string;
    imagePath: string;
    currency: string;
  };

  handleQuickView: (item: any) => void;
  handleAddToCart: (item: any) => void;
}

const ShopGridItem = ({
  item,
  handleQuickView,
  handleAddToCart,
}: ShopItemProps) => {
  const discountedPrice = `${item.currency}${item.price * (1 - item._percentDiscount / 100)}`;

  return (
    <li className="mb-20 flex w-[48%] flex-col items-center justify-center gap-4 lg:mb-0 lg:w-[32%] xl:w-[23%]">
      <div className="group relative h-80 w-full overflow-hidden">
        <img
          src={item.imagePath}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
          alt={item.title}
          width={300}
          height={300}
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <button
          onClick={() => handleQuickView(item)}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-white px-6 py-2 text-sm font-medium text-black opacity-0 transition-all duration-300 group-hover:opacity-100 hover:bg-transparent hover:text-white"
        >
          Quick View
        </button>
      </div>
      <div className="flex w-full flex-col gap-3">
        <p className="text-left font-bold">{item.title}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold">{discountedPrice}</span>
          <div>
            {item._percentDiscount > 0 && (
              <>
                <span className="text-xl text-gray-500 line-through">
                  {discountedPrice}
                </span>
                <span className="text-sm text-green-500">
                  -{item._percentDiscount * 100}%
                </span>
              </>
            )}
          </div>
        </div>
        <button
          onClick={() => handleAddToCart(item)}
          className="cursor-pointer rounded-full border-2 border-black bg-black py-2 text-white transition-colors duration-300 hover:bg-white hover:text-black"
        >
          Add to Cart
        </button>
      </div>
    </li>
  );
};

export default ShopGridItem;
