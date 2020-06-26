import React from "react";
import {connect} from 'react-redux'
import {createAnecdote} from '../reducers/anecdoteReducer'
import {notify} from "../reducers/notificationReducer";

const AnecdoteForm = (props) => {

    const addAnecdote = (event) => {
        event.preventDefault()
        props.notify('New anecdote created', 5)
        props.createAnecdote(event.target.anecdote.value)
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

const mapDispatchToProps = {notify, createAnecdote}
const ConnectedForm = connect(null, mapDispatchToProps)(AnecdoteForm)
export default ConnectedForm
