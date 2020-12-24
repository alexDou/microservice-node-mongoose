const mongoose = require('mongoose');
const util = require('util');

// config should be imported before importing any other file
const config = require('../config');

const initMongo = () => {
    // connect to mongo db
    const mongoUri = config.mongo.host;
    mongoose.connect(mongoUri, {
        keepAlive: 1,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }). then(() => {
        console.log(`Mongoose connected on ${config.mongo.host}:${config.mongo.port}`);
    });
    mongoose.connection.on('error', () => {
        throw new Error(`unable to connect to database: ${mongoUri}`);
    });

    // print mongoose logs in dev env
    if (config.mongooseDebug) {
        mongoose.set('debug', (collectionName, method, query, doc) => {
            console.log(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
        });
    }
}

module.exports = initMongo;
