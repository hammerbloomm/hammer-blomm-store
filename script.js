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

let cart = JSON.parse(localStorage.getItem("hammerbloom-cart")) || [];

let currentCategory = "Todos";
let currentSearch = "";


/* =========================
   PREÇO
========================= */

function formatPrice(price) {
  return price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}


/* =========================
   PRODUTOS
========================= */

function renderProducts(category = "Todos", search = "") {

  const grid = document.getElementById("productsGrid");

  if (!grid) return;

  const filteredProducts = products.filter(product => {

    const matchesCategory =
      category === "Todos" ||
      product.category.trim().toUpperCase() ===
      category.trim().toUpperCase();

    const matchesSearch =
      product.name
        .toLowerCase()
        .includes(search.toLowerCase());

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

        <button
          class="add-cart"
          onclick="addToCart(${product.id})"
        >
          Adicionar ao carrinho
        </button>

      </div>

    </article>

  `).join("");
}


/* =========================
   CARRINHO
========================= */

function addToCart(id) {

  const product = products.find(
    product => product.id === id
  );

  if (!product) return;

  cart.push(product);

  localStorage.setItem(
    "hammerbloom-cart",
    JSON.stringify(cart)
  );

  renderCart();

  alert(
    `${product.name} foi adicionado ao carrinho 💗`
  );
}


function removeFromCart(index) {

  cart.splice(index, 1);

  localStorage.setItem(
    "hammerbloom-cart",
    JSON.stringify(cart)
  );

  renderCart();
}


function renderCart() {

  const cartItems =
    document.getElementById("cartItems");

  const cartCount =
    document.getElementById("cartCount");

  const cartTotal =
    document.getElementById("cartTotal");


  /* quantidade */

  if (cartCount) {

    cartCount.textContent =
      cart.length;

  }


  /* total */

  if (cartTotal) {

    const total = cart.reduce(
      (sum, product) =>
        sum + product.price,
      0
    );

    cartTotal.textContent =
      formatPrice(total);

  }


  if (!cartItems) return;


  /* carrinho vazio */

  if (cart.length === 0) {

    cartItems.innerHTML = `
      <p class="empty-cart">
        Seu carrinho está vazio 💗
      </p>
    `;

    return;
  }


  /* produtos do carrinho */

  cartItems.innerHTML = cart.map(
    (product, index) => `

      <div class="cart-item">

        <div>

          <strong>
            ${product.name}
          </strong>

          <span>
            ${formatPrice(product.price)}
          </span>

        </div>

        <button
          onclick="removeFromCart(${index})"
        >
          ×
        </button>

      </div>

    `
  ).join("");
}


/* =========================
   CATEGORIAS
========================= */

function selectCategory(category) {

  currentCategory = category;

  renderProducts(
    currentCategory,
    currentSearch
  );


  document
    .querySelectorAll("#categoryTabs button")
    .forEach(button => {

      button.classList.toggle(
        "active",
        button.dataset.category === category
      );

    });
}


/* =========================
   INICIALIZAÇÃO
========================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    renderProducts();

    renderCart();


    /* =========================
       ABAS DE CATEGORIA
    ========================= */

    document
      .querySelectorAll("#categoryTabs button")
      .forEach(button => {

        button.addEventListener(
          "click",
          () => {

            selectCategory(
              button.dataset.category
            );

          }
        );

      });


    /* =========================
       CARDS DE CATEGORIA
    ========================= */

    document
      .querySelectorAll("[data-jump-category]")
      .forEach(button => {

        button.addEventListener(
          "click",
          () => {

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

          }
        );

      });


    /* =========================
       BUSCA
    ========================= */

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
       ABRIR CARRINHO
    ========================= */

    const openCart =
      document.getElementById("openCart");

    const closeCart =
      document.getElementById("closeCart");

    const cartOverlay =
      document.getElementById("cartOverlay");


    if (openCart) {

      openCart.addEventListener(
        "click",
        () => {

          document.body.classList.add(
            "cart-open"
          );

        }
      );

    }


    /* =========================
       FECHAR CARRINHO
    ========================= */

    if (closeCart) {

      closeCart.addEventListener(
        "click",
        () => {

          document.body.classList.remove(
            "cart-open"
          );

        }
      );

    }


    if (cartOverlay) {

      cartOverlay.addEventListener(
        "click",
        () => {

          document.body.classList.remove(
            "cart-open"
          );

        }
      );

    }


    /* =========================
       ENVIAR PEDIDO
    ========================= */

    const sendOrder =
      document.getElementById("sendOrder");


    if (sendOrder) {

      sendOrder.addEventListener(
        "click",
        async () => {

          const nicknameInput =
            document.getElementById("nickname");

          const cartMessage =
            document.getElementById("cartMessage");


          const nickname =
            nicknameInput
              ? nicknameInput.value.trim()
              : "";


          /* carrinho vazio */

          if (cart.length === 0) {

            cartMessage.innerHTML =
              "Seu carrinho está vazio 💗";

            return;
          }


          /* nick vazio */

          if (!nickname) {

            cartMessage.innerHTML =
              "Digite seu nick antes de copiar o pedido 💗";

            return;
          }


          /* total */

          const total =
            cart.reduce(
              (sum, product) =>
                sum + product.price,
              0
            );


          /* produtos */

          const items =
            cart
              .map(
                product =>
                  `• ${product.name} — ${formatPrice(product.price)}`
              )
              .join("\n");


          /* pedido */

          const pedido =
`🛍️ PEDIDO — HAMMER BLOOM STORE

👤 Nick: ${nickname}

📦 Produtos:
${items}

💰 Total: ${formatPrice(total)}

💗 Aguardo as instruções para pagamento!`;


          /* copiar */

          try {

            await navigator.clipboard.writeText(
              pedido
            );


            cartMessage.innerHTML = `
              <strong>
                Pedido copiado! 💗
              </strong>
              <br>
              Agora é só colar no Discord.
            `;

          } catch (error) {

            cartMessage.innerHTML = `
              Não foi possível copiar automaticamente 😭
              <br>
              Selecione e copie o pedido manualmente.
            `;

          }

        }
      );

    }

  }
);
