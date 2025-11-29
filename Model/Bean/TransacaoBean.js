class TransacaoBean {
    #idTransacao;
    #Cliente_idClientes; // Representa a coluna Cliente_idClientes
    #valor;

    constructor(idTransacao, clienteId, valor) {
        this.#idTransacao = idTransacao;
        this.Cliente_idClientes = clienteId; 
        this.valor = valor;         
    }

    get idTransacao() {
        return this.#idTransacao;
    }

    get Cliente_idClientes() {
        return this.#Cliente_idClientes;
    }

    get valor() {
        return this.#valor;
    }

    set Cliente_idClientes(novoId) {
        if (!novoId || isNaN(novoId) || novoId <= 0) {
            throw new Error("O ID do Cliente associado à transação é inválido.");
        }
        this.#Cliente_idClientes = parseInt(novoId);
    }

    set valor(novoValor) {
        if (novoValor === undefined || novoValor === null || isNaN(novoValor)) {
            throw new Error("O valor da transação é obrigatório e deve ser numérico.");
        }
        
        // Conversão para garantir que é float (caso venha como string "10.50")
        const valorNumerico = parseFloat(novoValor);

        this.#valor = valorNumerico;
    }
}

module.exports = TransacaoBean;