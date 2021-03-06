const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const commentRouter = require('./controllers/comments')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

mongoose.connect(config.BLOGS_MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => logger.info('connected to MongoDB - Blogs - ' + config.BLOGS_MONGO_URI))
    .catch((error) => logger.error('error connection to MongoDB:', error.message))

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use('/api/comments', commentRouter)

if (process.env.NODE_ENV === 'test') {
    const testRouter = require('./controllers/tests')
    app.use('/api/tests', testRouter)
}
app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

module.exports = app
