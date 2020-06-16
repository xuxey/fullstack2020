import React, {useEffect, useState} from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import LogoutForm from "./components/LogoutForm";
import Togglable from "./components/Togglable";

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState()
    const [message, setMessage] = useState({text: '', error: false});

    const showMessage = (message, isError) => {
        setMessage({text: message, error: isError});
        setTimeout(() => setMessage({text: '', error: false}), 5000);
    };
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('blogUser')
        if (loggedUserJSON) {
            const parsedUser = JSON.parse(loggedUserJSON)
            setUser(parsedUser)
            blogService.setToken(parsedUser.token)
        }
    }, [])
    useEffect(() => {
        blogService.getAll().then(blogs => {
            blogs.sort((blog1, blog2) => (blog1.likes < blog2.likes) ? 1 : -1)
            setBlogs(blogs)
        })
    }, [])
    return (
        <div>
            {user === undefined ?
                <LoginForm setUser={setUser} setMessage={showMessage}/> :
                <LogoutForm user={user} setUser={setUser} setMessage={showMessage}/>
            }
            <Notification message={message}/>
            <Togglable buttonLabel='Add blog'>
                {user !== undefined &&
                <BlogForm user={user} setMessage={showMessage} setBlogs={setBlogs} blogs={blogs}/>}
            </Togglable>
            {user ? <h2>Blogs</h2> : null}
            {user ? blogs.map(blog =>
                <Blog key={blog.id} blog={blog} setMessage={showMessage} setBlogs={setBlogs} blogs={blogs}
                      visible={blog.user.username === user.username}/>
            ) : null}
        </div>
    )
}

export default App
