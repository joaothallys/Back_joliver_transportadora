# Usar uma imagem do Node.js como base
FROM node:18

# Definir o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiar o package.json e o package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o restante dos arquivos para o contêiner
COPY . .

# Expor a porta em que a aplicação estará rodando
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["npm", "start"]
