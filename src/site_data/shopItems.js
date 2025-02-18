class ShopItem {
  constructor(image, title, price, percentDiscount, currency) {
    this.image = image;
    this.title = title;
    this.price = price;
    this._percentDiscount = percentDiscount;
    this.currency = currency;
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
    "./src/assets/shop/image1.png",
    "Classic Barcelona Jersey",
    89.99,
    15,
    "£",
  ),

  new ShopItem(
    "./src/assets/shop/image2.png",
    "Brazil 2022 World Cup Jersey",
    74.99,
    25,
    "£",
  ),

  new ShopItem(
    "./src/assets/shop/image3.png",
    "Man. United 23/24 Away Jersey",
    69.99,
    0,
    "£",
  ),
  new ShopItem(
    "./src/assets/shop/image4.png",
    "Arsenal 23/24 Away Jersey",
    79.99,
    20,
    "£",
  ),
  new ShopItem(
    "./src/assets/shop/image5.png",
    "Spurs Limited Edition",
    89.99,
    15,
    "£",
  ),
  new ShopItem(
    "./src/assets/shop/image6.png",
    "Chelsea Limited Edition",
    89.99,
    15,
    "£",
  ),
  new ShopItem(
    "./src/assets/shop/image7.png",
    "Madrid Limited Edition",
    89.99,
    15,
    "£",
  ),
  new ShopItem(
    "./src/assets/shop/image8.png",
    "Arsenal Limited Edition",
    89.99,
    15,
    "£",
  ),
];

export default items;
