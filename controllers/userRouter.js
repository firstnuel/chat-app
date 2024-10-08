const userRouter = require('express').Router()
const prisma = require('../models/prismaClient')
const bcrypt = require('bcrypt')


userRouter.get('/', async (req, res) => {
    try{
        const users =  await prisma.users.findMany({
            select: {
                    id: true,
                    name: true,
                    email: true,
                    username: true,
                    createdAt: true,
                }
        })
        res.json(users)
    }catch (e){
        console.error(e);
        res.status(500).json({ error: 'An error occurred while retrieving users.' });
    }
})

userRouter.post('/', async (req, res) => {
    const { name, email, username, password } = req.body

    if (!username || username.length < 3 || !password || password.length < 3) return response.status(400).json({
        error: 'username or name is less than minLength of (3)'})
    
    const saltRounds = 10

    try{
        const passwordHash = await bcrypt.hash(password, saltRounds);
        const newUser = await prisma.users.create({
            data:  {
                name,
                email,
                username,
                passwordHash
            }
        })
        const {passwordHash: _, ...rest} = newUser
        res.status(201).json(rest)
    }catch(e){
        console.error(e);
        res.status(500).json({ error: 'An error occurred while creating the user.' });
    }
})

module.exports = userRouter