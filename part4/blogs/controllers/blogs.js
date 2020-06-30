const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/', (request, response) => {
    Blog.find({})
        .populate('user')
        .then(blogs => response.json(blogs))
})

blogRouter.post('/', async (request, response, next) => {
    const body = request.body
    console.log(request.token)
    if (request.token === undefined)
        return response.status(401).json({error: 'token missing'})
    try {
        jwt.verify(request.token, process.env.SECRET)
    } catch (e) {
        return response.status(401).json({error: 'token invalid'})
    }
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id)
        return response.status(401).json({error: 'token invalid'})
    const user = await User.findById(decodedToken.id)
    if (!user)
        return response.status(401).json({error: 'user not present'})
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    })
    let savedBlog
    await blog.save()
        .then(result => savedBlog = result)
        .catch(error => next(error))
    if (savedBlog) {
        savedBlog.user = user
        user.blogs = user.blogs.concat(savedBlog._id)
        user.save()
            .then(() => response.status(201).json(savedBlog))
            .catch(error => next(error))
    }
})

blogRouter.delete('/:id', async (request, response, next) => {
    const blog = await Blog.findById(request.params.id)
        .populate('user')
        .catch(error => next(error))
    let decodedToken
    try {
        decodedToken = jwt.verify(request.token, process.env.SECRET)
    } catch (err) {
        return response.status(401).json({error: 'malformed token'})
    }
    if (!request.token || !decodedToken.id) {
        return response.status(401).json({error: 'token missing or invalid'})
    }
    if (blog.user.id.toString() === decodedToken.id.toString()) {
        Blog.findByIdAndRemove(request.params.id)
            .catch(error => next(error))
        const user = await User.findById(decodedToken.id)
        user.blogs = user.blogs.filter(blog => request.params.id !== blog.id)
        user.save()
            .then(() => response.status(201))
    } else
        return response.status(403).json({error: 'Forbidden'})
})

blogRouter.put('/:id', async (request, response, next) => {
    const blog = await Blog.findById(request.params.id)
        .populate('user')
        .catch(error => next(error))
    blog.likes = blog.likes + 1
    blog.save()
        .then(updatedBlog => {
            response.json(updatedBlog)
        })
        .catch(error => next(error));
})
module.exports = blogRouter

