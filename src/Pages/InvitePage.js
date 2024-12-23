import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const InvitePage = () => {
    const { inviteid } = useParams();
    const [isValid, setIsValid] = useState(false);
    const [isReviewer, setIsReviewer] = useState(false);
    const [error, setError] = useState('');
    const [affiliation, setAffiliation] = useState('');
    const [areaOfSpecialization, setAreaOfSpecialization] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [inviteData, setInviteData] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const verifyInvite = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_hostURL}/api/reviewer/invite/${inviteid}`, {
                    credentials: 'include',
                });
                const data = await response.json();

                if (response.status === 200) {
                    setIsValid(true);
                    setInviteData(data);
                    setIsReviewer(data.isReviewer || false);
                } else {
                    setError(data.message);
                }
            } catch (error) {
                setError('Something went wrong. Please try again later.');
            }
        };

        verifyInvite();
    }, [inviteid]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        const body = {
            password,
            affiliation,
            areaOfSpecialization
        };

        try {
            const response = await fetch(`${process.env.REACT_APP_hostURL}/api/reviewer/set-password-and-details/${inviteid}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(body),
            });

            const data = await response.json();

            if (response.status === 200) {
                navigate('/login');
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError('Error submitting password');
        }
    };

    const handleReject = async () => {
        const confirmReject = window.confirm('Are you sure you want to reject this invite?');

        if (confirmReject) {
            try {
                const response = await fetch(`${process.env.REACT_APP_hostURL}/api/reviewer/reject-invite/${inviteid}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                });

                const data = await response.json();

                if (response.status === 200) {
                    navigate('/');
                } else {
                    setError(data.message);
                }
            } catch (error) {
                setError('Error rejecting the invite');
            }
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Accept Invitation</h1>
            <p style={styles.text}>
                You have been invited to review: <strong>{inviteData.fileName || "Document"}</strong>
            </p>
            <button style={styles.viewButton}>
                <a
                    href={inviteData.filePath}
                    target="_blank"
                    rel="noreferrer noopener"
                    style={styles.link}
                >
                    View File
                </a>
            </button>
            {isValid ? (
                <form onSubmit={handleSubmit} style={styles.form}>
                    {!isReviewer && (
                        <>
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Affiliation:</label>
                                <input
                                    type="text"
                                    value={affiliation}
                                    onChange={(e) => setAffiliation(e.target.value)}
                                    required
                                    style={styles.input}
                                />
                            </div>
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Area of Specialization:</label>
                                <input
                                    type="text"
                                    value={areaOfSpecialization}
                                    onChange={(e) => setAreaOfSpecialization(e.target.value)}
                                    required
                                    style={styles.input}
                                />
                            </div>
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Password:</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    autoComplete="new-password"
                                    style={styles.input}
                                />
                            </div>
                            <div className="password-container" style={{ ...styles.inputGroup, position: 'relative' }}>
                                <label style={styles.label}>Confirm Password:</label>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    autoComplete="new-password"
                                    style={styles.input}
                                />
                                {/* Eye icon to toggle visibility on the left */}
                                <span
                                    className="toggle-password"
                                    onClick={togglePasswordVisibility}
                                    style={{
                                        cursor: 'pointer',
                                        position: 'absolute',
                                        right: '10px',
                                        top: '36px',
                                    }}
                                >
                                    {showPassword ? (
                                        <i className="fa fa-eye-slash" style={{ fontSize: '20px' }}></i>
                                    ) : (
                                        <i className="fa fa-eye" style={{ fontSize: '20px' }}></i>
                                    )}
                                </span>
                            </div>
                        </>
                    )}
                    <button type="submit" style={styles.submitButton}>
                        {isReviewer ? "Accept Invite" : "Set Password & Accept Invite"}
                    </button>
                    <button type="button" onClick={handleReject} style={styles.rejectButton} className="btn btn-danger">
                        Reject
                    </button>
                    {error && <p style={styles.error}>{error}</p>}
                </form>
            ) : (
                <p style={styles.text}>{error || 'Validating your invite...'}</p>
            )}
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
        backgroundColor: '#f9f9f9',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    header: {
        fontSize: '24px',
        marginBottom: '20px',
        color: '#333',
    },
    text: {
        fontSize: '16px',
        color: '#555',
        marginBottom: '20px',
    },
    viewButton: {
        backgroundColor: '#007bff',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginBottom: '20px',
    },
    link: {
        color: '#fff',
        textDecoration: 'none',
        fontWeight: 'bold',
    },
    form: {
        marginTop: '20px',
    },
    inputGroup: {
        marginBottom: '15px',
        textAlign: 'left',
    },
    label: {
        display: 'block',
        marginBottom: '5px',
        fontSize: '14px',
        color: '#333',
    },
    input: {
        width: '100%',
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        fontSize: '14px',
    },
    submitButton: {
        backgroundColor: '#28a745',
        color: '#fff',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    rejectButton: {
        backgroundColor: '#dc3545',
        color: '#fff',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginLeft: '10px',
    },
    error: {
        marginTop: '10px',
        color: '#d9534f',
    },
};

export default InvitePage;
