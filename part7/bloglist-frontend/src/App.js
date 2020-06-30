import React, {useEffect} from 'react'
import {initializeBlogs} from "./reducers/blogsReducer";
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LogoutForm from './components/LogoutForm'
import {useDispatch, useSelector} from "react-redux";
import BlogList from "./components/BlogList";
import {initUser} from "./reducers/userReducer";

const App = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializeBlogs())
    }, [dispatch])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('blogUser')
        if (loggedUserJSON) {
            const parsedUser = JSON.parse(loggedUserJSON)
            dispatch(initUser(parsedUser))
        }
    }, [dispatch])
    const user = useSelector(state => state.user)
    return (
        <div>
            {!user ?
                <LoginForm/> :
                <LogoutForm/>
            }
            <Notification/>
            {user && <BlogForm/>}
            {user ? <h2>Blogs</h2> : null}
            <BlogList/>
        </div>
    )
}

export default App
