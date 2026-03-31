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
    filmes.push(filme);
    localStorage.setItem('filmes', JSON.stringify(filmes));

    alert('Filme salvo com sucesso!');
    this.reset();
});
