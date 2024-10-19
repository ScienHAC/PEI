import React from 'react';
import useAuth from '../Hooks/useAuth';
const Dashboard = () => {
    const { user } = useAuth();
    return (
        <div>
            <h1>Hello world {user.name}</h1>
        </div>
    )
}

export default Dashboard
