import img1 from "../assets/shop/image1.png";
import img2 from "../assets/shop/image2.png";
import img3 from "../assets/shop/image3.png";
import img4 from "../assets/shop/image4.png";
import img5 from "../assets/shop/image5.png";
import img6 from "../assets/shop/image6.png";
import img7 from "../assets/shop/image7.png";
import img8 from "../assets/shop/image8.png";

class ShopItem {
  constructor(image, title, price, percentDiscount, currency, imagePath, id) {
    this.image = image;
    this.title = title;
    this.price = price;
    this._percentDiscount = percentDiscount;
    this.currency = currency;
    this.imagePath = imagePath;
    this.id = id;
  }

  get discountedPrice() {
    return `${this.currency}${(this.price * (1 - this._percentDiscount / 100)).toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  get originalPrice() {
    return `${this.currency}${this.price.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  get percentDiscount() {
    return `${this._percentDiscount}%`;
  }
}

const items = [
  new ShopItem(
    img1,
    "Classic Barcelona Jersey",
    7999.99,
    0,
    "₦",
    "/assets/shop/image1.png",
    "1",
  ),
  new ShopItem(
    img2,
    "Brazil 2022 World Cup Jersey",
    7999.99,
    0,
    "₦",
    "/assets/shop/image2.png",
    "2",
  ),
  new ShopItem(
    img3,
    "Man. United 23/24 Away Jersey",
    7999.99,
    0,
    "₦",
    "/assets/shop/image3.png",
    "3",
  ),
  new ShopItem(
    img4,
    "Arsenal 23/24 Away Jersey",
    7999.99,
    0,
    "₦",
    "/assets/shop/image4.png",
    "4",
  ),
  new ShopItem(
    img5,
    "Spurs Limited Edition",
    7999.99,
    0,
    "₦",
    "/assets/shop/image5.png",
    "5",
  ),
  new ShopItem(
    img6,
    "Chelsea Limited Edition",
    7999.99,
    0,
    "₦",
    "/assets/shop/image6.png",
    "6",
  ),
  new ShopItem(
    img7,
    "Madrid Limited Edition",
    7999.99,
    0,
    "₦",
    "/assets/shop/image7.png",
    "7",
  ),
  new ShopItem(
    img8,
    "Arsenal Limited Edition",
    7999.99,
    0,
    "₦",
    "/assets/shop/image8.png",
    "8",
  ),
];

export default items;
