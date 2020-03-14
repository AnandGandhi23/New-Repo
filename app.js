const express = require('express');
const bodyParser = require('body-parser');
const ghraphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');

const graphqlSchema = require('./graphql/schema/index');
const graphqlResolver = require('./graphql/resolver/index');

mongoose.connect("mongodb://localhost:27017/dbEvent", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
mongoose.connection.on("error", (error) => {
    console.log("error while connecting to databse");
    process.exit(1);
}).once("open", () => console.log('database connected sucessfully'));



const app = express();
app.use(bodyParser.json());

const events = [];



app.use('/graphql', ghraphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true
}))

app.use('/graphql1', ghraphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true
}))
app.listen(3000, () => console.log('server started'));