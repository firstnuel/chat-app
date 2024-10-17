const userRouter = require('express').Router()
const prisma = require('../models/prismaClient')
const logger = require('../utils/logger')
const uploadImage = require('../models/cloudinary')

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
    logger.error(e)
    res.status(500).json({ error: 'An error occurred while retrieving users.' })
  }
})


userRouter.put('/:userId', async (req, res) => {
  const { userId } = req.params
  const { name, imagePath } = req.body
  const user = req.user
  let ImageUrl

  try {
    // Check if the user is authorized to update their own profile
    if (user.id !== userId) {
      return res.status(403).json({ error: 'Not authorized to update this user' })
    }

    // Ensure that at least one field (name or imagePath) is provided
    if (!name && !imagePath) {
      return res.status(400).json({ error: 'At least one of name or imagePath is required' })
    }

    // Handle image upload if imagePath is provided
    if (imagePath) {
      try {
        ImageUrl = await uploadImage(imagePath)
      } catch (error) {
        logger.error('Error uploading image:', error.message)
        return res.status(500).json({ error: 'Error uploading image' })
      }
    }

    // Prepare updated data, ensuring fields are only set if they have values
    const updatedData = {
      ...(name && { name }), // Only include name if provided
      ...(ImageUrl && { imageLink: ImageUrl }), // Only include imageLink if ImageUrl is defined
    }

    // Update the user data in the database
    const updatedUser = await prisma.users.update({
      where: { id: userId },
      data: updatedData,
      select: {
        id: true,
        name: true,
        imageLink: true,
      },
    })

    // Respond with the updated user data
    res.status(200).json(updatedUser)
  } catch (e) {
    logger.error(e)
    res.status(500).json({ error: 'An error occurred while updating user data.' })
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
    logger.error(error)
    res.status(500).json({ error: 'An error occurred while retrieving users.' })
  }
})



module.exports = userRouter