const { DataTypes } = require("sequelize");
const database = require("../../Configuration/database");
const TransacaoBean = require("../Bean/ClienteBean");

const Transacao = database.sequelize.define('Transacao', {
    // Chave Primária
    idTransacao: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    // Chave Estrangeira (Ligação com a tabela Cliente)
    // IMPORTANTE: O nome aqui deve ser IDÊNTICO ao nome da coluna no banco SQL
    Cliente_idClientes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Cliente', // Nome da tabela pai (deve existir no banco)
            key: 'idClientes' // Nome da chave primária da tabela pai
        }
    },

    // Valor da transação (Dinheiro)
    // DECIMAL(10,4) significa: até 10 dígitos no total, sendo 4 casas decimais
    valor: {
        type: DataTypes.DECIMAL(10, 4), 
        allowNull: false
    }

}, {
    // --- Configurações para Banco Legado ---
    tableName: 'Transacao', // Nome exato da tabela no banco
    timestamps: false       // Desliga createdAt/updatedAt
});

// Sincroniza o model com o banco
Transacao.sync({ force: false });

module.exports = Transacao;