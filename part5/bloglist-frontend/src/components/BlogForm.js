import React, {useState} from 'react'
import blogService from '../services/blogs'

const BlogForm = ({user, blogs, setBlogs, setMessage}) => {
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')
    const [author, setAuthor] = useState('')
    const onSubmit = (event) => {
        event.preventDefault()
        if (title === '' || author === '' || url === '') return
        blogService.setToken(user.token)
        blogService.addNewBlog({title, author, url})
            .then(response => {
                console.log(response);
                setBlogs(blogs.concat(response))
            })
            .catch(error => setMessage(error, true))
        setMessage(`Blog ${title} added successfully`, false)
        setTitle('')
        setAuthor('')
        setUrl('')
    }
    return (
        <form onSubmit={onSubmit}>
            <h3> Add New Blog </h3>
            <div> Title <input value={title} onChange={e => setTitle(e.target.value)}/></div>
            <div> Author <input value={author} onChange={e => setAuthor(e.target.value)}/></div>
            <div> URL <input value={url} onChange={e => setUrl(e.target.value)}/></div>
            <button type="submit">Submit</button>
        </form>
    )
}

export default BlogForm
