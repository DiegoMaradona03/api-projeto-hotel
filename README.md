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

# Roteiro de Testes API do Hotel (Ajustado)

**Base da API:** `https://api-projeto-hotel.vercel.app/`

---

## ✅ Checklist de Testes

### Testes Gerais
- [x] Verificar se o endpoint `/` retorna 200 e informações da API.  

### Testes de Login
- [x] Realizar login com credenciais válidas (`POST /login`) → deve retornar token.  
- [x] Tentar login com credenciais inválidas → deve retornar 400.  
- [x] Validar token (`GET /login`) com token válido → 200.  
- [x] Validar token com token inválido ou expirado → 401.  

### Testes de Usuários
- [x] Criar usuário (`POST /usuarios`) → verificar campos obrigatórios.  
- [x] Listar todos usuários (`GET /usuarios`) → deve retornar lista.  
- [x] Obter usuário por ID (`GET /usuarios/:id`) → 200 se existir, 404 se não existir.  
- [x] Alterar usuário (`PATCH /usuarios/:id`) → campos opcionais.  
- [x] Resetar senha (`PATCH /usuarios`) → deve enviar e-mail com senha provisória.  
- [x] Deletar usuário (`DELETE /usuarios/:id`) → 204.  

### Testes de Telefones
- [x] Criar telefone (`POST /telefones`).  
- [x] Listar todos telefones (`GET /telefones`).  
- [x] Obter telefone por ID (`GET /telefones/:id`).  
- [x] Alterar telefone (`PATCH /telefones/:id`).  
- [x] Deletar telefone (`DELETE /telefones/:id`).  

### Testes de Quartos
- [x] Criar quarto (`POST /quartos`).  
- [x] Listar todos quartos (`GET /quartos`).  
- [x] Obter quarto por ID (`GET /quartos/:id`).  
- [x] Alterar quarto (`PATCH /quartos/:id`).  
- [x] Deletar quarto (`DELETE /quartos/:id`).  

### Testes de Reservas
- [x] Criar reserva (`POST /reservas`).  
- [x] Listar todas reservas (`GET /reservas`).  
- [x] Obter reserva por ID (`GET /reservas/:id`).  
- [x] Alterar reserva (`PATCH /reservas/:id`) → **dataEntrada** e **dataSaida** permanecem `null`.  
- [x] Deletar reserva (`DELETE /reservas/:id`).  

---

## 1. Teste Geral

**GET /**  
**URL:** `https://api-projeto-hotel.vercel.app/`  
**Resposta esperada 200:**
```json
{
  "titulo": "Hotel",
  "versao": "1.0.0",
  "rotas": [
    { "verbo": "POST", "rota": "/login" },
    { "verbo": "GET", "rota": "/login" },
    { "verbo": "GET", "rota": "/usuarios" },
    { "verbo": "GET", "rota": "/usuarios/:id" },
    { "verbo": "POST", "rota": "/usuarios" },
    { "verbo": "PATCH", "rota": "/usuarios" },
    { "verbo": "PATCH", "rota": "/usuarios/:id" },
    { "verbo": "DELETE", "rota": "/usuarios/:id" },
    { "verbo": "GET", "rota": "/telefones" },
    { "verbo": "GET", "rota": "/telefones/:id" },
    { "verbo": "POST", "rota": "/telefones" },
    { "verbo": "PATCH", "rota": "/telefones/:id" },
    { "verbo": "DELETE", "rota": "/telefones/:id" },
    { "verbo": "GET", "rota": "/quartos" },
    { "verbo": "GET", "rota": "/quartos/:id" },
    { "verbo": "POST", "rota": "/quartos" },
    { "verbo": "PATCH", "rota": "/quartos/:id" },
    { "verbo": "DELETE", "rota": "/quartos/:id" },
    { "verbo": "GET", "rota": "/reservas" },
    { "verbo": "GET", "rota": "/reservas/:id" },
    { "verbo": "POST", "rota": "/reservas" },
    { "verbo": "PATCH", "rota": "/reservas/:id" },
    { "verbo": "DELETE", "rota": "/reservas/:id" }
  ]
}
```

---

## 2. Login

### 2.1 POST /login
**URL:** `https://api-projeto-hotel.vercel.app/login`  
**Body JSON (válido):**
```json
{
  "email": "lucas.souza@email.com",
  "senha": "senha123",
  "validade": 30
}
```
**Resposta esperada:** 200 OK + token JWT.

**Body JSON (inválido):**
```json
{
  "email": "lucas.souza@email.com",
  "senha": "senhaErrada",
  "validade": 30
}
```
**Resposta esperada:** 400 Erro de login.

---

### 2.2 GET /login (validação)
**URL:** `https://api-projeto-hotel.vercel.app/login`  
**Headers:**
```
Authorization: Bearer <token válido>
```
**Resposta esperada:** 200 OK  

**Com token inválido:** 401 Unauthorized

---

## 3. Usuários

### 3.1 POST /usuarios
**URL:** `https://api-projeto-hotel.vercel.app/usuarios`  
```json
{
  "nome": "Lucas Souza",
  "cpf": "12345678901",
  "email": "lucas.souza@email.com",
  "senha": "senha123"
}
```
**Resposta esperada:** 201 Criado

---

### 3.2 GET /usuarios
**URL:** `https://api-projeto-hotel.vercel.app/usuarios`  
**Headers:**
```
Authorization: Bearer <token válido>
```

---

### 3.3 PATCH /usuarios (reset senha)
**URL:** `https://api-projeto-hotel.vercel.app/usuarios`  
```json
{
  "email": "lucas.souza@email.com"
}
```
**Resposta esperada:** 202 Email enviado

---

### 3.4 PATCH /usuarios/:id
**URL:** `https://api-projeto-hotel.vercel.app/usuarios/1`  
```json
{
  "nome": "Lucas Souza Atualizado",
  "email": "lucas.novo@email.com",
  "senha": "novaSenha123"
}
```
**Headers:**
```
Authorization: Bearer <token válido>
```

---

### 3.5 GET /usuarios/:id
**URL:** `https://api-projeto-hotel.vercel.app/usuarios/1`  
**Headers:**
```
Authorization: Bearer <token válido>
```

---

### 3.6 DELETE /usuarios/:id
**URL:** `https://api-projeto-hotel.vercel.app/usuarios/1`  
**Headers:**
```
Authorization: Bearer <token válido>
```

---

## 4. Telefones

### 4.1 POST /telefones
**URL:** `https://api-projeto-hotel.vercel.app/telefones`  
```json
{
  "usuarioId": 1,
  "numero": "19998887766"
}
```

### 4.2 GET /telefones
**URL:** `https://api-projeto-hotel.vercel.app/telefones`

### 4.3 PATCH /telefones/:id
**URL:** `https://api-projeto-hotel.vercel.app/telefones/1`  
```json
{
  "usuarioId": 1,
  "numero": "19997776655"
}
```

### 4.4 GET /telefones/:id
**URL:** `https://api-projeto-hotel.vercel.app/telefones/1`

### 4.5 DELETE /telefones/:id
**URL:** `https://api-projeto-hotel.vercel.app/telefones/1`

---

## 5. Quartos

### 5.1 POST /quartos
**URL:** `https://api-projeto-hotel.vercel.app/quartos`  
```json
{
  "numero": "201",
  "descricao": "Quarto solteiro com varanda",
  "foto": "quarto2.jpg",
  "totalOspedes": 1
}
```

### 5.2 GET /quartos
**URL:** `https://api-projeto-hotel.vercel.app/quartos`

### 5.3 PATCH /quartos/:id
**URL:** `https://api-projeto-hotel.vercel.app/quartos/1`  
```json
{
  "numero": "201",
  "descricao": "Quarto solteiro atualizado",
  "foto": "quarto2.jpg",
  "totalOspedes": 1
}
```

### 5.4 GET /quartos/:id
**URL:** `https://api-projeto-hotel.vercel.app/quartos/1`

### 5.5 DELETE /quartos/:id
**URL:** `https://api-projeto-hotel.vercel.app/quartos/1`

---

## 6. Reservas

### 6.1 POST /reservas
**URL:** `https://api-projeto-hotel.vercel.app/reservas`  
```json
{
  "usuarioId": 1,
  "quartoId": 2,
  "dataEntradaPrevista": "2025-10-01T14:00:00.000Z",
  "dataSaidaPrevista": "2025-10-05T12:00:00.000Z",
  "quantidadeOspedes": 1
}
```

### 6.2 GET /reservas
**URL:** `https://api-projeto-hotel.vercel.app/reservas`

### 6.3 PATCH /reservas/:id
**URL:** `https://api-projeto-hotel.vercel.app/reservas/1`  
```json
{
  "usuarioId": 1,
  "quartoId": 2,
  "dataEntradaPrevista": "2025-10-01T14:00:00.000Z",
  "dataSaidaPrevista": "2025-10-06T12:00:00.000Z",
  "dataEntrada": null,
  "dataSaida": null,
  "quantidadeOspedes": 1
}
```

### 6.4 GET /reservas/:id
**URL:** `https://api-projeto-hotel.vercel.app/reservas/1`

### 6.5 DELETE /reservas/:id
**URL:** `https://api-projeto-hotel.vercel.app/reservas/1`