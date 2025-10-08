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

# API Hotel – Roteiro de Testes (ajustado)

Base da API: `https://api-projeto-hotel.vercel.app/`

> ⚠️ **Importante:** antes de executar os testes de **login** ou criar reservas, **crie pelo menos um usuário**. O modelo `Usuario` exige `nome`, `cpf`, `email` e `senha` (cpf e email são únicos).

---

## 1. Login

### 1.1 Login válido

* **Método:** POST
* **URL:** `https://api-projeto-hotel.vercel.app/login`
* **Headers:** nenhum
* **Body (JSON):**

```json
{
  "email": "usuario@teste.com",
  "senha": "senha123"
}
```

* **Esperado:** `200 OK` com token JWT.

### 1.2 Login inválido

* **Método:** POST
* **URL:** `https://api-projeto-hotel.vercel.app/login`
* **Body (JSON):**

```json
{
  "email": "usuario@teste.com",
  "senha": "senhaErrada"
}
```

* **Esperado:** `401 Unauthorized` com mensagem de erro.

### 1.3 Validação de token

* **Método:** GET
* **URL:** `https://api-projeto-hotel.vercel.app/login`
* **Headers:**

```
Authorization: Bearer <token_valido>
```

* **Esperado:** `200 OK` se token válido, `401 Unauthorized` se inválido.

---

## 2. Usuários

> **Campos obrigatórios (conforme Prisma schema):** `nome` (String), `cpf` (String, único), `email` (String, único), `senha` (String).
> **Observação sobre telefones:** o modelo permite relação `telefone: Telefone[]`. Você pode criar telefones separadamente via `/telefones` ou, caso a API implemente nested create, enviar `telefone: [{ "numero": "..." }]` ao criar o usuário. Se não tiver certeza, use `/telefones` após criar o usuário.

### 2.1 Criar usuário

* **Método:** POST
* **URL:** `https://api-projeto-hotel.vercel.app/usuarios`
* **Body (JSON) — exemplo mínimo (obrigatório):**

```json
{
  "nome": "Diego",
  "cpf": "12345678900",
  "email": "diego@teste.com",
  "senha": "123456"
}
```

* **Body (JSON) — exemplo com telefone (opcional, só se a API suportar nested create):**

```json
{
  "nome": "Diego",
  "cpf": "12345678900",
  "email": "diego@teste.com",
  "senha": "123456",
  "telefone": [
    { "numero": "(11) 99999-9999" }
  ]
}
```

* **Esperado:** `201 Created` com dados do usuário (id, nome, cpf, email, etc.).
* **Erros possíveis:**

  * `400 Bad Request` se faltar campo obrigatório.
  * `400 Bad Request` se `cpf` ou `email` já existirem (violação de unicidade).

### 2.2 Listar todos os usuários

* **Método:** GET
* **URL:** `https://api-projeto-hotel.vercel.app/usuarios`
* **Headers:**

```
Authorization: Bearer <token_valido>
```

* **Esperado:** `200 OK` com array de usuários.

### 2.3 Buscar usuário por ID

* **Método:** GET
* **URL:** `https://api-projeto-hotel.vercel.app/usuarios/:id`
* **Headers:**

```
Authorization: Bearer <token_valido>
```

* **Esperado:** `200 OK` com dados do usuário ou `404 Not Found`.

### 2.4 Atualizar usuário

* **Método:** PATCH
* **URL:** `https://api-projeto-hotel.vercel.app/usuarios/:id`
* **Headers:**

```
Authorization: Bearer <token_valido>
```

* **Body (JSON):**

```json
{
  "nome": "Diego Atualizado",
  "email": "diego.novo@teste.com"
}
```

* **Esperado:** `200 OK` com dados atualizados.

### 2.5 Reset de usuário

* **Método:** PATCH
* **URL:** `https://api-projeto-hotel.vercel.app/usuarios`
* **Body (JSON):**

```json
{
  "email": "usuario@teste.com"
}
```

* **Descrição:** redefine a senha para a provisória `"senha000"` (retorna `senhaProvisoria: "senha000"` no corpo) e atualiza a senha no banco (hash).
* **Esperado:** `202 Accepted` com JSON contendo o usuário atualizado e `senhaProvisoria`.
* **Erros possíveis:**

  * `400 Bad Request` se o email não for enviado.
  * `400 Bad Request` se o email não existir.
  * `500 Internal Server Error` se houver falha no update.

### 2.6 Remover usuário

* **Método:** DELETE
* **URL:** `https://api-projeto-hotel.vercel.app/usuarios/:id`
* **Headers:**

```
Authorization: Bearer <token_valido>
```

* **Esperado:** `204 No Content` (ou `200 OK` com confirmação, dependendo da implementação).

---

## 3. Telefones

### 3.1 Criar telefone

* **Método:** POST
* **URL:** `https://api-projeto-hotel.vercel.app/telefones`
* **Body (JSON):**

```json
{
  "usuarioId": 1,
  "numero": "(11) 99999-9999"
}
```

* **Esperado:** `201 Created` com dados do telefone.

### 3.2 Listar telefones

* **Método:** GET
* **URL:** `https://api-projeto-hotel.vercel.app/telefones`
* **Esperado:** `200 OK` com array de telefones.

### 3.3 Atualizar telefone

* **Método:** PATCH
* **URL:** `https://api-projeto-hotel.vercel.app/telefones/:id`
* **Body (JSON):**

```json
{
  "numero": "(11) 98888-8888"
}
```

* **Esperado:** `200 OK` com dados atualizados.

### 3.4 Remover telefone

* **Método:** DELETE
* **URL:** `https://api-projeto-hotel.vercel.app/telefones/:id`
* **Esperado:** `200 OK` com confirmação.

---

## 4. Quartos

### 4.1 Criar quarto

* **Método:** POST
* **URL:** `https://api-projeto-hotel.vercel.app/quartos`
* **Body (JSON):**

```json
{
  "numero": "101",
  "descricao": "Quarto Luxo",
  "foto": "https://exemplo.com/quarto101.jpg",
  "totalOspedes": 3
}
```

* **Esperado:** `201 Created` com dados do quarto.

### 4.2 Listar quartos

* **Método:** GET
* **URL:** `https://api-projeto-hotel.vercel.app/quartos`
* **Esperado:** `200 OK` com array de quartos.

### 4.3 Buscar quarto por ID

* **Método:** GET
* **URL:** `https://api-projeto-hotel.vercel.app/quartos/:id`
* **Esperado:** `200 OK` com dados do quarto ou `404 Not Found`.

### 4.4 Atualizar quarto

* **Método:** PATCH
* **URL:** `https://api-projeto-hotel.vercel.app/quartos/:id`
* **Body (JSON):**

```json
{
  "preco": 350
}
```

* **Esperado:** `200 OK` com dados atualizados.

### 4.5 Remover quarto

* **Método:** DELETE
* **URL:** `https://api-projeto-hotel.vercel.app/quartos/:id`
* **Esperado:** `200 OK` com confirmação.

---

## 5. Reservas

### 5.1 Criar reserva

* **Método:** POST
* **URL:** `https://api-projeto-hotel.vercel.app/reservas`
* **Body (JSON):**

```json
{
  "usuarioId": 1,
  "quartoId": 101,
  "dataEntrada": "2025-10-10",
  "dataSaida": "2025-10-15"
}
```

* **Esperado:** `201 Created` com dados da reserva.

### 5.2 Listar reservas

* **Método:** GET
* **URL:** `https://api-projeto-hotel.vercel.app/reservas`
* **Esperado:** `200 OK` com array de reservas.

### 5.3 Buscar reserva por ID

* **Método:** GET
* **URL:** `https://api-projeto-hotel.vercel.app/reservas/:id`
* **Esperado:** `200 OK` com dados da reserva ou `404 Not Found`.

### 5.4 Atualizar reserva

* **Método:** PATCH
* **URL:** `https://api-projeto-hotel.vercel.app/reservas/:id`
* **Body (JSON):**

```json
{
  "dataSaida": "2025-10-18"
}
```

* **Esperado:** `200 OK` com dados atualizados.

### 5.5 Remover reserva

* **Método:** DELETE
* **URL:** `https://api-projeto-hotel.vercel.app/reservas/:id`
* **Esperado:** `200 OK` com confirmação.

---

## Observações finais

* Garanta que `cpf` e `email` sejam únicos ao criar usuários (use valores diferentes para testes repetidos).
* Se a API não aceitar nested create para `telefone` dentro da criação de `usuario`, use primeiro `POST /usuarios` e depois `POST /telefones` com `usuarioId`.
* O endpoint de reset (`PATCH /usuarios`) espera apenas `{ "email": "..." }` e retorna a senha provisória `"senha000"` no corpo da resposta.