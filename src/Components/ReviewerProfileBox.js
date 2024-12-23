import React, { useEffect, useState } from 'react';

const ReviewerProfileBox = ({ email }) => {
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const encodedEmail = encodeURIComponent(email);
                const response = await fetch(
                    `${process.env.REACT_APP_hostURL}/api/reviewer/profile-data?email=${encodedEmail}`,
                    {
                        method: 'GET',
                        credentials: 'include',
                    }
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch profile data');
                }

                const data = await response.json();

                setProfileData(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchProfileData();
    }, [email]);

    if (loading) {
        return (
            <div
                style={{
                    position: 'fixed',
                    maxWidth: '320px',
                    backgroundColor: 'white',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    padding: '10px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    zIndex: 10,
                    maxHeight: '200px',
                    overflowY: 'auto',
                    left: '-30px',
                }}
            >
                <h3>Reviewer Profile</h3>
                <p>Loading profile data...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div
                style={{
                    position: 'fixed',
                    maxWidth: '320px',
                    backgroundColor: 'white',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    padding: '10px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    zIndex: 10,
                    maxHeight: '200px',
                    overflowY: 'auto',
                    left: '-30px',
                }}
            >
                <h3>Reviewer Profile</h3>
                <p>Error: {error}</p>
            </div>
        );
    }

    return (
        <div
            style={{
                position: 'fixed',
                maxWidth: '320px',
                backgroundColor: 'white',
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                zIndex: 10,
                maxHeight: '200px',
                overflowY: 'auto',
                left: '-30px',
            }}
        >
            <div>
                <h3>Reviewer Profile</h3>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Total Papers Assigned:</strong> {profileData.totalPaperAssigned}</p>
                <p><strong>Total Papers Accepted:</strong> {profileData.totalPaperAccepted}</p>
                <p><strong>Total Papers Not Accepted:</strong> {profileData.totalPaperNotAccepted}</p>
                <p><strong>Total Pending Paper Feedback:</strong> {profileData.totalPendingPaperFeedback}</p>
                <p><strong>Total Paper Feedback:</strong> {profileData.totalPaperFeedback}</p>
            </div>
        </div>
    );
};

export default ReviewerProfileBox;
