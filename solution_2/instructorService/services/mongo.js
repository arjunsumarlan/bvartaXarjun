const { MongoClient } = require('mongodb')
const url = 'mongodb://dbinstructor:27017/instructors'
const client = new MongoClient(url, { useUnifiedTopology: true, useNewUrlParser: true })

module.exports = client

