const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')
const Socket = require('./socketConnection')

const socket = new Socket(app)

socket.connection()

socket.server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
