function carregarFilmes() {
    var filmes = JSON.parse(localStorage.getItem('filmes')) || [];
    var tbody = document.getElementById('tabelaFilmes');
    tbody.innerHTML = '';

    for (var i = 0; i < filmes.length; i++) {
        var tr = document.createElement('tr');
        tr.innerHTML =
            '<td style="min-width:150px">' + filmes[i].titulo + '</td>' +
            '<td style="min-width:120px">' + filmes[i].genero + '</td>' +
            '<td>' + filmes[i].classificacao + '</td>' +
            '<td>' + filmes[i].duracao + ' min</td>' +
            '<td>' + filmes[i].dataEstreia + '</td>' +
            '<td class="text-nowrap">' +
                '<button class="btn btn-sm btn-primary me-1" onclick="editarFilme(' + i + ')">Editar</button>' +
                '<button class="btn btn-sm btn-outline-light" onclick="excluirFilme(' + i + ')">Excluir</button>' +
            '</td>';
        tbody.appendChild(tr);
    }
}

function editarFilme(index) {
    var filmes = JSON.parse(localStorage.getItem('filmes')) || [];
    var filme = filmes[index];

    document.getElementById('titulo').value = filme.titulo;
    document.getElementById('genero').value = filme.genero;
    document.getElementById('descricao').value = filme.descricao;
    document.getElementById('classificacao').value = filme.classificacao;
    document.getElementById('duracao').value = filme.duracao;
    document.getElementById('dataEstreia').value = filme.dataEstreia;
    document.getElementById('editIndex').value = index;

    document.getElementById('btnSalvar').textContent = 'Atualizar Filme';
    document.getElementById('btnCancelar').classList.remove('d-none');
}

function excluirFilme(index) {
    if (confirm('Deseja excluir este filme?')) {
        var filmes = JSON.parse(localStorage.getItem('filmes')) || [];
        filmes.splice(index, 1);
        localStorage.setItem('filmes', JSON.stringify(filmes));
        carregarFilmes();
    }
}

document.getElementById('btnCancelar').addEventListener('click', function() {
    document.getElementById('formFilme').reset();
    document.getElementById('editIndex').value = -1;
    document.getElementById('btnSalvar').textContent = 'Salvar Filme';
    this.classList.add('d-none');
});

document.getElementById('formFilme').addEventListener('submit', function(event) {
    event.preventDefault();

    var filme = new Filme(
        document.getElementById('titulo').value,
        document.getElementById('genero').value,
        document.getElementById('descricao').value,
        document.getElementById('classificacao').value,
        document.getElementById('duracao').value,
        document.getElementById('dataEstreia').value
    );

    var filmes = JSON.parse(localStorage.getItem('filmes')) || [];
    var editIndex = document.getElementById('editIndex').value;

    if (editIndex == -1) {
        filmes.push(filme);
    } else {
        filmes[editIndex] = filme;
    }

    localStorage.setItem('filmes', JSON.stringify(filmes));

    this.reset();
    document.getElementById('editIndex').value = -1;
    document.getElementById('btnSalvar').textContent = 'Salvar Filme';
    document.getElementById('btnCancelar').classList.add('d-none');
    carregarFilmes();
});

carregarFilmes();
