import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import '../CSS/ReviewerDashboard.css';

const ReviewerDashboard = () => {
    const [assignedPapers, setAssignedPapers] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('assigned');
    const [currentPaper, setCurrentPaper] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        const fetchAssignedPapers = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_hostURL}/api/reviewer/papers?status=${selectedStatus}`);
                if (!response.ok) throw new Error('Failed to fetch papers');
                const data = await response.json();
                setAssignedPapers(data.papers);
            } catch (error) {
                console.error('Error fetching papers:', error);
            }
        };
        fetchAssignedPapers();
    }, [selectedStatus]);

    const handleSelectPaper = async (paper) => {
        setCurrentPaper(paper);
        try {
            const response = await fetch(`${process.env.REACT_APP_hostURL}/api/reviewer/comments?paperId=${paper._id}`);
            if (!response.ok) throw new Error('Failed to fetch comments');
            const data = await response.json();
            setComments(data.comments);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const handleAddComment = async () => {
        if (!newComment.trim()) return;
        try {
            const response = await fetch(`${process.env.REACT_APP_hostURL}/api/reviewer/comments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    paperId: currentPaper._id,
                    comment: newComment
                })
            });
            if (!response.ok) throw new Error('Failed to add comment');
            const data = await response.json();
            setComments([...comments, data.comment]);
            setNewComment('');
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    return (
        <div className="reviewer-dashboard">
            <div className="top-banner">
                <button onClick={() => setSelectedStatus('assigned')} className={selectedStatus === 'assigned' ? 'active' : ''}>Assigned</button>
                <button onClick={() => setSelectedStatus('complete')} className={selectedStatus === 'complete' ? 'active' : ''}>Complete</button>
                <button onClick={() => setSelectedStatus('all')} className={selectedStatus === 'all' ? 'active' : ''}>All</button>
            </div>
            <div className="paper-list">
                <h3>Papers Assigned to You</h3>
                {assignedPapers.map((paper) => (
                    <div key={paper._id} className="paper-item" onClick={() => handleSelectPaper(paper)}>
                        <p>{paper.title}</p>
                    </div>
                ))}
            </div>
            <div className="comment-section">
                {currentPaper ? (
                    <div>
                        <h4>Comments for: {currentPaper.title}</h4>
                        <div className="comments-container">
                            {comments.map((comment, index) => (
                                <div key={index} className="comment-item">
                                    <p>{comment.text}</p>
                                    <span className="comment-date">{new Date(comment.createdAt).toLocaleString()}</span>
                                </div>
                            ))}
                        </div>
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
                ) : (
                    <p>Select a paper to view and add comments.</p>
                )}
            </div>
        </div>
    );
};

export default ReviewerDashboard;
