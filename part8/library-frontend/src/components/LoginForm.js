import React, {useState} from 'react'
import {useMutation} from "@apollo/client";
import {LOGIN_USER} from "../mutations";

const LoginForm = ({setUser, setMessage}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loginUser] = useMutation(LOGIN_USER, {
            onError: error => setMessage(error.graphQLErrors[0].message, true)
        }
    )
    const onSubmit = async (event) => {
        event.preventDefault()
        if (username === '') return
        if (password === '') return
        const user = {username, password}
        let loggedInUser = await loginUser({variables: user})
        loggedInUser = loggedInUser.data.login
        console.log("LOGGED IN USER", loggedInUser)
        setUser(loggedInUser)
        window.localStorage.setItem('libraryUser', JSON.stringify(loggedInUser))
        setUsername('')
        setPassword('')
        setMessage(`Logged in as ${username}`, false)
    }
    return (
        <form onSubmit={onSubmit}>
            <h3> Login </h3>
            <div> Username <input id='username' value={username} onChange={e => setUsername(e.target.value)}/></div>
            <div> Password <input id='password' value={password} onChange={e => setPassword(e.target.value)}
                                  type='password'/></div>
            <button id="login-button" type="submit">Login</button>
        </form>
    )
}

export default LoginForm
