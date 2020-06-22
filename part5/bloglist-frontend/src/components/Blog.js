import React from 'react'
import Togglable from './Togglable'
import ConfirmButton from './ConfirmButton'

const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
}

const Blog = ({blog, authorViewing, handleDeleteClick, handleLikeClick}) => {
    const likeBlog = () => handleLikeClick(blog)
    const deleteBlog = () => handleDeleteClick(blog)
    return (
        <div style={blogStyle} className='blog'>
          <span>
            <strong>{blog.title} by {blog.author} {authorViewing}</strong>
          </span>
            <Togglable buttonLabel='View'>
                <div>{blog.url}</div>
                <div>likes: {blog.likes}
                    <button onClick={likeBlog}>Like</button>
                </div>
                <div>Added by: {blog.user.username}</div>
                {authorViewing &&
                <div>
                    <ConfirmButton handleClick={deleteBlog} label='Delete'/>
                </div>}
            </Togglable>
        </div>)
}

export default Blog
