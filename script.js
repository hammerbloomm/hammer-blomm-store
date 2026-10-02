const products = [
  {
    id: 1,
    name: "SakuraParasol",
    category: "LENDÁRIOS",
    price: 1.90,
    image: "sakura-parasol-10df6434702075339d17792225136968-1024-1024.webp"
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
    image: "party-ballons-e2c0afe19ab06790ea17700035793224-1024-1024.webp"
  }
];

let cart = [];
let category = "Todos";
let search = "";

const money = value =>
  value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });


function renderProducts() {
  const grid = document.getElementById("productsGrid");

  const list = products.filter(product => {
    const sameCategory =
  const matchesCategory =
  category === "Todos" ||
  product.category.trim().toUpperCase() === category.trim().toUpperCase();

    const sameSearch =
      product.name.toLowerCase().includes(
        search.toLowerCase()
      );

    return sameCategory && sameSearch;
  });

  grid.innerHTML = list.length
    ? list.map(product => `
        <article class="product-card">
          <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
          </div>

          <div class="product-info">
            <span class="product-category">
              ${product.category}
            </span>

            <h3>${product.name}</h3>

            <strong class="product-price">
              ${money(product.price)}
            </strong>

            <button
              class="button button-primary"
              onclick="addToCart(${product.id})"
            >
              Adicionar ao carrinho
            </button>
          </div>
        </article>
      `).join("")
    : `<p class="empty-state">Nenhum produto encontrado 𖹭</p>`;
}


function addToCart(id) {
  const product = products.find(p => p.id === id);

  if (!product) return;

  cart.push(product);
  renderCart();

  document.body.classList.add("cart-open");
}


function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
}


function renderCart() {
  const items = document.getElementById("cartItems");
  const count = document.getElementById("cartCount");
  const total = document.getElementById("cartTotal");

  count.textContent = cart.length;

  const sum = cart.reduce(
    (total, product) => total + product.price,
    0
  );

  total.textContent = money(sum);

  items.innerHTML = cart.length
    ? cart.map((product, index) => `
        <div class="cart-item">
          <div>
            <strong>${product.name}</strong>
            <span>${money(product.price)}</span>
          </div>

          <button onclick="removeFromCart(${index})">
            ×
          </button>
        </div>
      `).join("")
    : `<p class="empty-state">Seu carrinho está vazio 𖹭</p>`;
}


function selectCategory(value) {
  category = value;
  renderProducts();

  document
    .querySelectorAll("#categoryTabs button")
    .forEach(button => {
      button.classList.toggle(
        "active",
        button.dataset.category === value
      );
    });
}


document.addEventListener("DOMContentLoaded", () => {

  renderProducts();
  renderCart();

  document
    .querySelectorAll("#categoryTabs button")
    .forEach(button => {
      button.addEventListener("click", () => {
        selectCategory(button.dataset.category);
      });
    });


  document
    .querySelectorAll("[data-jump-category]")
    .forEach(button => {
      button.addEventListener("click", () => {
        selectCategory(button.dataset.jumpCategory);

        document
          .getElementById("produtos")
          .scrollIntoView({
            behavior: "smooth"
          });
      });
    });


  document
    .getElementById("searchInput")
    .addEventListener("input", event => {
      search = event.target.value;
      renderProducts();
    });


  document
    .getElementById("openCart")
    .addEventListener("click", () => {
      document.body.classList.add("cart-open");
    });


  document
    .getElementById("closeCart")
    .addEventListener("click", () => {
      document.body.classList.remove("cart-open");
    });


  document
    .getElementById("cartOverlay")
    .addEventListener("click", () => {
      document.body.classList.remove("cart-open");
    });


  document
    .getElementById("year")
    .textContent = new Date().getFullYear();


  document
    .getElementById("sendOrder")
    .addEventListener("click", async () => {

      const nickname =
        document.getElementById("nickname").value.trim();

      const message =
        document.getElementById("cartMessage");

      if (!cart.length) {
        message.textContent =
          "Seu carrinho está vazio 𖹭";
        return;
      }

      if (!nickname) {
        message.textContent =
          "Digite seu nick antes de copiar o pedido 𖹭";
        return;
      }

      if (sendOrder) {
  sendOrder.addEventListener("click", async () => {

    const nickname =
      document.getElementById("nickname").value.trim();

    const cartMessage =
      document.getElementById("cartMessage");

    if (cart.length === 0) {
      cartMessage.innerHTML =
        "Seu carrinho está vazio 💗";
      return;
    }

    if (!nickname) {
      cartMessage.innerHTML =
        "Digite seu nick antes de copiar o pedido 💗";
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

    const pedido = `🛍️ PEDIDO — HAMMERBLOOM STORE

👤 Nick: ${nickname}

📦 Produtos:
${items}

💰 Total: ${formatPrice(total)}

💗 Aguardo as instruções para pagamento!`;

    try {
      await navigator.clipboard.writeText(pedido);

      cartMessage.innerHTML = `
        <strong>Pedido copiado! 💗</strong><br>
        Agora é só colar no Discord.
      `;
    } catch (error) {
      cartMessage.innerHTML = `
        Não foi possível copiar automaticamente 😭<br>
        Selecione e copie o pedido manualmente.
      `;
    }

  });
      }
