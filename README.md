# Projeto: Dashboard para Visualização de Dados de Acidentes de Trânsito

## Justificativa para a Escolha do Framework e Tecnologias

Optei pelo **Next.js** como framework de frontend devido a sua capacidade inerente de Server Side Rendering (SSR) que permite uma carga mais rápida das páginas e otimização para mecanismos de busca. Além disso, sua integração nativa com a Vercel para deploy e a facilidade em criar rotas dinâmicas também foram fatores determinantes. Para o backend, escolhi o **FastAPI** devido à sua performance e facilidade em construir APIs baseadas em padrões modernos de forma rápida, juntamente com o **Prisma** que oferece uma camada ORM robusta e flexível.

## Descrição do Projeto

O projeto consiste em um dashboard para visualização e análise de dados relacionados a acidentes de trânsito. O sistema permite o login e cadastro de usuários, oferecendo visualizações gráficas como histórico de previsões por tempo e distribuição de previsões por usuário. Há também uma funcionalidade que recebe um arquivo CSV com dados de acidentes de trânsito e, para cada entrada, determina a gravidade do acidente por meio de um modelo de machine learning.

## Infraestrutura na AWS

### Descrição da Infraestrutura Utilizada
ECS (Elastic Container Service): Utilizamos o ECS para gerenciar o deploy e a execução dos containers do frontend e backend. Esse serviço foi escolhido pela sua alta escalabilidade e pela integração direta com Docker, permitindo um gerenciamento eficiente dos recursos e uma operação simplificada.

RDS (Relational Database Service): O banco de dados da aplicação foi hospedado no RDS. Escolhemos o RDS pela facilidade de gerenciamento, onde ele lida com tarefas de rotina como backups, patching e restaurações. Além disso, o RDS oferece facilidade de escalabilidade conforme a demanda.

Para garantir o acesso aos serviços, as regras de segurança foram configuradas para permitir tráfego de qualquer IP (0.0.0.0) nas portas específicas referentes a cada serviço. Isso foi necessário para garantir que os usuários e os sistemas pudessem se comunicar com a aplicação e o banco de dados sem restrições.

### Procedimento de Provisionamento
No AWS Management Console, navegamos até o ECS e criamos um novo cluster.
Dentro do cluster, definimos as especificações do serviço, apontando para as imagens Docker do frontend e do backend.
No RDS, criamos uma nova instância de banco de dados, escolhendo o tipo de banco que se encaixa com nosso projeto.
Configuramos as regras de segurança para permitir tráfego do IP 0.0.0.0 nas portas específicas de cada serviço.

## Procedimento para Execução

Primeiramente, configure os arquivos env do frontend e do backend:

### Frontend
frontend/.env.local
```
  DATABASE_URL="Coloque aqui a url do banco de dados"
  JWT_SECRET_KEY="Coloque aqui uma chave secreta para o JWT"
```

### Backend
backend/.env
```
  NEXTAUTH_SECRET="Coloque aqui a mesma chave secreta para o JWT"
  NEXTAUTH_URL="Url do frontend (ex: http://localhost:3000 ou http://frontend:3000)"
  NEXT_PUBLIC_API_URL="Url do backend (ex: http://127.0.0.1:3001)"
  NEXT_PUBLIC_NODE_ENV="'development' para rodar localmente ou 'production' para rodar dentro de containers"
```

Após a configuração dos arquivos env, execute os seguintes passos, dependendo se você deseja rodar o sistema localmente ou dentro de containers:

### Dentro de containers
1. Navegue para a pasta raiz do projeto e execute o comando:
   ```
   docker compose up --build
   ```
O frontend estará disponível em http://localhost:3000 e o backend em http://localhost:3001.

### Localmente
1. Para iniciar o frontend:
   ```
   cd frontend
   npm install
   npm run dev
   ```

2. Para iniciar o backend:
   ```
   cd backend
   npx prisma migrate dev --name init (apenas na primeira vez para criar as tabelas do banco de dados)
   pip install -r requirements.txt
   uvicorn app:app --reload --port 3001
   ```

## Docker hub
A imagem do backend está disponível em: https://hub.docker.com/repository/docker/lyorrei/backend-data-visualization-dashboard/general

A imagem do frontend está disponível em: https://hub.docker.com/repository/docker/lyorrei/frontend-data-visualization-dashboard/general

## Vídeo Demonstrativo

Link para o vídeo demonstrando o funcionamento do sistema deployado: https://youtu.be/GiD132yTg0M