const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const app = express();
const cors = require("cors");
app.use(cors());
app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

app.listen(process.env.PORT || 4000, () => {
  console.log(`Application started to listen on ${process.env.PORT || 4000}`);
});
