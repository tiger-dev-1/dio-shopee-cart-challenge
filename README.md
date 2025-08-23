# Shopee Cart Challenge / Carrinho de Compras da Shopee


## Project Description / Descrição do Projeto

This project is an implementation of DIO's (Digital Innovation One) "Shopee Shopping Cart Challenge". It's a Shopee-inspired shopping cart system using Node.js, running in the terminal. The user can interact with the system to add, remove, and modify products in the cart, with automatic calculations of totals and product quantities. All cart management logic is handled on the backend, simulating a shopping experience without a graphical user interface.

Este projeto é uma implementação do "Desafio de Carrinho de Compras da Shopee" da DIO (Digital Innovation One). Trata-se de um sistema de carrinho de compras inspirado na Shopee utilizando Node.js, executado no terminal. O usuário pode interagir com o sistema para adicionar, remover e modificar produtos no carrinho, com cálculos automáticos de totais e quantidades de produtos. Toda a lógica de gerenciamento do carrinho é controlada no backend, simulando uma experiência de compra sem a necessidade de uma interface gráfica.

---
---
---

### English

## Key Features & Improvements (v1.0.0)

This project represents a significant evolution from its base version, transforming a simulation script into a robust and interactive command-line application.

### Architecture and Organization

- **English Codebase:** Following industry best practices, the entire codebase (variables, functions, comments) is written in English to facilitate maintenance and collaboration.
- **Modular Service-Based Architecture:** The business logic has been separated into "services" (`auth_service`, `cart_service`), each with its unique responsibility. This makes the code cleaner, more organized, and easier to test.
- **Single Entry Point:** The application uses `index.js` solely as an entry point, while `app.js` manages the entire user interaction flow, keeping responsibilities well-defined.

### Interactivity and User Experience

- **Interactive Main Menu:** Unlike the original hardcoded version, this version features a complete menu where the user can navigate and choose actions, such as:
  - Viewing the full product catalog.
  - Filtering products by category.
  - Adding and removing units of products in the cart.
  - Deleting a product completely from the cart.
  - Viewing the cart at any time, with real-time calculation of totals and subtotals.
  - Proceeding to checkout to finalize the purchase.
- **Login System:** The application simulates a login system by checking for a matching email and password pair. This is a simple validation and does not involve secure hashing. Access is required to interact with the cart.
- **Runtime Validations:** Various validations have been implemented to ensure the application's robustness, such as stock checking, handling of invalid user inputs (e.g., text instead of numbers), and a system for login and menu selection attempts, which forces a logout after 3 errors for security.

### Data Management

- **Class-Based Entities:** The project uses `class` for `User` and `Item` entities. This ensures that all objects have a consistent structure, with predefined properties and methods, improving code reliability and maintainability.
- **Simulated Database:** Instead of objects created directly in the code, the project uses a "simulated database" (`src/database.js`) as a **single source of truth** (a concept that allows us to protect the original data through immutability) for products and users, populated with instances of these entities. This centralizes data and simplifies maintenance.

## How to Run and Test

### Standard Execution

1.  Clone the repository.
2.  Run `npm start` in your terminal to start the interactive application.

### Testing the Login

You can use the following credentials to test the login system:

- **Email:** `angel_y_davis@example.com` / **Password:** `password123`
- **Email:** `ryuuzaki@example.com` / **Password:** `password456`

### Modifying Data (For Testing Purposes Only)

To change the available products or users, you can edit the `src/database.js` file.

To add a new user, simply add a new `User` instance to the `mockUsers` array:

```javascript
new User(4, "your Name", "yourEmail@example.com", "yourPassword");
```

The same logic applies to adding new products to the `mockDatabase` array or categories to `mockCategories`.

> **⚠️ Security Alert:** This is a simulated database. **Do not use real passwords or personal data** in this file.

## Future Features (Under Development)

The following improvements are planned for future versions and can be found in development on the `develop` branch or already completed on the `extra-features` branch:

- **Guest Shopping:** Allow users to add products to the cart without being logged in, requiring login only at checkout.
- **User Registration:** Implement a registration flow for new users to create their accounts.
- **User Roles:** Create distinct user profiles (e.g., customer and administrator).
- **Product Registration:** Allow admin users to add new products to the catalog directly through the application.
- **Secure Authentication:** Implement a more secure authentication system using password hashing.
- **Data Persistence:** Replace the in-memory database with a real persistence system (e.g., a JSON file), so that changes (new users, purchases) are saved between sessions.

---

### Original Project

This project was inspired by and is an evolution of the "Shopee Shopping Cart Challenge" from DIO's Node.js bootcamp, instructed by Felipão (Felipe Aguiar).

You can find the original project repository here: [DIO Shopee Cart Challenge](https://github.com/digitalinnovationone/formacao-nodejs/tree/main/06-shopee-cart).

---
---
---

### Português

## Principais Funcionalidades e Melhorias (v1.0.0)

Este projeto representa uma evolução significativa em relação à sua versão de referência, transformando um script de simulação em uma aplicação de linha de comando interativa e robusta.

### Arquitetura e Organização

- **Código-fonte em Inglês:** Seguindo as melhores práticas do mercado, toda a base de código (variáveis, funções, comentários) foi escrita em inglês para facilitar a manutenção e a colaboração.
- **Estrutura Modular com Serviços:** A lógica de negócio foi separada em "serviços" (`auth_service`, `cart_service`), cada um com sua responsabilidade única. Isso torna o código mais limpo, organizado e fácil de testar.
- **Ponto de Entrada Único:** A aplicação utiliza `index.js` apenas para iniciar, enquanto `app.js` gerencia todo o fluxo de interação com o usuário, mantendo as responsabilidades bem definidas.

### Interatividade e Experiência do Usuário

- **Menu Principal Interativo:** Diferente da versão original, que era totalmente fixa no código, esta versão possui um menu completo onde o usuário pode navegar e escolher ações, como:
  - Visualizar o catálogo completo de produtos.
  - Filtrar produtos por categoria.
  - Adicionar e remover unidades de produtos no carrinho.
  - Deletar um produto completamente do carrinho.
  - Visualizar o carrinho a qualquer momento, com totais e subtotais calculados em tempo real.
  - Realizar o checkout para finalizar a compra.
- **Sistema de Login:** A aplicação simula um sistema de login através da conferência de um par de valores (email e senha). Trata-se de uma validação simples, sem uso de hash de segurança. O acesso é necessário para interagir com o carrinho.
- **Validações em Tempo de Execução:** Foram implementadas diversas validações para garantir a robustez da aplicação, como checagem de estoque, tratamento de entradas inválidas do usuário (ex: texto em vez de número) e um sistema de tentativas de login e de seleção de menu, que força o logout após 3 erros, por segurança.

### Gerenciamento de Dados

- **Entidades baseadas em Classes:** O projeto utiliza `class` para as entidades `User` e `Item`. Isso garante que todos os objetos tenham uma estrutura consistente, com propriedades e métodos predefinidos, melhorando a confiabilidade e a manutenção do código.
- **Banco de Dados Simulado:** Em vez de objetos criados diretamente no código, o projeto utiliza um "banco de dados simulado" (`src/database.js`) como **referência primordial de valores** (um conceito que nos permite proteger os dados originais através da imutabilidade) para produtos e usuários, populado com instâncias dessas entidades. Isso centraliza os dados e facilita a manutenção.

## Como Executar e Testar

### Execução Padrão

1.  Clone o repositório.
2.  Execute `npm start` no seu terminal para iniciar a aplicação interativa.

### Testando o Login

Você pode usar as seguintes credenciais para testar o sistema de login:

- **Email:** `angel_y_davis@example.com` / **Password:** `password123`
- **Email:** `ryuuzaki@example.com` / **Password:** `password456`

### Modificando os Dados (Apenas para Testes)

Para alterar os produtos ou usuários disponíveis, você pode editar o arquivo `src/database.js`.

Para adicionar um novo usuário, basta inserir uma nova instância de `User` na matriz `mockUsers`, conforme a estrutura:

```javascript
new User(4, "seu Nome", "seuEmail@example.com", "suaSenha");
```

> **⚠️ Alerta de Segurança:** Este é um banco de dados simulado. **Não utilize senhas ou dados pessoais reais** neste arquivo.

A mesma lógica se aplica para adicionar novos produtos na matriz `mockDatabase` ou categorias em `mockCategories`.

## Funcionalidades Futuras (Em Desenvolvimento)

As seguintes melhorias estão planejadas para futuras versões e podem ser encontradas em desenvolvimento na branch `develop` ou já concluídas na branch `extra-features`:

- **Compra como Visitante:** Permitir que o usuário adicione produtos ao carrinho sem estar logado, exigindo o login apenas no momento do checkout.
- **Cadastro de Usuário:** Implementar um fluxo de registro para que novos usuários possam criar suas contas.
- **Diferenciação de Usuários:** Criar perfis de usuário distintos (ex: cliente e administrador).
- **Cadastro de Produto:** Permitir que usuários administradores adicionem novos produtos ao catálogo diretamente pela aplicação.
- **Autenticação Segura:** Implementar um sistema de autenticação mais seguro, com uso de hash para as senhas.
- **Persistência de Dados:** Substituir o banco de dados em memória por um sistema de persistência real (ex: um arquivo JSON), para que as alterações (novos usuários, compras) sejam salvas entre as sessões.

---

### Projeto Original

Este projeto foi inspirado e é uma evolução do "Desafio de Carrinho de Compras da Shopee" do bootcamp de Node.js da DIO, ministrado por Felipão (Felipe Aguiar).

Você pode encontrar o repositório do projeto original aqui: [DIO Shopee Cart Challenge](https://github.com/digitalinnovationone/formacao-nodejs/tree/main/06-shopee-cart).
