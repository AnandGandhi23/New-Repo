const express = require('express');
const bodyParser = require('body-parser');
const ghraphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');

const graphqlSchema = require('./graphql/schema/index');
const graphqlResolver = require('./graphql/resolver/index');
const isAuth = require('./middleware/is-auth')

mongoose.connect("mongodb://localhost:27017/dbEvent", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
mongoose.connection.on("error", (error) => {
    console.log("error while connecting to databse");
    process.exit(1);
}).once("open", () => console.log('database connected sucessfully'));

const app = express();
app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    if(req.method === 'OPTIONS')
        return res.sendStatus(200); 

    next();
});

app.use(isAuth);

app.use('/graphql', ghraphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true
}));
app.listen(3000, () => console.log('server started'));