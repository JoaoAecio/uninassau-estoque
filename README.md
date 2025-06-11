 <p align="center">
  <img alt="Status" src="https://img.shields.io/badge/Status-Em_Desenvolvimento-green?style=for-the-badge">
  <img alt="Frontend" src="https://img.shields.io/badge/Frontend-React.js-blue?style=for-the-badge&logo=react">
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-Ambiente-339933?style=for-the-badge&logo=nodedotjs&logoColor=white">
  <img alt="Backend" src="https://img.shields.io/badge/Backend-Java-red?style=for-the-badge&logo=openjdk&logoColor=white">
  <img alt="Spring Boot" src="https://img.shields.io/badge/Spring_Boot-Framework-6DB33F?style=for-the-badge&logo=springboot&logoColor=white">
  <img alt="Database" src="https://img.shields.io/badge/Database-PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white">
</p>

Este é um projeto para a criação de um **sistema de gestão de estoque** voltado para clínicas-escola da UNINASSAU. O objetivo é garantir um melhor controle de insumos, utilizando boas práticas de desenvolvimento e acessibilidade.

## 📌 Tecnologias Utilizadas

- **Frontend:** React.js + Node.js  
- **Backend:** Java com Spring Boot  
- **Banco de Dados:** PostgreSQL  
- **Gerenciamento de Código:** GitHub  
- **Gerenciamento de Tarefas:** Trello  
- **Ferramentas Adicionais:** VS Code, Docker, Postman.   

---

## 🚀 Configuração do Ambiente de Desenvolvimento

### 1️⃣ Pré-requisitos
Antes de iniciar, instale as seguintes ferramentas:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/)
- [Java JDK 17+](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html)
- [Docker](https://www.docker.com/) (opcional)
- [Postman](https://www.postman.com/)
- [VS Code](https://code.visualstudio.com/) ou [IntelliJ IDEA](https://www.jetbrains.com/idea/)

---

### 2️⃣ Clonando os Repositórios
Para obter o código-fonte, execute no terminal do Git:

Frontend:
```sh
git clone https://github.com/JoaoAecio/uninassau-estoque.git
cd uninassau-estoque
```
Backend:
```sh
git clone https://github.com/Lsiin/Backend_Estoque_Clinica.git
cd Backend_Estoque_Clinica
```

---

### 3️⃣ Configuração do Frontend (React)
Para execução do React, execute os seguintes comandos:

```sh
cd frontend
npm install
npm start
```

Isso iniciará o servidor localmente na URL `http://localhost:3000`.

---

### 4️⃣ Configuração do Backend (Spring Boot)
Para execução do Springboot, execute os seguintes comandos:

```sh
cd backend
mvn clean install
mvn spring-boot:run
```

Se tudo estiver correto, o backend rodará na URL `http://localhost:8080`.

---

### 5️⃣ Configuração do Banco de Dados
Caso esteja utilizando **PostgreSQL**, siga as etapas abaixo:

1. Crie um banco de dados chamado `estoque_db`.
2. Configure as credenciais no arquivo `.env` no Backend:

```.env
DB_URL=url_do_banco
DB_USERNAME=user
DB_PASSWORD=password
```

Se quiser rodar o banco via **Docker**, utilize o seguinte comando:

```sh
docker run --name estoque_db \
  -e POSTGRES_USER=clinica_user \
  -e POSTGRES_PASSWORD=clinica_pass \
  -e POSTGRES_DB=estoque_db \
  -p 5432:5432 \
  -d postgres
```

---

### 6️⃣ Configuração do GitHub para Trabalho em Equipe
Para trabalhar acessar a branch principal, siga estes passos:

1. Caso não tenha clonado o repositório, volte para a etapa 2:

2. Mude para a branch principal do sistema (deploy):
```sh
git checkout deploy
```
A branch deploy contém a versão estável mais recente do sistema.

### 7️⃣ Testando a Integração
- ✅ Rodar o backend (`Spring Boot`), inicializando o BackendApplication.java
- ✅ Rodar o frontend (`React`), no diretório /frontend, digite 'npm run dev'
- ✅ Acessar o frontend (`http://localhost:3000`)
- ✅ Verificar se o banco de dados foi criado corretamente

Se tudo estiver funcionando, o ambiente está pronto! 🚀

---

## 📌 Organização do Trello
Usamos o Trello para gerenciar tarefas, com as seguintes listas:

1. **Backlog** – Tarefas que precisam ser feitas  
2. **Em Progresso** – Tarefas sendo executadas no momento  
3. **Revisão** – Tarefas concluídas aguardando validação  
4. **Concluído** – Tarefas finalizadas e aprovadas  

---

## 📘 Como usar o sistema:
📘 1. Para entrar no sistema, devemos acessar [estoqueuninassau.netlify.app](https://estoqueuninassau.netlify.app/). Nesta tela, os usuários do sistema realizam o acesso inserindo seu e-mail e senha cadastrados. A interface é simples e intuitiva, com um campo para e-mail, outro para senha e o botão "Entrar".

✅ Funcionalidades:

- Autenticação de usuários.
- Validação de credenciais antes de liberar o acesso ao sistema.
- Opção de recuperação de senha ("Esqueceu a senha?").

![image](https://github.com/user-attachments/assets/e626b8a2-a6fb-4f60-b3de-2b9d74616379)


📘 2. O dashboard é a tela principal de visualização de métricas do estoque. Ele mostra dados resumidos e gráficos sobre a situação atual do inventário.

✅ Funcionalidades:

- Total de itens em estoque.
- Itens com estoque baixo.
- Quantidade de fornecedores cadastrados.
- Produtos com estoque zerado.
- Média de itens por produto.
- Lista dos 5 produtos com menor estoque.
- Fornecedores mais recentemente adicionados.

![image](https://github.com/user-attachments/assets/eb24c3fa-c219-4b8c-b7d5-804668ebe0e6)


📘 3. Esta é a interface de gerenciamento de usuários do sistema. Nela é possível visualizar uma lista com os dados dos usuários cadastrados, como nome, e-mail, CPF e data de nascimento.

✅ Funcionalidades:

- Pesquisa por nome, e-mail, CPF ou data.
- Edição dos dados de cada usuário (ícone de lápis).
- Exclusão de usuários (ícone de lixeira).
- Criação de novos usuários via botão verde "Criar Usuário".

![FotoUsuario](https://github.com/user-attachments/assets/3f302489-6d9b-412c-8c29-a7451519c7f6)

📘 4. Essa tela oferece a gestão das categorias que organizam os produtos no sistema. As categorias ajudam a agrupar os itens por tipo ou finalidade (ex.: eletrônicos, odontológicos, higiene).

✅ Funcionalidades:

- Busca de categorias por nome.
- Criação de novas categorias com o botão "Nova Categoria".
- Edição e exclusão de categorias já cadastradas.
- Permite manter o estoque organizado e facilita filtros e análises futuras.

![image](https://github.com/user-attachments/assets/7970f1d3-e35e-4ec5-a03e-048b65f35da5)

📘 5. Essa tela permite o gerenciamento completo dos itens cadastrados no estoque da clínica. Os produtos são listados com informações relevantes como nome, quantidade, categoria e data de entrada.

✅ Funcionalidades:

- Busca de itens por nome.
- Upload de planilhas (.csv ou .xlsx) para importar dados em lote.
- Criação de novos itens manualmente com o botão "Adicionar Item".
- Edição e exclusão de produtos já existentes por meio dos ícones de lápis e lixeira.
- Visualização da quantidade atual e da categoria de cada item cadastrado.

![image](https://github.com/user-attachments/assets/8456b08f-67cb-4310-a6ce-c3a9f2de9b49)

📘 6. Esta tela apresenta uma lista com os fornecedores cadastrados no sistema, com informações como razão social, CNPJ, CEP e categoria (que pode ser atribuída futuramente).

✅ Funcionalidades:

- Pesquisa por razão social, CNPJ, CEP ou categoria.
- Edição dos dados de fornecedores.
- Exclusão de fornecedores.
- Criação de novos fornecedores com o botão "Criar Fornecedor".
  
![image](https://github.com/user-attachments/assets/28fc74db-e567-465f-85db-59d3b3915b01)

---

👩‍💻 Equipe 

- Erika Luiza
- Ícaro Assis
- Igor Souza
- João Aécio
- Marcos Rangel
- Vitor Antônio
