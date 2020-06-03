# latest official node image
FROM node:latest

# use nodemon for development
RUN npm install -g nodemon

# use cached layer for node modules
RUN rm -rf /usr/src/student_service
RUN mkdir -p /usr/src/student_service
COPY package.json /usr/src/student_service
RUN npm install

# add project files
WORKDIR /usr/src/student_service
COPY . /usr/src/student_service

EXPOSE 3001

CMD ["nodemon", "/usr/src/student_service/app.js"]
