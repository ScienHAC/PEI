import React from 'react'
import useAuth from '../Hooks/useAuth';
const Admin = () => {
    const { isAdmin, user } = useAuth();
    return (
        <div>
            {isAdmin ? (
                <h1>Welcome Admin {user.name}!!!</h1>
            ) : (
                <h1>Sorry, you are not an Admin</h1>
            )}
        </div>
    )
}

export default Admin
