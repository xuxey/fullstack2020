const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const bcrypt = require("bcrypt");
const api = supertest(app)
const baseUri = '/api/users';
let token = '';
const testUsers = [
    {
        username: 'Test User 1',
        name: 'elon69',
        password: 'fourtwenty'
    },
    {
        username: 'Test User 2',
        name: 'elon lol',
        password: 'sixtynine'
    }
]

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}
beforeAll(async () => {
    const users = await usersInDb()
    const user = users.find(u => u.username === testUsers[0].username);
    console.log('Test User: ', user)
    if (!user) {
        const passwordHash = await bcrypt.hash(testUsers[0].password, 10)
        const user = new User({
            username: testUsers[0].username,
            name: testUsers[0].name,
            passwordHash: passwordHash
        })
        await user.save().catch(error => console.log(error.name, error.message))
        console.log('User created for testing: ', testUsers[0])
    }
    const jwt = await api.post('/api/login')
        .send({username: testUsers[0].username, password: testUsers[0].password})
    console.log('jwt token --->' + jwt.body.token)
    token = jwt.body.token
})

beforeEach(async () => {
    console.log('Running beforeEach')
    await User.deleteMany({})
    for (const u of testUsers) {
        const passwordHash = await bcrypt.hash(u.password, 10)
        await new User({
            username: u.username,
            name: u.name,
            passwordHash: passwordHash
        }).save().catch(error => console.log(error.name))
    }
})

test('Get all users', async () => {
    const returnedUsers = await usersInDb()
    expect(returnedUsers).toHaveLength(2)
})

test('Create new user', async () => {
    const testUser = {
        username: 'Test User 3',
        name: 'elon lmao',
        password: '6ixty9ine'
    }
    await api.post(baseUri)
        .send(testUser)
    const returnedUsers = await usersInDb()
    expect(returnedUsers).toHaveLength(testUsers.length + 1);
})

test('Delete user', async () => {
    const users = await usersInDb()
    await api.delete(baseUri + '/' + users[0].id)
        .set('authorization', token)
        .expect(201)
    const returnedUsers = await usersInDb()
    expect(returnedUsers).toHaveLength(testUsers.length - 1)
})

test('Cannot delete other users', async () => {
    const users = await usersInDb()
    await api.delete(baseUri + '/' + users[1].id)
        .set('authorization', token)
        .expect(401)
    const returnedUsers = await usersInDb()
    expect(returnedUsers).toHaveLength(testUsers.length)
})

afterAll(() => {
    mongoose.connection.close()
})
