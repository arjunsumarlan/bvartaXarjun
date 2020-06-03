# latest official node image
FROM node:latest

# use nodemon for development
RUN npm install -g nodemon

# use cached layer for node modules
RUN rm -rf /usr/src/orchestrator
RUN mkdir -p /usr/src/orchestrator
COPY package.json /usr/src/orchestrator
RUN npm install

# copy project files
WORKDIR /usr/src/orchestrator
COPY . /usr/src/orchestrator

EXPOSE 8080

CMD ["nodemon", "/usr/src/orchestrator/app.js"]
