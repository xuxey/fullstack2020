import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {notify} from "../reducers/notificationReducer";
import {logout} from "../reducers/userReducer";

const LogoutForm = ({setMessage}) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const onSubmit = (event) => {
        event.preventDefault()
        dispatch(logout())
        dispatch(notify('Logged out of your account', false))
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
