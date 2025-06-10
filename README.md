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
1. Para entrar no sistema, devemos acessar [estoqueuninassau.netlify.app](https://estoqueuninassau.netlify.app/)

![image](https://github.com/user-attachments/assets/40235250-19d8-40d5-be73-f70141eccc42)



---

👩‍💻 Equipe 

- Erika Luiza
- Ícaro Assis
- Igor Souza
- João Aécio
- Marcos Rangel
- Vitor Antônio
