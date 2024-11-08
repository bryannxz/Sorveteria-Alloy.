// Array para armazenar os itens do carrinho
let carrinho = [];

// Função para adicionar produtos ao carrinho
function adicionarAoCarrinho(nome, preco) {
    if (isNaN(preco) || preco <= 0) {
        exibirMensagem('Preço inválido!');
        return;
    }

    // Adiciona o item ao carrinho
    carrinho.push({ nome, preco });
    atualizarCarrinho();
    exibirMensagem('Item adicionado ao carrinho!');
}

// Função para atualizar o conteúdo do carrinho
function atualizarCarrinho() {
    const listaCarrinho = document.getElementById('itens-carrinho');
    const total = document.getElementById('total');
    
    // Limpa a lista de itens sem recriar tudo (evita renderizações desnecessárias)
    listaCarrinho.innerHTML = ''; 

    let somaTotal = 0;

    // Adiciona os itens ao carrinho
    carrinho.forEach((item, index) => {
        const li = document.createElement('li');
        li.classList.add('item-carrinho');
        
        // Cria o texto do item
        const nomeItem = document.createElement('span');
        nomeItem.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)}`;
        
        // Cria o botão de exclusão
        const botaoExcluir = document.createElement('button');
        botaoExcluir.textContent = 'Excluir';
        botaoExcluir.classList.add('excluir-item');
        botaoExcluir.onclick = () => excluirItemCarrinho(index);

        // Anexa o nome e o botão ao item
        li.appendChild(nomeItem);
        li.appendChild(botaoExcluir);

        // Atualiza o valor total
        somaTotal += item.preco;

        listaCarrinho.appendChild(li);
    });

    // Exibe o total atualizado
    total.textContent = `Total: R$ ${somaTotal.toFixed(2)}`;

    // Habilita ou desabilita o botão de finalizar dependendo se o carrinho está vazio
    const btnFinalizar = document.getElementById('finalizar-compra');
    btnFinalizar.disabled = carrinho.length === 0;
}

// Função para excluir um item do carrinho
function excluirItemCarrinho(index) {
    // Remove o item do carrinho
    carrinho.splice(index, 1);
    atualizarCarrinho(); // Atualiza a lista do carrinho
}

// Função para finalizar a compra
function finalizarCompra() {
    if (carrinho.length === 0) {
        exibirMensagem('Seu carrinho está vazio! Adicione alguns itens antes de finalizar.');
        return;
    }

    let resumoCompra = 'Itens no carrinho:\n\n';
    carrinho.forEach(item => {
        resumoCompra += `${item.nome} - R$ ${item.preco.toFixed(2)}\n`;
    });

    const totalCompra = carrinho.reduce((soma, item) => soma + item.preco, 0);
    resumoCompra += `\nTotal: R$ ${totalCompra.toFixed(2)}`;

    // Alerta com o resumo da compra
    if (confirm(`${resumoCompra}\n\nDeseja finalizar a compra?`)) {
        // Limpa o carrinho após finalização
        carrinho = [];
        atualizarCarrinho();
        exibirMensagem('Compra finalizada com sucesso! Obrigado pela preferência.');
    }
}

// Função para exibir uma mensagem de feedback (ex: "Item adicionado ao carrinho")
function exibirMensagem(mensagem) {
    const feedback = document.createElement('div');
    feedback.classList.add('feedback');
    feedback.textContent = mensagem;

    document.body.appendChild(feedback);
    
    setTimeout(() => {
        feedback.remove(); // Remove a mensagem após 3 segundos
    }, 3000);
}

// Função para limpar o carrinho
function limparCarrinho() {
    carrinho = [];
    atualizarCarrinho();
    exibirMensagem('Carrinho limpo!');
}

// Adiciona event listeners aos botões "Adicionar ao Carrinho"
document.querySelectorAll('.add-to-cart').forEach(botao => {
    botao.addEventListener('click', (e) => {
        const nome = e.target.getAttribute('data-name');
        const preco = parseFloat(e.target.getAttribute('data-price'));
        adicionarAoCarrinho(nome, preco);
    });
});

// Adiciona event listener para o botão de limpar carrinho
const btnLimparCarrinho = document.getElementById('limpar-carrinho');
if (btnLimparCarrinho) {
    btnLimparCarrinho.addEventListener('click', limparCarrinho);
}
