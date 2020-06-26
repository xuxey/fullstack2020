import React from 'react'
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Notification from "./components/Notification";
import FilterForm from "./components/FilterForm";

const App = () => {
    return (
        <div>
            <Notification/>
            <FilterForm/>
            <h2>Anecdotes</h2>
            <AnecdoteList/>
            <AnecdoteForm/>
        </div>
    )
}

export default App
