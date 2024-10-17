const groupRouter = require('express').Router()
const prisma = require('../models/prismaClient')
const logger = require('../utils/logger')


groupRouter.get('/', async (req, res) => {
  const user = req.user

  try {
    // Find all groups the logged-in user is a member of
    const userGroups = await prisma.groups.findMany({
      where: {
        members: {
          some: {
            userId: user.id
          }
        }
      },
      include: {
        members: true, // Optionally include the members of each group
        messages: {
          orderBy: {
            createdAt: 'desc' // Order messages by creation date descending
          },
          take: 1 // Only take the latest message
        }
      }
    })

    // Map through userGroups to format the response
    const formattedGroups = userGroups.map(group => ({
      id: group.id,
      name: group.name,
      members: group.members,
      lastMessage: group.messages.length > 0 ? group.messages[0] : null // Get the last message or null if no messages exist
    }))

    if (!formattedGroups || formattedGroups.length === 0) {
      return res.status(404).json({ error: 'No groups found for this user' })
    }

    res.status(200).json(formattedGroups)
  } catch (e) {
    logger.error(e)
    res.status(500).json({ error: 'An error occurred while fetching the groups.' })
  }
})




groupRouter.post('/', async (req, res) => {
  const { name, creatorId, membersIds } = req.body
  const user = req.user

  // Validation
  if (!membersIds || membersIds.length < 1) {
    return res.status(400).json({ error: 'Group must have at least 1 member' })
  }
  if (!name || name.length < 3) {
    return res.status(400).json({ error: 'Name is less than the minimum length of 3 characters' })
  }
  if (creatorId !== user.id) {
    return res.status(401).json({ error: 'Not Authorized' })
  }

  try {
    // Step 1: Create the group
    const newGroup = await prisma.groups.create({
      data: {
        name,
        creatorId,
      }
    })

    // Step 2: Add members (including the creator as an admin)
    const groupMembers = [
      { userId: creatorId, groupId: newGroup.id, admin: true },
      ...membersIds.map(memberId => ({
        userId: memberId,
        groupId: newGroup.id
      }))
    ]

    // Bulk create the group members
    await prisma.groupMembers.createMany({
      data: groupMembers
    })

    res.status(201).json(newGroup)
  } catch (e) {
    logger.error(e)
    res.status(500).json({ error: 'An error occurred while creating the group.' })
  }
})


groupRouter.post('/addmember', async (req, res) => {
  const { groupId, newMemberId, adminId } = req.body
  const user = req.user

  // Ensure the admin making the request is the logged-in user
  if (adminId !== user.id) {
    return res.status(401).json({ error: 'Not Authorized' })
  }

  try {
    // Step 1: Check if the admin is actually part of the group and is an admin
    const adminMember = await prisma.groupMembers.findFirst({
      where: {
        groupId: groupId,
        userId: adminId,
        admin: true
      }
    })

    if (!adminMember) {
      return res.status(403).json({ error: 'You do not have permission to add members to this group' })
    }

    // Step 2: Check if the new member is already in the group
    const existingMember = await prisma.groupMembers.findFirst({
      where: {
        groupId: groupId,
        userId: newMemberId
      }
    })

    if (existingMember) {
      return res.status(400).json({ error: 'User is already a member of this group' })
    }

    // Step 3: Add the new member to the group
    const newMember = await prisma.groupMembers.create({
      data: {
        groupId: groupId,
        userId: newMemberId
      }
    })

    res.status(201).json(newMember)
  } catch (e) {
    logger.error(e)
    res.status(500).json({ error: 'An error occurred while adding the new member.' })
  }
})

groupRouter.delete('/:groupId', async (req, res) => {
  const { groupId } = req.params
  const user = req.user

  try {
    // Check if the user is the creator or an admin of the group
    const group = await prisma.groups.findUnique({
      where: { id: groupId },
      include: {
        members: true // Include members to check for admin status
      }
    })

    if (!group) {
      return res.status(404).json({ error: 'Group not found' })
    }

    const isAdmin = group.members.some(member => member.userId === user.id && member.admin)
    const isCreator = group.creatorId === user.id

    if (!isAdmin && !isCreator) {
      return res.status(403).json({ error: 'Not authorized to delete this group' })
    }

    // Delete the group members associated with the group
    await prisma.groupMembers.deleteMany({
      where: { groupId: groupId }
    })

    // Optionally, delete all messages associated with the group if needed
    await prisma.messages.deleteMany({
      where: { groupId: groupId }
    })

    // Finally, delete the group itself
    await prisma.groups.delete({
      where: { id: groupId }
    })

    res.status(204).send() // No content to return
  } catch (e) {
    logger.error(e)
    res.status(500).json({ error: 'An error occurred while deleting the group.' })
  }
})


module.exports = groupRouter
