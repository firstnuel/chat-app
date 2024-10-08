const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const userRouter = require('./controllers/userRouter')
const loginRouter = require('./controllers/loginRouter')
const chatRouter = require('./controllers/chatRouter')
const middleware = require('./utils/middleware')

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/chat', middleware.userExtractor, chatRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app