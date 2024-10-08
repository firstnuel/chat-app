const express = require('express')
const app = express()
const userRouter = require('./controllers/userRouter')
const loginRouter = require('./controllers/loginRouter')

app.use(express.json())

app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)


module.exports = app