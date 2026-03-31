function carregarSalas() {
    var salas = JSON.parse(localStorage.getItem('salas')) || [];
    var tbody = document.getElementById('tabelaSalas');
    tbody.innerHTML = '';

    for (var i = 0; i < salas.length; i++) {
        var tr = document.createElement('tr');
        tr.innerHTML =
            '<td>' + salas[i].nome + '</td>' +
            '<td>' + salas[i].capacidade + '</td>' +
            '<td>' + salas[i].tipo + '</td>' +
            '<td>' +
                '<button class="btn btn-sm btn-primary me-1" onclick="editarSala(' + i + ')">Editar</button>' +
                '<button class="btn btn-sm btn-outline-light" onclick="excluirSala(' + i + ')">Excluir</button>' +
            '</td>';
        tbody.appendChild(tr);
    }
}

function editarSala(index) {
    var salas = JSON.parse(localStorage.getItem('salas')) || [];
    var sala = salas[index];

    document.getElementById('nomeSala').value = sala.nome;
    document.getElementById('capacidade').value = sala.capacidade;
    document.getElementById('tipo').value = sala.tipo;
    document.getElementById('editIndex').value = index;

    document.getElementById('btnSalvar').textContent = 'Atualizar Sala';
    document.getElementById('btnCancelar').classList.remove('d-none');
}

function excluirSala(index) {
    if (confirm('Deseja excluir esta sala?')) {
        var salas = JSON.parse(localStorage.getItem('salas')) || [];
        salas.splice(index, 1);
        localStorage.setItem('salas', JSON.stringify(salas));
        carregarSalas();
    }
}

document.getElementById('btnCancelar').addEventListener('click', function() {
    document.getElementById('formSala').reset();
    document.getElementById('editIndex').value = -1;
    document.getElementById('btnSalvar').textContent = 'Salvar Sala';
    this.classList.add('d-none');
});

document.getElementById('formSala').addEventListener('submit', function(event) {
    event.preventDefault();

    var sala = new Sala(
        document.getElementById('nomeSala').value,
        document.getElementById('capacidade').value,
        document.getElementById('tipo').value
    );

    var salas = JSON.parse(localStorage.getItem('salas')) || [];
    var editIndex = document.getElementById('editIndex').value;

    if (editIndex == -1) {
        salas.push(sala);
    } else {
        salas[editIndex] = sala;
    }

    localStorage.setItem('salas', JSON.stringify(salas));

    this.reset();
    document.getElementById('editIndex').value = -1;
    document.getElementById('btnSalvar').textContent = 'Salvar Sala';
    document.getElementById('btnCancelar').classList.add('d-none');
    carregarSalas();
});

carregarSalas();
