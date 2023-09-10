# Drivent

## Descrição

Organizar um evento nunca é uma tarefa fácil (se nem organizar festa de criança é fácil, imagine um evento de grande escala).

Como quase pra tudo nessa vida, a tecnologia consegue dar uma mão nessa árdua tarefa possibilitando com que os próprios usuários, por exemplo, consigam gerenciar suas inscrições, participações, informações… etc.

Além disso, criar uma base única digital para administrar os dados é o sonho de qualquer pessoa metódica.

A proposta é criar um sistema que gerencie apenas UM evento. Desta forma, para cada evento que o cliente quiser gerenciar, ele teria uma aplicação do Driven.t rodando. 

Certifiquse-se de ter as seguintes ferramentas instaladas e atualizadas no seu sistema: 

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

## Tecnologias usadas

O projeto feito com Node.js.

O banco usado é o PostgresSQL e é gerenciado pelo Prisma.

Para os testes é utilizado o Jest.

Quer dar uma olhada no código front-end?  . [Drivent front](https://github.com/driven-15/drivent-front)  .

## Instalação

Siga estas etapas para configurar e executar o projeto localmente:

```bash
   git clone https://github.com/anarehder/drivent-back.git
   cd drivent-back
```

### 1 - Instalar as dependencias

```bash
  npm install
```

### 2 - Configurar a variavel de ambiente

Crie um arquivo .env.development na raiz do projeto com a variavel de ambiente necessária. Você pode usar o arquivo .env.example como um modelo.

### 3 - Configurar o banco de dados com o Prisma

Execute as seguintes etapas
```bash
  npm run dev:migration:run
  npm run dev:migration:generate
  npm run dev:seed
```

### 4 - Execute o projeto em modo desenvolvimento

```bash
  npm run dev
```

## 5 - Uso

- O funcionamento do Driven.t é *relativamente* simples:
    1. Existe um cronômetro que libera o sistema apenas na data de início de cadastro do Evento.
    2. O usuário deverá fazer uma inscrição para o Evento (*online* ou presencial).
    3. Para um evento de modalidade presencial, o usuário poderá escolher se deseja com ou sem hospedagem (hotel).
    4. O usuário também poderá escolher uma formas de pagamento.
    5. Além disso, o usuário também escolhe as suas atividades no evento.
    6. Por fim, também é possível emitir um certificado de participação do evento.
       

### As rotas disponíveis são:
  -   users
  -   auth
  -   event
  -   enrollments
  -   tickets
  -   payments
  -   hotels
  -   booking
  -   activities

Entre as rotas possuímos POST, GET, PUT e DELETE.

O evento é adicionado diretamente via seed.

Nas rotas autenticadas retorna status 401 Unauthorized caso falhe a autenticação.

Na ausência de campos obrigatórios, retorne o status code 400 Bad Request.

Se não houver nenhum registro compatível, retornar status code 404 Not Found.

## Auth

Para fazer login utilize a rota:
- /auth/sign-in

## Enrollments

Para fazer seu cadastro completo utilize a rota:
- /enrollments

A rota /enrollments/cep faz a busca do endereço quando o CEP é digitado.

## Tickets

Para exibir a lista de tickets use a rota:
- /tickets/types
  
Para reservar um ticket na rota /tickets o body deve ter o formato:
```bash
  {
	"ticketTypeId": Number
  }
```

### Payments

Para fazer um pagamento na rota /payments/process o body deve ter o formato:
```bash
  {
	ticketId: number,
	cardData:
	{
		issuer: string,
		number: number,
		name: string,
		expirationDate: Date,
		cvv: number
	}
  }
```

Para saber o status de um pagamento utilize a rota abaixo:
- /payments?ticketId=numeroDoTicket

### Hotels

Para exibir a lista de hoteis use a rota:
- /hotels

Para exibir a lista de quartos de um determinaado hotel
- /hotels/:hotelId


### Booking

Para reservar um quarto ou trocar de quarto o body deve ter o formato:
```bash
  {
	"roomId": Number
  }
```

## 6 - Testes
Crie um arquivo .env.test de maneira análoga ao .env.example mas crie um banco secundário para testes.

Rode as migrações

```bash
  npm run test:migration:run
  npm run test:migration:generate
  npm run test:seed
```

Rode o teste

```bash
npm run test
```

Para um teste de uma feature específica

```bash
npm test NOME_FEATURE
```

## 7 - Para subir o projeto no modo de produção

```bash
npm run build
npm start
```
