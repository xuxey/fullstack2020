import React from 'react'
import {useQuery} from "@apollo/client";
import {ALL_AUTHORS} from "../queries";
import SetBirthYear from "./SetBirthYear";

const Authors = ({show}) => {
  const {loading, error, data} = useQuery(ALL_AUTHORS)
  if (!show) {
    return null
  }
  if (loading) return <div>loading authors...</div>
  if (error) {
    console.log(error)
    return <div>An error has occured</div>
  }
  const authors = data.allAuthors
  return (
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
          <tr>
            <th>Author</th>
            <th>
              Born in
            </th>
            <th>
              Books
            </th>
          </tr>
          {authors.map(a =>
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
          )}
          </tbody>
        </table>
        <SetBirthYear authors={authors}/>
      </div>
  )
}

export default Authors
