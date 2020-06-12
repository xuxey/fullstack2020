const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const bcrypt = require("bcrypt");
const api = supertest(app)
const jwt = require('jsonwebtoken')
const testUser = {
    username: 'Test1373',
    name: 'elon69',
    password: 'fourtwenty'
}

beforeEach(async () => {
    await User.remove({})
    const users = await User.find({})
    console.log('Number of users before save: ' + users.length, users)
    const passwordHash = await bcrypt.hash(testUser.password, 10)
    const user = new User({
        username: testUser.username,
        name: testUser.name,
        passwordHash: passwordHash
    })
    await user.save().catch(error => console.log(error.name, error.message))
    const usersAfter = await User.find({})
    console.log('Number of users after save: ' + usersAfter.length, usersAfter)
})
test('valid token is returned', async () => {
    let data = await api.post('/api/login')
        .send({
            username: testUser.username,
            password: testUser.password
        })
        .expect(200)
    data = data.body
    //console.log('result of post /api/login', data)
    const decodedToken = jwt.verify(data.token, process.env.SECRET)
    expect(decodedToken).toBeTruthy()
})

afterAll(() => {
    mongoose.connection.close()
})
