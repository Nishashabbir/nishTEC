import { cart } from "./cart.js";


const productContainer = document.getElementById("product-container");
const cartContainer = document.getElementById("cart-container");
const totalPrice = document.getElementById("total-price");
const cartCount = document.getElementById("cart-count");



/* =========================
   RENDER PRODUCTS
========================= */

export function renderProducts(items) {

  let html = "";

  items.forEach(product => {

    html += `

      <div class="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition duration-300">

        <img 
          src="${product.image}"
          class="w-full h-52 object-cover"
        >

        <div class="p-5">

          <p class="inline-block bg-indigo-100 text-indigo-600 text-sm px-3 py-1 rounded-full mb-3">
            ${product.category}
          </p>

          <h3 class="text-xl font-bold mb-2">
            ${product.title}
          </h3>

          <p class="text-indigo-600 text-lg font-semibold mb-4">
            Rs. ${product.price}
          </p>

          <button
            data-id="${product.id}"
            class="add-to-cart w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl">

            Add To Cart

          </button>

        </div>

      </div>

    `;

  });

  productContainer.innerHTML = html;

}


/* =========================
   LOADING SKELETON
========================= */

export function showSkeletons() {

  let skeleton = "";

  for (let i = 0; i < 6; i++) {

    skeleton += `

      <div class="bg-white rounded-2xl p-4 animate-pulse">

        <div class="bg-gray-300 h-52 rounded-xl mb-4"></div>

        <div class="bg-gray-300 h-5 rounded mb-3"></div>

        <div class="bg-gray-300 h-5 w-24 rounded mb-3"></div>

        <div class="bg-gray-300 h-10 rounded"></div>

      </div>

    `;

  }

  productContainer.innerHTML = skeleton;

}

/* =========================
   RENDER CART
========================= */

export function renderCart() {

  if (cart.length === 0) {

    cartContainer.innerHTML = `

      <div class="text-center py-10">

        <h3 class="text-gray-500 text-lg">
          Cart is Empty
        </h3>

      </div>

    `;

    totalPrice.innerText = "Total: Rs. 0";

    cartCount.innerText = 0;

    return;

  }


  let html = "";

  cart.forEach(item => {

    html += `

      <div class="border rounded-xl p-4">

        <h3 class="font-bold text-lg">
          ${item.title}
        </h3>

        <p class="text-gray-500 mb-3">
          Rs. ${item.price}
        </p>

        <div class="flex items-center gap-3 mb-3">

          <button
            data-id="${item.id}"
            class="decrease bg-gray-200 px-3 py-1 rounded">

            -

          </button>

          <span class="font-bold">
            ${item.quantity}
          </span>

          <button
            data-id="${item.id}"
            class="increase bg-gray-200 px-3 py-1 rounded">

            +

          </button>

        </div>

        <button
          data-id="${item.id}"
          class="remove text-red-500 text-sm">

          Remove

        </button>

      </div>

    `;

  });

  cartContainer.innerHTML = html;



  /* TOTAL */

  const total = cart.reduce((sum, item) => {

    return sum + item.price * item.quantity;

  }, 0);

  totalPrice.innerText = `Total: Rs. ${total}`;



  /* COUNT */

  const count = cart.reduce((sum, item) => {

    return sum + item.quantity;

  }, 0);

  cartCount.innerText = count;

}




/* =========================
   TOAST NOTIFICATION
========================= */

export function showToast(message) {

  const toast = document.createElement("div");

  toast.innerText = message;

  toast.className = `
  
    fixed bottom-5 right-5
    bg-indigo-600 text-white
    px-5 py-3 rounded-xl shadow-xl
    animate-bounce z-50
  
  `;

  document.body.appendChild(toast);

  
  setTimeout(() => {

    toast.remove();

  }, 2000);

}