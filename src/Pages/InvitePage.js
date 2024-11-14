import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const InvitePage = () => {
    const { inviteid } = useParams();
    const [isValid, setIsValid] = useState(false);
    const [error, setError] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    // Verify the invite when the component mounts
    useEffect(() => {
        const verifyInvite = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_hostURL}/api/reviewer/invite/${inviteid}`, {
                    credentials: 'include',
                });
                const data = await response.json();

                if (response.status === 200) {
                    setIsValid(true);
                } else {
                    setError(data.message);
                }
            } catch (error) {
                setError('Something went wrong. Please try again later.');
            }
        };

        verifyInvite();
    }, [inviteid]);

    // Handle password change
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_hostURL}/api/reviewer/set-password/${inviteid}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include', // Include credentials here as well
                body: JSON.stringify({ password }),
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

    return (
        <div>
            <h1>Accept Invitation</h1>
            {isValid ? (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="new-password"
                        />
                    </div>
                    <div>
                        <label>Confirm Password:</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            autoComplete="new-password"
                        />
                    </div>
                    {error && <p>{error}</p>}
                    <button type="submit">Accept Invite</button>
                </form>
            ) : (
                <p>{error || 'Validating your invite...'}</p>
            )}
        </div>
    );
};

export default InvitePage;
