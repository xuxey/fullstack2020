import React from 'react'
import {useQuery} from "@apollo/client";
import {ALL_BOOKS} from "../queries";

const Books = ({show}) => {
    const {loading, error, data} = useQuery(ALL_BOOKS)
    if (!show) {
        return null
    }
    if (loading) return <div>loading...</div>
    if (error) {
        console.log(error)
        return <div>Error</div>
    }
    const books = data.allBooks
    console.log(books)
    return (
        <div>
            <h2>books</h2>

            <table>
                <tbody>
                <tr>
                    <th>Book</th>
                    <th>
                        Author
            </th>
            <th>
              Published
            </th>
          </tr>
          {books.map(a =>
              <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
              </tr>
          )}
          </tbody>
        </table>
      </div>
  )
}

export default Books
