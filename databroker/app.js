var app = require('express')()
var http = require('http').createServer(app)
var io = require('socket.io')(http)

//TODO - ADD CONFICURATION JSON FILE
const port = 4000
const myKey = '97fawdfpo2122'

//
// Data Structure
//
/*
    {
        me: [id], //Id of sender
        myKey: [guid], //Key allowing messages to be processed
        target: [id], //target application
        value: [json] //any stucture needed for the app
    }
*/

io.on('connection', function(socket) {
  socket.on('message', msg => {
    if (correctAuth(msg.myKey)) handleData(msg)
    else console.log(`incorrect auth:`, msg) //TODO - ADD TO LOGGING!
  })
})

const correctAuth = key => {
  return myKey === key
}
const handleData = data => {
  console.log(data)
  //TO BE IMPLEMENTED
}

http.listen(port, function() {
  console.log('listening on *:' + port)
})
