import React from 'react'
import Togglable from './Togglable'
import ConfirmButton from './ConfirmButton'
import {useDispatch, useSelector} from "react-redux";
import {deleteBlog, likeBlog} from "../reducers/blogsReducer";

const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
}

const Blog = ({blogId}) => {
    const blog = useSelector(state => state.blogs.find(blog => blog.id === blogId))
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    console.log('---->', blog.user.id, user)
    return (
        <div style={blogStyle} className='blog'>
          <span>
            <strong>{blog.title} by {blog.author}</strong>
          </span>
            <Togglable buttonId='view-blog-toggle' buttonLabel='View'>
                <div>{blog.url}</div>
                likes:<span id='likes-display'>{blog.likes}</span>
                <button id='blog-like-button' onClick={() => dispatch(likeBlog(blog))}>Like</button>
                <div>Added by: {blog.user.username}</div>
                {blog.user.id === user.id &&
                <div id='blog-delete'>
                    <ConfirmButton handleClick={() => dispatch(deleteBlog(blog))} label='Delete'/>
                </div>}
            </Togglable>
        </div>)
}

export default Blog
