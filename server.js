const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema.js')

const app = express();

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}))

app.listen(4000)



// localhost:4000/graphql

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

// ADDS 1 CUSTOMER
//  mutation{
//      addCustomer(name: "Will Smith 4", email: "willsmith4@gmail.com", age: 50){
//         id,
//         name,
//         age
//       }
//  }

// DELETES 1 CUSTOMER
// mutation{
//     deleteCustomer(id: "3"){
//       id,
//       name,
//       age
//     }
// }

// EDITS 1 CUSTOMER
//  mutation{
//      editCustomer(id: "2", age: 72){
//          id,
//          name,
//          age
//      }
//  }