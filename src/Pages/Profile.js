import React, { useState, useEffect } from 'react';
import useAuth from '../Hooks/useAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import '../CSS/Profile.css';

const Profile = () => {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState({ name: false, contact: false, affiliation: false, areaOfSpecialization: false });
    const [newName, setNewName] = useState('');
    const [newContact, setNewContact] = useState('');
    const [newAffiliation, setNewAffiliation] = useState('');
    const [newAreaOfSpecialization, setNewAreaOfSpecialization] = useState('');
    const [profileData, setProfileData] = useState({});
    const [message, setMessage] = useState('');

    // Fetch profile data on load
    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_hostURL}/api/user/details`, {
                    method: 'GET',
                    credentials: 'include',
                });

                if (response.status === 200) {
                    const data = await response.json();
                    setProfileData(data.user);
                } else {
                    setMessage('Failed to load profile data.');
                }
            } catch (error) {
                console.error('Error fetching profile data:', error);
                setMessage('Failed to load profile data.');
            }
        };

        fetchProfileData();
    }, []);

    // Update editing fields when profile data is updated
    useEffect(() => {
        if (profileData) {
            setNewName(profileData.name || '');
            setNewContact(profileData.contact || '');
            setNewAffiliation(profileData.affiliation || 'Not assigned');
            setNewAreaOfSpecialization(profileData.areaOfSpecialization || 'Not assigned');
        }
    }, [profileData]);

    // Function to handle the update
    const handleUpdateUser = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_hostURL}/api/user/update`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ newName, newContact, newAffiliation, newAreaOfSpecialization }),
                credentials: 'include',
            });

            if (response.status === 200) {
                const updatedProfile = await response.json();
                setProfileData(updatedProfile.user);
                setMessage('Profile updated successfully!');
                setIsEditing({ name: false, contact: false, affiliation: false, areaOfSpecialization: false });
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
                                <p>{profileData.name || 'Not Provided'}</p>
                                <FontAwesomeIcon
                                    icon={faEdit}
                                    className="edit-icon"
                                    onClick={() => setIsEditing({ ...isEditing, name: true })}
                                />
                            </div>
                        ) : (
                            <input
                                type="text"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                className="form-control"
                            />
                        )}
                    </div>

                    <div className="user-info">
                        <h3>Contact:</h3>
                        {!isEditing.contact ? (
                            <div className="user-detail">
                                <p>{profileData.contact || 'Not Provided'}</p>
                                <FontAwesomeIcon
                                    icon={faEdit}
                                    className="edit-icon"
                                    onClick={() => setIsEditing({ ...isEditing, contact: true })}
                                />
                            </div>
                        ) : (
                            <input
                                type="text"
                                value={newContact}
                                onChange={(e) => setNewContact(e.target.value)}
                                className="form-control"
                            />
                        )}
                    </div>

                    <div className="user-info">
                        <h3>Affiliation:</h3>
                        {!isEditing.affiliation ? (
                            <div className="user-detail">
                                <p>{profileData.affiliation || 'Not assigned'}</p>
                                <FontAwesomeIcon
                                    icon={faEdit}
                                    className="edit-icon"
                                    onClick={() => setIsEditing({ ...isEditing, affiliation: true })}
                                />
                            </div>
                        ) : (
                            <input
                                type="text"
                                value={newAffiliation}
                                onChange={(e) => setNewAffiliation(e.target.value)}
                                className="form-control"
                            />
                        )}
                    </div>

                    <div className="user-info">
                        <h3>Area of Specialization:</h3>
                        {!isEditing.areaOfSpecialization ? (
                            <div className="user-detail">
                                <p>{profileData.areaOfSpecialization || 'Not assigned'}</p>
                                <FontAwesomeIcon
                                    icon={faEdit}
                                    className="edit-icon"
                                    onClick={() => setIsEditing({ ...isEditing, areaOfSpecialization: true })}
                                />
                            </div>
                        ) : (
                            <input
                                type="text"
                                value={newAreaOfSpecialization}
                                onChange={(e) => setNewAreaOfSpecialization(e.target.value)}
                                className="form-control"
                            />
                        )}
                    </div>

                    {(isEditing.name || isEditing.contact || isEditing.affiliation || isEditing.areaOfSpecialization) && (
                        <div className="profile-actions">
                            <button className="btn btn-success" onClick={handleUpdateUser}>Save</button>
                            <button className="btn btn-danger" onClick={() => setIsEditing({ name: false, contact: false, affiliation: false, areaOfSpecialization: false })}>Cancel</button>
                        </div>
                    )}

                    {message && <p className="profile-message">{message}</p>}
                </div>
            </div>
        </div>
    );
};

export default Profile;
