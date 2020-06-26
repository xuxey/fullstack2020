import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {voteFor} from "./reducers/anecdoteReducer";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";

const App = () => {
    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()

    const vote = (id) => {
        console.log('vote', id)
        dispatch(voteFor(id))
    }

    return (
        <div>
            <h2>Anecdotes</h2>
            <AnecdoteList/>
            <AnecdoteForm/>
        </div>
    )
}

export default App
