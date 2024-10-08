const loginRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const prisma = require('../models/prismaClient')
const bcrypt = require('bcrypt')


loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body

  const user = await prisma.users.findUnique({
    where: {
      username: username
    }
  })
  const passwordCorrect = !user ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user.id
  }

  const token = jwt.sign(userForToken, process.env.ACCESS_TOKEN_SECRET)
  res.status(200)
    .send({ token, username: user.username, name: user.name, id : user.id })

})

module.exports = loginRouter