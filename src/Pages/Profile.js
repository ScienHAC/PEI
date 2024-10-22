import React, { useState } from 'react';
import useAuth from '../Hooks/useAuth';

const Profile = () => {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(user.name);
    const [message, setMessage] = useState('');

    // Function to handle name update
    const handleUpdateName = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_hostURL}/api/user/update-name`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ newName }),
                credentials: 'include',
            });

            if (response.status === 200) {
                setMessage('Name updated successfully!');
                setIsEditing(false);
            }
        } catch (error) {
            console.error('Error updating name:', error);
            setMessage('Failed to update name.');
        }
    };

    return (
        <div>
            <h1>Profile</h1>
            <h2>Email: {user.email}</h2>
            {!isEditing ? (
                <>
                    <h2>Name: {user.name}</h2>
                    <button className="btn btn-outline-success mx-2" onClick={() => setIsEditing(true)}>Edit Name</button>
                </>
            ) : (
                <div>
                    <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                    />
                    <button className="btn btn-outline-success mx-2" onClick={handleUpdateName}>Save</button>
                    <button className="btn btn-outline-success mx-2" onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
            )}
            {message && <p>{message}</p>}
        </div>
    );
};

export default Profile;
