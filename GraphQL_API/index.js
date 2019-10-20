const { ApolloServer, gql } = require('apollo-server')
require('dotenv').config({ path: '.env' })

// https://www.youtube.com/watch?v=4XmQi80nFes
const mainSearch = require('./Schema/TempHumidityApp')

const types = []
const queries = []
const mutations = []
const queryResolvers = []
const mutationResolvers = []

const schemas = [mainSearch]

schemas.forEach(s => {
  types.push(s.types)
  queries.push(s.queries)
  mutations.push(s.mutations)

  // Extract name and add to array, then extract function and add to array space
  let queryLength = 0
  try {
    queryLength = Object.keys(s.queryResolvers).length
  } catch (e) {
    console.log(e)
  }
  for (let i = 0; i < queryLength; i++) {
    let queryResolversKeyName = Object.keys(s.queryResolvers)[i]
    queryResolvers[queryResolversKeyName] =
      s.queryResolvers[queryResolversKeyName]
  }

  let mutationLength = 0
  try {
    mutationLength = Object.keys(s.mutationResolvers).length
  } catch (e) {
    console.log(e)
  }
  for (let i = 0; i < mutationLength; i++) {
    let mutationResolversKeyName = Object.keys(s.mutationResolvers)[i]
    mutationResolvers[mutationResolversKeyName] =
      s.mutationResolvers[mutationResolversKeyName]
  }
})

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  ${types.join('\n')}

  # "Query" is geting data
  type Query { ${queries.join('\n')} }
  
  # "Mutation" is changing or adding data
  type Mutation { ${mutations.join('\n')} }
`

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.

const resolvers = {
  Query: queryResolvers,
  Mutation: mutationResolvers
}

const server = new ApolloServer({ typeDefs, resolvers })
server.listen({ port: 9001 }).then(({ url }) => {
  // MongoClient.connect(mongoDB, (err, client) => {
  //   if (err) return console.log(err)
  //   db = client.db('Penny_Users')
  // })
  console.log(`🚀  Server ready at ${url}`)
})
