import React, {useState} from 'react'
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
    const [likes, setLikes] = useState(blog.likes)
    const likeBlog = () => {
        setLikes(likes + 1)
        handleLikeClick(blog)
    }
    const deleteBlog = () => handleDeleteClick(blog)
    return (
        <div style={blogStyle} className='blog'>
          <span>
            <strong>{blog.title} by {blog.author} {authorViewing}</strong>
          </span>
            <Togglable buttonId='view-blog-toggle' buttonLabel='View'>
                <div>{blog.url}</div>
                likes:<span id='likes-display'>{likes}</span>
                <button id='blog-like-button' onClick={likeBlog}>Like</button>
                <div>Added by: {blog.user.username}</div>
                {authorViewing &&
                <div id='blog-delete'>
                    <ConfirmButton handleClick={deleteBlog} label='Delete'/>
                </div>}
            </Togglable>
        </div>)
}

export default Blog
