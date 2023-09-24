# Utiliza a imagem oficial do Node.js como base
FROM node:lts

# Diretório de trabalho
WORKDIR /usr/src/app

# Copie os arquivos de pacote
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante dos arquivos do projeto
COPY . .

# Construa o projeto
RUN npm run build

# Exponha a porta padrão do Next.js
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["npm", "run", "start"]
