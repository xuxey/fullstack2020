import React from "react"

const LogoutForm = ({user, setUser, setMessage}) => {
    const onSubmit = (event) => {
        event.preventDefault();
        window.localStorage.removeItem('blogUser')
        setUser(undefined)
        setMessage('Logged out of your account', false)
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
            <span>
                <h2>{(user !== undefined) ? user.username : ''}</h2>
                <button type="submit">Logout</button>
            </span>
            </form>
        </div>
    )
}

export default LogoutForm
