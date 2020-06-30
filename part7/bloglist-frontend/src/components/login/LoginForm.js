import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../reducers/userReducer";
import {reset, selectInput, updateInput} from "../../reducers/formReducer";
import {useHistory} from "react-router-dom"

const LoginForm = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const username = useSelector(state => selectInput('login-username', state))
    const password = useSelector(state => selectInput('login-password', state))
    const onSubmit = async (event) => {
        event.preventDefault()
        if (username === '') return
        if (password === '') return
        console.log('Credentials: ', username, password)
        dispatch(login({username, password}))
        dispatch(reset('login'))
        history.push('/blogs')
    }
    return (
        <form onSubmit={onSubmit}>
            <h3> Login </h3>
            <div> Username <input id='username' value={username}
                                  onChange={e => dispatch(updateInput('login-username', e.target.value))}/></div>
            <div> Password <input id='password' value={password}
                                  onChange={e => dispatch(updateInput('login-password', e.target.value))}
                                  type='password'/></div>
            <button id="login-button" type="submit">Login</button>
        </form>
    )
}

export default LoginForm
