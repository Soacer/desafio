const express = require("express"); //Importando o Express pro desafio
const app = express(); //Recebe o Express para construir a estrutura do servidor

app.listen(8081, function(){
    console.log("Tá rodando"); //Ctrl + C finaliza a conexão do terminal
});