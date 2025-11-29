const TransacaoBean = require("../Model/Bean/TransacaoBean");
const TransacaoDAO = require("../Model/DAO/TransacaoDAO");
const ClienteDAO = require("../Model/DAO/ClienteDAO");

module.exports = {
    async create(req, res) {
        const dados = req.body;

        try {
            const Transacao = new TransacaoBean(
                null,
                dados.Cliente_idClientes, // Pega do JSON
                dados.valor
            );

            const clienteEncontrado = await ClienteDAO.findByPk(Transacao.Cliente_idClientes);

            //Verifica se achou (se for null, entra no if)
            if (!clienteEncontrado) {
                console.log("Não existe Cliente com esse ID");
                return res.status(404).json({ erro: "Cliente não encontrado" });
            } else {
                const TransacaoSalvar = await TransacaoDAO.create({
                    Cliente_idClientes: Transacao.Cliente_idClientes,
                    valor: Transacao.valor
                });

                return res.status(201).json(TransacaoSalvar);
            }

        } catch (erro) {
            console.log("Erro capturado:", erro.name || erro.message);

            if (erro.message || erro.name === 'SequelizeValidationError' || erro.name === 'SequelizeUniqueConstraintError') {
                return res.status(400).json({
                    erro: "Dados incorretos",
                    detalhes: erro.message || erro.errors.map(e => e.message)
                });
            }

            console.error("Erro grave:", erro);
            return res.status(500).json({ erro: "Erro interno no servidor." });
        }
    },

    async select(req, res) {
        const dados = req.body || {}; // Proteção contra body vazio
        const {id} = req.params;

        if (!id) {
            return res.status(400).json({ erro: "ID do cliente é obrigatório. Envie 'clienteId' ou 'Cliente_idClientes'." });
        }

        try { 
            const TransacaoListar = await TransacaoDAO.findAll({
                where: {
                    Cliente_idClientes: id
                }
            });
            return res.status(200).json(TransacaoListar);
        } catch (erro) {
            console.log(erro);
            return res.status(500).json({ erro: "Erro ao Listar Transações" });
        }
    },

    async saldo(req, res) {
        try {
            const { id } = req.params; // ID do Cliente

            // O Sequelize monta a query de soma SQL
            const somaTotal = await TransacaoDAO.sum('valor', {
                where: {
                    Cliente_idClientes: id // chave estrangeira
                }
            });

            const saldoFinal = somaTotal || 0;

            return res.status(200).json({
                clienteId: id,
                saldo: parseFloat(saldoFinal)
            });

        } catch (erro) {
            console.error(erro);
            return res.status(500).json({ erro: "Erro ao calcular saldo" });
        }
    }
}