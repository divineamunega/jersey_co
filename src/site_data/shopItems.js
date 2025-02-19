import img1 from "../assets/shop/image1.png";
import img2 from "../assets/shop/image2.png";
import img3 from "../assets/shop/image3.png";
import img4 from "../assets/shop/image4.png";
import img5 from "../assets/shop/image5.png";
import img6 from "../assets/shop/image6.png";
import img7 from "../assets/shop/image7.png";
import img8 from "../assets/shop/image8.png";

class ShopItem {
  constructor(image, title, price, percentDiscount, currency, imagePath) {
    this.image = image;
    this.title = title;
    this.price = price;
    this._percentDiscount = percentDiscount;
    this.currency = currency;
    this.imagePath = imagePath;
  }

  get discountedPrice() {
    return `${this.currency}${(this.price * (1 - this._percentDiscount / 100)).toFixed(2)}`;
  }

  get originalPrice() {
    return `${this.currency}${this.price.toFixed(2)}`;
  }

  get percentDiscount() {
    return `${this._percentDiscount}%`;
  }
}

const items = [
  new ShopItem(
    img1,
    "Classic Barcelona Jersey",
    89.99,
    15,
    "£",
    "/assets/shop/image1.png",
  ),
  new ShopItem(
    img2,
    "Brazil 2022 World Cup Jersey",
    74.99,
    25,
    "£",
    "/assets/shop/image2.png",
  ),
  new ShopItem(
    img3,
    "Man. United 23/24 Away Jersey",
    69.99,
    0,
    "£",
    "/assets/shop/image3.png",
  ),
  new ShopItem(
    img4,
    "Arsenal 23/24 Away Jersey",
    79.99,
    20,
    "£",
    "/assets/shop/image4.png",
  ),
  new ShopItem(
    img5,
    "Spurs Limited Edition",
    89.99,
    15,
    "£",
    "/assets/shop/image5.png",
  ),
  new ShopItem(
    img6,
    "Chelsea Limited Edition",
    89.99,
    15,
    "£",
    "/assets/shop/image6.png",
  ),
  new ShopItem(
    img7,
    "Madrid Limited Edition",
    89.99,
    15,
    "£",
    "/src/assets/shop/image7.png",
  ),
  new ShopItem(
    img8,
    "Arsenal Limited Edition",
    89.99,
    15,
    "£",
    "/assets/shop/image8.png",
  ),
];

export default items;
