var stars = document.querySelectorAll(".star-icon");

document.addEventListener("click", function (e) {
  var classStar = e.target.classList;
  if (!classStar.contains("ativo")) {
    stars.forEach(function (star) {
      star.classList.remove("ativo");
    });
    classStar.add("ativo");
    console.log(e.target.getAttribute("data-avaliacao"));
  }
});

function validateForm() {
  var senha = document.getElementById("senha").value;
  var confirm_senha = document.getElementById("confirm_senha").value;

  if (senha !== confirm_senha) {
    alert("As senhas não coincidem. Por favor, insira senhas iguais.");
    return false;
  }

  return true;
}

// Script JavaScript para gerenciar o carrinho de compras

// Array para armazenar os produtos do carrinho
let carrinho = [];

// Função para adicionar um produto ao carrinho
function adicionarAoCarrinho(idProduto, nomeProduto, precoProduto, imagemProduto) {
  let produtoNoCarrinho = carrinho.find((item) => item.id === idProduto);
  if (produtoNoCarrinho) {
    produtoNoCarrinho.quantidade++;
  } else {
    carrinho.push({
      id: idProduto,
      nome: nomeProduto,
      preco: precoProduto,
      quantidade: 1,
      imagem : imagemProduto,
    });
  }
  atualizarCarrinho();
}

// Função para remover um produto do carrinho
function removerDoCarrinho(idProduto) {
  carrinho = carrinho.filter((item) => item.id !== idProduto);
  atualizarCarrinho();
}

// Função para atualizar o carrinho na interface do usuário
function atualizarCarrinho() {
  let subtotal = 0;
  let carrinhoHtml = "";
  carrinho.forEach((item) => {
    let totalItem = item.preco * item.quantidade;
    subtotal += totalItem;
    carrinhoHtml += `
      <div class="item-cart">
        <img src="${item.imagem}" alt="${item.nome}" style="width:110px; height:110px;" />
        <div class="info">
          <div class="name">${item.nome}</div>
          <div class="qty">
            <button onclick="alterarQuantidade(${item.id}, -1)">−</button>
            <span>${item.quantidade}</span>
            <button onclick="alterarQuantidade(${item.id}, 1)">+</button>
          </div>
          <div class="preco-card">R$${item.preco.toFixed(2)}</div>
        </div>
      </div>
    `;
  });
  document.getElementById("carrinho").innerHTML = carrinhoHtml;
  document.getElementById("subtotal").innerText = `Sub-total: R$${subtotal.toFixed(2)}`;
  document.getElementById("total").innerText = `Total: R$${subtotal.toFixed(2)}`;
}

// Função para alterar a quantidade de um produto no carrinho
function alterarQuantidade(idProduto, incremento) {
  let produtoNoCarrinho = carrinho.find((item) => item.id === idProduto);
  if (produtoNoCarrinho) {
    produtoNoCarrinho.quantidade += incremento;
    if (produtoNoCarrinho.quantidade <= 0) {
      removerDoCarrinho(idProduto);
    } else {
      atualizarCarrinho();
    }
  }
}
