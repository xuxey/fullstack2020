import React from 'react'
import Togglable from "./Togglable";
import {notify} from "../reducers/notificationReducer";
import {useDispatch, useSelector} from "react-redux";
import {addBlog} from "../reducers/blogsReducer";
import {reset, selectInput, updateInput} from "../reducers/formReducer";

const BlogForm = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const title = useSelector(state => selectInput('blogform-title', state))
    const url = useSelector(state => selectInput('blogform-url', state))
    const author = useSelector(state => selectInput('blogform-author', state))

    const sanitizeForm = (event) => {
        event.preventDefault()
        if (title === '' || author === '' || url === '') {
            return
        }
        event.preventDefault()
        dispatch(addBlog({title, author, url}, user.token))
            .catch(() => dispatch(notify('Could not add the blog', true)))
        dispatch(notify(`Blog ${title} added successfully`, false, 5))
        dispatch(reset('blogform'))
    }
    return (
        <Togglable buttonId='blog-form-toggle' buttonLabel='Add blog'>
            <form onSubmit={sanitizeForm} className="blogForm">
                <h3> Add New Blog </h3>
                <div> Title <input id='blogform-title' value={title}
                                   onChange={e => dispatch(updateInput('blogform-title', e.target.value))}/></div>
                <div> Author <input id='blogform-author' value={author}
                                    onChange={e => dispatch(updateInput('blogform-author', e.target.value))}/></div>
                <div> URL <input id='blogform-url' value={url}
                                 onChange={e => dispatch(updateInput('blogform-url', e.target.value))}/></div>
                <button id='blog-submit' type="submit">Submit</button>
            </form>
        </Togglable>
    )
}

export default BlogForm
