FROM node:alpine
WORKDIR /smaite_docker/frontend
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i
# CMD ["npm", "run", "build"]
CMD ["npm", "start"]