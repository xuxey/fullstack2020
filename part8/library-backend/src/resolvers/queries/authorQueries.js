const Author = require("../../models/author")
const Book = require("../../models/book")
const authorCount = () => Author.collection.countDocuments()
const allAuthors = async () => {
    let authors = await Author.find({})
    let books = await Book.find({})
    authors = authors.map(author => {
        author['bookCount'] = books.filter(b => b.author === author.name).length;
        return author
    })
    return authors
}

module.exports = {authorCount, allAuthors}
