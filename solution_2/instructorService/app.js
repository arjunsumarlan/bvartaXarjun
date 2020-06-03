const express = require('express');
const cors = require('cors');
const app = express()
const client = require('./services/mongo');

app.use(cors())

function initializeMongo(req, res, next) {
  client.connect()
    .then(() => {
      const db = client.db('instructors');

      req.db = db;
      next()
    })
    .catch(err => {
      res.send(err)
    })
}

app.use(initializeMongo)

app.use(express.json())

app.get('/', async (req, res) => {
  try {

    const db = req.db
    const instructors = await db.collection('instructors').find({}).toArray()
    res.send(instructors)

  } catch (err) {
    res.send(err)
  }
})

app.post('/', async (req, res) => {
  try {

    const db = req.db
    const data = await db.collection('instructors').insertOne({
      name: req.body.name
    })
    res.send(data)

  } catch (err) {
    res.send(err)
  }

})

app.listen(3002, () => {
  console.log('App listening on port 3002!');
});