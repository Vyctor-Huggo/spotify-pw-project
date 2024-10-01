Aqui está a atualização do **README** com os passos adicionais para o usuário obter seu próprio Spotify **Client ID** e **Client Secret**:

---

# spotify-pw-project

## Como Rodar a Aplicação Express Localmente

Este guia irá te ajudar a configurar e rodar a aplicação Express clonada do GitHub no seu computador, além de obter as credenciais do Spotify para a integração.

### Requisitos

Antes de iniciar, certifique-se de que você tem as seguintes ferramentas instaladas:

1. **Git** - Para clonar o repositório.
   - [Instalar Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
   
2. **Node.js** e **npm** - Node.js é o ambiente de execução, e o npm é o gerenciador de pacotes necessário para instalar as dependências do projeto.
   - [Instalar Node.js](https://nodejs.org/en/download/)

   Após a instalação, verifique se tudo está funcionando corretamente com os comandos abaixo:

   ```bash
   node -v
   npm -v
   ```

3. **Editor de Texto ou IDE** (Opcional) - Recomendado para explorar e editar o código.
   - Recomendação: [VS Code](https://code.visualstudio.com/)

### Passo 1: Clonar o Repositório

Abra o terminal e navegue até o diretório onde você deseja clonar o projeto. Execute o seguinte comando para clonar o repositório do GitHub:

```bash
git clone https://github.com/Vyctor-Huggo/spotify-pw-project.git
```

Após clonar, navegue até o diretório do projeto:

```bash
cd spotify-pw-project/src
```

### Passo 2: Instalar as Dependências

Depois de clonar o repositório e navegar até a pasta do projeto, você precisará instalar todas as dependências do projeto. Isso pode ser feito usando o comando npm:

```bash
npm install
```

Esse comando irá ler o arquivo `package.json` e instalar todas as dependências necessárias para rodar a aplicação Express.

### Passo 3: Obter Credenciais do Spotify (Client ID e Client Secret)

Para que a aplicação funcione corretamente com o Spotify, você precisará obter seu próprio **Client ID** e **Client Secret** seguindo os passos abaixo:

1. Acesse o [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/applications).
   
2. Faça login com sua conta do Spotify ou crie uma nova conta.

3. Após o login, clique em **Create an App** para criar uma nova aplicação.

4. Preencha o nome da aplicação e uma breve descrição. Pode ser qualquer coisa, como "My Spotify App".

5. Aceite os Termos de Serviço e clique em **Create**.

6. Depois que a aplicação for criada, você verá seu **Client ID** e **Client Secret** na página da aplicação.

   - **Client ID**: Copie o valor exibido na seção "Client ID".
   - **Client Secret**: Clique no botão **Show Client Secret** e copie o valor exibido.

7. Vá para a seção **Edit Settings** e adicione a URL de redirecionamento que você vai usar localmente. Para este projeto, adicione:

   ```
   http://localhost:3000/callback
   ```

   Clique em **Save** para salvar as alterações.

### Passo 4: Configurar Variáveis de Ambiente

Depois de obter seu **Client ID** e **Client Secret**, você precisa configurá-los nas variáveis de ambiente do projeto.

Renomeie o arquivo `.env.example` para `.env` e insira as credenciais obtidas do Spotify:

```bash
cp .env.example .env
```

Edite o arquivo `.env` e substitua as variáveis de exemplo pelos valores que você obteve:

```plaintext
SPOTIFY_CLIENT_ID=seu_client_id
SPOTIFY_CLIENT_SECRET=seu_client_secret
SPOTIFY_REDIRECT_URI=http://localhost:3000/callback
port=3000
```

### Passo 5: Rodar a Aplicação Localmente

Agora que você configurou as variáveis de ambiente e instalou as dependências, pode rodar a aplicação Express com o seguinte comando:

```bash
node app.js
```

Por padrão, a aplicação deve rodar em `http://localhost:3000`. Abra um navegador e acesse essa URL para ver a aplicação funcionando.
