import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {notify} from "../../reducers/notificationReducer";
import {logout} from "../../reducers/userReducer";
import {Link, useHistory} from "react-router-dom";
import {Button} from "react-bootstrap"

const LogoutForm = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const onSubmit = (event) => {
        event.preventDefault()
        dispatch(logout())
        dispatch(notify('Logged out of your account', false))
        history.push('/')
    }
    if (user)
        return (
            <div>
                <form onSubmit={onSubmit}>
                    <span>
                      <h2>Logged in as {user.username}</h2>
                    </span>
                    <span>
                        <Button variant="primary" type="submit">Logout</Button>
                    </span>
                </form>
            </div>
        )
    else
        return (
            <div>
                <h2>Something went wrong, try logging in</h2>
                <Link to='/'>Login</Link>
            </div>
        )
}

export default LogoutForm
