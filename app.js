const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const userRouter = require('./controllers/userRouter')
const loginRouter = require('./controllers/loginRouter')
const chatRouter = require('./controllers/chatRouter')
const signupRouter = require('./controllers/signupRouter')
const groupRouter = require('./controllers/groupRouter')
const middleware = require('./utils/middleware')

app.use(cors())
app.use(express.json({ limit: '10mb' }))
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/chat', middleware.userExtractor, chatRouter)
app.use('/api/users', middleware.userExtractor, userRouter)
app.use('/api/groups', middleware.userExtractor, groupRouter)
app.use('/api/signup', signupRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app