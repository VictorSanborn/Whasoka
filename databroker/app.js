require('dotenv').config({ path: '.env' })
var app = require('express')()
var http = require('http').createServer(app)
var io = require('socket.io')(http)
var axios = require('axios')

//TODO - ADD CONFICURATION JSON FILE
const port = process.env.SOCKET_IO_PORT
const myKey = process.env.MY_KEY

const axiosGraphQL = axios.create({
  baseURL: 'http://localhost:9001/'
})

let idArray = []

io.on('connection', function(socket) {
  console.log(socket.id)
  socket.emit('id', socket.id)

  socket.on('value', msg => {
    console.log(socket.id)

    if (correctAuth(JSON.parse(msg).myKey))
      handleValue(JSON.parse(msg).target, JSON.parse(msg).value)
    else console.log(`incorrect auth:`, msg) //TODO - ADD TO LOGGING!
  })

  socket.on('timesettings', msg => {
    if (correctAuth(msg.myKey)) handleTimeSettings(msg)
  })
})

const correctAuth = key => {
  return myKey == key
}

const handleValue = async (target, data) => {
  console.log(target, data)
  //send data to GraphQL to be stored in DB

  //  console.log(GraphQLQuery(target, data))
  axiosGraphQL.post('http://localhost:9001/', {
    query: GraphQLQuery(target, data)
  })
}

const handleTimeSettings = data => {
  //Send data to correct unit based on socket ID
  let targetId = JSON.parse(data.value).socketID
  io.to(targetId).emit('timesettings', JSON.parse(data.value).sendInterval)
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
