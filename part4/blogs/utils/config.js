require('dotenv').config()

let PORT = process.env.PORT
let BLOGS_MONGO_URI = process.env.BLOGS_MONGO_URI
if (process.env.NODE_ENV === 'test') {
    BLOGS_MONGO_URI = process.env.TEST_BLOGS_MONGO_URI
}

module.exports = {
    BLOGS_MONGO_URI,
    PORT
}
