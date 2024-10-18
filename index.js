const http = require('http') // Import http to create a server
const app = require('./app') // Your existing Express app
const config = require('./utils/config')
const logger = require('./utils/logger')


// Create an HTTP server by passing in your Express app
const server = http.createServer(app)

// Import and initialize Socket.IO, attach it to the HTTP server
const { Server } = require('socket.io')
const io = new Server(server, {
  cors: {
    origin: '*', // Allow all origins (adjust this for production)
    methods: ['GET', 'POST']
  }
})

// Make Socket.IO available in other files (e.g., chatRouter)
app.set('io', io)

// Define WebSocket event handlers
io.on('connection', (socket) => {
  logger.info(`A user connected: ${socket.id}`)

  // Listen for chat messages
  socket.on('chatMessage', (message) => {
    logger.info(`Received message: ${message}`)
    // Broadcast the message to all connected clients
    io.emit('receiveMessage', message)
  })

  // Handle user disconnection
  socket.on('disconnect', () => {
    logger.info(`User disconnected: ${socket.id}`)
  })
})

// Start the server and log the running port
server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
