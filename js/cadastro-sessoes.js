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

function carregarSessoes() {
    var sessoes = JSON.parse(localStorage.getItem('sessoes')) || [];
    var tbody = document.getElementById('tabelaSessoes');
    tbody.innerHTML = '';

    for (var i = 0; i < sessoes.length; i++) {
        var filme = filmes[sessoes[i].filmeIndex];
        var sala = salas[sessoes[i].salaIndex];
        var tr = document.createElement('tr');
        tr.innerHTML =
            '<td style="min-width:150px">' + (filme ? filme.titulo : '-') + '</td>' +
            '<td style="min-width:100px">' + (sala ? sala.nome : '-') + '</td>' +
            '<td class="text-nowrap">' + sessoes[i].dataHora + '</td>' +
            '<td>R$ ' + sessoes[i].preco + '</td>' +
            '<td>' + sessoes[i].idioma + '</td>' +
            '<td>' + sessoes[i].formato + '</td>' +
            '<td class="text-nowrap">' +
                '<button class="btn btn-sm btn-primary me-1" onclick="editarSessao(' + i + ')">Editar</button>' +
                '<button class="btn btn-sm btn-outline-light" onclick="excluirSessao(' + i + ')">Excluir</button>' +
            '</td>';
        tbody.appendChild(tr);
    }
}

function editarSessao(index) {
    var sessoes = JSON.parse(localStorage.getItem('sessoes')) || [];
    var sessao = sessoes[index];

    document.getElementById('filme').value = sessao.filmeIndex;
    document.getElementById('sala').value = sessao.salaIndex;
    document.getElementById('dataHora').value = sessao.dataHora;
    document.getElementById('preco').value = sessao.preco;
    document.getElementById('idioma').value = sessao.idioma;
    document.getElementById('formato').value = sessao.formato;
    document.getElementById('editIndex').value = index;

    document.getElementById('btnSalvar').textContent = 'Atualizar Sessão';
    document.getElementById('btnCancelar').classList.remove('d-none');
}

function excluirSessao(index) {
    if (confirm('Deseja excluir esta sessão?')) {
        var sessoes = JSON.parse(localStorage.getItem('sessoes')) || [];
        sessoes.splice(index, 1);
        localStorage.setItem('sessoes', JSON.stringify(sessoes));
        carregarSessoes();
    }
}

document.getElementById('btnCancelar').addEventListener('click', function() {
    document.getElementById('formSessao').reset();
    document.getElementById('editIndex').value = -1;
    document.getElementById('btnSalvar').textContent = 'Salvar Sessão';
    this.classList.add('d-none');
});

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
    var editIndex = document.getElementById('editIndex').value;

    if (editIndex == -1) {
        sessoes.push(sessao);
    } else {
        sessoes[editIndex] = sessao;
    }

    localStorage.setItem('sessoes', JSON.stringify(sessoes));

    this.reset();
    document.getElementById('editIndex').value = -1;
    document.getElementById('btnSalvar').textContent = 'Salvar Sessão';
    document.getElementById('btnCancelar').classList.add('d-none');
    carregarSessoes();
});

carregarSessoes();
