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

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const filter = useSelector(state => state.filter)
    const anecdotes = useSelector(state => state.anecdotes)
        .filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
        .sort((a, b) => b.votes - a.votes)
    return (
        <ul>{anecdotes.map(a => <Anecdote key={a.id} anecdote={a} handleClick={(() => dispatch(voteFor(a)))}/>)}</ul>
    )
}

export default AnecdoteList
