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
import ProfileBox from "../Components/ReviewerProfileBox";

const ReviewerPage = () => {
    const { id: paperId } = useParams();
    const [showBox, setShowBox] = useState(false);
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
    const [invited, setInvited] = useState(false);
    const [loadData, setLoadData] = useState(true);
    const [reviewerStatuses, setReviewerStatuses] = useState([]);
    const [mergedData, setMergedData] = useState([]);
    const [hoveredReviewer, setHoveredReviewer] = useState(null);

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

    useEffect(() => {
        const fetchReviewerStatuses = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_hostURL}/api/reviewer/check-status`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ paperId }),
                    credentials: 'include',
                });

                const data = await response.json();
                const sortedStatuses = [...data.reviewersStatus].sort((a, b) => {
                    const statusOrder = { 'not invited': 0, 'not accepted': 1, 'accepted': 2 };
                    return statusOrder[a.status] - statusOrder[b.status];
                });

                setReviewerStatuses(sortedStatuses);
            } catch (error) {
                console.error("Error fetching reviewer statuses:", error);
            }
        };
        fetchReviewerStatuses();
    }, [paperId, showBox, invited, reviewerStatuses]);

    const getButtonStyles = (status) => {
        switch (status) {
            case 'not invited':
                return { backgroundColor: '#007bff', color: 'white', label: 'Invite', disabled: false };
            case 'not accepted':
                return { backgroundColor: '#0069d9', color: 'white', label: 'Re-Invite', disabled: false };
            case 'accepted':
                return { backgroundColor: '#28a745', color: 'white', label: 'Invited', disabled: true };
            case 'rejected':
                return { backgroundColor: '#ff5733', color: 'white', label: 'Rejected', disabled: true };
            default:
                return { backgroundColor: '#ccc', color: 'black', label: 'Unknown', disabled: true };
        }
    };


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
            const hasNoFeedback =
                !data.paperAssignment ||
                data.paperAssignment.every((comment) => comment.comments.length === 0);
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
                const response = await fetch(
                    `${process.env.REACT_APP_hostURL}/api/reviewer/exist/all`,
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );
                const data = await response.json();
                setReviewers(data);
                setLoadData(false);
            } catch (error) {
                console.error("Error fetching reviewers:", error);
            }
        };

        fetchReviewers();
    }, [showBox, invited]);

    useEffect(() => {
        if (reviewerStatuses.length > 0 && reviewers.length > 0) {
            const merged = reviewerStatuses.map((status) => {
                const matchingReviewer = reviewers.find((reviewer) => reviewer.email === status.email);
                return {
                    ...status,
                    name: matchingReviewer ? matchingReviewer.name : "N/A",
                };
            });
            setMergedData(merged);
        }
    }, [reviewerStatuses, reviewers]);

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

    const sendInvite = async (emailValue) => {
        if (!validateEmail(emailValue)) {
            setMessage("Invalid email address.");
            setSnackbarOpen(true);
            return;
        }

        const inviteData = { email: emailValue.trim().toLowerCase(), paperId };

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
            setInvited(true);

            if (response.ok) setEmail("");
        } catch (error) {
            setMessage("Error sending invite.");
            setSnackbarOpen(true);
            console.error("Error:", error);
        }
    };
    const emailToNameMap = {};
    reviewers.forEach((reviewer) => {
        emailToNameMap[reviewer.email] = reviewer.name || "Unknown Reviewer";
    });

    const handleInputClick = () => {
        setLoadData(true);
        if (reviewers.length >= 1) {
            setShowBox(true);
            setLoadData(false);
        }
    };


    const handleInviteClick = async (emailValue) => {
        sendInvite(emailValue);
    };

    const handleCloseBox = () => {
        setShowBox(false);
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="discussion-page-container" id="discussion-page">
            {paperExists === true ? (
                <div className="discussion-content" id="discussion-content">
                    <h1 className="discussion-title" id="discussion-title">
                        Discussion Page
                    </h1>
                    <h2 className="paper-title" id="paper-title">
                        Title: {paper?.title || "Unknown Title"}
                    </h2>
                    <p className="paper-author" id="paper-author">
                        Author: {paper?.author || "Unknown Author"}, Email:{" "}
                        {paper?.email || "Unknown Email"}
                    </p>
                    <p className="paper-date" id="paper-date">
                        Published On:{" "}
                        {paper?.createdAt
                            ? new Date(paper.createdAt).toLocaleDateString()
                            : "Unknown Date"}
                    </p>

                    <Box
                        className="invite-section"
                        id="invite-section"
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
                            wordBreak: "break-word",
                        }}
                        onMouseLeave={() => setHoveredReviewer(null)}
                    >
                        <Autocomplete
                            className="reviewer-autocomplete"
                            id="reviewer-autocomplete"
                            options={[]}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Select or Enter Email"
                                    fullWidth
                                />
                            )}
                            value={email}
                            onInputChange={handleEmailChange}
                            onOpen={handleInputClick}
                            freeSolo
                            sx={{ flex: 1 }}
                        />
                        <Button
                            className="send-invite-button"
                            id="send-invite-button"
                            variant="contained"
                            color="primary"
                            onClick={() => sendInvite(email)}
                            disabled={!email}
                            sx={{ whiteSpace: "nowrap" }}
                        >
                            Send Invite
                        </Button>

                        {/* Modal box that appears when showBox is true */}
                        {showBox && (
                            <div
                                style={{
                                    position: "absolute",
                                    top: "65%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                    backgroundColor: "white",
                                    color: "black",
                                    padding: "0 20px 20px 20px",
                                    borderRadius: "8px",
                                    zIndex: 9999,
                                    width: "50vw",
                                    maxHeight: "800px",
                                    // overflowY: "auto",
                                    opacity: 0.95,
                                }}
                            >
                                {loadData && <span className="loader"></span>}
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                        alignItems: 'flex-start',
                                        width: '100%',
                                    }}
                                >
                                    <button
                                        style={{
                                            top: "10px",
                                            right: "10px",
                                            background: "transparent",
                                            border: "none",
                                            color: "black",
                                            fontSize: "40px",
                                            cursor: "pointer",
                                            borderRadius: "50%",
                                            outline: "none",
                                        }}
                                        onClick={handleCloseBox}
                                        onMouseEnter={(e) => (e.target.style.color = "#ff5733")}
                                        onMouseLeave={(e) => (e.target.style.color = "black")}
                                    >
                                        &times;
                                    </button>
                                </div>

                                <div
                                    style={{
                                        display: "flex",
                                        gap: "10px",
                                        alignItems: "center",
                                        marginBottom: "15px",
                                    }}
                                >
                                    {/* Autocomplete inside the modal */}
                                    <Autocomplete
                                        className="reviewer-autocomplete-box"
                                        id="reviewer-autocomplete-modal-box"
                                        options={[]}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Select or Enter Email"
                                                fullWidth
                                            />
                                        )}
                                        value={email}
                                        onInputChange={handleEmailChange}
                                        onOpen={handleInputClick}
                                        freeSolo
                                        sx={{ flex: 1 }}
                                    />
                                    <Button
                                        className="send-invite-button-box"
                                        id="send-invite-button-modal-box"
                                        variant="contained"
                                        color="primary"
                                        onClick={() => sendInvite(email)}
                                        disabled={!email}
                                        sx={{ whiteSpace: "nowrap" }}
                                    >
                                        Send Invite
                                    </Button>
                                </div>

                                {/* Displaying the reviewers' information */}
                                <div
                                    style={{
                                        maxHeight: "450px",
                                        overflowY: "auto",
                                    }}
                                >
                                    {mergedData.map((reviewer, index) => {
                                        const { backgroundColor, color, label, disabled } = getButtonStyles(reviewer.status);

                                        return (
                                            <div
                                                key={`${reviewer.email}-${index}`}
                                                style={{
                                                    marginBottom: "15px",
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    border: "1px solid #ccc",
                                                    padding: "10px",
                                                    borderRadius: "8px",
                                                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                                    justifyContent: "space-between",
                                                }}
                                            >
                                                <div key={reviewer.email} style={{ display: "flex", flexDirection: "column", justifyContent: "center", cursor: 'pointer', position: 'relative' }} onMouseEnter={() => setHoveredReviewer(reviewer.email)}>
                                                    <p>
                                                        <strong>Name:</strong> {reviewer.name || "N/A"}
                                                    </p>
                                                    <p>
                                                        <strong>Email:</strong> {reviewer.email}
                                                    </p>
                                                    {hoveredReviewer === reviewer.email && (
                                                        <ProfileBox email={reviewer.email} />
                                                    )}
                                                </div>
                                                <button
                                                    className="btn"
                                                    onClick={() => handleInviteClick(reviewer.email)}
                                                    style={{
                                                        width: "120px",
                                                        height: "40px",
                                                        backgroundColor,
                                                        color,
                                                        border: "none",
                                                        borderRadius: "5px",
                                                        cursor: disabled ? "not-allowed" : "pointer",
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        fontSize: "14px",
                                                        opacity: disabled ? 0.6 : 1,
                                                    }}
                                                    disabled={disabled}
                                                >
                                                    {label}
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </Box>

                    <Snackbar
                        className="snackbar"
                        id="snackbar"
                        open={snackbarOpen}
                        autoHideDuration={3000}
                        onClose={() => setSnackbarOpen(false)}
                        message={message}
                        anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    />
                    <div className="comments-section" id="comments-section">
                        <h2 className="comments-header" id="comments-header">
                            {!feedbackMessage && "Comments"}
                        </h2>
                        {comments.length > 0
                            ? comments
                                .slice()
                                .reverse()
                                .map(
                                    (comment) =>
                                        Array.isArray(comment.comments) &&
                                        comment.comments.length > 0 && (
                                            <div
                                                key={comment._id}
                                                className="comment-box"
                                                id={`comment-${comment._id}`}
                                            >
                                                <Box
                                                    className="comment-content"
                                                    id="comment-content"
                                                    sx={{
                                                        border: "1px solid #ddd",
                                                        padding: 2,
                                                        marginBottom: 2,
                                                        borderRadius: 2,
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                    }}
                                                >
                                                    <div
                                                        className="comment-header"
                                                        id="comment-header"
                                                        style={{
                                                            display: "flex",
                                                            justifyContent: "space-between",
                                                            wordBreak: "break-word",
                                                        }}
                                                    >
                                                        <p
                                                            key={comment.paperId}
                                                            className="comment-author"
                                                            id={`comment-author-${comment._id}`}
                                                        >
                                                            Feedback by:{" "}
                                                            {emailToNameMap[comment.email] || "Unknown"} (
                                                            {comment.email})
                                                        </p>
                                                        <button
                                                            className="toggle-suggestion-button btn btn-outline-info"
                                                            style={{ maxHeight: "45px" }}
                                                            id={`toggle-suggestion-${comment._id}`}
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
                                                            {activeCommentId === comment._id
                                                                ? "Close Suggestion"
                                                                : "Add Suggestion"}
                                                        </button>
                                                    </div>
                                                    <div id="scroll-comment-box" style={{ overflowY: 'auto', flexGrow: 1 }}>
                                                        {comment.comments.length > 0
                                                            ? comment.comments.map((innerComment) => {
                                                                const roleClass =
                                                                    innerComment.role === "admin"
                                                                        ? innerComment.userId === user.id
                                                                            ? "inner-comment you"
                                                                            : "inner-comment admin"
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
                                                                            <strong>
                                                                                {innerComment.role === "admin"
                                                                                    ? innerComment.userId === user.id
                                                                                        ? "You"
                                                                                        : "Admin"
                                                                                    : "Reviewer"}
                                                                                :
                                                                            </strong>
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
                                                            : ""}
                                                    </div>
                                                </Box>
                                                {activeCommentId === comment._id && (
                                                    <Box
                                                        className="comment-input-section"
                                                        id="comment-input-section"
                                                        sx={{ marginTop: 4 }}
                                                    >
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
                                                            className="submit-comment-button"
                                                            id="submit-comment-button"
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
                                )
                            : ""}
                        <p className="no-comments-message" id="no-comments-message">
                            {feedbackMessage ? "Paper has no Feedback yet" : ""}
                        </p>
                    </div>
                </div>
            ) : (
                <h1>404 page not found!!!</h1>
            )}
        </div>
    );
};

export default ReviewerPage;
