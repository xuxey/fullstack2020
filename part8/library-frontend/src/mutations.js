import {gql} from "@apollo/client"

export const ADD_BOOK = gql`
    mutation createBook($title: String!, $author: String!, $genres: [String!]!, $published: Int!) {
        addBook(
            author: $author,
            title: $title,
            genres: $genres,
            published: $published
        ) {
            author
            title
            genres
            published
        }
    }
`
export const SET_BDAY = gql`
    mutation setBday($name: String!, $setBornTo: Int!) {
        editAuthor(name: $name, setBornTo: $setBornTo) {
            name
            born
        }
    }
`
