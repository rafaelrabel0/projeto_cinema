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

function carregarIngressos() {
    var ingressos = JSON.parse(localStorage.getItem('ingressos')) || [];
    var tbody = document.getElementById('tabelaIngressos');
    tbody.innerHTML = '';

    for (var i = 0; i < ingressos.length; i++) {
        var ingresso = ingressos[i];
        var sessao = sessoes[ingresso.sessaoIndex];
        var filme = filmes[sessao.filmeIndex];
        var sessaoTexto = filme.titulo + ' - ' + sessao.dataHora;

        var tr = document.createElement('tr');
        tr.innerHTML =
            '<td>' + sessaoTexto + '</td>' +
            '<td>' + ingresso.nomeCliente + '</td>' +
            '<td>' + ingresso.cpf + '</td>' +
            '<td>' + ingresso.assento + '</td>' +
            '<td>' + ingresso.pagamento + '</td>' +
            '<td>' +
                '<button class="btn btn-sm btn-primary me-1" onclick="editarIngresso(' + i + ')">Editar</button>' +
                '<button class="btn btn-sm btn-outline-light" onclick="excluirIngresso(' + i + ')">Excluir</button>' +
            '</td>';
        tbody.appendChild(tr);
    }
}

function editarIngresso(index) {
    var ingressos = JSON.parse(localStorage.getItem('ingressos')) || [];
    var ingresso = ingressos[index];

    document.getElementById('sessao').value = ingresso.sessaoIndex;
    document.getElementById('nomeCliente').value = ingresso.nomeCliente;
    document.getElementById('cpf').value = ingresso.cpf;
    document.getElementById('assento').value = ingresso.assento;
    document.getElementById('pagamento').value = ingresso.pagamento;
    document.getElementById('editIndex').value = index;

    document.getElementById('btnSalvar').textContent = 'Atualizar Venda';
    document.getElementById('btnCancelar').classList.remove('d-none');
}

function excluirIngresso(index) {
    if (confirm('Deseja excluir este ingresso?')) {
        var ingressos = JSON.parse(localStorage.getItem('ingressos')) || [];
        ingressos.splice(index, 1);
        localStorage.setItem('ingressos', JSON.stringify(ingressos));
        carregarIngressos();
    }
}

document.getElementById('btnCancelar').addEventListener('click', function() {
    document.getElementById('formIngresso').reset();
    document.getElementById('editIndex').value = -1;
    document.getElementById('btnSalvar').textContent = 'Confirmar Venda';
    this.classList.add('d-none');
});

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
    var editIndex = document.getElementById('editIndex').value;

    if (editIndex == -1) {
        ingressos.push(ingresso);
    } else {
        ingressos[editIndex] = ingresso;
    }

    localStorage.setItem('ingressos', JSON.stringify(ingressos));

    this.reset();
    document.getElementById('editIndex').value = -1;
    document.getElementById('btnSalvar').textContent = 'Confirmar Venda';
    document.getElementById('btnCancelar').classList.add('d-none');
    carregarIngressos();
});

carregarIngressos();
