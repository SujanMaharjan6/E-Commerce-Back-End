
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const dbName = 'something';
const conxnURL = 'mongodb://localhost:27017';
const OId = mongodb.ObjectID;

module.exports = {
    MongoClient,
    dbName,
    conxnURL,
    OId
}