# HammerBloom Store

Versão reorganizada da loja, inspirada na estrutura de navegação de lojas de catálogo como a King's Store, mas com identidade própria.

## Arquivos

- `index.html` — estrutura da página
- `style.css` — visual
- `script.js` — produtos, filtros e carrinho
- `images/logo.png` — logo enviada pela dona da loja

## Como trocar produtos

Abra `script.js` e edite o array `products`.

Exemplo:

{
  id: 1,
  name: "Nome do produto",
  category: "Novidades",
  price: 10.00,
  image: "images/produto.png"
}

Categorias disponíveis:
- Novidades
- Especiais
- Ofertas

Não há seção de avaliações nem de "mais vendidos".
