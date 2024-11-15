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
                setAssignedPapers(data.papers.reverse()); // Newest papers on top
            } catch (error) {
                console.error("Error fetching papers:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAssignedPapers();
    }, [selectedStatus]);

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
            <h2>Reviewer Console</h2>
            <h3>Welcome, {user.name}</h3>
            <div className="top-banner">
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
                <button
                    onClick={() => setSelectedStatus("all")}
                    className={selectedStatus === "all" ? "active" : ""}
                >
                    All
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
                                <div className="left-thumbnail">
                                    {paper.paperData.thumbnail ? (
                                        <img
                                            src={`${process.env.REACT_APP_hostURL}/api/uploads/thumbnails/${paper.paperData.thumbnail}`}
                                            alt="thumbnail"
                                        />
                                    ) : (
                                        <FontAwesomeIcon icon={faImage} className="placeholder-icon" />
                                    )}
                                </div>
                                <p>{paper.paperData.title}</p>
                                <button
                                    onClick={() =>
                                        window.open(`/view/${paper.paperData._id}`, "_blank")
                                    }
                                >
                                    View paper
                                </button>
                                <p className="abstract">
                                    {paper.paperData.abstract.length > 100
                                        ? `${paper.paperData.abstract.substring(0, 100)}...`
                                        : paper.paperData.abstract}
                                    {paper.paperData.abstract.length > 100 && (
                                        <span
                                            className="view-more"
                                            onClick={() =>
                                                setCurrentPaper({
                                                    ...paper,
                                                    showFullAbstract: !paper.showFullAbstract,
                                                })
                                            }
                                        >
                                            {paper.showFullAbstract ? " Show Less" : " Read More"}
                                        </span>
                                    )}
                                </p>
                            </div>
                            {paper.comments.length !== 0 ? (
                                <>
                                    <button className="view-review">
                                        <FontAwesomeIcon icon={faEye} /> View Review
                                    </button>
                                    <button className="edit-review">
                                        <FontAwesomeIcon icon={faEdit} /> Edit Review
                                    </button>
                                </>
                            ) : (
                                <button onClick={() => handleSelectPaper(paper)}>
                                    Add Feedback
                                </button>
                            )}
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
                                    placeholder="Add a comment..."
                                ></textarea>
                                <button onClick={handleAddComment} className="post-btn">
                                    <FontAwesomeIcon icon={faPaperPlane} /> Post
                                </button>
                            </div>
                        </div>
                    ) : null}
                </div>
            )}
        </div>
    );
};

export default ReviewerDashboard;
