const products = [
  {
    id: 1,
    name: "SakuraParasol",
    category: "LENDÁRIOS",
    price: 1.90,
    image: "dcf11165903713367ebd0f8da717110a.jpg"
  },
  {
    id: 2,
    name: "SpookyBrew",
    category: "LENDÁRIOS",
    price: 1.90,
    image: "spooky-brew-095490d66d1b8db1ae17700612921001-1024-1024.webp"
  },
  {
    id: 3,
    name: "Party Ballons",
    category: "LENDÁRIOS",
    price: 10.90,
    image: ""
  }
];

let cart = JSON.parse(localStorage.getItem("hammerbloom-cart")) || [];

let currentCategory = "Todos";
let currentSearch = "";

function formatPrice(price) {
  return price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function renderProducts(category = "Todos", search = "") {
  const grid = document.getElementById("productsGrid");

  if (!grid) return;

  const filteredProducts = products.filter(product => {
    const matchesCategory =
  category === "Todos" ||
  product.category.trim().toUpperCase() === category.trim().toUpperCase();

    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  if (filteredProducts.length === 0) {
    grid.innerHTML = `
      <div class="empty-products">
        Nenhum produto encontrado 💗
      </div>
    `;
    return;
  }

  grid.innerHTML = filteredProducts.map(product => `
    <article class="product-card">

      <div class="product-image">
        ${
          product.image
            ? `<img src="${product.image}" alt="${product.name}">`
            : `<span>Imagem do produto</span>`
        }
      </div>

      <div class="product-info">

        <span class="product-category">
          ${product.category}
        </span>

        <h3>${product.name}</h3>

        <strong>
          ${formatPrice(product.price)}
        </strong>

        <button class="add-cart" onclick="addToCart(${product.id})">
          Adicionar ao carrinho
        </button>

      </div>

    </article>
  `).join("");
}

function addToCart(id) {
  const product = products.find(product => product.id === id);

  if (!product) return;

  cart.push(product);

  localStorage.setItem(
    "hammerbloom-cart",
    JSON.stringify(cart)
  );

  renderCart();

  alert(`${product.name} foi adicionado ao carrinho 💗`);
}

function renderCart() {
  const cartItems = document.getElementById("cartItems");
  const cartCount = document.getElementById("cartCount");

  if (cartCount) {
    cartCount.textContent = cart.length;
  }

  if (!cartItems) return;

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <p class="empty-cart">
        Seu carrinho está vazio 💗
      </p>
    `;
    return;
  }

  cartItems.innerHTML = cart.map((product, index) => `
    <div class="cart-item">

      <div>
        <strong>${product.name}</strong>
        <span>${formatPrice(product.price)}</span>
      </div>

      <button onclick="removeFromCart(${index})">
        ×
      </button>

    </div>
  `).join("");
}

function removeFromCart(index) {
  cart.splice(index, 1);

  localStorage.setItem(
    "hammerbloom-cart",
    JSON.stringify(cart)
  );

  renderCart();
}


/* =========================
   CATEGORIAS DO CATÁLOGO
========================= */

function selectCategory(category) {

  currentCategory = category;

  renderProducts(
    currentCategory,
    currentSearch
  );

  document.querySelectorAll(
    "#categoryTabs button"
  ).forEach(button => {

    button.classList.toggle(
      "active",
      button.dataset.category === category
    );

  });
}


/* BOTÕES LENDÁRIOS / ÉPICOS / COMUNS */

document.addEventListener("DOMContentLoaded", () => {

  renderProducts();
  renderCart();


  /* Abas do catálogo */

  document.querySelectorAll(
    "#categoryTabs button"
  ).forEach(button => {

    button.addEventListener("click", () => {

      selectCategory(
        button.dataset.category
      );

    });

  });


  /* Cartões grandes de categorias */

  document.querySelectorAll(
    "[data-jump-category]"
  ).forEach(button => {

    button.addEventListener("click", () => {

      const category =
        button.dataset.jumpCategory;

      selectCategory(category);

      const productsSection =
        document.getElementById("produtos");

      if (productsSection) {

        productsSection.scrollIntoView({
          behavior: "smooth"
        });

      }

    });

  });


  /* Busca */

  const searchInput =
    document.getElementById("searchInput");

  if (searchInput) {

    searchInput.addEventListener(
      "input",
      event => {

        currentSearch =
          event.target.value;

        renderProducts(
          currentCategory,
          currentSearch
        );

      }
    );

  }
  /* =========================
     CARRINHO
  ========================= */

  const openCart = document.getElementById("openCart");
  const closeCart = document.getElementById("closeCart");
  const cartOverlay = document.getElementById("cartOverlay");
  const sendOrder = document.getElementById("sendOrder");

  if (openCart) {
    openCart.addEventListener("click", () => {
      document.body.classList.add("cart-open");
    });
  }

  if (closeCart) {
    closeCart.addEventListener("click", () => {
      document.body.classList.remove("cart-open");
    });
  }

  if (cartOverlay) {
    cartOverlay.addEventListener("click", () => {
      document.body.classList.remove("cart-open");
    });
  }

  if (sendOrder) {
  sendOrder.addEventListener("click", async () => {

    const nickname =
      document.getElementById("nickname").value.trim();

    const cartMessage =
      document.getElementById("cartMessage");

    if (cart.length === 0) {
      cartMessage.innerHTML =
        "Seu carrinho está vazio 𖹭";
      return;
    }

    if (!nickname) {
      cartMessage.innerHTML =
        "Digite seu nick antes de copiar o pedido 𖹭";
      return;
    }

    const total = cart.reduce(
      (sum, product) => sum + product.price,
      0
    );

    const items = cart
      .map(product =>
        `• ${product.name} — ${formatPrice(product.price)}`
      )
      .join("\n");

    const pedido = `🛍️ PEDIDO — HAMMER BLOOM STORE

👤 Nick: ${nickname}

📦 Produtos:
${items}

💰 Total: ${formatPrice(total)}

💗 Aguardo as instruções para pagamento!`;

    try {
      await navigator.clipboard.writeText(pedido);

      cartMessage.innerHTML = `
        <strong>Pedido copiado! 𖹭</strong><br>
        Agora é só colar no Discord.
      `;
    } catch (error) {
      cartMessage.innerHTML = `
        Não foi possível copiar automaticamente <br>
        Selecione e copie o pedido manualmente.
      `;
    }

  });
  }
    });
  }
});
