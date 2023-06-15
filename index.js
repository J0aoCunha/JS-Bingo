var jogadores = [];
var jogoRolando = false;

function gerarNumerosAleatorios(quantidade, min, max) {
    if (quantidade > (max - min)) {
        console.log("intervalo insuficiente ...");
        return;
    }

    var numeros = [];

    while (numeros.length < quantidade) {
        var aleatorio = Math.floor(Math.random() * (max - min + 1)) + min;

        if (!numeros.includes(aleatorio)) {
            numeros.push(aleatorio);
        }
    }
    return numeros;
}

function gerarCartela() {
    var cartela = [
        gerarNumerosAleatorios(5, 1, 15),
        gerarNumerosAleatorios(5, 16, 30),
        gerarNumerosAleatorios(5, 31, 45),
        gerarNumerosAleatorios(5, 46, 60),
        gerarNumerosAleatorios(5, 61, 75)
    ];

    return cartela;
}

function DesenharCartela() {
    if (jogoRolando === true) {
        alert("Não é possível reiniciar o jogo em andamento!");
        return;
    }

    var nomeJogador = prompt('Digite o nome do jogador');
    if (nomeJogador === "" || nomeJogador === null) {
        alert("Digite seu nome aí queridão!");
        return;
    } else if (nomeJogador.length <= 2) {
        alert("Vixe, pequeno demais!");
        return;
    }

    var cartela = gerarCartela();

    var jogador = {
        nome: nomeJogador,
        cartela: cartela
    };

    jogadores.push(jogador);
    console.log(jogadores);

    var sectionCartela = document.getElementById("area-cartelas");

    var h3Jogador = document.createElement("h3");
    h3Jogador.style = "text-align: center; color: black;";
    h3Jogador.innerText = nomeJogador;

    var divCartela = document.getElementById("cartela");
    divCartela.appendChild(h3Jogador);

    var tabela = document.createElement('table');
    var thead = document.createElement('thead');

    var thB = document.createElement('th');
    thB.innerText = 'B';
    var thI = document.createElement('th');
    thI.innerText = 'I';
    var thN = document.createElement('th');
    thN.innerText = 'N';
    var thG = document.createElement('th');
    thG.innerText = 'G';
    var thO = document.createElement('th');
    thO.innerText = 'O';

    thead.appendChild(thB);
    thead.appendChild(thI);
    thead.appendChild(thN);
    thead.appendChild(thG);
    thead.appendChild(thO);
    divCartela.appendChild(h3Jogador);

    for (var i = 0; i < 5; i++) {
        var tr = document.createElement('tr');
        for (var j = 0; j < 5; j++) {
            var td = document.createElement('td');
            if (i === 2 && j === 2) {
                td.innerText = "X";
            } else {
                td.innerText = cartela[j][i];
            }
            tr.appendChild(td);
        }
        tabela.appendChild(tr);
    }

    tabela.appendChild(thead);
    divCartela.appendChild(tabela);
}

function reiniciarJogo() {
    jogadores = [];
}
