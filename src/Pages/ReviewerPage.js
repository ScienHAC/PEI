import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const ReviewerPage = () => {
    const { id: paperId } = useParams();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const sendInvite = async () => {
        const inviteData = { email, paperId };

        try {
            const response = await fetch(`${process.env.REACT_APP_hostURL}/api/reviewer/send-invite`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(inviteData),
                credentials: 'include',
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Invite sent successfully!');
            } else {
                setMessage(data.message || 'Error sending invite.');
            }
        } catch (error) {
            setMessage('An error occurred while sending the invite.');
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h1>Reviewer Page</h1>

            <div>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter reviewer email"
                />
                <button onClick={sendInvite}>Send Invite</button>
            </div>

            {message && <p>{message}</p>}
        </div>
    );
};

export default ReviewerPage;
