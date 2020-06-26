import React from "react";
import {useDispatch, useSelector} from 'react-redux'
import {voteFor} from '../reducers/anecdoteReducer'

const Anecdote = ({anecdote, handleClick}) => {
    return (
        <li key={anecdote.id}>
            <span>{anecdote.content} has {anecdote.votes} votes </span>
            <span><button onClick={handleClick}>vote</button></span>
        </li>
    )
}

const AnecdoteList = (props) => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state).sort((a, b) => b.votes - a.votes)
    return (
        <ul>{anecdotes.map(a => <Anecdote anecdote={a} handleClick={(() => dispatch(voteFor(a.id)))}/>)}</ul>
    )
}

export default AnecdoteList
