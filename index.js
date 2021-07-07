const express = require('express');
const helmet = require('helmet');
const app = express();

const { config } = require('./config/index');

const authApi = require('./routes/auth');
const productsApi = require('./routes/products.js');

const { logErrors, wrapErrors, errorHandler } = require('./utils/middleware/errorHandlers.js');

const notFoundHandler = require('./utils/middleware/notFoundHandler');

// body parser
app.use(express.json());
app.use(helmet());

// Basic strategy
require('./utils/auth/strategies/basic');

// JWT strategy
require('./utils/auth/strategies/jwt');

// routes
authApi(app);
productsApi(app);

// Catch 404
app.use(notFoundHandler);

// Errors middleware
app.use(logErrors, wrapErrors, errorHandler);

app.listen(config.port, function () {
  console.log(`Listening http://localhost:${config.port}`);
});
