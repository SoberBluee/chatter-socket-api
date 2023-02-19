
# docker image to use
FROM node:lts-alpine
# where all code for the project will be held
WORKDIR /app/socket-api
# copied the package.json file to the docker container
COPY package*.json ./
# install node packages 
RUN npm install
# copy project to container
COPY . .
# port to expose container to
EXPOSE 3002
# command to run after container ghas started
CMD ['nodemon', '--exec', 'npm', 'start']

