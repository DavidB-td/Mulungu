// calcular-frete.js
const fetch = require("node-fetch");

module.exports = async (request, response) => {
  const { cepDestino, produtosCarrinho } = request.body;

  // Construir a lista de produtos com base no carrinho do usuário
  const produtos = produtosCarrinho.map((produto) => ({
    id: produto.id.toString(), // Garantir que o ID seja uma string
    width: produto.width,
    height: produto.height,
    length: produto.length,
    weight: produto.weight,
    insurance_value: produto.price, // O valor do seguro pode ser o preço do produto
    quantity: produto.quantity,
  }));

  const dadosFrete = {
    from: {
      postal_code: "50030-140", // Seu CEP de origem
    },
    to: {
      postal_code: cepDestino, // CEP do destino fornecido pelo usuário
    },
    products: produtos,
  };

  const url = "https://sandbox.melhorenvio.com.br/api/v2/me/shipment/calculate";
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization:
        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMzVkN2RiM2IwMWU3MzFjMjhjZTBjM2Y1MWE1YzNiNzcyNDBkNzgzZmE3ZGU1NjYxM2NlMzg4MjYyMmI3ODU5YjgxOTY2ODkzMzZhNGQzY2IiLCJpYXQiOjE3MTUyODU2MTkuODA4MDY2LCJuYmYiOjE3MTUyODU2MTkuODA4MDY3LCJleHAiOjE3NDY4MjE2MTkuNzYxMzIzLCJzdWIiOiI5YzAxMTlkMy02ZmQwLTRlM2YtOTJhMi05MWQwM2Q0YjU4NTYiLCJzY29wZXMiOlsic2hpcHBpbmctY2FsY3VsYXRlIl19.oW2QNxmK4T-aSZyhtGd-d7ExUzwfhX5PUYgnQKlnJOYwPDfVzU5anEafDA5lpNVCC8trduQDuFhfNKVxvN31xRkXHKAMMqpFyqdaLbgtIH-yZ1wmHSzcqkx_VKt05VOa9tB2ZubeDkpdC8FBzrdIFjxuTglWnML5T_StO31IV_VQqNTOCnkHpflc0dZAr3jL5wnkeedzz1EsKknHmDH3KhwPWMECOqfLN6ogqPIJdk4bKYPwky6NcGOsh8GHf1HcWKTEbplNv8utauy1dSnGEC6sSrfkIMr-u7GyGV2eVXHXdJuvDLa2k3MQ9fcys6pJktbhzuGi_xdLk4UaT5L3W-TzCbByW8HUwdp447li_J4Q4Zu0AmMfFpJBZTFCbE-8JVKm0pzRehQTFk_hpWZDdMwLC0mZBgUhFjRHTxCuYE7wYV0VOKGyUN77Mb9s20CBRTLOJ_3J5j3AjvcO-79RDEmV0nfJ8l77i14caNd-OzJCNRjQYx-HHsBmHFGV9PkYPdLUd2k6kf94ILMJogqqTG3xDolRVvrV-lfZCazZjndbRDimIPik02lpNUTSSdPEOSvaRbPooiGqPkJns2LeUZq-CoKeFmqS4-U92ZAv_2kBFFZAjV1doE8ZwWRBIy3JOVjduvmwDakHtpfJ5kF6rkJ46jGyLDYdOXUq_2e9sPU", // Substitua pelo seu token de autenticação
      "Content-Type": "application/json",
      "User-Agent": "SuaAplicacao (seuemail@example.com)",
    },
    body: JSON.stringify(dadosFrete),
  };

  try {
    const resFrete = await fetch(url, options);
    const data = await resFrete.json();
    response.status(200).json(data);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};
