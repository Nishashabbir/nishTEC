export let cart = JSON.parse(localStorage.getItem("cart")) || [];


/* =========================
   SAVE CART
========================= */

export function saveCart() {

  localStorage.setItem("cart", JSON.stringify(cart));

}



/* =========================
   ADD TO CART
========================= */

export function addToCart(product) {

  const existing = cart.find(item => item.id === product.id);

  if (existing) {

    existing.quantity++;

  } 
  
  else {

    cart.push({
      ...product,
      quantity: 1
    });

  }

  saveCart();

}



/* =========================
   REMOVE ITEM
========================= */

export function removeItem(id) {

  cart = cart.filter(item => item.id != id);

  saveCart();

}



/* =========================
   INCREASE
========================= */

export function increaseQty(id) {

  const item = cart.find(item => item.id == id);

  item.quantity++;

  saveCart();

}



/* =========================
   DECREASE
========================= */

export function decreaseQty(id) {

  const item = cart.find(item => item.id == id);

  item.quantity--;

  if (item.quantity <= 0) {

    removeItem(id);

  }

  saveCart();

}