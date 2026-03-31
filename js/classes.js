class Filme {
    constructor(titulo, genero, descricao, classificacao, duracao, dataEstreia) {
        this.titulo = titulo;
        this.genero = genero;
        this.descricao = descricao;
        this.classificacao = classificacao;
        this.duracao = duracao;
        this.dataEstreia = dataEstreia;
    }
}

class Sala {
    constructor(nome, capacidade, tipo) {
        this.nome = nome;
        this.capacidade = capacidade;
        this.tipo = tipo;
    }
}

class Sessao {
    constructor(filmeIndex, salaIndex, dataHora, preco, idioma, formato) {
        this.filmeIndex = filmeIndex;
        this.salaIndex = salaIndex;
        this.dataHora = dataHora;
        this.preco = preco;
        this.idioma = idioma;
        this.formato = formato;
    }
}

class Ingresso {
    constructor(sessaoIndex, nomeCliente, cpf, assento, pagamento) {
        this.sessaoIndex = sessaoIndex;
        this.nomeCliente = nomeCliente;
        this.cpf = cpf;
        this.assento = assento;
        this.pagamento = pagamento;
    }
}
