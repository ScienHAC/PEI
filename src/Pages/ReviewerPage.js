import React, { useState, useEffect, useCallback } from "react";
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
    const [feedbackMessage, setFeedbackMessage] = useState(false);
    const [activeCommentId, setActiveCommentId] = useState(null);
    const [emailCommentid, setEmailCommentId] = useState(null);

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
                    const data = await response.json();
                    setPaper(data.researchPaper);
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

    const fetchComments = useCallback(async () => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_hostURL}/api/reviewer/comments/admin/all?paperId=${paperId}`,
                {
                    method: "GET",
                    credentials: "include",
                }
            );
            const data = await response.json();
            setComments(data.paperAssignment || []);
            const hasNoFeedback = !data.paperAssignment || data.paperAssignment.every((comment) => comment.comments.length === 0);
            setFeedbackMessage(hasNoFeedback);
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    }, [paperId]);

    const addComment = async (commentText) => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_hostURL}/api/reviewer/comments/admin/add`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ paperId, commentText, email: emailCommentid }),
                    credentials: "include",
                }
            );

            const data = await response.json();
            if (response.ok) {
                fetchComments();
                setComments((prevComments) => [...prevComments, data.comment]);
                setNewComment("");
                setMessage("Suggestion added successfully!");
                setSnackbarOpen(true);
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
        fetchComments();
    }, [paperId, paperExists, fetchComments]);


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
    const emailToNameMap = {};
    reviewers.forEach(reviewer => {
        emailToNameMap[reviewer.email] = reviewer.name || "Unknown Reviewer";
    });

    return (
        <div>
            {paperExists === true ? (
                <div>
                    <h1>Discussion Page</h1>
                    <h2>Title: {paper?.title || "Unknown Title"}</h2>
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
                        <h2>{!feedbackMessage && "Comments"}</h2>
                        {comments.length > 0 ? (
                            comments.map((comment) => (
                                Array.isArray(comment.comments) && comment.comments.length > 0 && (
                                    <div key={comment._id}>
                                        <Box
                                            sx={{
                                                border: "1px solid #ddd",
                                                padding: 2,
                                                marginBottom: 2,
                                                borderRadius: 2,
                                            }}
                                        >
                                            <div style={{ display: "flex", justifyContent: "space-between", wordBreak: "break-word" }}>
                                                <p key={comment.paperId} className="t">
                                                    Feedback by: {emailToNameMap[comment.email] || "Unknown"} ({comment.email})
                                                </p>
                                                <button
                                                    className="btn btn-outline-info"
                                                    style={{ maxHeight: "45px" }}
                                                    onClick={() => {
                                                        if (activeCommentId === comment._id) {
                                                            setActiveCommentId(null);
                                                            setEmailCommentId(null);
                                                        } else {
                                                            setActiveCommentId(comment._id);
                                                            setEmailCommentId(comment.email);
                                                        }
                                                    }}
                                                >
                                                    {activeCommentId === comment._id ? "Close Suggestion" : "Add Suggestion"}
                                                </button>
                                            </div>
                                            {comment.comments.length > 0
                                                ? comment.comments.map((innerComment) => (
                                                    <div key={innerComment._id}>
                                                        <p>
                                                            <strong>
                                                                {innerComment.role === "admin" ? "Admin" : "Reviewer"}:
                                                            </strong>{" "}
                                                        </p>
                                                        <p>{innerComment.commentText}</p>
                                                    </div>
                                                ))
                                                : ""}
                                        </Box>
                                        {activeCommentId === comment._id && (
                                            <Box sx={{ marginTop: 4 }}>
                                                <TextField
                                                    id="comment-input"
                                                    name="comment-input"
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
                                                    Add Suggestion
                                                </Button>
                                            </Box>
                                        )}
                                    </div>
                                )
                            ))
                        ) : (
                            ""
                        )}
                        <p>{feedbackMessage ? "Paper has no Feedback yet" : ""}</p>
                    </div>
                </div>
            ) : (
                <h1>404 page not found!!!</h1>
            )}
        </div>
    );
};

export default ReviewerPage;
