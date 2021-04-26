const axios = require('axios');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
} = require('graphql')

// HardCode
const customers = [
    {id: '1', name: 'John Doe', email: 'jonhdoe@gmail.com', age: 35},
    {id: '2', name: 'John Doe2', email: 'jonhdoe2@gmail.com', age: 34},
    {id: '3', name: 'John Doe3', email: 'jonhdoe3@gmail.com', age: 33},
]

// Customer Type
const CustomerType = new GraphQLObjectType({
    name: 'Customer',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        age: { type: GraphQLInt },
    })
})

//Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {

        customer: {
            type: CustomerType,
            args: {
                id:{type: GraphQLString}
            },
            resolve(parentValue, args){
                for(let i=0; i<customers.length; i++){
                    if(customers[i].id == args.id){
                        return customers[i]
                    }
                }
            }
        },

        customers: {
            type: new GraphQLList(CustomerType),
            resolve(parentValue, args){
                return customers
            }
        },

        external_customer: {
            type: CustomerType,
            args: {
                id:{type: GraphQLString}
            },
            resolve(parentValue, args){
                return axios.get('http://localhost:3000/external_customers/' + args.id)
                .then(res => res.data)
            }
        },

        external_customers: {
            type: new GraphQLList(CustomerType),
            resolve(parentValue, args){
                return axios.get('http://localhost:3000/external_customers/')
                .then(res => res.data)
            }
        }
    }

})
module.exports = new GraphQLSchema({
    query: RootQuery
})