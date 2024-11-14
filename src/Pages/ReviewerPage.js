import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ReviewerPage = () => {
    const { id: paperId } = useParams();
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [paperExists, setPaperExists] = useState(null);

    useEffect(() => {
        const checkPaperExists = async () => {
            try {
                const response = await fetch(
                    `${process.env.REACT_APP_hostURL}/api/reviewer/status/${paperId}`,
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );

                if (response.ok) {
                    setPaperExists(true);
                } else {
                    setPaperExists(false);
                }
            } catch (error) {
                console.error("Error checking paper ID:", error);
                setPaperExists(false);
            }
        };

        checkPaperExists();
    }, [paperId]);

    const sendInvite = async () => {
        const inviteData = { email, paperId };

        try {
            const response = await fetch(
                `${process.env.REACT_APP_hostURL}/api/reviewer/send-invite`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(inviteData),
                    credentials: "include",
                }
            );

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);
            } else {
                setMessage(data.message || "Error sending invite.");
            }
        } catch (error) {
            setMessage("An error occurred while sending the invite.");
            console.error("Error:", error);
        }
    };

    return (
        <div>
            {paperExists === true ? (
                <>
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
                </>
            ) : (
                <h1>404 page not found!!!</h1>
            )}
        </div>
    );
};

export default ReviewerPage;
