import React from "react";
import {useSelector} from "react-redux";
import Blog from "./Blog";

const BlogList = () => {
    const user = useSelector(state => state.user)
    const blogs = useSelector(state => state.blogs)
    if (!user) return null
    return (
        <div>
            {blogs.map(blog => <Blog key={blog.id} blogId={blog.id}/>)}
        </div>
    )
}

export default BlogList
