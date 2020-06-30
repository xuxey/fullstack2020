import loginService from "../services/login";
import {notify} from "./notificationReducer";

const initialState = null

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return action.user
        case 'LOGOUT':
            return null
        case 'INIT_USER':
            return action.user
        default:
            return state
    }
}

export const initUser = (user) => {
    return async dispatch => {
        dispatch({
            type: 'INIT_USER',
            user
        })
    }
}
export const login = (user) => {
    return async dispatch => {
        const loggedInUser = await loginService.loginUser(user)
            .catch(() => dispatch(notify('Username or password is incorrect', true)))
        window.localStorage.setItem('blogUser', JSON.stringify(loggedInUser))
        dispatch({
            type: 'LOGIN',
            user: loggedInUser
        })
        dispatch(notify(`Logged in as ${loggedInUser.username}`, false))
    }
}

export const logout = () => {
    return async dispatch => {
        window.localStorage.removeItem('blogUser')
        dispatch({
            type: 'LOGOUT',
        })
    }
}
export default notificationReducer
