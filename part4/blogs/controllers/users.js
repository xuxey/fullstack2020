const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const jwt = require("jsonwebtoken");

usersRouter.post('/', async (request, response, next) => {
    const body = request.body
    const saltRounds = 10
    if (body.password.length < 3)
        response.status(400).send({error: 'password is too short'}).end()
    const passwordHash = await bcrypt.hash(body.password, saltRounds)
    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })
    const savedUser = await user.save()
        .catch(error => next(error))
    response.json(savedUser).end()
})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users.map(user => user.toJSON())).end();
})

usersRouter.delete('/:id', async (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
        return response.status(401).json({error: 'token missing or invalid'}).end()
    }
    const userToBeDeleted = await User.findById(request.params.id)
    // console.log('decoded Token Id: ',decodedToken.id,'\nuser Id', userToBeDeleted.id)
    if (decodedToken.id !== userToBeDeleted.id)
        return response.status(401).json({error: 'Unauthorized'}).end()
    await User.findByIdAndRemove(userToBeDeleted.id)
        .then(result => response.status(201).json(result).end())
})
module.exports = usersRouter
