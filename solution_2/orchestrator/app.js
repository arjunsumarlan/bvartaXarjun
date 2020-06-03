const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');

const initAuth = require('./controllers/auth');
const initStudent = require('./controllers/students');
const initInstructor = require('./controllers/instructors');

const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));

initAuth(app);
initStudent(app);
initInstructor(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}!`)
})
