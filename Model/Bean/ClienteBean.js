class ClienteBean {
    #idClientes;
    #nome;
    #cnpj;
    #status;

    constructor(idClientes, nome, cnpj, status) {
        this.#idClientes = idClientes;
        this.nome = nome;
        this.cnpj = cnpj;
        this.status = status !== undefined ? status : true;
    }

    get idClientes() {
        return this.#idClientes;
    }

    get nome() {
        return this.#nome;
    }

    get cnpj() {
        return this.#cnpj;
    }

    get status() {
        return this.#status;
    }

    set nome(novoNome) {
        if (!novoNome || novoNome.trim().length === 0) {
            throw new Error("O nome do cliente é obrigatório.");
        }
        if (novoNome.length > 255) {
            throw new Error("O nome não pode exceder 255 caracteres.");
        }
        this.#nome = novoNome;
    }

    set cnpj(novoCnpj) {
        if (!novoCnpj) {
            throw new Error("O CNPJ é obrigatório.");
        }
        const cnpjLimpo = novoCnpj.replace(/\D/g, '');

        if (cnpjLimpo.length !== 14) {
            throw new Error("O CNPJ deve conter 14 dígitos numéricos.");
        }
        this.#cnpj = novoCnpj;
    }

    set status(novoStatus) {
        if (typeof novoStatus !== 'boolean') {
            throw new Error("O status deve ser um valor booleano (true ou false).");
        }
        this.#status = novoStatus;
    }
}

module.exports = ClienteBean;