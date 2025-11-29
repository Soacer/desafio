const ClienteDAO = require("../Model/DAO/ClienteDAO");
const ClienteBean = require("../Model/Bean/ClienteBean");

module.exports = {
    async create(req, res){
        //console.log(req);
        try{
            const dados = req.body; //Recebe as variáveis da requisição

            const Cliente = new ClienteBean( //Encapsula elas na model bean
                null,
                dados.nome,
                dados.cnpj
            );
            const ClienteSalvar = await ClienteDAO.create({ //Insere no banco de dados
                nome: Cliente.nome,
                cnpj: Cliente.cnpj
            });

            return res.status(201).json(ClienteSalvar);
        }catch(erro){
            console.log("Erro capturado:", erro.name); //Para ver o nome do erro
            //Se o erro for de Client
            if (erro.name === 'SequelizeValidationError' || erro.name === 'SequelizeUniqueConstraintError') {
                return res.status(400).json({ 
                    erro: "Dados incorretos",
                    detalhes: erro.errors.map(e => e.message) // Mostra só a mensagem amigável
                });
            }
            //Se o erro for de Server
            console.error("Erro grave:", erro);
            return res.status(500).json({ erro: "Erro interno no servidor, tente novamente mais tarde." });
        }
    },
    
    async select(req, res){
        try{ //Tenta conexão
            const ClienteListar = await ClienteDAO.findAll(); //Lista todos os clientes
            return res.status(200).json(ClienteListar); //Retorna a lista
        }catch(erro){
            console.log(erro);
            return res.status(500).json({erro: "Erro ao Listar Clientes"})
        }
    },

    async update (req, res){
        try{
            const {id} = req.params; //Recebe o ID
            const dados = req.body; //Recebe as infos

            //Atualiza a linha
            const [linhas] = await ClienteDAO.update(dados,{
                where: {idClientes: id}
            });

            //Se não encontrar a(s) linhas
            if(linhas === 0){
                return res.status(404).json({erro: "Cliente não encontrado para atualizar"})
            }

            return res.status(200).json({mensagem: "Atualizado"})
        }catch(erro){
            //Se o erro for de Server
            console.error("Erro grave:", erro);
            return res.status(500).json({ erro: "Erro interno no servidor, update cancelado, tente novamente mais tarde." });
        }
    },
    
    async delete(req, res){
        try{
            const {id} = req.params; //Pega o ID

            //Executa o delete
            const linhas = await ClienteDAO.destroy({
                where: {idClientes: id}
            });

            //Se retornar 0, ID não existe no banco
            if(linhas === 0){
                return res.status(404).json({erro: "Cliente não encontrado"}) //Exibe erro caso não ache
            }

            return res.status(200).json({mensagem: "Cliente deletado!"})
        }catch(erro){
            console.log(erro);
            return res.status(500).json({erro: "Erro ao deletar o cliente"})
        }
    }
}