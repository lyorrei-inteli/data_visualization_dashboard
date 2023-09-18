
### Frontend (Desenvolvido com Next.js 13, Next-Auth e TailwindCSS)

#### **Visão Geral**

Nossa interface foi construída sobre a robustez do **Next.js 13**, garantindo que o frontend não seja apenas ágil e eficiente, mas também adaptável e amigável para o usuário. Alavancando o **TailwindCSS**, conseguimos oferecer um design limpo e moderno, que se adapta sem esforço a diferentes tamanhos de tela desktop, assegurando que a experiência do usuário seja sempre do mais alto padrão.

#### **Autenticação**

Graças à flexibilidade e segurança oferecidas pelo **Next-Auth**, a autenticação de usuários é uma experiência suave e protegida. Cada etapa, desde o login até o registro, é otimizada para rapidez e precisão, garantindo que os dados do usuário sejam sempre mantidos em segurança e que as rotas sensíveis permaneçam inacessíveis a usuários não autenticados.

##### **Páginas e Funcionalidades**:

1. **Página de Autenticação**:

   - Aqui, os usuários são apresentados a uma interface intuitiva e amigável, onde podem optar por criar uma nova conta ou entrar em uma já existente.
   - Os formulários são aprimorados com verificações de validação rigorosas, assegurando que os dados inseridos sejam corretos e minimizando erros.

   <hr/>

   ![Página de login](/documentos/image/page_login.png)

   <hr/>

   ![Página de criar conta](/documentos/image/page_signup.png)
2. **Dashboard**:

   - Uma vez dentro, o usuário é saudado por um painel (dashboard) atraente e organizado, que apresenta um resumo de todas as suas atividades anteriores, previsões feitas e a opção de adicionar novos conjuntos de dados.
   - Com um design claro, é fácil navegar e encontrar informações específicas rapidamente.

   <hr/>

   ![Página de ver previsões](/documentos/image/page_dashboard.png)
3. **Upload de Dados**:

   - Esta página foi especialmente projetada para ser o portal onde os usuários podem enviar dados vitais de voo em formato Parquet.
   - Uma vez que o arquivo é selecionado e enviado, os usuários podem ficar tranquilos sabendo que nosso backend robusto cuidará do armazenamento seguro na AWS S3. Em termos de processamento, os scripts dedicados cuidam da operação ETL, seguida da preciosa previsão que informa a integridade do sistema de bleed.

   <hr/>

   ![Página de criar nova solicitação de previsão](/documentos/image/page_upload.png)


## Como rodar o projeto em development mode


```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

O projeto abrirá em [http://localhost:3000](http://localhost:3000).
