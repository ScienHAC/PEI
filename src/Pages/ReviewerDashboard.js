import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPaperPlane,
    faEdit,
    faEye,
    faTimes,
    faImage,
} from "@fortawesome/free-solid-svg-icons";
import Loader from "../Components/Loader";
import "../CSS/ReviewerDashboard.css";
import useAuth from "../Hooks/useAuth";
import Snackbar from "@mui/material/Snackbar";

const ReviewerDashboard = () => {
    const [assignedPapers, setAssignedPapers] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState("assigned");
    const [currentPaper, setCurrentPaper] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [loading, setLoading] = useState(true);
    const [commentLoading, setCommentLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [showcomments, setShowComments] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [postState, setPostState] = useState(false);
    const [message, setMessage] = useState("");
    const [reviewCounts, setReviewCounts] = useState({
        assigned: 0,
        completed: 0,
    });
    const { user } = useAuth();
    const papersPerPage = 5;

    useEffect(() => {
        const fetchAssignedPapers = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `${process.env.REACT_APP_hostURL}/api/reviewer/papers?status=${selectedStatus}`,
                    {
                        credentials: "include",
                    }
                );
                if (!response.ok) throw new Error("Failed to fetch papers");
                const data = await response.json();
                const { total, totalAssigned, totalCompleted, papers } = data;
                setAssignedPapers(papers.reverse());
                setReviewCounts({
                    total: total,
                    assigned: totalAssigned,
                    completed: totalCompleted,
                });
            } catch (error) {
                console.error("Error fetching papers:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAssignedPapers();
    }, [selectedStatus, postState]);

    const handleSelectPaper = async (paper) => {
        setShowComments(true);
        setCurrentPaper(paper);
        setCommentLoading(true);
        try {
            const response = await fetch(
                `${process.env.REACT_APP_hostURL}/api/reviewer/comments?paperId=${paper._id}`,
                {
                    credentials: "include",
                }
            );
            if (!response.ok) throw new Error("Failed to fetch comments");
            const data = await response.json();
            setComments(data.comments);
        } catch (error) {
            console.error("Error fetching comments:", error);
        } finally {
            setCommentLoading(false);
        }
    };

    const handleAddComment = async () => {
        if (!newComment.trim()) return;
        try {
            const response = await fetch(
                `${process.env.REACT_APP_hostURL}/api/reviewer/comments`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        paperId: currentPaper._id,
                        commentText: newComment,
                    }),
                    credentials: "include",
                }
            );
            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
            setComments([...comments, data.comment]);
            setNewComment("");
            setMessage("Feedback added successfully");
            setSnackbarOpen(true);
            setCurrentPaper((prev) => ({
                ...prev,
                comments: [...prev.comments, data.comment],
            }));
            setPostState(true);
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const displayedPapers = assignedPapers.slice(
        (currentPage - 1) * papersPerPage,
        currentPage * papersPerPage
    );
    const totalPages = Math.ceil(assignedPapers.length / papersPerPage);

    return (
        <div className="reviewer-dashboard">
            <h2 style={{ alignSelf: "flex-start" }}>Reviewer Console</h2>
            <h3 style={{ marginBottom: "20px" }}>Welcome, {user.name}</h3>
            <div className="summary-section" style={{ width: "100%" }}>
                <div className="summary-item">
                    <span className="summary-label">Total:</span>
                    <span className="summary-count">{reviewCounts.total}</span>
                </div>
                <div className="summary-item">
                    <span className="summary-label">Assigned:</span>
                    <span className="summary-count">{reviewCounts.assigned}</span>
                </div>
                <div className="summary-item">
                    <span className="summary-label">Completed:</span>
                    <span className="summary-count">{reviewCounts.completed}</span>
                </div>
            </div>
            <div className="top-banner">
                <button
                    onClick={() => setSelectedStatus("all")}
                    className={selectedStatus === "all" ? "active" : ""}
                >
                    All
                </button>
                <button
                    onClick={() => setSelectedStatus("assigned")}
                    className={selectedStatus === "assigned" ? "active" : ""}
                >
                    Assigned
                </button>
                <button
                    onClick={() => setSelectedStatus("completed")}
                    className={selectedStatus === "completed" ? "active" : ""}
                >
                    Completed
                </button>
            </div>

            {loading ? (
                <Loader />
            ) : (
                <div className="paper-list-reviewer">
                    <h3>Papers Assigned to You</h3>
                    {displayedPapers.map((paper) => (
                        <div key={paper._id} className="paper-item-reviewer">
                            <div className="paper-details">
                                <div className="paper-card flex-row" key={paper._id}>
                                    <div className="left-thumbnail">
                                        {paper.paperData.thumbnail ? (
                                            <img
                                                src={`${process.env.REACT_APP_hostURL}/api/uploads/thumbnails/${paper.paperData.thumbnail}`}
                                                alt="thumbnail"
                                            />
                                        ) : (
                                            <FontAwesomeIcon
                                                icon={faImage}
                                                className="placeholder-icon"
                                            />
                                        )}
                                    </div>
                                    <div
                                        className="right-details"
                                        style={{
                                            padding: "16px",
                                            border: "1px solid #e0e0e0",
                                            borderRadius: "8px",
                                            backgroundColor: "#fafafa",
                                        }}
                                    >
                                        <div
                                            className="flex-div"
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <p
                                                className="paper-title"
                                                onClick={() =>
                                                    window.open(`/view/${paper.paperData._id}`, "_blank")
                                                }
                                            >
                                                {paper.paperData.title}
                                            </p>
                                            {paper.comments.length !== 0 ? (
                                                <div className="viewEdit-review">
                                                    <button
                                                        className="view-review btn btn-primary"
                                                        onClick={() => handleSelectPaper(paper)}
                                                    >
                                                        <FontAwesomeIcon icon={faEye} /> View Review
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    className="btn btn-secondary"
                                                    onClick={() => handleSelectPaper(paper)}
                                                >
                                                    <FontAwesomeIcon icon={faEdit} /> Add Feedback
                                                </button>
                                            )}
                                        </div>
                                        <p className="abstract">
                                            <b>Abstract:</b>{" "}
                                            {currentPaper && currentPaper.showFullAbstract
                                                ? paper.paperData.abstract
                                                : paper.paperData.abstract.length > 100
                                                    ? `${paper.paperData.abstract.substring(0, 100)}...`
                                                    : paper.paperData.abstract}
                                            {paper.paperData.abstract.length > 100 && (
                                                <span
                                                    className="view-more"
                                                    onClick={() => {
                                                        if (currentPaper) {
                                                            // Toggle showFullAbstract only if currentPaper exists
                                                            setCurrentPaper((prev) => ({
                                                                ...prev,
                                                                showFullAbstract: !prev.showFullAbstract,
                                                            }));
                                                        } else {
                                                            // If currentPaper is null, set it to an initial state with showFullAbstract
                                                            setCurrentPaper({
                                                                ...paper,
                                                                showFullAbstract: true,
                                                            });
                                                        }
                                                    }}
                                                >
                                                    {currentPaper && currentPaper.showFullAbstract
                                                        ? " Show Less"
                                                        : " Read More"}
                                                </span>
                                            )}
                                        </p>
                                        <div
                                            className="flex-user-details"
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: "4px",
                                                padding: "12px",
                                                border: "1px solid #e0e0e0",
                                                borderRadius: "6px",
                                                backgroundColor: "#f9f9f9",
                                                marginTop: "12px",
                                            }}
                                        >
                                            <span
                                                className="author-name"
                                                style={{
                                                    fontWeight: "bold",
                                                    fontSize: "1rem",
                                                    color: "#333",
                                                }}
                                            >
                                                Author: {paper.paperData.author || "Unknown Author"}
                                            </span>
                                            <span className="user-email" style={{ color: "#555" }}>
                                                Published by: {paper.email || "Unknown Email"}
                                            </span>

                                            <div
                                                style={{
                                                    display: "flex",
                                                    fontSize: "0.9rem",
                                                    color: "#777",
                                                    gap: "8px",
                                                }}
                                            >
                                                <span className="user-createdAt">
                                                    Created At:{" "}
                                                    {paper.paperData.createdAt
                                                        ? new Date(
                                                            paper.paperData.createdAt
                                                        ).toLocaleDateString("en-GB")
                                                        : "Unknown creation"}
                                                </span>
                                                {paper.paperData.createdAt !==
                                                    paper.paperData.updatedAt && (
                                                        <span className="user-updatedAt">
                                                            Updated At:{" "}
                                                            {paper.paperData.updatedAt
                                                                ? new Date(
                                                                    paper.paperData.updatedAt
                                                                ).toLocaleDateString("en-GB")
                                                                : "Unknown updation"}
                                                        </span>
                                                    )}
                                            </div>
                                        </div>

                                        <button
                                            className="btn btn-link"
                                            onClick={() =>
                                                window.open(`/view/${paper.paperData._id}`, "_blank")
                                            }
                                        >
                                            View paper
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="pagination">
                {currentPage > 1 && (
                    <button
                        className="page-btn"
                        onClick={() => handlePageClick(currentPage - 1)}
                    >
                        Previous
                    </button>
                )}
                {[...Array(totalPages).keys()].map((i) => (
                    <button
                        key={i}
                        className={`page-btn ${currentPage === i + 1 ? "active" : ""}`}
                        onClick={() => handlePageClick(i + 1)}
                    >
                        {i + 1}
                    </button>
                ))}
                {currentPage < totalPages && (
                    <button
                        className="page-btn"
                        onClick={() => handlePageClick(currentPage + 1)}
                    >
                        Next
                    </button>
                )}
            </div>

            {showcomments && (
                <div className="comment-section" style={{ position: "fixed" }}>
                    {currentPaper ? (
                        <div>
                            {commentLoading && <Loader />}
                            <button onClick={() => setShowComments(false)} className="close">
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                            <h4>Feedback for: {currentPaper.paperData.title}</h4>
                            {comments.length !== 0 && (
                                <div className="comments-container">
                                    {comments.map((comment, index) => (
                                        <div
                                            key={index}
                                            className={`comment-item ${comment.role === "admin" ? "admin" : "reviewer"
                                                }`}
                                        >
                                            <p>{comment.commentText}</p>
                                            <span className="comment-role">
                                                {comment.role === "admin" ? "Admin" : "Reviewer"}
                                            </span>
                                            <span className="comment-date">
                                                {new Date(comment.createdAt).toLocaleString()}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="comment-input">
                                <textarea
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder="Add Feedback here..."
                                ></textarea>
                                <button onClick={handleAddComment} className="post-btn">
                                    <FontAwesomeIcon icon={faPaperPlane} /> Post
                                </button>
                            </div>
                        </div>
                    ) : null}
                </div>
            )}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                message={message}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            />
        </div>
    );
};

export default ReviewerDashboard;
