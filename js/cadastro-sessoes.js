var selectFilme = document.getElementById('filme');
var filmes = JSON.parse(localStorage.getItem('filmes')) || [];
for (var i = 0; i < filmes.length; i++) {
    var option = document.createElement('option');
    option.value = i;
    option.text = filmes[i].titulo;
    selectFilme.appendChild(option);
}

var selectSala = document.getElementById('sala');
var salas = JSON.parse(localStorage.getItem('salas')) || [];
for (var i = 0; i < salas.length; i++) {
    var option = document.createElement('option');
    option.value = i;
    option.text = salas[i].nome;
    selectSala.appendChild(option);
}

document.getElementById('formSessao').addEventListener('submit', function(event) {
    event.preventDefault();

    var sessao = new Sessao(
        document.getElementById('filme').value,
        document.getElementById('sala').value,
        document.getElementById('dataHora').value,
        document.getElementById('preco').value,
        document.getElementById('idioma').value,
        document.getElementById('formato').value
    );

    var sessoes = JSON.parse(localStorage.getItem('sessoes')) || [];
    sessoes.push(sessao);
    localStorage.setItem('sessoes', JSON.stringify(sessoes));

    alert('Sessão salva com sucesso!');
    this.reset();
});
