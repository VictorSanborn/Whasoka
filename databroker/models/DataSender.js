class DataSender {
  constructor(socket, me, myId, myKey, target) {
    this.socket = socket //An Socket.IO-client connection
    this.me = me
    this.myId = myId
    this.myKey = myKey
    this.target = target
  }

  async emitMessage(type, value) {
    this.socket.emit(type, {
      me: this.me,
      myKey: this.myKey,
      myId: this.myId,
      target: this.target,
      value
    })
  }
}
module.exports = DataSender
