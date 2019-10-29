var DataSender = require('../models/DataSender')
require('dotenv').config({ path: '../.env' })
var socket = require('socket.io-client')(process.env.SOCKET_IO_ADRESS)

let dataSender
let myName = 'test' //process.env.MY_NAME
let appName = process.env.TARGET_APP
let targetID = 'iqpBnifMgOk3Xca9AAAL'

const emitter = async (type, value) => {
  dataSender.emitMessage(type, value)
}

//When connecting data broker resends this apps id.
//If data broaker is restarted the new id is sent automaticly to this app
socket.on('id', myId => {
  console.log(myId)
  dataSender = new DataSender(socket, myName, myId, process.env.MY_KEY, appName)
  emitter('timesettings', `{ "socketID": "${targetID}", "sendInterval": 1000 }`)
})
