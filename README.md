# API HOTEL TCC
Projeto TCC aplicativo de gerência de hospedagens em um Hotel.

## Tecnologias
- VsCode
- Node.js
- Prisma
- XAMPP MySQL
- JavaScript

## Teste remotamente através da Vercel

## Para testar localmente
- 1 Clone este repositorio
- 2 Crie um arquivo .env na raiz contendo o conteúdo a seguir:
```js
DATABASE_URL="mysql://root@localhost:3306/hotel"
SECRET_JWT="minha-chave-secreta"
```
- 3 Abra com o VsCode e abra um terminal **CMD** ou **bash** e instale as dependências
```
npm install
```
- 4 Abra o XAMPP de start em MySQL e faça a migração do BD
```bash
npx prisma migrate dev --name init
```
- 5 Execute a API
```
npm run dev
```
test