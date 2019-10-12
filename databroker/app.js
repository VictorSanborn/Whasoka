require('dotenv').config({ path: '.env' })
var app = require('express')()
var http = require('http').createServer(app)
var io = require('socket.io')(http)

//TODO - ADD CONFICURATION JSON FILE
const port = process.env.SOCKET_IO_PORT
const myKey = process.env.MY_KEY

let idArray = []

io.on('connection', function(socket) {
  socket.emit('id', socket.id)

  socket.on('value', msg => {
    console.log(socket.id)
    if (correctAuth(msg.myKey)) handleValue(msg)
    else console.log(`incorrect auth:`, msg) //TODO - ADD TO LOGGING!
  })

  socket.on('settings', msg => {
    if (correctAuth(msg.myKey)) handleSettings(msg)
  })
})

const correctAuth = key => {
  return myKey === key
}

const handleValue = data => {
  console.log(data)
  //TO BE IMPLEMENTED
}

const handleSettings = data => {
  let targetId = JSON.parse(data.value).socketID
  io.to(targetId).emit('settings', data)
  //TO BE IMPLEMENTED
}

http.listen(port, function() {
  console.log('listening on *:' + port)
})
