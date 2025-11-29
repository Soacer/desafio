class ClienteBean {
    #idClientes; // Mantive o plural conforme seu diagrama
    #nome;
    #cnpj;

    constructor(idClientes, nome, cnpj) {
        this.#idClientes = idClientes;
        this.nome = nome;
        this.cnpj = cnpj;
    }

    get idClientes(){ 
        return this.#idClientes; 
    }
    get nome(){ 
        return this.#nome; 
    }
    get cnpj(){ 
        return this.#cnpj; 
    }

    set nome(novoNome) {
        this.#nome = novoNome;
    }
    set cnpj(novoCnpj) {
        this.#cnpj = novoCnpj;
    }
}

module.exports = ClienteBean;