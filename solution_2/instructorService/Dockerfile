# latest official node image
FROM node:latest

# use nodemon for development
RUN npm install -g nodemon

# use cached layer for node modules
RUN rm -rf /usr/src/instructor_service
RUN mkdir -p /usr/src/instructor_service
COPY package.json /usr/src/instructor_service
RUN npm install

# copy project files
WORKDIR /usr/src/instructor_service
COPY . /usr/src/instructor_service

EXPOSE 3002

CMD ["nodemon", "/usr/src/instructor_service/app.js"]
