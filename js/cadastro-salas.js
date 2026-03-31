document.getElementById('formSala').addEventListener('submit', function(event) {
    event.preventDefault();

    var sala = new Sala(
        document.getElementById('nomeSala').value,
        document.getElementById('capacidade').value,
        document.getElementById('tipo').value
    );

    var salas = JSON.parse(localStorage.getItem('salas')) || [];
    salas.push(sala);
    localStorage.setItem('salas', JSON.stringify(salas));

    alert('Sala salva com sucesso!');
    this.reset();
});
