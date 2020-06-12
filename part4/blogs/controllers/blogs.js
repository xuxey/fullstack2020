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
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
        return response.status(401).json({error: 'token missing or invalid'})
    }
    const user = await User.findById(decodedToken.id)
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    })
    let savedBlog
    blog.save()
        .then(result => {
            console.log('result -> ', result)
            savedBlog = result
            response.status(201).json(result)
        })
        .catch(error => next(error))
    if (savedBlog) {
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
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
        return response.status(401).json({error: 'token missing or invalid'})
    }
    console.info('Blog', blog)
    console.log('blog: ' + blog.user.id.toString() + ' ------ token id: ' + decodedToken.id.toString())
    if (blog.user.id.toString() === decodedToken.id.toString())
        Blog.findByIdAndRemove(request.params.id)
            .then(result => response.status(201).json(result).end())
            .catch(error => next(error))
    return response.status(403).json({error: 'Forbidden'})
})

blogRouter.put('/:id', (request, response, next) => {
    const blog = {
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes
    }
    Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
        .then(updatedBlog => response.json(updatedBlog))
        .catch(error => next(error));
})
module.exports = blogRouter

