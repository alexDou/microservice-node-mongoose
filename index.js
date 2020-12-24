const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const httpStatus = require('http-status');
const cors = require('cors');
const expressWinston = require('express-winston');
const helmet = require('helmet');

const userRoutes = require('./users/route');
const commentRoutes = require('./comments/route');
const config = require('./config');
const db = require('./db');

// start DB driver, mongoose in this case
// can be configurable with sort of DATABASE in .env
db();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// send archived response
// zlib (https://nodejs.org/api/zlib.html) can be used
// compression level. default -1, 0 - no compression, 1-9 low to max
app.use(compression());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS with default options
app.use(cors());

// enable logging in dev env
if (config.env === 'development') {
    expressWinston.requestWhitelist.push('body');
    expressWinston.responseWhitelist.push('body');
    app.use(expressWinston.logger({
        winstonInstance: config.logger,
        meta: true, // optional: log meta data about request (defaults to true)
        msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
        colorStatus: true // Color the status code (default green, 3XX cyan, 4XX yellow, 5XX red).
    }));
}

// microservice health check
app.get('/ping', (req, res) =>
    res.send('OK')
);

// let's say our microservice finds itself under user-comments namespace
app.use('/user-comments/users', userRoutes);
app.use('/user-comments/comments', commentRoutes);

// 404 handler
// other error handling routine set aside in this app for simplicity reasons
// extension of the Error object for custom error handling could be a good idea
app.use((req, res) => {
    res.status(httpStatus.NOT_FOUND).send('Route not implemented')
});

app.listen(config.port, () => {
    console.info(`Server is running on http://localhost:${config.port} in (${config.env}) mode`); // eslint-disable-line no-console
});
