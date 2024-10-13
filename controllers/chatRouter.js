const chatRouter = require('express').Router()
const prisma = require('../models/prismaClient')
const logger = require('../utils/logger')

chatRouter.get('/', async (req, res) => {
  const { senderId, receiverId } = req.query
  const user = req.user

  if (senderId !== user.id) return res.status(401).json({ error: 'Not Authorized' })

  try {
    const messages = await prisma.messages.findMany({
      where: {
        OR: [
          { senderId: senderId, receiverId: receiverId },
          { senderId: receiverId, receiverId: senderId }
        ]
      },
      orderBy: {
        createdAt: 'asc'
      }
    })
    res.json(messages)
  } catch (e) {
    logger.error(e)
    res.status(500).json({ error: 'An error occurred while retrieving messages.' })
  }
})


chatRouter.post('/', async (req, res) => {
  const { receiverId, senderId, content, lastMsgTime } = req.body

  const receiver = await prisma.users.findUnique({
    where: {
      id: receiverId
    }
  })
  const user = req.user

  if (senderId !== user.id) return res.status(401).json({ error: 'Not Authorized' })
  if (!receiver) return res.status(404).json({ error: 'invalid message receiver' })

  try{
    const newMsg = await prisma.messages.create({
      data:{
        content,
        senderId,
        receiverId,
        lastMsgTime
      }
    })
    res.status(201).json(newMsg)
  }catch(e) {
    logger.error(e)
    res.status(500).json({ error: 'An error occurred while sending message.' })
  }
})

// chatRouter.put('/', async (req, res) => {
//     const { content } = req.body

//     const receiver

// })











module.exports = chatRouter