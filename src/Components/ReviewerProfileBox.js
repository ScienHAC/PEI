import React, { useEffect, useState } from 'react';
import '../CSS/ReviewerProfileBox.css';

const ReviewerProfileBox = ({ email }) => {
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expanded, setExpanded] = useState(false);

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
            <div className="profile-box">
                <h3>Reviewer Profile</h3>
                <div className="loader"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="profile-box">
                <h3>Reviewer Profile</h3>
                <p>Error: {error}</p>
            </div>
        );
    }

    return (
        <div className={`profile-box ${expanded ? 'expanded' : ''}`}>
            <button
                className={`expand-btn ${expanded ? 'minimized' : ''}`}
                onClick={() => setExpanded(!expanded)}
            >
                {expanded ? '-' : '+'}
            </button>
            <h3>Reviewer Profile</h3>

            <p>
                <strong>Name:</strong> {profileData?.reviewerName}
            </p>
            <p>
                <strong>Email:</strong> {email}
            </p>
            <p>
                <strong>affiliation:</strong> {profileData.reviewerAffiliation || 'N/A'}
            </p>
            <p>
                <strong>Area Of Specialization:</strong> {profileData.reviewerAreaOfSpecialization || 'N/A'}
            </p>

            <div className="grid-container">
                <div className="tile assigned">
                    <strong>Total Papers Assigned:</strong>
                    <div className="number">{profileData.totalPaperAssigned}</div>
                </div>
                <div className="tile not-accepted">
                    <strong>Total Papers <span className="interactive-text">(Invite Link)</span> Awaiting Reviewer Response:</strong>
                    <div className="number">{profileData.totalPaperNotAccepted}</div>
                </div>
                <div className="tile accepted">
                    <strong>Total Papers Accepted:</strong>
                    <div className="number">{profileData.totalPaperAccepted}</div>
                </div>
                <div className="tile rejected">
                    <strong>Total Papers Rejected by Reviewers:</strong>
                    <div className="number">{profileData.totalRejectedPaper}</div>
                </div>
                <div className="tile pending">
                    <strong>Total Pending Paper Feedback:</strong>
                    <div className="number">{profileData.totalPendingPaperFeedback}</div>
                </div>
                <div className="tile feedback">
                    <strong>Total Paper Feedback Provided:</strong>
                    <div className="number">{profileData.totalPaperFeedback}</div>
                </div>
            </div>
        </div>
    );
};

export default ReviewerProfileBox;
