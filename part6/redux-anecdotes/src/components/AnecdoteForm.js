import React from "react";
import {useDispatch} from 'react-redux'
import {createAnecdote} from '../reducers/anecdoteReducer'
import {notify} from "../reducers/notificationReducer";

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        dispatch(notify('New anecdote created', 5))
        dispatch(createAnecdote(event.target.anecdote.value))
        event.target.anecdote.value = ''
    }
    return (
        <div>
            <h2>Create New</h2>
            <form onSubmit={addAnecdote}>
                <div><input name='anecdote'/></div>
                <button type='submit'>Create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm
