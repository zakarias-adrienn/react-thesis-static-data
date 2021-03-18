FROM node:alpine
WORKDIR '/app'

COPY package.json .
RUN npm install -g npm@7.6.3
COPY . .
CMD ["npm", "start"]