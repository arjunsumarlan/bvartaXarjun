const express = require('express')
const cors = require('cors');
const app = express()
const client = require('./database/mongo');

app.use(cors())

function initializeMongo(req, res, next) {
  client.connect()
    .then(() => {
      const db = client.db('students');

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
    const students = await db.collection('students').find({}).toArray()
    res.send(students)
  } catch (err) {
    res.send(err)
  }
})

app.post('/', async (req, res) => {
  try {
    const db = req.db
    const data = await db.collection('students').insertOne({
      name: req.body.name
    })
    res.send(data)
  } catch (err) {
    res.send(err)
  }

})

app.listen(3001, () => {
  console.log('App listening on port 3001!');
});