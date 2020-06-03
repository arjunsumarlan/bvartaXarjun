const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

const config = require('./config');

const initAuth = require('./controllers/auth');

const port = 3003;
mongoose.connect(config.database);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));

initAuth(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}!`)
})
