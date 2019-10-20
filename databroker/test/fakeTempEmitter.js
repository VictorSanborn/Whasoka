var DataSender = require('../models/DataSender')
var socket = require('socket.io-client')(process.env.SOCKET_IO_ADRESS)

let dataSender
let myName = process.env.MY_NAME
let appName = process.env.TARGET_APP

let i = 0

//Settings for app
let sendInterval = 5000

const emitter = async (type, value) => {
  dataSender.emitMessage(type, value)
}

let interval = setInterval(function() {
  emitter('value', "{room: 'livingroom', temp: '19.2C', humid: '22%'}")
}, sendInterval)

//clearTimeout(timeOutObj)

// setInterval(function() {
//
// }, sendInterval)

//When connecting data broker resends this apps id.
//If data broaker is restarted the new id is sent automaticly to this app
socket.on('id', myId => {
  console.log(myId)
  dataSender = new DataSender(socket, myName, myId, process.env.MY_KEY, appName)
})

socket.on('settings', msg => {
  let settings = JSON.parse(msg.value)
  clearInterval(interval)
  interval = setInterval(function() {
    emitter('value', `{room: 'livingroom', temp: '19.2C', humid: '${i++}%'}`)
  }, settings.sendInterval)

  console.log(settings.sendInterval)
})
