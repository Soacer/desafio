# 🏦 API de Gestão Financeira - Desafio Técnico Node.js

API RESTful desenvolvida para o gerenciamento de Clientes e Transações financeiras. O projeto implementa regras de negócio para controle de status de clientes (Soft Delete) e cálculo performático de saldo.

## 🛠 Tecnologias Utilizadas

* **Node.js**: Ambiente de execução Javascript.
* **Express**: Framework para construção do servidor e rotas.
* **Sequelize**: ORM (Object-Relational Mapper) para interação com o banco de dados.
* **MySQL**: Banco de dados relacional.
* **MVC + DAO**: Arquitetura utilizada para organização do código.

---

## ⚙️ Funcionalidades e Regras de Negócio

### 1. Gestão de Clientes
* **CRUD Completo**: Criação, Listagem, Atualização e Exclusão.
* **Soft Delete (Exclusão Lógica)**: Ao deletar um cliente, o registro não é removido do banco. O campo `status` é alterado para `false` (Inativo), preservando o histórico de transações passadas.

### 2. Gestão de Transações
* **Registro de Transações**: Permite registrar movimentações financeiras vinculadas a um cliente.
* **Trava de Segurança**: O sistema **impede** a criação de transações para clientes que foram deletados/inativados, garantindo a integridade da regra de negócio.

### 3. Cálculo de Saldo
* **Performance**: O cálculo do saldo total do cliente é realizado diretamente no Banco de Dados (utilizando função de agregação `SUM` do SQL via Sequelize), evitando processamento desnecessário de listas na memória da aplicação.

---

## 🏗 Arquitetura do Projeto

O projeto segue o padrão **MVC (Model-View-Controller)** com uma camada adicional de **DAO (Data Access Object)** e **Beans** para encapsulamento:

* **Controller**: Gerencia a requisição, aplica regras de negócio e validações (ex: verifica se o cliente está ativo).
* **Model (DAO)**: Responsável direto pela comunicação com o banco de dados (comandos Sequelize).
* **Model (Bean)**: Responsável pelo encapsulamento e transporte dos dados, garantindo que o Controller receba objetos estruturados.

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos
* Node.js instalado.
* Banco de Dados MySQL rodando.

### Instalação

1.  Clone o repositório:
    ```bash
    git clone [https://github.com/seu-usuario/seu-repositorio.git](https://github.com/seu-usuario/seu-repositorio.git)
    ```
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Configure o banco de dados:
    * Verifique o arquivo `src/Configuration/database.js` e ajuste as credenciais (usuário/senha) do MySQL.
4.  Execute a aplicação:
    ```bash
    node app.js
    # Ou, se tiver o nodemon instalado:
    nodemon app.js
    ```

---

## 🔌 Documentação da API (Endpoints)

### 👤 Clientes

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| **GET** | `/cliente` | Lista todos os clientes cadastrados. |
| **POST** | `/cliente` | Cadastra um novo cliente (Body: `nome`, `cnpj`, `status`). |
| **PUT** | `/cliente/:id` | Atualiza os dados de um cliente específico. |
| **DELETE** | `/cliente/:id` | Realiza o Soft Delete (Inativa o cliente). |

### 💸 Transações

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| **GET** | `/transacao/:id` | Lista as transações de um cliente específico. |
| **POST** | `/transacao/:id` | Cria uma nova transação. (Requer Body JSON com `valor` e `clienteId`). |
| **GET** | `/saldo/:id` | Retorna o saldo consolidado (soma) do cliente. |

---

## 💾 Modelagem de Dados

Decisões tomadas para a estrutura do banco (`mydb`):

* **Tabela Cliente**:
    * `status` (Boolean/TinyInt): Escolhido para permitir a ativação/desativação rápida de clientes.
    * `cnpj` (String): Armazena os caracteres do documento.
* **Tabela Transacao**:
    * `valor` (Decimal): Utilizado o tipo `DECIMAL(10,4)` em vez de `FLOAT` para garantir precisão monetária e evitar erros de arredondamento em cálculos financeiros.

---

**Desenvolvido por [Alisson de Carvalho Soares]**