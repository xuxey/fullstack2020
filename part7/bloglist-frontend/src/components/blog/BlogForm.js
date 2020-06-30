import React from 'react'
import {notify} from "../../reducers/notificationReducer";
import {useDispatch, useSelector} from "react-redux";
import {addBlog} from "../../reducers/blogsReducer";
import {reset, selectInput, updateInput} from "../../reducers/formReducer";
import {useHistory} from "react-router-dom"
import {Button, Form} from 'react-bootstrap'

const BlogForm = () => {
    const history = useHistory()
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
        dispatch(notify(`Blog ${title} added successfully`, false, 5))
        dispatch(reset('blogform'))
        history.push('/blogs')
    }
    return (
        <Form onSubmit={sanitizeForm} className="blogForm">
            <Form.Group>
                <h3> Add New Blog </h3>
                <Form.Label>Title</Form.Label>
                <Form.Control id='blogform-title' value={title}
                              onChange={e => dispatch(updateInput('blogform-title', e.target.value))}/>
                <Form.Label>Author</Form.Label>
                <Form.Control id='blogform-author' value={author}
                              onChange={e => dispatch(updateInput('blogform-author', e.target.value))}/>
                <Form.Label>Link</Form.Label>
                <Form.Control id='blogform-url' value={url}
                              onChange={e => dispatch(updateInput('blogform-url', e.target.value))}/>
                <Button variant="primary" id='blog-submit' type="submit">Submit</Button>
            </Form.Group>
        </Form>
    )
}

export default BlogForm
