import React, {useState} from 'react'
import loginService from '../services/login'

const LoginForm = ({setUser, setMessage}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const onSubmit = async (event) => {
    event.preventDefault()
    if (username === '') return
    if (password === '') return
    const user = {username, password}
    loginService.loginUser(user).then(r => {
      setUser(r)
      window.localStorage.setItem('blogUser', JSON.stringify(r))
    }).catch(() => setMessage('Username or password is incorrect', true))
    setUsername('')
    setPassword('')
    setMessage(`Logged in as ${username}`, false)
  }
  return (
      <form onSubmit={onSubmit}>
        <h3> Login </h3>
        <div> Username <input value={username} onChange={e => setUsername(e.target.value)}/></div>
        <div> Password <input value={password} onChange={e => setPassword(e.target.value)} type='password'/></div>
        <button type="submit">Login</button>
      </form>
  )
}

export default LoginForm
