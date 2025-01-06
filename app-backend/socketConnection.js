const { Server } = require('socket.io')
const http = require('http')
const logger = require('./utils/logger')


class Socket {

  constructor(app) {
    this.app = app
    this.server = http.createServer(app)
  }

  connection = () => {
    const io = new Server(this.server, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
      }
    })

    this.app.set('io', io)

    io.on('connection', (socket) => {
      logger.info(`A user connected: ${socket.id}`)

      socket.on('chatMessage', (message) => {
        logger.info(`Received message: ${message}`)
        io.emit('receiveMessage', message)
      })

      socket.on('disconnect', () => {
        logger.info(`User disconnected: ${socket.id}`)
      })
    })

  }
}

module.exports = Socket
