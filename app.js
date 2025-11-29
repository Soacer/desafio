const express = require("express"); //Importando o Express pro desafio
const app = express(); //Recebe o Express para construir a estrutura do servidor

app.use(express.json());

//Controllers
const ClienteController = require("./Controller/ClienteController");
const TransacaoController = require("./Controller/TransacaoController");

//DAO
const Cliente = require("./Model/DAO/ClienteDAO");
const Transacao = require("./Model/DAO/TransacaoDAO");

const users = [];

//Rotas
app.get("/",function(req, res){
    res.send("Seja Bem Vindo ao Desafio");
});

//Cliente
app.get("/cliente", ClienteController.select);

app.post("/cliente", ClienteController.create);

app.put("/cliente/:id", ClienteController.update);

app.delete("/cliente/:id", ClienteController.delete);

//Transação

app.get("/transacao/:id", TransacaoController.select);

app.get("/saldo/:id", TransacaoController.saldo);

app.post("/transacao/:id", TransacaoController.create);


app.listen(8081, function(){
    console.log("Tá rodando"); //Ctrl + C finaliza a conexão do terminal
});