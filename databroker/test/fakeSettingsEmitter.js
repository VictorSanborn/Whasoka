var DataSender = require('../models/DataSender')
require('dotenv').config({ path: '../.env' })
var socket = require('socket.io-client')(process.env.SOCKET_IO_ADRESS)

let dataSender
let myName = 'test' //process.env.MY_NAME
let appName = process.env.TARGET_APP
let targetID = '4j7gEzfK6UY8DkBMAAAG'

const emitter = async (type, value) => {
  dataSender.emitMessage(type, value)
}

let test = setInterval(function() {
  emitter('settings', `{ "socketID": "${targetID}", "sendInterval": 1000 }`)
}, 1000)

//When connecting data broker resends this apps id.
//If data broaker is restarted the new id is sent automaticly to this app
socket.on('id', myId => {
  console.log(myId)
  dataSender = new DataSender(socket, myName, myId, process.env.MY_KEY, appName)
})
