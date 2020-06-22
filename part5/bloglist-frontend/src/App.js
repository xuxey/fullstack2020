import React, {useEffect, useState} from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LogoutForm from './components/LogoutForm'
import Togglable from './components/Togglable'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState()
    const [message, setMessage] = useState({text: '', error: false})

    const showMessage = (message, isError) => {
        setMessage({text: message, error: isError})
        setTimeout(() => setMessage({text: '', error: false}), 5000)
    }

    function handleLikeClick(blog) {
        blogService.addLike(blog)
            .catch(() => showMessage('There was a problem liking this blog', true))
    }

    function handleDeleteClick(blog) {
        blogService.deleteBlog(blog)
            .then(() => {
                setBlogs(blogs.filter(b => b.id !== blog.id))
                showMessage(`Blog ${blog.name} was successfully deleted`, false)
            })
            .catch(() => showMessage('There was a problem deleting this blog', true))
    }

    const onSubmit = (event, title, author, url) => {
        event.preventDefault()
        blogService.setToken(user.token)
        blogService.addNewBlog({title, author, url})
            .then(response => {
                console.log(response);
                setBlogs(blogs.concat(response))
            })
            .catch(error => showMessage(error, true))
        showMessage(`Blog ${title} added successfully`, false)
    }
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
            {user &&
            <Togglable buttonLabel='Add blog'>
                <BlogForm onSubmit={onSubmit}/>
            </Togglable>}
            {user ? <h2>Blogs</h2> : null}
            {user ? blogs.map(blog =>
                <Blog key={blog.id} blog={blog} authorViewing={blog.user.id === user.id}
                      handleLikeClick={handleLikeClick} handleDeleteClick={handleDeleteClick}/>
            ) : null}
        </div>
    )
}

export default App
