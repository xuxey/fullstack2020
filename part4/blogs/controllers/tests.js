const User = require('../models/user')
const Blog = require('../models/blog')
const testRouter = require('express').Router()

testRouter.post('/reset', async (req, res) => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    res.status(204).end()
})

module.exports = testRouter
