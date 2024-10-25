import React, { useEffect, useState, useCallback } from 'react';
import useAuth from '../Hooks/useAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faImage, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import '../CSS/Dashboard.css';

const Admin = () => {
    const { isAdmin, user } = useAuth();
    return (
        <div>
            {isAdmin ? (
                <>
                    <p className="user-name">Welcome Admin, {user.name}</p>
                    <DisplayDataAdmin />
                </>
            ) : (
                <h1>Sorry, you are not an Admin</h1>
            )}
        </div>
    );
};

function DisplayDataAdmin() {
    const [groupedPapers, setGroupedPapers] = useState([]);
    const [reviewCounts, setReviewCounts] = useState({});
    const [statusFilter, setStatusFilter] = useState('all');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const papersPerPage = 5;
    const [dropdownOpen, setDropdownOpen] = useState(null);

    // Fetch grouped papers with pagination
    const fetchGroupedPapers = useCallback(async () => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_hostURL}/api/research/by-date?limit=${papersPerPage}&skip=${(currentPage - 1) * papersPerPage}&status=${statusFilter}`,
                {
                    method: 'GET',
                    credentials: 'include',
                }
            );

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Server Error: ${response.status} - ${errorText}`);
            }

            const data = await response.json();
            setGroupedPapers(data.papers);
            setTotalPages(Math.ceil(data.total / papersPerPage));
            setReviewCounts(data.reviewCounts);

        } catch (error) {
            console.error('Error fetching grouped research papers:', error);
        }
    }, [currentPage, statusFilter]);

    useEffect(() => {
        fetchGroupedPapers();
    }, [fetchGroupedPapers, currentPage, statusFilter]);

    const handlePageClick = (page) => {
        setCurrentPage(page);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleMarkAsReviewed = async (paperId) => {
        await updatePaperStatus(paperId, 'reviewed');
    };

    const handleReject = async (paperId) => {
        await updatePaperStatus(paperId, 'rejected');
    };

    const updatePaperStatus = async (paperId, status) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_hostURL}/api/research/status/${paperId}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status })
            });

            if (response.ok) {
                setSnackbarMessage(`Paper marked as ${status}!`);
                setSnackbarOpen(true);
                fetchGroupedPapers();
            } else {
                const errorText = await response.text();
                throw new Error(`Failed to mark as ${status}: ${errorText}`);
            }
        } catch (error) {
            console.error(`Error marking paper as ${status}:`, error);
            setSnackbarMessage(`Error marking paper as ${status}`);
            setSnackbarOpen(true);
        }
    };

    // Function to toggle dropdown visibility
    const toggleDropdown = (paperId) => {
        setDropdownOpen((prev) => (prev === paperId ? null : paperId));
    };

    // Function to hide dropdown when mouse leaves
    const hideDropdown = () => {
        setDropdownOpen(null);
    };

    return (
        <div className="dashboard-container">
            <h1>Admin Dashboard</h1>

            {/* Summary Section for Paper Counts */}
            <div className="summary-section">
                <div className="summary-item">
                    <span className="summary-label">Total:</span>
                    <span className="summary-count">{reviewCounts.total}</span>
                </div>
                <div className="summary-item">
                    <span className="summary-label">Under Review:</span>
                    <span className="summary-count">{reviewCounts.underReview}</span>
                </div>
                <div className="summary-item">
                    <span className="summary-label">Reviewed:</span>
                    <span className="summary-count">{reviewCounts.reviewed}</span>
                </div>
                <div className="summary-item">
                    <span className="summary-label">Rejected:</span>
                    <span className="summary-count">{reviewCounts.rejected}</span>
                </div>
            </div>

            <div className="top-buttons">
                <button className={`filter-btn ${statusFilter === 'all' ? 'active' : ''}`} onClick={() => setStatusFilter('all')}>All</button>
                <button className={`filter-btn ${statusFilter === 'under review' ? 'active' : ''}`} onClick={() => setStatusFilter('under review')}>Under Review</button>
                <button className={`filter-btn ${statusFilter === 'reviewed' ? 'active' : ''}`} onClick={() => setStatusFilter('reviewed')}>Reviewed</button>
                <button className={`filter-btn ${statusFilter === 'rejected' ? 'active' : ''}`} onClick={() => setStatusFilter('rejected')}>Rejected</button>
            </div>

            {groupedPapers.map((paper) => (
                <div className="paper-card" key={paper._id}>
                    <div className="left-thumbnail">
                        {paper.thumbnail ? (
                            <img
                                src={`${process.env.REACT_APP_hostURL}/api/uploads/thumbnails/${paper.thumbnail}`}
                                alt="thumbnail"
                            />
                        ) : (
                            <FontAwesomeIcon icon={faImage} className="placeholder-icon" />
                        )}
                    </div>
                    <div className="right-details">
                        <h3 className="paper-title" onClick={() => window.open(`/view/${paper._id}`, '_blank')}>
                            {paper.title || 'No Title'}
                        </h3>
                        <p className="paper-abstract">
                            {paper.abstract?.length > 100 ? paper.abstract.substring(0, 100) + '...' : paper.abstract || 'No Abstract'}
                        </p>
                        <span className="author-name">{paper.author || 'Unknown Author'}</span>
                        <span className="user-email">{paper.email || 'Unknown Email'}</span>
                        <div className="paper-footer">
                            <span className={`status-label status-${paper.status.toLowerCase().replace(/\s+/g, '-')}`}>
                                {paper.status || 'Under Review'}
                            </span>
                            <div className="options-menu">
                                <FontAwesomeIcon
                                    icon={faEllipsisV}
                                    className="options-icon"
                                    onClick={() => toggleDropdown(paper._id)}
                                />
                                {dropdownOpen === paper._id && (
                                    <div className="dropdown-menu" onMouseLeave={hideDropdown}>
                                        <div className='dropdown-element' onClick={() => handleMarkAsReviewed(paper._id)}>
                                            <FontAwesomeIcon icon={faCheck} className="menu-icon" /> Mark as Reviewed
                                        </div>
                                        <div className='dropdown-element' onClick={() => handleReject(paper._id)}>
                                            <FontAwesomeIcon icon={faTimes} className="menu-icon" /> Reject
                                        </div>
                                        <div className='dropdown-element'>
                                            <a href={`${process.env.REACT_APP_hostURL}/api/uploads/${paper.filePath}`} target="_blank" rel="noopener noreferrer" download>View Pdf</a>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Pagination */}
            <div className="pagination">
                {currentPage > 1 && (
                    <button className='page-btn' onClick={() => handlePageClick(currentPage - 1)}>Previous</button>
                )}
                {[...Array(Math.min(totalPages, 5))].map((_, i) => (
                    <button key={i} className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`} onClick={() => handlePageClick(i + 1)}>
                        {i + 1}
                    </button>
                ))}
                {totalPages > 5 && (
                    <>
                        <span>...</span>
                        <button className="page-btn" onClick={() => handlePageClick(totalPages)}>
                            {totalPages}
                        </button>
                    </>
                )}
                {currentPage < totalPages && (
                    <button className='page-btn' onClick={() => handlePageClick(currentPage + 1)}>Next</button>
                )}
            </div>

            {/* Snackbar */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleSnackbarClose} severity="success">
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default Admin;
