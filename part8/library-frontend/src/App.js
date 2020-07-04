import React, {useEffect, useState} from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import LogoutForm from "./components/LogoutForm";

const App = () => {
    const [page, setPage] = useState('authors')
    const [message, setMessage] = useState({text: null, error: false})
    const [user, setUser] = useState(null)
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('libraryUser')
        if (loggedUserJSON)
            setUser(JSON.parse(loggedUserJSON))
    }, [])
    const showMessage = (message, isError) => {
        setMessage({text: message, error: isError})
        setTimeout(() => setMessage({text: null, error: false}), 5000)
    }
    return (
        <div>
            {user ?
                <LogoutForm user={user} setUser={setUser} setMessage={setMessage}/> :
                <LoginForm setMessage={showMessage} setUser={setUser}/>
            }
            <div>
                <button onClick={() => setPage('authors')}>authors</button>
                <button onClick={() => setPage('books')}>books</button>
                <button onClick={() => setPage('add')}>add book</button>
            </div>
            <Notification message={message}/>
            <Authors
                show={page === 'authors'}
                setMessage={showMessage}
            />

            <Books
                show={page === 'books'}
            />

            <NewBook
                showMessage={showMessage}
                show={page === 'add'}
            />
        </div>
    )
}

export default App
