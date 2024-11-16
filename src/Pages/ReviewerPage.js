import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import "../CSS/ReviewerPage.css";
import Loader from "../Components/Loader";
import useAuth from "../Hooks/useAuth";

const ReviewerPage = () => {
    const { id: paperId } = useParams();
    const { user } = useAuth();
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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkPaperExists = async () => {
            setLoading(true);
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
            } finally {
                setLoading(false);
            }
        };

        checkPaperExists();
    }, [paperId]);

    const fetchComments = useCallback(async () => {
        setLoading(true);
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
        } finally {
            setLoading(false);
        }
    }, [paperId]);

    const addComment = async (commentText) => {
        setLoading(true);
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
        } finally {
            setLoading(false);
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

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="discussion-page-container" id="discussion-page">
            {paperExists === true ? (
                <div className="discussion-content" id="discussion-content">
                    <h1 className="discussion-title" id="discussion-title">Discussion Page</h1>
                    <h2 className="paper-title" id="paper-title">Title: {paper?.title || "Unknown Title"}</h2>
                    <p className="paper-author" id="paper-author">Author: {paper?.author || "Unknown Author"}, Email: {paper?.email || "Unknown Email"}</p>
                    <p className="paper-date" id="paper-date">Published On: {paper?.createdAt ? new Date(paper.createdAt).toLocaleDateString() : "Unknown Date"}</p>

                    <Box
                        className="invite-section" id="invite-section"
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
                            className="reviewer-autocomplete" id="reviewer-autocomplete"
                            options={reviewers.map((reviewer) => reviewer.email)}
                            renderInput={(params) => (
                                <TextField {...params} label="Select or Enter Email" fullWidth />
                            )}
                            value={email}
                            onInputChange={handleEmailChange}
                            freeSolo
                            sx={{ flex: 1 }}
                        />
                        <Button
                            className="send-invite-button" id="send-invite-button"
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
                        className="snackbar" id="snackbar"
                        open={snackbarOpen}
                        autoHideDuration={3000}
                        onClose={() => setSnackbarOpen(false)}
                        message={message}
                        anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    />
                    <div className="comments-section" id="comments-section">
                        <h2 className="comments-header" id="comments-header">{!feedbackMessage && "Comments"}</h2>
                        {comments.length > 0 ? (
                            comments.slice().reverse().map((comment) => (
                                Array.isArray(comment.comments) && comment.comments.length > 0 && (
                                    <div key={comment._id} className="comment-box" id={`comment-${comment._id}`}>
                                        <Box
                                            className="comment-content" id="comment-content"
                                            sx={{
                                                border: "1px solid #ddd",
                                                padding: 2,
                                                marginBottom: 2,
                                                borderRadius: 2,
                                            }}
                                        >
                                            <div className="comment-header" id="comment-header" style={{ display: "flex", justifyContent: "space-between", wordBreak: "break-word" }}>
                                                <p key={comment.paperId} className="comment-author" id={`comment-author-${comment._id}`}>
                                                    Feedback by: {emailToNameMap[comment.email] || "Unknown"} ({comment.email})
                                                </p>
                                                <button
                                                    className="toggle-suggestion-button btn btn-outline-info" style={{ maxHeight: "45px" }} id={`toggle-suggestion-${comment._id}`}
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
                                                ? comment.comments.map((innerComment) => {
                                                    const roleClass = innerComment.role === "admin"
                                                        ? (innerComment.userId === user.id ? "inner-comment you" : "inner-comment admin")
                                                        : "inner-comment reviewer";

                                                    return (
                                                        <div
                                                            key={innerComment._id}
                                                            className={roleClass}
                                                            id={`inner-comment-${innerComment._id}`}
                                                        >
                                                            <p
                                                                className={`inner-comment-role ${roleClass}`}
                                                                id={`inner-comment-role-${innerComment._id}`}
                                                            >
                                                                <strong>{innerComment.role === "admin" ? (innerComment.userId === user.id ? "You" : "Admin") : "Reviewer"}:</strong>
                                                            </p>
                                                            <p
                                                                className="inner-comment-text"
                                                                id={`inner-comment-text-${innerComment._id}`}
                                                            >
                                                                {innerComment.commentText}
                                                            </p>
                                                        </div>
                                                    );
                                                })
                                                : ""
                                            }
                                        </Box>
                                        {activeCommentId === comment._id && (
                                            <Box className="comment-input-section" id="comment-input-section" sx={{ marginTop: 4 }}>
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
                                                    className="submit-comment-button" id="submit-comment-button"
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
                        <p className="no-comments-message" id="no-comments-message">{feedbackMessage ? "Paper has no Feedback yet" : ""}</p>
                    </div>
                </div>
            ) : (
                <h1>404 page not found!!!</h1>
            )}
        </div>
    );
};

export default ReviewerPage;
