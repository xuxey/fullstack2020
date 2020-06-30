import React from 'react'
import ConfirmButton from '../ConfirmButton'
import {useDispatch, useSelector} from "react-redux";
import {deleteBlog, likeBlog} from "../../reducers/blogsReducer";
import {useHistory, useRouteMatch} from "react-router-dom";

const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
}

const Blog = () => {
    const history = useHistory()
    const blogMatch = useRouteMatch('/blogs/:id')
    const blogId = blogMatch.params.id
    const blog = useSelector(state => state.blogs.find(blog => blog.id === blogId))
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    if (!blog) return null
    console.log('BLOG', blog)
    return (
        <div style={blogStyle} className='blog'>
          <span>
            <strong>{blog.title} by {blog.author}</strong>
          </span>
            <div>{blog.url}</div>
            likes:<span id='likes-display'>{blog.likes}</span>
            <button id='blog-like-button' onClick={() => dispatch(likeBlog(blog))}>Like</button>
            <div>Added by: {blog.user.username}</div>
            {blog.user.id === user.id &&
            <div id='blog-delete'>
                <ConfirmButton handleClick={() => {
                    dispatch(deleteBlog(blog, user.token));
                    history.push('/blogs')
                }} label='Delete'/>
            </div>}
        </div>)
}

export default Blog
