import React, {useState} from 'react'

const BlogForm = ({onSubmit}) => {
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')
    const [author, setAuthor] = useState('')
    const sanitizeForm = (event) => {
        event.preventDefault()
        if (title === '' || author === '' || url === '') {
            console.log('Empty ');
            return
        }
        onSubmit(event, title, author, url)
        setTitle('')
        setAuthor('')
        setUrl('')
    }
    return (
        <form onSubmit={sanitizeForm} className="blogForm">
            <h3> Add New Blog </h3>
            <div> Title <input id='blogform-title' value={title} onChange={e => setTitle(e.target.value)}/></div>
            <div> Author <input id='blogform-author' value={author} onChange={e => setAuthor(e.target.value)}/></div>
            <div> URL <input id='blogform-url' value={url} onChange={e => setUrl(e.target.value)}/></div>
            <button id='blog-submit' type="submit">Submit</button>
        </form>
    )
}

export default BlogForm
