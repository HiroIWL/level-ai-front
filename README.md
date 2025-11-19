# **LevelAI – Frontend**

Frontend web da plataforma **LevelAI**, uma aplicação moderna focada em artigos sobre Inteligência Artificial, carreira e desenvolvimento tecnológico.

Este projeto integra-se com o backend para autenticação segura via JWT.

---

## **Tecnologias Utilizadas**

* **Next.js 15** – Framework React com App Router
* **React 19** – Biblioteca de UI
* **TypeScript** – Tipagem estática
* **Tailwind CSS 4** – Estilização utilitária
* **Cookies** (httpOnly) – Armazenamento seguro de tokens JWT
* **Turbopack** – Build system otimizado
* **ESLint** – Linting de código

---

## **Arquitetura**

O projeto segue a estrutura padrão do **Next.js 15 com App Router**, com separação clara entre:

- **Pages/Routes** – Páginas dinâmicas e Server Components
- **Components** – Componentes reutilizáveis (Client Components)
- **Contexts** – Gerenciamento global de estado (Autenticação, Usuário)
- **Services** – Camada de integração com API
- **Lib** – Utilitários (API, cookies, utils)
- **Models** – Tipos e enums TypeScript

### **Fluxo de Autenticação**

1. **Registro** → Usuário preenche formulário e é redirecionado para termos
2. **Termos** → Usuário concorda com os termos de serviço
3. **Cadastro Final** → Dados são enviados ao backend e token JWT é gerado
4. **Login** → Usuário faz login com email/senha
5. **Token** → JWT é armazenado em cookie httpOnly (seguro)
6. **Navegação** → Usuário acessa home e visualiza artigos

---

## **Estrutura de Pastas**

```
src/
  app/
    api/                    # Rotas de API (me, logout)
    artigo/
      [id]/
        page.tsx            # Página de visualização de artigo individual
    home/
      page.tsx              # Home com grid de artigos
    login/
      actions.ts            # Server Actions para autenticação
      page.tsx              # Página de login
    register/
      actions.ts            # Server Actions para registro
      page.tsx              # Página de registro
    termos-registro/
      page.tsx              # Página de termos e condições do registro
    layout.tsx              # Layout raiz com providers
    globals.css             # Estilos globais
    page.tsx                # Landing page

  components/
    Button.tsx              # Botão reutilizável com variantes
    ButtonBase.tsx          # Base para botões (ícones, texto)
    ButtonLink.tsx          # Link estilizado como botão
    Container.tsx           # Layout flexbox reutilizável
    DesafioVisoes.tsx       # Componente de desafios (legado)
    FormContainer.tsx       # Wrapper para formulários
    FormInput.tsx           # Input com label e validação
    FormSelect.tsx          # Select customizado com dropdown
    Header.tsx              # Header com logout/voltar
    Modal.tsx               # Modal reutilizável
    ProfilePicture.tsx      # Avatar do usuário
    Sidebar.tsx             # Menu lateral
    Typography.tsx          # Componente de texto com variantes
    index.ts                # Barrel exports

  context/
    AuthenticatedContext.tsx # Contexto global de autenticação
    UserContext.tsx         # Contexto de dados do usuário

  lib/
    api.ts                  # Fetch com error handling (client-safe)
    api-server.ts           # Fetch com acesso a cookies (server-only)
    cookies.ts              # Gerenciamento de cookies JWT
    utils.ts                # Utilitários gerais

  models/
    TipoUsuario.enum.ts     # Enum de tipos de usuário

  services/
    auth.service.ts         # Lógica de autenticação (register, login, logout)

  middleware.ts             # Middleware Next.js
```

---

## **Páginas e Fluxos**

### **1. Login** (`/login`)
- Formulário de email e senha
- Integração com `loginUserAction`
- Redireciona para `/home` após sucesso
- Exibe erros de validação

### **2. Register** (`/register`)
- Formulário com nome, email, telefone, senha
- Dados salvos em `localStorage`
- Redireciona para `/termos-registro`

### **3. Termos de Registro** (`/termos-registro`)
- Exibe 4 pontos de concordância
- Recupera dados do `localStorage`
- Chama `registerUserAction` ao confirmar
- Redireciona para `/login` após sucesso

### **4. Home** (`/home`)
- Grid de artigos em 4 colunas
- Cards com imagem quadrada (1:1), título, tempo de leitura
- Clique no card redireciona para `/artigo/:id`
- Requer autenticação

### **5. Artigo** (`/artigo/:id`)
- Imagem em largura total
- Título, tempo de leitura e conteúdo completo
- 8 artigos pré-carregados com conteúdo único
- Header com opção de voltar

---

## **Componentes Principais**

### **Button & ButtonLink**
```tsx
<Button variant="primary" textColor="white" onClick={handleClick}>
  Entrar
</Button>

<ButtonLink href="/artigo/1" variant="primary" textColor="white">
  Ler artigo
</ButtonLink>
```

Variantes: `primary`, `secondary`, `info`, `neutral`, `white`

### **FormInput**
```tsx
<FormInput
  name="email"
  label="Email"
  type="email"
  placeholder="seu@email.com"
  error={error}
/>
```

### **Container**
```tsx
<Container
  direction="column"
  gap={4}
  padding="md"
  align="center"
  justify="center"
>
  {children}
</Container>
```

Suporta: `direction`, `gap`, `padding`, `align`, `justify`, `rounded`, `shadow`, `fluid`

### **Header**
```tsx
<Header isAuthenticated={true} isHome={true} />
```

- `isAuthenticated={false}` → Mostra apenas logo
- `isAuthenticated={true}` → Mostra logo + ProfilePicture + botão sair/voltar

---

## **Server Actions**

### **Login** (`/src/app/login/actions.ts`)
```typescript
export async function loginUserAction(data: FormData) {
    // Valida email e senha
    // Chama loginUser() do auth.service
    // Armazena token em cookie httpOnly
}
```

### **Register** (`/src/app/register/actions.ts`)
```typescript
export async function registerUserAction(data: FormData) {
    // Cria novo usuário no backend
    // Armazena token em cookie httpOnly
}
```

### **Logout** (`/src/app/login/actions.ts`)
```typescript
export async function logOut() {
    // Limpa cookie httpOnly
    // Desautentica o usuário
}
```

---

## **Contextos de Estado**

### **AuthenticatedContext**
```tsx
const { isAuthenticated, setIsAuthenticated, clear } = useAuthenticated();
```

Gerencia o estado global de autenticação.

### **UserContext**
```tsx
const { user, loading, logout, refreshUser } = useUser();
```

Gerencia dados do usuário logado:
- `user` – Objeto com id, nome, email, role
- `loading` – Indica se está buscando dados
- `logout()` – Faz logout e limpa estado
- `refreshUser()` – Recarrega dados do `/api/me`

---

## **Integração com Backend**

### **Endpoints Consumidos**

| Endpoint | Método | Descrição |
|----------|--------|-----------|
| `/auth/register` | POST | Registra novo usuário |
| `/auth/login` | POST | Autentica e retorna JWT |
| `/api/me` | GET | Retorna dados do usuário logado |
| `/api/logout` | POST | Realiza logout |

### **Fluxo de Token**

1. Backend retorna `access_token` em JSON
2. Frontend armazena em cookie `httpOnly` via `setAuthToken()`
3. Requests subsequentes incluem cookie automaticamente
4. Middleware valida token nas rotas protegidas

---

## **Estilização**

### **Design System**

- **Cor Primária:** `#8700FF` (roxo)
- **Fonte:** Josefin Sans (display) + Tailwind (body)
- **Espaçamento:** Baseado em `gap` (Tailwind)
- **Borda Padrão:** `rounded-md` ou `rounded-lg`
- **Sombra Padrão:** `shadow-md`

### **Componentes Estilizados**

- Inputs focam com ring roxo
- Botões primários roxos com hover escuro
- Cards com sombra e hover efeito
- Imagens com aspect-square e rounded-lg

---

## **Instalação e Execução**

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

Criar arquivo `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 3. Iniciar servidor de desenvolvimento

```bash
npm run dev
```

Acesso em: `http://localhost:3001`

### 4. Build para produção

```bash
npm run build
npm run start
```

---

## **Middleware**

O arquivo `src/middleware.ts` pode ser configurado para:
- Proteger rotas (redirecionar não autenticados)
- Validar tokens JWT
- Redirecionar para login se expirado

---

## **Fluxo Completo de Usuário**

```
┌─────────────────────────────────────────────────────┐
│                  LevelAI Frontend                     │
├─────────────────────────────────────────────────────┤
│                                                       │
│  1. Landing Page (/)                                │
│     └─> [Botão Entrar/Cadastrar]                    │
│                                                       │
│  2. Login (/login) ou Register (/register)          │
│     └─> Cria conta? Vai pra Register                │
│     └─> Já tem conta? Vai pra Login                 │
│                                                       │
│  3. Termos (/termos-registro) [Se novo usuário]    │
│     └─> Concorda? Realiza cadastro e vai pro Login │
│     └─> Discorda? Volta para Register               │
│                                                       │
│  4. Autenticação via Backend                        │
│     └─> Email/Senha validados                       │
│     └─> Token JWT retornado                         │
│     └─> Armazenado em cookie httpOnly               │
│                                                       │
│  5. Home (/home) [Protegida]                       │
│     └─> Grid de 8 artigos                           │
│     └─> Clica em artigo?                            │
│                                                       │
│  6. Artigo (/artigo/:id) [Protegida]               │
│     └─> Visualiza conteúdo completo                │
│     └─> Botão voltar leva de volta pro home        │
│                                                       │
│  7. Logout                                          │
│     └─> Clica em "Sair"                            │
│     └─> Cookie limpo                               │
│     └─> Redireciona para login                      │
│                                                       │
└─────────────────────────────────────────────────────┘
```

---

## **Segurança**

✅ **Implementações de Segurança:**
- Cookies `httpOnly` (impermeável a XSS)
- Secure flag em produção
- SameSite=lax contra CSRF
- Validação de entrada em formulários
- Tipagem TypeScript para type safety
- Server Actions para operações sensíveis

---

## **Status do Frontend**

✅ Autenticação completa (register, login, logout)
✅ Grid de artigos com navegação
✅ Página individual de artigo
✅ Design system unificado (roxo #8700FF)
✅ Componentes reutilizáveis
✅ Contexts para estado global
✅ Server Actions para segurança
✅ Integração com API do backend
❗ Funcionalidades de artigos (favoritos, recomendações) em roadmap
