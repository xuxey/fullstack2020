import React from "react";
import {Link} from "react-router-dom"
import {useSelector} from "react-redux";

const Menu = () => {
    const padding = {
        paddingRight: 5
    }
    const user = useSelector(state => state.user)
    if (user)
        return (
            <div>
                <Link style={padding} to="/blogs">Home</Link>
                <Link style={padding} to="/new">Add Blog</Link>
                <Link style={padding} to="/users">Users</Link>
                <Link style={padding} to='/logout'>Logout</Link>
            </div>
        )
    else
        return (
            <div>
                <Link style={padding} to="/">Home</Link>
                <Link style={padding} to="/login">Login</Link>
                <Link style={padding} to="/users">Users</Link>
            </div>
        )
}

export default Menu
