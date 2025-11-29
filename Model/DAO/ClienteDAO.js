const { DataTypes } = require("sequelize");
const database = require("../../Configuration/database");
const ClienteBean = require("../../Model/Bean/ClienteBean"); // Opcional se não for usar validação de Bean aqui

const Cliente = database.sequelize.define('Cliente', {
    // Definindo a Chave Primária
    idClientes: { // Atenção: No seu diagrama estava no plural "idClientes"
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    
    // Nome do Cliente
    nome: {
        type: DataTypes.STRING(255), // Aumentamos para 255 conforme combinado
        allowNull: false
    },
    
    // CNPJ (apenas números ou formatado, limitamos a 14 ou 18 chars)
    cnpj: {
        type: DataTypes.STRING(14), // Se for guardar sem pontos/traços. Se for com, use STRING(18)
        allowNull: false
    },

    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    // --- Configurações para Banco Legado ---
    tableName: 'Cliente', // Nome exato da tabela no banco
    timestamps: false      // Desliga createdAt/updatedAt
});

// Sincroniza o model com o banco
Cliente.sync({ force: false });

module.exports = Cliente;