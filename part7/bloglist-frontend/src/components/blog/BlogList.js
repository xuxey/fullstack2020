import React from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

const BlogList = () => {
    const user = useSelector(state => state.user)
    const blogs = useSelector(state => state.blogs)
    if (!user) return null
    return (
        <div>
            {blogs.map(blog => <div key={blog.id}><Link to={`/blogs/${blog.id}`}> {blog.title}</Link></div>)}
        </div>
    )
}

export default BlogList
