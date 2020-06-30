import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {reset, selectInput, updateInput} from "../../reducers/formReducer";
import {commentBlog} from "../../reducers/blogsReducer";
import {Button, Form} from 'react-bootstrap'

const CommentForm = ({blogId}) => {
    const dispatch = useDispatch()
    const userToken = useSelector(state => state.user.token)
    const content = useSelector(state => selectInput('comment-content', state))
    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch(commentBlog(blogId, content, userToken))
        dispatch(reset('comment'))
    }
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Control id='comment-content' value={content}
                          onChange={e => dispatch(updateInput('comment-content', e.target.value))}/>
            <Button type="submit">Comment</Button>
        </Form>
    )
}

export default CommentForm
