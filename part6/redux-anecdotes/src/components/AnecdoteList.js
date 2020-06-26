import React from "react";
import {connect} from 'react-redux'
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
    const anecdotes = props.anecdotes
        .filter(a => a.content.toLowerCase().includes(props.filter.toLowerCase()))
        .sort((a, b) => b.votes - a.votes)
    return (
        <ul>{anecdotes.map(a => <Anecdote key={a.id} anecdote={a} handleClick={(() => props.voteFor(a))}/>)}</ul>
    )
}
const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes,
        filter: state.filter,
    }
}
const mapDispatchToProps = {voteFor}
const ConnectedList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default ConnectedList
