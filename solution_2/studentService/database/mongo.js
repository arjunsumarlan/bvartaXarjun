const { MongoClient } = require('mongodb')
const url = 'mongodb://dbstudent:27017/students'
const client = new MongoClient(url, { useUnifiedTopology: true, useNewUrlParser: true })

module.exports = client