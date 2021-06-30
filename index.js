const mongoose = require("mongoose");
const express = require("express");
const helmet = require("helmet");
const { db_url, port, ttl, key } = require("./config");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const wordRoutes = require("./src/routes/wordRoutes");
const  { ApolloServer, gql }  = require("apollo-server-express");
const typeDefs = require("./src/typeDefs")
const resolvers = require("./src/resolver")

// Database connectivity
class Database {
  constructor() {
    this._connect();
  }
  _connect() {
    mongoose
      .connect(db_url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Database connection successfully");
      })
      .catch((err) => {
        console.error({ err });
      });
  }
}
module.exports = new Database();

const server = new ApolloServer({
  typeDefs,
  resolvers
});


// MIDDLEWARE
app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
server.applyMiddleware({ app });

// ROUTES
app.use("/v1", wordRoutes);

// app.use(
//   "/graphql",
//   graphqlHTTP({ schema, schema, rootValue: root, graphiql: true })
// );
app.listen(port, () => {
  console.log(`App is listening at port ${port}!`);
});
