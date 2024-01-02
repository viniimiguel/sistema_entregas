let pedido = [];

function adicionarAoPedido(item, preco) {
  pedido.push({ item, preco });
  exibirPedido();
}

function exibirPedido() {
  const listaPedido = document.getElementById('lista-pedido');
  listaPedido.innerHTML = '';
  pedido.forEach(item => {
    const listItem = document.createElement('li');
    listItem.textContent = `${item.item} - R$${item.preco}`;
    listaPedido.appendChild(listItem);
  });
}

function enviarPedido() {
  const mensagemPedido = gerarMensagemPedido();
  const linkWhatsApp = 'https://api.whatsapp.com/send?phone=5581989945697&text=' + encodeURIComponent(mensagemPedido);

  window.location.href = linkWhatsApp;
}

function gerarMensagemPedido() {
  let mensagem = 'Pedido:\n';
  pedido.forEach(item => {
    mensagem += `${item.item} - R$${item.preco}\n`;
  });

  mensagem += '\nDetalhes do Pedido:\n';
  const endereco = document.getElementById('endereco').value;
  const ptref = document.getElementById('ponto_de_referencia').value;
  const name = document.getElementById('Name').value;
  const metodoPagamento = document.getElementById('metodo-pagamento').value;
  const obs = document.getElementById('obs').value;
  const bairro = document.getElementById('bairro').value;
  const numero = document.getElementById('numero').value;
  mensagem += `Nome: ${name}\n`;
  mensagem += `Endereço: ${endereco}\n`;
  mensagem += `Ponto de referência: ${ptref}\n`;
  mensagem += `Método de Pagamento: ${metodoPagamento}\n`;

  if (metodoPagamento.toLowerCase() === 'dinheiro') {
    // Pergunta sobre o troco apenas se o método de pagamento for em dinheiro
    const precisaTroco = confirm('Você precisa de troco?');
    if (precisaTroco) {
      const valorTroco = prompt('Qual o valor do troco necessário?');
      mensagem += `Troco Necessário: R$${valorTroco}\n`;
    }
  }

  mensagem += `Observação: ${obs}\n`;
  mensagem += `Bairro: ${bairro}\n`;
  mensagem += `Numero: ${numero}\n`;

  const tipoEntrega = document.querySelector('input[name="tipo-entrega"]:checked').value;
  mensagem += `Tipo de Entrega: ${tipoEntrega === 'retirada' ? 'Retirada na Loja' : 'Delivery'}`;

  mensagem += '\nTotal: R$' + calcularTotalPedido();
  return mensagem;
}

function calcularTotalPedido() {
  let total = 0;
  pedido.forEach(item => {
    total += item.preco;
  });
  return total;
}
