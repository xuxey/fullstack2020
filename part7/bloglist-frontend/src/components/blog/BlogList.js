import React from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {ListGroup} from "react-bootstrap"

const BlogList = () => {
    const user = useSelector(state => state.user)
    const blogs = useSelector(state => state.blogs)
    if (!user) return null
    return (
        <ListGroup>
            {blogs.map(blog => <ListGroup.Item key={blog.id}><Link
                to={`/blogs/${blog.id}`}> {blog.title}</Link></ListGroup.Item>)}
        </ListGroup>
    )
}

export default BlogList
