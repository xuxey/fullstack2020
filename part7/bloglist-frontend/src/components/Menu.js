import React from "react";
import {Link} from "react-router-dom"
import {useSelector} from "react-redux";
import {Nav, Navbar} from 'react-bootstrap'

const Menu = () => {
    const padding = {
        paddingRight: 5
    }
    const user = useSelector(state => state.user)
    if (user)
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand>Blogs</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#" as="span"><Link style={padding} to="/blogs">Home</Link></Nav.Link>
                        <Nav.Link href="#" as="span"><Link style={padding} to="/new">Add Blog</Link></Nav.Link>
                        <Nav.Link href="#" as="span"><Link style={padding} to="/users">Users</Link></Nav.Link>
                        <Nav.Link href="#" as="span"><Link style={padding} to='/logout'>Logout</Link></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    else
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand>Blogs</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#" as="span"><Link style={padding} to='/login'>Login</Link></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
}

export default Menu
