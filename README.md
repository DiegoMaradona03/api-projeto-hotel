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

# Roteiro de Testes da API – Hotel (URLs completas)

Base da API: `https://api-projeto-hotel.vercel.app/`

## 1. Login

### 1.1 Login válido
- **Método:** POST  
- **URL:** `https://api-projeto-hotel.vercel.app/login`  
- **Headers:** nenhum  
- **Body (JSON):**
```json
{
  "email": "usuario@teste.com",
  "senha": "senha123"
}
```
- **Esperado:** `200 OK` com token JWT.

### 1.2 Login inválido
- **Método:** POST  
- **URL:** `https://api-projeto-hotel.vercel.app/login`  
- **Body (JSON):**
```json
{
  "email": "usuario@teste.com",
  "senha": "senhaErrada"
}
```
- **Esperado:** `401 Unauthorized` com mensagem de erro.

### 1.3 Validação de token
- **Método:** GET  
- **URL:** `https://api-projeto-hotel.vercel.app/login`  
- **Headers:**  
```
Authorization: Bearer <token_valido>
```
- **Esperado:** `200 OK` se token válido, `401 Unauthorized` se inválido.

---

## 2. Usuários

### 2.1 Criar usuário
- **Método:** POST  
- **URL:** `https://api-projeto-hotel.vercel.app/usuarios`  
- **Body (JSON):**
```json
{
  "nome": "Diego",
  "email": "diego@teste.com",
  "senha": "123456"
}
```
- **Esperado:** `201 Created` com dados do usuário.

### 2.2 Listar todos os usuários
- **Método:** GET  
- **URL:** `https://api-projeto-hotel.vercel.app/usuarios`  
- **Headers:**  
```
Authorization: Bearer <token_valido>
```
- **Esperado:** `200 OK` com array de usuários.

### 2.3 Buscar usuário por ID
- **Método:** GET  
- **URL:** `https://api-projeto-hotel.vercel.app/usuarios/:id`  
- **Headers:**  
```
Authorization: Bearer <token_valido>
```
- **Esperado:** `200 OK` com dados do usuário ou `404 Not Found`.

### 2.4 Atualizar usuário
- **Método:** PATCH  
- **URL:** `https://api-projeto-hotel.vercel.app/usuarios/:id`  
- **Headers:**  
```
Authorization: Bearer <token_valido>
```
- **Body (JSON):**
```json
{
  "nome": "Diego Atualizado",
  "email": "diego.novo@teste.com"
}
```
- **Esperado:** `200 OK` com dados atualizados.

### 2.5 Remover usuário
- **Método:** DELETE  
- **URL:** `https://api-projeto-hotel.vercel.app/usuarios/:id`  
- **Headers:**  
```
Authorization: Bearer <token_valido>
```
- **Esperado:** `200 OK` com confirmação de exclusão.

---

## 3. Telefones

### 3.1 Criar telefone
- **Método:** POST  
- **URL:** `https://api-projeto-hotel.vercel.app/telefones`  
- **Body (JSON):**
```json
{
  "usuarioId": 1,
  "numero": "(11) 99999-9999"
}
```
- **Esperado:** `201 Created` com dados do telefone.

### 3.2 Listar telefones
- **Método:** GET  
- **URL:** `https://api-projeto-hotel.vercel.app/telefones`  
- **Esperado:** Array de telefones.

### 3.3 Atualizar telefone
- **Método:** PATCH  
- **URL:** `https://api-projeto-hotel.vercel.app/telefones/:id`  
- **Body (JSON):**
```json
{
  "numero": "(11) 98888-8888"
}
```
- **Esperado:** `200 OK` com dados atualizados.

### 3.4 Remover telefone
- **Método:** DELETE  
- **URL:** `https://api-projeto-hotel.vercel.app/telefones/:id`  
- **Esperado:** `200 OK` com confirmação.

---

## 4. Quartos

### 4.1 Criar quarto
- **Método:** POST  
- **URL:** `https://api-projeto-hotel.vercel.app/quartos`  
- **Body (JSON):**
```json
{
  "numero": 101,
  "tipo": "Luxo",
  "preco": 300
}
```
- **Esperado:** `201 Created` com dados do quarto.

### 4.2 Listar quartos
- **Método:** GET  
- **URL:** `https://api-projeto-hotel.vercel.app/quartos`  
- **Esperado:** Array de quartos.

### 4.3 Buscar quarto por ID
- **Método:** GET  
- **URL:** `https://api-projeto-hotel.vercel.app/quartos/:id`  
- **Esperado:** Dados do quarto ou `404 Not Found`.

### 4.4 Atualizar quarto
- **Método:** PATCH  
- **URL:** `https://api-projeto-hotel.vercel.app/quartos/:id`  
- **Body (JSON):**
```json
{
  "preco": 350
}
```
- **Esperado:** `200 OK` com dados atualizados.

### 4.5 Remover quarto
- **Método:** DELETE  
- **URL:** `https://api-projeto-hotel.vercel.app/quartos/:id`  
- **Esperado:** `200 OK` com confirmação.

---

## 5. Reservas

### 5.1 Criar reserva
- **Método:** POST  
- **URL:** `https://api-projeto-hotel.vercel.app/reservas`  
- **Body (JSON):**
```json
{
  "usuarioId": 1,
  "quartoId": 101,
  "dataEntrada": "2025-10-10",
  "dataSaida": "2025-10-15"
}
```
- **Esperado:** `201 Created` com dados da reserva.

### 5.2 Listar reservas
- **Método:** GET  
- **URL:** `https://api-projeto-hotel.vercel.app/reservas`  
- **Esperado:** Array de reservas.

### 5.3 Buscar reserva por ID
- **Método:** GET  
- **URL:** `https://api-projeto-hotel.vercel.app/reservas/:id`  
- **Esperado:** Dados da reserva ou `404 Not Found`.

### 5.4 Atualizar reserva
- **Método:** PATCH  
- **URL:** `https://api-projeto-hotel.vercel.app/reservas/:id`  
- **Body (JSON):**
```json
{
  "dataSaida": "2025-10-18"
}
```
- **Esperado:** `200 OK` com dados atualizados.

### 5.5 Remover reserva
- **Método:** DELETE  
- **URL:** `https://api-projeto-hotel.vercel.app/reservas/:id`  
- **Esperado:** `200 OK` com confirmação.
