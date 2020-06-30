import React, {useEffect} from 'react'
import {initializeBlogs} from "./reducers/blogsReducer";
import LoginForm from './components/login/LoginForm'
import Notification from './components/Notification'
import BlogForm from './components/blog/BlogForm'
import LogoutForm from './components/login/LogoutForm'
import {useDispatch, useSelector} from "react-redux";
import BlogList from "./components/blog/BlogList";
import {initUser} from "./reducers/userReducer";
import {initUserList} from "./reducers/userlistReducer";
import UserList from "./components/users/UserList";
import {Route, Switch, useHistory} from "react-router-dom"
import User from "./components/users/User";
import Blog from "./components/blog/Blog";
import Menu from "./components/Menu";

const App = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializeBlogs())
        dispatch(initUser())
        dispatch(initUserList())
    }, [dispatch])
    const history = useHistory()
    const user = useSelector(state => state.user)
    // const blogId = useRouteMatch('/blogs/:id').params.id
    return (
        <div>
            <h1>Blog List</h1>
            <Menu/>
            <Notification/>
            <Switch>
                <Route path='/logout'>
                    <LogoutForm/>
                </Route>
                <Route path='/new'>
                    <BlogForm/>
                </Route>
                <Route path='/blogs/:id'>
                    <Blog blogId={0}/>
                </Route>
                <Route path='/blogs'>
                    <BlogList/>
                </Route>
                <Route path='/login'>
                    <LoginForm/>
                </Route>
                <Route path='/users/:username'>
                    <User/>
                </Route>
                <Route path='/users'>
                    <UserList/>
                </Route>
                <Route path='/'>
                    {history.push(user ? '/blogs' : '/login')}
                </Route>
            </Switch>
        </div>
    )
}

export default App
