const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require("../models/user");
const api = supertest(app)
const baseUri = '/api/blogs';
let token
const testBlogs = [
    {
        title: 'React is nice',
        author: 'xuxe',
        url: 'xuxe.com',
        likes: 39
    },
    {
        title: 'Node is nice too',
        author: 'xuxe',
        url: 'xuxe.com',
        likes: 69
    }
]
const loginUser = {
    username: 'Test User 21',
    name: 'elon690',
    password: 'fourtwenty'
}
const getToken = async () => {
    await User.deleteMany({})
    await api.post('/api/users')
        .send(loginUser)
    const jwt = await api.post('/api/login')
        .send({username: loginUser.username, password: loginUser.password})
    console.log('jwt token -------------> ' + jwt.body.token)
    return jwt.body.token
}
const getId = async () => {
    const users = await User.find({})
    const user = users[0].toJSON()
    console.log('User', user)
    return user.id
}
beforeEach(async () => {
    await Blog.deleteMany({})
    token = await getToken()
    const id = await getId()
    testBlogs.map(blog => blog.user = id)
    console.info('Test Blogs', testBlogs)
    testBlogs.map(blog => new Blog(blog))
        .map(blog => blog.save())
    await Promise.all(testBlogs);
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('correct number of blogs are returned', async () => {
    const res = await api.get(baseUri)
    expect(res.body).toHaveLength(2);
})

test('unique field is id', async () => {
    const res = await api.get(baseUri)
    expect(res.body[0].id).toBeDefined();
})

test('valid blog can be added', async () => {
    const firstRes = await api.get(baseUri)
    const length = Number(firstRes.body.length) + 1
    await api.post(baseUri)
        .set('authorization', token)
        .send({
            title: 'Test blog',
            author: 'xuxeyyy',
            url: 'xuxe.lol',
            likes: 420
        })
    const res = await api.get(baseUri)
    expect(res.body).toHaveLength(length)
})
test('blog can be removed by id', async () => {
    const firstRes = await api.get(baseUri)
    const length = Number(firstRes.body.length) - 1
    const id = firstRes.body[0].id
    console.log('id', id)
    await api.delete(baseUri + '/' + id)
        .set('authorization', token)
    const res = await api.get(baseUri)
    expect(res.body).toHaveLength(length)
})
test('blog can be updated by id', async () => {
    const firstRes = await api.get(baseUri)
    const id = firstRes.body[0].id
    const res = await api.put(baseUri + '/' + id)
        .send({
            title: 'Test blog for updating',
            author: 'xuxeyyy',
            url: 'xuxe.lol',
            likes: 420
        })
        .set('authorization', token)
    expect(res.body.title).toStrictEqual('Test blog for updating')
})
test('missing likes defaults to zero', async () => {
    const res = await api.post(baseUri)
        .set('Authorization', token)
        .send({
            title: 'Test blog',
            author: 'xuxeyyy',
            url: 'xuxe.lol',
        })
    expect(res.body.likes).toStrictEqual(0);
})

test('blog without title or url is not added', async () => {
    const firstRes = await api.get(baseUri)
    const length = firstRes.body.length
    const newBlog = {
        author: 'xoooox',
        likes: 10
    }
    await api
        .post(baseUri)
        .set('authorization', token)
        .send(newBlog)
        .expect(400)
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(length)
})


afterAll(() => {
    mongoose.connection.close()
})
