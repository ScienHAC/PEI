import React, { useState } from 'react';
import useAuth from '../Hooks/useAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import '../CSS/Profile.css';

const Profile = () => {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState({ name: false, contact: false });
    const [newName, setNewName] = useState(user.name);
    const [newContact, setNewContact] = useState(user.contact || '');
    const [message, setMessage] = useState('');

    // Function to handle the update
    const handleUpdateUser = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_hostURL}/api/user/update`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ newName, newContact }),
                credentials: 'include',
            });

            if (response.status === 200) {
                setMessage('Profile updated successfully!');
                setIsEditing({ name: false, contact: false });
            } else {
                setMessage('Failed to update profile.');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            setMessage('Failed to update profile.');
        }
    };

    return (
        <div className="profile-container">
            <div className="profile-card">
                <div className="profile-icon">
                    <FontAwesomeIcon icon={faUserCircle} size="6x" />
                </div>
                <h1 className="profile-title">User Profile</h1>

                <div className="user-details">
                    <div className="user-info">
                        <h3>Email:</h3>
                        <p>{user.email}</p>
                    </div>

                    <div className="user-info">
                        <h3>Name:</h3>
                        {!isEditing.name ? (
                            <div className="user-detail">
                                <p>{user.name}</p>
                                <FontAwesomeIcon
                                    icon={faEdit}
                                    className="edit-icon"
                                    onClick={() => setIsEditing({ ...isEditing, name: true })}
                                />
                            </div>
                        ) : (
                            <div>
                                <input
                                    type="text"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    className="form-control"
                                />
                            </div>
                        )}
                    </div>

                    <div className="user-info">
                        <h3>Contact:</h3>
                        {!isEditing.contact ? (
                            <div className="user-detail">
                                <p>{user.contact || 'Not Provided'}</p>
                                <FontAwesomeIcon
                                    icon={faEdit}
                                    className="edit-icon"
                                    onClick={() => setIsEditing({ ...isEditing, contact: true })}
                                />
                            </div>
                        ) : (
                            <div>
                                <input
                                    type="text"
                                    value={newContact}
                                    onChange={(e) => setNewContact(e.target.value)}
                                    className="form-control"
                                />
                            </div>
                        )}
                    </div>

                    {(isEditing.name || isEditing.contact) && (
                        <div className="profile-actions">
                            <button className="btn btn-success" onClick={handleUpdateUser}>Save</button>
                            <button className="btn btn-danger" onClick={() => setIsEditing({ name: false, contact: false })}>Cancel</button>
                        </div>
                    )}

                    {message && <p className="profile-message">{message}</p>}
                </div>
            </div>
        </div>
    );
};

export default Profile;
