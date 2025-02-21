import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

interface ShopItem {
  imagePath: string;
  title: string;
  discountedPrice: string;
  originalPrice: string;
  percentDiscount: string;
  _percentDiscount: number;
}

interface Props {
  items: ShopItem[];
  onAddToCart: (item: ShopItem) => void;
}

const MobileCarousel = ({ items, onAddToCart }: Props) => {
  return (
    <div className="relative overflow-hidden sm:hidden">
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        navigation={{ enabled: true }}
        // modules={[Navigation]}

        breakpoints={{
          500: {
            slidesPerView: 2,
          },
        }}
      >
        {items.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <div className="flex flex-col items-center gap-4">
                <div className="aspect-square w-full overflow-hidden">
                  <img
                    src={item.imagePath}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex w-full flex-col gap-3">
                  <p className="text-left font-bold">{item.title}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">
                      {item.discountedPrice}
                    </span>
                    <div>
                      {item._percentDiscount > 0 && (
                        <>
                          <span className="text-xl text-gray-500 line-through">
                            {item.originalPrice}
                          </span>
                          <span className="text-sm text-green-500">
                            -{item.percentDiscount}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => onAddToCart(item)}
                    className="cursor-pointer rounded-full border-2 border-black bg-black py-2 text-white transition-colors duration-300 hover:bg-white hover:text-black"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default MobileCarousel;
