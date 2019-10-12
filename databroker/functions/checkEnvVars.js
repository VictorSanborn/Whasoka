const dotenv = require('dotenv').config({ path: '../.env' })

console.log(dotenv.parsed)
exports.isEnvConfigCorrect = () => {
  let envIncorrect = false

  if (!process.env.SOCKET_IO_PORT) {
    console.log('ERR - SOCKET_IO_PORT is not set correctly')
  }
}
