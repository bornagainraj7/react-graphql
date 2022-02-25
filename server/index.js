const express = require('express');
const logger = require('tracer').colorConsole();
const http = require('http');
const mongoose = require('mongoose');
const graphqlExpress = require('express-graphql');
const bookSchema = require('./schema/schema');
const DB_NAME = 'GraphQLDB';
const MONGODB_URI = `mongodb://127.0.0.1:27017/${DB_NAME}`;

const app = express();
const port = 4000;

// Set Headers for CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, authToken, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});

console.log(typeof graphqlExpress);

app.use('/graphql', graphqlExpress.graphqlHTTP({
  schema: bookSchema,
  graphiql: true,
}));


app.set('port', port);
const server = http.createServer(app);
server.on('error', (error) => {
  logger.error(error);
});
server.on('listening', () => {
  logger.info('Graph QL server listening on port '+ port);
  mongoose.connect(MONGODB_URI, {
    // useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info(`Connected with Database ${DB_NAME}`);
  })
  .catch((error) => logger.error(error));
});
server.listen(port);
