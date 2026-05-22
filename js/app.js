import { products } from "./products.js";
import { triggerProductAnimations, triggerCartAnimations } from "./animations.js";

/* =========================
   STATE
========================= */

let cart = [];
let filteredProducts = products;

/* =========================
   DOM ELEMENTS
========================= */

const productContainer = document.getElementById("product-container");
const cartContainer = document.getElementById("cart-container");
const totalPrice = document.getElementById("total-price");
const cartCount = document.getElementById("cart-count");
const searchInput = document.getElementById("search-input");
const filterButtons = document.querySelectorAll(".filter-btn");

/* =========================
   RENDER PRODUCTS
========================= */

function renderProducts(items) {

  let html = "";

  items.forEach(product => {

    html += `
      <div class="product-card bg-white border-2 border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-2xl hover:border-cyan-400 transition-all duration-300 group hover:translate-y-(-2) transform">

        <div class="relative overflow-hidden h-52 bg-gradient-to-br from-cyan-50 to-blue-50">
          <img 
            src="${product.image}" 
            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          >
          <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        <div class="p-5">

          <p class="inline-block bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-700 text-xs px-3 py-1 rounded-full mb-3 font-semibold border border-cyan-300">
            ${product.category}
          </p>

          <h3 class="text-lg font-bold mb-2 text-gray-900 group-hover:text-cyan-600 transition-colors">
            ${product.title}
          </h3>

          <p class="text-cyan-600 text-lg font-bold mb-4">
            Rs. ${product.price}
          </p>

          <button
            data-id="${product.id}"
            class="add-to-cart w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-2 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/40 transform hover:-translate-y-0.5">

            Add To Cart

          </button>

        </div>

      </div>
    `;

  });

  productContainer.innerHTML = html;
  triggerProductAnimations();
}

/* =========================
   INITIAL RENDER
========================= */

renderProducts(filteredProducts);
renderCart();

/* =========================
   SEARCH
========================= */

searchInput.addEventListener("input", (e) => {

  const value = e.target.value.toLowerCase();

  filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(value)
  );

  renderProducts(filteredProducts);

});

/* =========================
   CATEGORY FILTER
========================= */

filterButtons.forEach(button => {

  button.addEventListener("click", function () {

    const category = this.dataset.category;

    filterButtons.forEach(btn => {
      btn.classList.remove("bg-gradient-to-r", "from-cyan-500", "to-blue-600", "text-white");
      btn.classList.add("bg-white", "border-2", "border-gray-300", "text-gray-700");
    });

    this.classList.remove("bg-white", "border-2", "border-gray-300", "text-gray-700");
    this.classList.add("bg-gradient-to-r", "from-cyan-500", "to-blue-600", "text-white");

    if (category === "All") {
      filteredProducts = products;
    } else {
      filteredProducts = products.filter(p => p.category === category);
    }

    renderProducts(filteredProducts);

  });

});

/* =========================
   ADD TO CART
========================= */

function addToCart(id) {

  const product = products.find(p => p.id == id);

  const existing = cart.find(item => item.id == id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  renderCart();
}

/* =========================
   RENDER CART
========================= */

function renderCart() {

  let html = "";

  if (cart.length === 0) {

    cartContainer.innerHTML = `
      <p class="text-gray-400 text-center py-8">Your cart is empty</p>
    `;

    totalPrice.innerText = "Total: Rs. 0";
    cartCount.innerText = 0;

    return;
  }

  cart.forEach(item => {

    html += `
      <div class="border-2 border-gray-200 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg p-4 hover:border-cyan-400 hover:shadow-md transition-all duration-200 group">

        <h3 class="font-bold text-lg text-gray-900 group-hover:text-cyan-600 transition-colors">
          ${item.title}
        </h3>

        <p class="text-cyan-600 font-semibold mb-3">
          Rs. ${item.price}
        </p>

        <div class="flex items-center gap-3 mb-3">

          <button data-id="${item.id}" class="decrease bg-gray-200 hover:bg-cyan-200 text-gray-700 hover:text-cyan-700 px-3 py-1 rounded transition-all font-bold">
            −
          </button>

          <span class="font-bold text-gray-900 min-w-max">
            ${item.quantity}
          </span>

          <button data-id="${item.id}" class="increase bg-gray-200 hover:bg-cyan-200 text-gray-700 hover:text-cyan-700 px-3 py-1 rounded transition-all font-bold">
            +
          </button>

        </div>

        <button data-id="${item.id}" class="remove text-cyan-600 hover:text-red-600 text-sm font-semibold transition-colors">
          Remove
        </button>

      </div>
    `;

  });

  cartContainer.innerHTML = html;

  /* TOTAL */
  const total = cart.reduce((sum, item) =>
    sum + item.price * item.quantity, 0
  );

  totalPrice.innerText = `Total: Rs. ${total}`;

  /* COUNT */
  const count = cart.reduce((sum, item) =>
    sum + item.quantity, 0
  );

  cartCount.innerText = count;
}

/* =========================
   PRODUCT CLICK
========================= */

productContainer.addEventListener("click", (e) => {

  if (e.target.classList.contains("add-to-cart")) {

    const id = e.target.dataset.id;

    addToCart(id);

  }

});

/* =========================
   CART ACTIONS
========================= */

cartContainer.addEventListener("click", (e) => {

  const id = e.target.dataset.id;

  const item = cart.find(c => c.id == id);

  if (!item) return;

  if (e.target.classList.contains("increase")) {
    item.quantity++;
  }

  if (e.target.classList.contains("decrease")) {
    item.quantity--;

    if (item.quantity <= 0) {
      cart = cart.filter(c => c.id != id);
    }
  }

  if (e.target.classList.contains("remove")) {
    cart = cart.filter(c => c.id != id);
  }

  renderCart();

});