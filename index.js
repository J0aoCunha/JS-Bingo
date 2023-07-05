//Vetores do jogo
var jogadores = []
var numerosSorteados = []

//Funçao que ira gerar a Cartela do Bingo
function desenharCartela(jogador) {

    gerarCartela();

    //Seleciono aonde o elemento vai ser criado.
    const pai_div_cartela = document.getElementById('body_cartelas')

    //Crio a div onde a cartela e o nome do jogar vao ser criados
    const div_cartela = document.createElement('div');
    div_cartela.className = 'cartela';

    // Ira inserir a div_cartela dentro do pai dela 
    pai_div_cartela.appendChild(div_cartela)



    //Cria um o H4 onde ira ficar o nome do jogador
    const h4_jogador = document.createElement('h4');
    h4_jogador.innerText = jogador.nome;

    //Insere o nome do jogador na div_cartela
    div_cartela.appendChild(h4_jogador);

    //Cria a tabela do bingo
    const tabelas = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody')

    //Cria os elementos do thead
    const thB = document.createElement('th');
    const thI = document.createElement('th');
    const thN = document.createElement('th');
    const thG = document.createElement('th');
    const thO = document.createElement('th');

    thB.innerText = 'B'
    thI.innerText = 'I'
    thN.innerText = 'N'
    thG.innerText = 'G'
    thO.innerText = 'O'

    for (var i = 0; i < 5; i++) {
        const tr = document.createElement('tr')
        for (var j = 0; j < 5; j++) {
            const td = document.createElement('td')
            td.innerText = jogador.cartela[j][i];
            tr.appendChild(td)
        }
        tbody.appendChild(tr);
    }


    thead.appendChild(thB);
    thead.appendChild(thI);
    thead.appendChild(thN);
    thead.appendChild(thG);
    thead.appendChild(thO);

    tabelas.appendChild(thead);
    tabelas.appendChild(tbody);
    div_cartela.appendChild(tabelas);

}

//Gera as colunas da tabela
function gerarColuna(quantidade, inicio, fim) {
    var coluna = [];

    while (coluna.length < quantidade) {
        var aleatorio = Math.floor(Math.random() * (fim - inicio) + inicio);
        if (!coluna.includes(aleatorio)) {
            coluna.push(aleatorio);
        }
    }
    return coluna;
}

//função que ira gerar os numeros alatorios de 1 a 75 na cartela 
function gerarCartela() {
    var cartela = [gerarColuna(5, 1, 15), gerarColuna(5, 16, 30), gerarColuna(5, 31, 45), gerarColuna(5, 46, 60), gerarColuna(5, 61, 75)];

    return cartela;
}

//Inscreve o jogador no jogo
function inscreverJogador() {
    const nome = prompt('Digite o nome do jogador');
    if (nome.length <= 2) {
        alert('seu nome precisa ter mais que dois caracteres');
        return
    }

    const cartela = gerarCartela();

    const jogador = {
        nome: nome,
        cartela: cartela
    }
    jogadores.push(jogador);
    desenharCartela(jogador);
}

//Inicia o jogo do bingo
function jogar() {
    if (jogadores.length < 2) {
        alert('Você precisa de dois jogadores');
        return
    }

    const intervalo = setInterval(function () {
        while (true) {
            var aleatorio = Math.floor(Math.random() * 75 + 1);
            if (!numerosSorteados.includes(aleatorio)) {
                numerosSorteados.push(aleatorio);
                break;
            }
        }

        const body_numeros = document.getElementById('body_numeros');

        const span = document.createElement('span')
        span.innerText = aleatorio;

        body_numeros.appendChild(span);

        verificarTabela(aleatorio)

        console.log(numerosSorteados)
    }, 700)
}

//Verifica se o numero ja foi sorteado na tabela
function verificarTabela(sorteado) {
    var numeros_cartelas = document.getElementsByTagName('td');

    for (var i = 0; i < numeros_cartelas.length; i++) {
        if (numeros_cartelas[i].innerText == sorteado) {
            numeros_cartelas[i].style.backgroundColor = 'lightcyan'
        }
    }
}
