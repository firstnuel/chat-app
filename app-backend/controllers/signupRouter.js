const signupRouter = require('express').Router()
const prisma = require('../models/prismaClient')
const bcrypt = require('bcrypt')
const logger = require('../utils/logger')


signupRouter.post('/', async (req, res) => {
  const { name, email, username, password } = req.body

  if (!username || username.length < 3 || !password || password.length < 3) return res.status(400).json({
    error: 'username or name is less than minLength of (3)' })

  const saltRounds = 10

  try{
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const newUser = await prisma.users.create({
      data:  {
        name,
        email,
        username,
        passwordHash
      }
    })
    // eslint-disable-next-line no-unused-vars
    const { passwordHash: _, ...rest } = newUser
    res.status(201).json(rest)
  }catch(e){
    logger.error(e)
    res.status(500).json({ error: 'An error occurred while creating the user.' })
  }
})


module.exports = signupRouter