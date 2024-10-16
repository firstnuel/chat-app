const userRouter = require('express').Router()
const prisma = require('../models/prismaClient')

userRouter.get('/', async (req, res) => {
  try{
    const users =  await prisma.users.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        createdAt: true,
        imageLink: true,
      }
    })
    res.json(users)
  }catch (e){
    console.error(e)
    res.status(500).json({ error: 'An error occurred while retrieving users.' })
  }
})

userRouter.get('/chats', async (req, res) => {
  const { userId } = req.query
  const user = req.user

  if (!userId || userId !== user.id) {
    return res.status(401).json({ error: 'Not Authorized' })
  }

  try {
    const usersChattedWith = await prisma.users.findMany({
      where: {
        OR: [
          {
            sentMessages: {
              some: {
                receiverId: userId,
              },
            },
          },
          {
            receivedMessages: {
              some: {
                senderId: userId,
              },
            },
          },
        ],
        NOT: { id: userId },
      },
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        createdAt: true,
        imageLink: true,
        sentMessages: {
          take: 1,
          orderBy: {
            createdAt: 'desc',
          },
          where: {
            receiverId: userId,
          },
          select: {
            content: true,
            createdAt: true,
            senderId: true,
            receiverId: true,
          },
        },
        receivedMessages: {
          take: 1,
          orderBy: {
            createdAt: 'desc',
          },
          where: {
            senderId: userId,
          },
          select: {
            content: true,
            createdAt: true,
            senderId: true,
            receiverId: true,
          },
        },
      },
    })
    res.json(usersChattedWith)

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'An error occurred while retrieving users.' })
  }
})



module.exports = userRouter