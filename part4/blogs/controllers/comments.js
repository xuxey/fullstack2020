const commentRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')
const jwt = require('jsonwebtoken')

commentRouter.get('/:blogId', async (request, response, next) => {
    const comments = await Comment.find({blogId: request.params.blogId})
        .populate('user')
    console.log('comments', comments)
    await response.status(201).json(comments)
})

commentRouter.post('/:blogId', async (request, response, next) => {
    if (request.token === undefined)
        return response.status(401).json({error: 'token missing'})
    try {
        jwt.verify(request.token, process.env.SECRET)
    } catch (e) {
        return response.status(401).json({error: 'token invalid', token: request.token})
    }
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id)
        return response.status(401).json({error: 'token invalid'})
    const user = await User.findById(decodedToken.id)
    if (!user)
        return response.status(401).json({error: 'user not present'})
    const comment = new Comment({
        content: request.body.content,
        user: user.id,
        blogId: request.params.blogId
    })
    const blog = await Blog.findById(request.params.blogId)
        .catch(error => next(error))
    const savedComment = await comment.save()
    const responseComment = await Comment.findById(savedComment.id)
        .populate('user')
        .exec()
    blog.comments = blog.comments.concat(savedComment.id)
    await Blog.findByIdAndUpdate(request.params.blogId, blog)
    await response.status(201).json(responseComment)
})

commentRouter.delete('/:id', async (request, response, next) => {
    if (request.token === undefined)
        return response.status(401).json({error: 'token missing'})
    try {
        jwt.verify(request.token, process.env.SECRET)
    } catch (e) {
        return response.status(401).json({error: 'token invalid', token: request.token})
    }
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id)
        return response.status(401).json({error: 'token invalid'})
    const user = await User.findById(decodedToken.id)
    if (!user)
        return response.status(401).json({error: 'user not present'})
    const comment = await Comment.findById(request.params.id)
        .populate('user')
    if (comment.user.id !== user.id)
        await response.status(403).json({status: "Forbidden"})
    else {
        const blog = await Blog.findById(request.params.blogId)
            .catch(error => next(error))
        blog.comments = blog.comments.filter(c => c.id !== comment.id)
        await Blog.findByIdAndUpdate(request.params.blogId, blog)
        Comment.findByIdAndDelete(request.params.id)
            .then(() => response.status(201).json({status: "success"}))
    }
})
module.exports = commentRouter
