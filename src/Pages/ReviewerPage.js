import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const ReviewerPage = () => {
    const { id: paperId } = useParams();
    const [paperExists, setPaperExists] = useState(null);
    const [email, setEmail] = useState("");
    const [reviewers, setReviewers] = useState([]);
    const [message, setMessage] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [paper, setPaper] = useState({});

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

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch(
                    `${process.env.REACT_APP_hostURL}/api/reviewer/comments/admin/all?paperId=${paperId}`,
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );

                const data = await response.json();
                setPaper(data.papers);
                setComments(data.paperAssignment || []);
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };
        fetchComments();
    }, [paperId, paperExists]);

    const addComment = async (commentText) => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_hostURL}/api/reviewer/comments`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ paperId, commentText }),
                    credentials: "include",
                }
            );

            const data = await response.json();
            if (response.ok) {
                setComments((prevComments) => [...prevComments, data.comment]);
            } else {
                setMessage(data.message || "Failed to add comment");
                setSnackbarOpen(true);
            }
        } catch (error) {
            console.error("Error adding comment:", error);
            setMessage("Error adding comment");
            setSnackbarOpen(true);
        }
    };



    useEffect(() => {
        const fetchReviewers = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_hostURL}/api/reviewer/exist/all`, {
                    method: "GET",
                    credentials: "include",
                });
                const data = await response.json();
                setReviewers(data);
            } catch (error) {
                console.error("Error fetching reviewers:", error);
            }
        };

        fetchReviewers();
    }, []);

    const validateEmail = (email) => {
        // Regex for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleEmailChange = (event, newValue) => {
        if (validateEmail(newValue)) {
            setEmail(newValue);
        } else {
            setEmail("");
        }
    };

    const sendInvite = async () => {
        if (!validateEmail(email)) {
            setMessage("Invalid email address.");
            setSnackbarOpen(true);
            return;
        }

        const inviteData = { email: email.trim().toLowerCase(), paperId };

        try {
            const response = await fetch(
                `${process.env.REACT_APP_hostURL}/api/reviewer/send-invite`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(inviteData),
                    credentials: "include",
                }
            );

            const data = await response.json();
            setMessage(data.message || "Invite sent successfully.");
            setSnackbarOpen(true);

            if (response.ok) setEmail("");
        } catch (error) {
            setMessage("Error sending invite.");
            setSnackbarOpen(true);
            console.error("Error:", error);
        }
    };
    console.log(paper);
    return (
        <div>
            {paperExists === true ? (
                <div>
                    <h1>Discussion Page</h1>
                    <h2>Title: </h2>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            padding: 2,
                            border: "1px solid #ccc",
                            borderRadius: "8px",
                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                            width: "100%",
                            maxWidth: "600px",
                            margin: "0 auto",
                        }}
                    >
                        <Autocomplete
                            options={reviewers.map((reviewer) => reviewer.email)}
                            renderInput={(params) => (
                                <TextField {...params} label="Select or Enter Email" fullWidth />
                            )}
                            value={email}
                            onInputChange={handleEmailChange}
                            freeSolo
                            sx={{
                                flex: 1,
                            }}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={sendInvite}
                            disabled={!email}
                            sx={{ whiteSpace: "nowrap" }}
                        >
                            Send Invite
                        </Button>
                    </Box>

                    <Snackbar
                        open={snackbarOpen}
                        autoHideDuration={3000}
                        onClose={() => setSnackbarOpen(false)}
                        message={message}
                        anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    />
                    <div>
                        <h2>Comments</h2>
                        {comments.length > 0 ? (
                            comments.map((comment, index) => (
                                <Box
                                    key={comment._id}
                                    sx={{
                                        border: "1px solid #ddd",
                                        padding: 2,
                                        marginBottom: 2,
                                        borderRadius: 2,
                                    }}
                                >
                                    <p key={comment.paperId} className="t">Commented by: {comment.email}</p>
                                    {comment.comments.length > 0 ? comment.comments.map((comment, index) => (
                                        <div key={comment._id}>
                                            <p>
                                                <strong>{comment.role === "admin" ? "Admin" : "Reviewer"}:</strong>{" "}
                                            </p>
                                            <p>{comment.commentText}</p>
                                        </div>
                                    )) : ""}
                                    {comment.isSuggestion && <span style={{ color: "blue" }}>Suggestion</span>}
                                </Box>
                            ))
                        ) : (
                            <p>No comments available</p>
                        )}
                    </div>

                    <Box sx={{ marginTop: 4 }}>
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            placeholder="Add your comment or suggestion"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => addComment(newComment)}
                            disabled={!newComment.trim()}
                            sx={{ marginTop: 2 }}
                        >
                            Add Comment
                        </Button>
                    </Box>


                </div>
            ) : (
                <h1>404 page not found!!!</h1>
            )}
        </div>
    );
};

export default ReviewerPage;
