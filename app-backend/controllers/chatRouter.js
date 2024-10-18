const chatRouter = require('express').Router()
const prisma = require('../models/prismaClient')
const logger = require('../utils/logger')

// Assuming you have Socket.IO initialized and available


chatRouter.get('/', async (req, res) => {
  const { senderId, receiverId } = req.query
  const user = req.user

  if (senderId !== user.id) {
    return res.status(401).json({ error: 'Not Authorized' })
  }

  try {
    const messages = await prisma.messages.findMany({
      where: {
        OR: [
          { senderId: senderId, receiverId: receiverId, groupId: null },
          { senderId: receiverId, receiverId: senderId, groupId: null }
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

chatRouter.get('/group', async (req, res) => {
  const { senderId, groupId } = req.query
  const user = req.user

  if (senderId !== user.id) return res.status(401).json({ error: 'Not Authorized' })

  try {
    const messages = await prisma.messages.findMany({
      where: {
        groupId: groupId,
      },
      orderBy: {
        createdAt: 'asc'
      }
    })
    res.json(messages)
  } catch (e) {
    logger.error(e)
    res.status(500).json({ error: 'An error occurred while retrieving group messages.' })
  }
})

// POST route for direct messages
chatRouter.post('/', async (req, res) => {
  const { receiverId, senderId, content, lastMsgTime } = req.body
  const io = req.app.get('io')

  const receiver = await prisma.users.findUnique({
    where: {
      id: receiverId
    }
  })
  const user = req.user

  if (senderId !== user.id) return res.status(401).json({ error: 'Not Authorized' })
  if (!receiver) return res.status(404).json({ error: 'invalid message receiver' })

  try {
    const newMsg = await prisma.messages.create({
      data: {
        content,
        senderId,
        receiverId,
        lastMsgTime
      }
    })

    // Emit the new message to all clients via Socket.IO after it's saved
    io.emit('receiveMessage', newMsg)

    res.status(201).json(newMsg)
  } catch (e) {
    logger.error(e)
    res.status(500).json({ error: 'An error occurred while sending message.' })
  }
})

// POST route for group messages
chatRouter.post('/group', async (req, res) => {
  const { groupId, senderId, content, lastMsgTime } = req.body
  const io = req.app.get('io')
  const user = req.user

  const group = await prisma.groups.findUnique({
    where: { id: groupId }
  })

  if (!group) {
    return res.status(404).json({ error: 'Group not found' })
  }

  if (senderId !== user.id) {
    return res.status(401).json({ error: 'Not authorized' })
  }

  const isGroupMember = await prisma.groupMembers.findFirst({
    where: {
      groupId: groupId,
      userId: senderId
    }
  })

  if (!isGroupMember) {
    return res.status(403).json({ error: 'User is not a member of the group' })
  }

  try {
    const newMsg = await prisma.messages.create({
      data: {
        content,
        senderId,
        groupId,
        lastMsgTime
      }
    })

    // Emit the new group message to all clients via Socket.IO
    io.emit('receiveMessage', newMsg)

    res.status(201).json(newMsg)
  } catch (e) {
    logger.error(e)
    res.status(500).json({ error: 'An error occurred while sending the message.' })
  }
})

module.exports = chatRouter
