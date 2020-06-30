import React from "react";
import {useSelector} from "react-redux";
import {useRouteMatch} from "react-router-dom";

const User = () => {
    const usernameMatch = useRouteMatch('/users/:username')
    const blogs = useSelector(state => state.blogs)
    console.log('ROUTING', usernameMatch)
    const username = usernameMatch.params.username
    const user = useSelector(state => state.users.find(user => user.username === username))
    if (!user) return null
    console.log('userblogs', user.blogs)
    return (
        <div>
            <h3>{user.name}</h3>
            <p>username: {user.username}</p>
            <h4>Blogs</h4>
            {
                user.blogs.map(blogId => blogs.find(blog => blog.id === blogId))
                    .map(blog => console.log('BLOG', blog))
            }
        </div>
    )
}
export default User
