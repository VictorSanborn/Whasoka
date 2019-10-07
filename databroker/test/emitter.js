var socket = require('socket.io-client')('http://localhost:4000')

const emitter = async message => {
  socket.emit('message', message)
}

emitter({
  me: '1111',
  myKey: '97fawdfpo2122',
  target: '1234',
  value: "{room: 'livingroom', temp: '19.2C', humid: '22%'}"
})
//process.exit(0)
