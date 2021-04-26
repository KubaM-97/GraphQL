const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema.js')

const app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}))

app.listen(4000)

//localhost:4000/graphql

// RETURNS ONLY 1 CUSTOMER
// {
//     customer(id:"2"){
//       name
//     }
// }

// RETURNS EVERY 3 CUSTOMERS
// {
//     customers{
//       name
//     }
// }

// RETURNS ONLY 1 EXTERNAL CUSTOMER
// {
//     external_customer(id:"1"){
//       name
//     }
// }

// RETURNS EVERY 3 EXTERNAL CUSTOMERS
// {
//     external_customers{
//       name
//     }
// }