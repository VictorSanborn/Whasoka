const { gql } = require('apollo-server')
var moment = require('moment')
const { Pool } = require('pg')
require('dotenv').config({ path: '../.env' })

const pool = new Pool({
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.PORT,
  database: process.env.DATABASE,
  ssl: true
})

const types = `
  type tempHumidApp{
    date: String,
    room: String,
    temp: String,
    humid: String
  }
`

const queries = `
  TempHumidApp_Query(amount: Int!): [tempHumidApp]
`

const mutations = `
  TempHumidApp_Mutation(data: String!): tempHumidApp
`

const queryResolvers = {
  TempHumidApp_Query: async (root, args) => {
    let text = `SELECT * FROM public."TempHumidApp"`
    return QueryDB(text)
  }
}

const mutationResolvers = {
  TempHumidApp_Mutation: async (root, args) => {
    let json = JSON.parse(args.data)

    let date = moment()
      .format('YYYYMMDD HH:mm:ss')
      .toString()
    let room = json.room
    let temp = json.temp
    let humid = json.humid

    let text = `INSERT INTO public."TempHumidApp"(\
      "room",\
      "temp",\
      "humid",\
      "date")\
      VALUES ($1, $2, $3, $4);`

    let values = [room, temp, humid, date]
    return QueryDB(text, values)
  }
}

const QueryDB = async (text, values) => {
  let query = { text: text, values: values }
  let data = []
  await pool
    .query(query)
    .then(res => {
      data = res.rows
    })
    .catch(e => {
      console.log(e.stack)
    })
  return data
}

module.exports = {
  types,
  queries,
  mutations,
  queryResolvers,
  mutationResolvers
}
