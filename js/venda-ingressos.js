var selectSessao = document.getElementById('sessao');
var sessoes = JSON.parse(localStorage.getItem('sessoes')) || [];
var filmes = JSON.parse(localStorage.getItem('filmes')) || [];
var salas = JSON.parse(localStorage.getItem('salas')) || [];

for (var i = 0; i < sessoes.length; i++) {
    var sessao = sessoes[i];
    var filme = filmes[sessao.filmeIndex];
    var sala = salas[sessao.salaIndex];
    var option = document.createElement('option');
    option.value = i;
    option.text = filme.titulo + ' - ' + sala.nome + ' - ' + sessao.dataHora;
    selectSessao.appendChild(option);
}

var params = new URLSearchParams(window.location.search);
var sessaoParam = params.get('sessao');
if (sessaoParam !== null) {
    selectSessao.value = sessaoParam;
}

document.getElementById('formIngresso').addEventListener('submit', function(event) {
    event.preventDefault();

    var ingresso = new Ingresso(
        document.getElementById('sessao').value,
        document.getElementById('nomeCliente').value,
        document.getElementById('cpf').value,
        document.getElementById('assento').value,
        document.getElementById('pagamento').value
    );

    var ingressos = JSON.parse(localStorage.getItem('ingressos')) || [];
    ingressos.push(ingresso);
    localStorage.setItem('ingressos', JSON.stringify(ingressos));

    alert('Venda confirmada com sucesso!');
    this.reset();
});
