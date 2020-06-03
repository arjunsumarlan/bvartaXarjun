# latest official node image
FROM node:latest

# use nodemon for development
RUN npm install -g nodemon

# use cached layer for node modules
RUN rm -rf /usr/src/auth
RUN mkdir -p /usr/src/auth
COPY package.json /usr/src/auth
RUN npm install

# copy project files
WORKDIR /usr/src/auth
COPY . /usr/src/auth

EXPOSE 3003

CMD ["nodemon", "/usr/src/auth/app.js"]
