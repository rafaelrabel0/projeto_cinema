var sessoes = JSON.parse(localStorage.getItem('sessoes')) || [];
var filmes = JSON.parse(localStorage.getItem('filmes')) || [];
var salas = JSON.parse(localStorage.getItem('salas')) || [];
var listaSessoes = document.getElementById('listaSessoes');

for (var i = 0; i < sessoes.length; i++) {
    var sessao = sessoes[i];
    var filme = filmes[sessao.filmeIndex];
    var sala = salas[sessao.salaIndex];

    var col = document.createElement('div');
    col.className = 'col-md-4 mb-3';

    var card = document.createElement('div');
    card.className = 'card';

    var cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    var titulo = document.createElement('h5');
    titulo.className = 'card-title';
    titulo.textContent = filme.titulo;

    var salaP = document.createElement('p');
    salaP.className = 'card-text';
    salaP.textContent = 'Sala: ' + sala.nome;

    var dataP = document.createElement('p');
    dataP.className = 'card-text';
    dataP.textContent = 'Data e Hora: ' + sessao.dataHora;

    var precoP = document.createElement('p');
    precoP.className = 'card-text';
    precoP.textContent = 'Preço: R$ ' + sessao.preco;

    var btn = document.createElement('a');
    btn.className = 'btn btn-primary';
    btn.href = 'venda-ingressos.html?sessao=' + i;
    btn.textContent = 'Comprar Ingresso';

    cardBody.appendChild(titulo);
    cardBody.appendChild(salaP);
    cardBody.appendChild(dataP);
    cardBody.appendChild(precoP);
    cardBody.appendChild(btn);
    card.appendChild(cardBody);
    col.appendChild(card);
    listaSessoes.appendChild(col);
}
