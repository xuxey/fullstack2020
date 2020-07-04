import React from 'react'

const LogoutForm = ({user, setUser, setMessage}) => {
    const onSubmit = (event) => {
        event.preventDefault()
        window.localStorage.removeItem('libraryUser')
        setUser(undefined)
        setMessage('Logged out of your account', false)
    }
    return (
        <form onSubmit={onSubmit}>
            <span>
              <h3>Logged in as {(user !== undefined) ? user.username : ''}</h3>
            </span>
            <span>
              <button type="submit">Logout</button>
            </span>
        </form>
    )
}

export default LogoutForm
