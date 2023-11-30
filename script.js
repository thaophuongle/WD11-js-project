// uses a function to update date and time
function updateDateTime() {
  // create a new date object.
  const now = new Date();

  // get the current date and time as a string
  const currentDateTime = now.toLocaleString();

  // Updates the text element's property to display the time
  document.querySelector("#currentDateTime").innerHTML = currentDateTime;
}

setInterval(updateDateTime, 1000);

//API endpoint to display information to users
let endpoint =
  "https://github.com/OnlineProjectsGit/API/blob/main/WDEndpoint.json";

//store each product in your online shop as JS object (key:value)
class Product {
  constructor(_id, _name, _price, _img) {
    this.id = _id;
    this.name = _name;
    this.price = _price;
    this.img = _img;
  }
}

const bagel = new Product("1", "bagel", 12, "./assets/images/bagels.webp");
const croissant = new Product(
  "2",
  "croissant",
  6,
  "./assets/images/Croissant.webp"
);
const coffee = new Product("3", "coffee", 5, "./assets/images/coffee.webp");
const latte = new Product("4", "iced latte", 7, "./assets/images/latte.jpeg");
const dougnuts = new Product(
  "5",
  "dougnuts",
  12,
  "./assets/images/Dougnuts-AB.jpg"
);
const muffin = new Product("6", "muffin", 5, "./assets/images/muffins.webp");

const productList = [bagel, croissant, coffee, latte, dougnuts, muffin];

document.querySelector("#name1").innerHTML = bagel.name;
document.querySelector("#price1").innerHTML = `$${bagel.price}`;
document.querySelector("#productImg1").src = bagel.img;

document.querySelector("#name2").innerHTML = croissant.name;
document.querySelector("#price2").innerHTML = `$${croissant.price}`;
document.querySelector("#productImg2").src = croissant.img;

document.querySelector("#name3").innerHTML = coffee.name;
document.querySelector("#price3").innerHTML = `$${coffee.price}`;
document.querySelector("#productImg3").src = coffee.img;

document.querySelector("#name4").innerHTML = latte.name;
document.querySelector("#price4").innerHTML = `$${latte.price}`;
document.querySelector("#productImg4").src = latte.img;

document.querySelector("#name5").innerHTML = dougnuts.name;
document.querySelector("#price5").innerHTML = `$${dougnuts.price}`;
document.querySelector("#productImg5").src = dougnuts.img;

document.querySelector("#name6").innerHTML = muffin.name;
document.querySelector("#price6").innerHTML = `$${muffin.price}`;
document.querySelector("#productImg6").src = muffin.img;

let cart = [];
class Cart {
  constructor(_product, _quantity) {
    this.product = _product;
    this.quantity = _quantity;
  }
}

const findItemById = (cart, id) => {
  let item;

  cart.forEach((element) => {
    if (element.product.id == id) {
      item = element;
    }
  });

  return item;
};

const calculateSubTotalPrice = (cart) => {
  let subTotalPrice = 0;
  cart.forEach((element) => {
    subTotalPrice += element.product.price * element.quantity;
  });
  return subTotalPrice;
};

const renderCart = (cart) => {
  let content = "";
  cart.forEach((cartItem) => {
    const { id, name, price, img } = cartItem.product; // Destructure product properties
    content += `
      <div class="cartitem">
        <div class="cart_image">
          <img src="${img}" alt="" />
        </div>
        <div class="carttext">
          <h2 class="carttext_h2">${name}</h2>
        </div>
        <div class="item_count">
          <div class="count_btn" onclick="increaseQuantity('${id}')">+</div>
          <div class="count">${cartItem.quantity}</div>
          <div class="count_btn" onclick="decreaseQuantity('${id}')">-</div>
        </div>
        <div class="cost">
          <div class="price">$${price}</div>
          <div class="remove_btn" onclick="removeItem('${id}')">Remove</div>
        </div>
      </div>
    `;
  });
  document.querySelector("#cartitems").innerHTML = content;
};
//onclick="increaseQuantity('${id}')
//onclick="decreaseQuantity('${id}')
const addTocart = (productId) => {
  const product = productList.find((p) => p.id == productId);

  if (product) {
    const newCartItem = new Cart(product, 1);
    let cartItem = findItemById(cart, newCartItem.product.id);
    if (!cartItem) {
      cart.push(newCartItem);
      console.log(newCartItem);
    } else {
      cartItem.quantity++;
    }
    renderCart(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
  } else {
    console.error(`Product with ID ${productId} not found.`);
  }

  //display the number of items in the cart
  let cartItemCount = 0;
  cart.forEach((ele) => {
    cartItemCount += ele.quantity;
  });

  if (cartItemCount == 0 || cartItemCount == 1) {
    document.querySelector("#subtotal").innerHTML = `${cartItemCount} item`;
  } else {
    document.querySelector("#subtotal").innerHTML = `${cartItemCount} items`;
  }

  //calculate the total price
  document.getElementById("totalPrice").innerHTML =
    "$" + calculateSubTotalPrice(cart).toLocaleString();
};

//remove item in the cart
const removeItem = (productId) => {
  // Find the index of the item in the cart array based on the product ID
  const indexToRemove = cart.findIndex((item) => item.product.id === productId);

  if (indexToRemove !== -1) {
    // Remove the item from the cart array
    cart.splice(indexToRemove, 1);

    // //Re-render number of items and total price
    let cartItemCount = 0;
    cart.forEach((ele) => {
      cartItemCount += ele.quantity;
    });

    if (cartItemCount == 0 || cartItemCount == 1) {
      document.querySelector("#subtotal").innerHTML = `${cartItemCount} item`;
    } else {
      document.querySelector("#subtotal").innerHTML = `${cartItemCount} items`;
    }

    document.getElementById("totalPrice").innerHTML =
      "$" + calculateSubTotalPrice(cart).toLocaleString();

    // Render the updated cart
    renderCart(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
  } else {
    console.error(`Product with ID ${productId} not found in the cart.`);
  }
};

//Increase the quantity of the item in the cart
const increaseQuantity = (id) => {
  let cartItem = findItemById(cart, id);
  if (cartItem) cartItem.quantity++;
  let cartItemCount = 0;
  cart.forEach((ele) => {
    cartItemCount += ele.quantity;
  });

  if (cartItemCount == 0 || cartItemCount == 1) {
    document.querySelector("#subtotal").innerHTML = `${cartItemCount} item`;
  } else {
    document.querySelector("#subtotal").innerHTML = `${cartItemCount} items`;
  }

  document.getElementById("totalPrice").innerHTML =
    "$" + calculateSubTotalPrice(cart).toLocaleString();

  // Render the updated cart
  renderCart(cart);
  localStorage.setItem("cart", JSON.stringify(cart));
};

const decreaseQuantity = (id) => {
  let cartItem = findItemById(cart, id);
  if (cartItem) cartItem.quantity--;
  cart = cart.filter((ele) => ele.quantity != 0);
  let cartItemCount = 0;
  cart.forEach((ele) => {
    cartItemCount += ele.quantity;
  });

  if (cartItemCount == 0 || cartItemCount == 1) {
    document.querySelector("#subtotal").innerHTML = `${cartItemCount} item`;
  } else {
    document.querySelector("#subtotal").innerHTML = `${cartItemCount} items`;
  }

  document.getElementById("totalPrice").innerHTML =
    "$" + calculateSubTotalPrice(cart).toLocaleString();

  // Render the updated cart
  renderCart(cart);
  localStorage.setItem("cart", JSON.stringify(cart));
};
