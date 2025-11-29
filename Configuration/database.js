const { Sequelize } = require("sequelize");

const sequelize = new Sequelize( //Variável recebe os recursos de Sequelize
    "mydb", //Nome do Banco
    "root", //Usuário do Banco
    "1234", //Senha do Usuário do Banco
    {
        host: "localhost", //Aonde o sistema vai rodar
        dialect: "mysql" //Tipo do banco
    }
);

sequelize.authenticate().then((function(){
    console.log("Banco de Dados Conectado");
})).catch(function(erro){
    console.log("Erro ao se conectar ao banco: "+erro)
});

module.exports = { //Para ser utilizado por outros arquivos
    Sequelize: Sequelize,
    sequelize: sequelize
} 