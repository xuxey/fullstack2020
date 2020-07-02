import React from 'react'
import {useQuery} from "@apollo/client";
import {ALL_BOOKS} from "../queries";

const Books = ({show}) => {
  const queryBooks = useQuery(ALL_BOOKS)
  if (!show) {
    return null
  }
  const books = queryBooks.data.allBooks
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
                <td>{a.author}</td>
                <td>{a.published}</td>
              </tr>
          )}
          </tbody>
        </table>
      </div>
  )
}

export default Books
