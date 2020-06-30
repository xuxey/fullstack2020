import React from 'react'
import ConfirmButton from '../ConfirmButton'
import {useDispatch, useSelector} from "react-redux";
import {deleteBlog, likeBlog} from "../../reducers/blogsReducer";
import {useHistory, useRouteMatch} from "react-router-dom";
import CommentForm from "./CommentForm";
import {Button, Jumbotron} from "react-bootstrap"

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
        <Jumbotron className='blog'>
            <h2>{blog.title} by {blog.author}</h2>
            <p>{blog.url}</p>
            likes:<span id='likes-display'>{blog.likes}</span>
            <Button variant="outline-success" id='blog-like-button' size="sm"
                    onClick={() => dispatch(likeBlog(blog))}>Like</Button>
            <div>Added by: {blog.user.username}</div>
            {blog.user.id === user.id &&
            <div id='blog-delete'>
                <ConfirmButton handleClick={() => {
                    dispatch(deleteBlog(blog, user.token));
                    history.push('/blogs')
                }} label='Delete'/>
            </div>}
            <h3>Comments</h3>
            {blog.comments.map(comment =>
                <div key={comment.id}>{comment.content} by {comment.user.username} </div>)}
            <CommentForm blogId={blog.id}/>
        </Jumbotron>)
}

export default Blog
