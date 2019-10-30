require('dotenv').config({ path: '.env' })
var app = require('express')()
var http = require('http').createServer(app)
var io = require('socket.io')(http)
var axios = require('axios')

//TODO - ADD CONFICURATION JSON FILE
const port = process.env.SOCKET_IO_PORT
const myKey = process.env.MY_KEY

const axiosGraphQL = axios.create({
  baseURL: process.env.GRAPHQL_ADRESS
})

let idArray = []

io.on('connection', function(socket) {
  //On connection resend unit id to the specific unit (handshake;is)
  console.log(`Connection -- unit id: ${socket.id}`)
  io.to(socket.id).emit('id', socket.id)

  socket.on('value', msg => {
    console.log(socket.id)

    if (correctAuth(JSON.parse(msg).myKey)) {
      //Store value
      handleValue(JSON.parse(msg).target, JSON.parse(msg).value)
      //Brodcast value to all apps connected to the server
      //Then the apps can sort what they are interested of
      socket.emit('event', msg)
    } else console.log(`incorrect auth:`, msg) //TODO - ADD TO LOGGING!
  })

  socket.on('settings', msg => {
    if (correctAuth(msg.myKey)) handleSettings(msg)
  })
})

const correctAuth = key => {
  return myKey == key
}

const handleValue = async (target, data) => {
  console.log(target, data)
  //send data to GraphQL to be stored in DB
  axiosGraphQL.post('', {
    query: GraphQLQuery(target, data)
  })
}

const handleSettings = data => {
  //Send data to correct unit based on socket ID
  let targetId = JSON.parse(data.value).socketID
  io.to(targetId).emit('settings', data.value)
  console.log(JSON.parse(data.value).sendInterval)
}

const GraphQLQuery = (target, data) => {
  console.log(data)
  // let d = JSON.parse(data)
  switch (target) {
    case 'TempHumidApp':
      return `mutation{TempHumidApp_Mutation(data:"{\\"room\\": \\"${data.room}\\", \\"temp\\": \\"${data.temp}\\", \\"humid\\": \\"${data.humid}\\" }"){temp}}
      `
    default:
      console.log('No app found:', target)
  }
}

http.listen(port, function() {
  console.log('listening on *:' + port)
})
