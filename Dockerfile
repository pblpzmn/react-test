FROM  node:16

RUN npm install -g create-react-app  
COPY . /usr/src/frontend
WORKDIR /usr/src/frontend

ENTRYPOINT sh entry-point.sh