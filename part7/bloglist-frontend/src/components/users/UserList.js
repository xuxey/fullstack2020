import React from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

const UserList = () => {
    const users = useSelector(state => state.users)
    return (
        <div>
            <h2>Users</h2>
            <table>
                <tbody>
                <tr>
                    <th>User</th>
                    <th>Blogs added</th>
                </tr>
                {users.map(u =>
                    <tr key={u.id}>
                        <td><Link to={`/users/${u.username}`}> {u.username} </Link></td>
                        <td>{u.blogs.length}</td>
                    </tr>)
                }
                </tbody>
            </table>

        </div>
    )
}

export default UserList
