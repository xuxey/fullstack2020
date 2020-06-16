import React, {useState} from 'react'
import Togglable from "./Togglable";
import blogService from "../services/blogs";

const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
}

const Blog = ({blog, setMessage, visible, blogs, setBlogs}) => {
    const [likes, setLikes] = useState(blog.likes)

    function handleLikeClick() {
        blogService.addLike(blog)
            .catch(() => setMessage('There was a problem liking this blog', true))
        setLikes(likes + 1);
    }

    function handleDeleteClick() {
        blogService.deleteBlog(blog)
            .catch(() => setMessage('There was a problem deleting this blog', true))
        setBlogs(blogs.filter(b => b.id !== blog.id))
        setMessage(`Blog ${blog.name} was successfully deleted`, false)
    }

    return (
        <div style={blogStyle}>
         <span>
          <strong>{blog.title} by {blog.author} {visible}</strong>
         </span>
            <Togglable buttonLabel='View'>
                <div>{blog.url}</div>
                <div>likes: {likes}
                    <button onClick={handleLikeClick}>Like</button>
                </div>
                <div>Added by: {blog.user.username}</div>
            </Togglable>
            {visible && <div>
                <button onClick={handleDeleteClick}>Delete</button>
            </div>}
        </div>)
}

export default Blog
