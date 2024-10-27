import React, { useEffect, useState, useCallback } from 'react';
import useAuth from '../Hooks/useAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faImage, faCheck } from '@fortawesome/free-solid-svg-icons';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import '../CSS/Dashboard.css';
import '../CSS/Loader.css';
import Loader from '../Components/Loader';

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
    const [loading, setLoading] = useState(true);
    const [paginationLoading, setPaginationLoading] = useState(true);
    const papersPerPage = 5;
    const [dropdownOpen, setDropdownOpen] = useState(null);


    const groupPapersByDate = (papers) => {
        return papers.reduce((acc, paper) => {
            const date = new Date(paper.createdAt);
            const monthYear = date.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
            if (!acc[monthYear]) acc[monthYear] = [];
            acc[monthYear].push(paper);
            return acc;
        }, {});
    };


    // Fetch grouped papers with pagination
    const fetchGroupedPapers = useCallback(async () => {
        if (currentPage === 1 || currentPage !== 1 || statusFilter !== 'all') {
            setLoading(true);
        }
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
            setGroupedPapers(groupPapersByDate(data.papers));
            setTotalPages(Math.ceil(data.total / papersPerPage));
            setReviewCounts(data.reviewCounts);

        } catch (error) {
            console.error('Error fetching grouped research papers:', error);
        } finally {
            setLoading(false);
            setPaginationLoading(false);
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
            {paginationLoading ? (
                <Loader />
            ) : (
                <>
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

                    {/* Filter Buttons */}
                    <div className="top-buttons">
                        <button
                            className={`filter-btn ${statusFilter === 'all' ? 'active' : ''}`}
                            onClick={() => {
                                setStatusFilter('all');
                                setCurrentPage(1);
                            }}
                        >
                            All
                        </button>
                        <button
                            className={`filter-btn ${statusFilter === 'under review' ? 'active' : ''}`}
                            onClick={() => {
                                setStatusFilter('under review');
                                setCurrentPage(1);
                            }}
                        >
                            Under Review
                        </button>
                        <button
                            className={`filter-btn ${statusFilter === 'reviewed' ? 'active' : ''}`}
                            onClick={() => {
                                setStatusFilter('reviewed');
                                setCurrentPage(1);
                            }}
                        >
                            Reviewed
                        </button>
                        <button
                            className={`filter-btn ${statusFilter === 'rejected' ? 'active' : ''}`}
                            onClick={() => {
                                setStatusFilter('rejected');
                                setCurrentPage(1);
                            }}
                        >
                            Rejected
                        </button>
                    </div>

                </>
            )}

            {loading ? (
                <Loader />
            ) : (
                <>
                    {Object.entries(groupedPapers).map(([monthYear, papers]) => (
                        <div key={monthYear}>
                            <h2 className="month-year-header">{monthYear}</h2>
                            {papers.map((paper) => (
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

                                    <div className="right-details" style={{ padding: '16px', border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: '#fafafa' }}>
                                        <div className="options-menu" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <h3 className="paper-title" onClick={() => window.open(`/view/${paper._id}`, '_blank')} style={{ margin: 0, fontSize: '1.2rem', fontWeight: 'bold', color: '#333', cursor: 'pointer' }}>
                                                {paper.title || 'No Title'}
                                            </h3>
                                            <FontAwesomeIcon
                                                icon={faEllipsisV}
                                                className="options-icon"
                                                onClick={() => toggleDropdown(paper._id)}
                                                style={{ cursor: 'pointer', color: '#666' }}
                                            />
                                            {dropdownOpen === paper._id && (
                                                <div className="dropdown-menu" onMouseLeave={hideDropdown} style={{
                                                    position: 'absolute',
                                                    backgroundColor: '#fff',
                                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                                    borderRadius: '4px',
                                                    padding: '8px',
                                                    right: 0,
                                                    top: '30px',
                                                    zIndex: 10,
                                                    minWidth: '150px'
                                                }}>
                                                    <div className='dropdown-element'
                                                        onClick={() => paper.status === 'reviewed' ? null : handleMarkAsReviewed(paper._id)}>
                                                        <FontAwesomeIcon icon={faCheck} className="menu-icon" style={{ color: 'green', fontWeight: 'bold' }} /> Mark as Reviewed
                                                    </div>

                                                    <div className='dropdown-element'
                                                        onClick={() => paper.status === 'rejected' ? null : handleReject(paper._id)}>
                                                        <span role="img" aria-label="reject">❌</span> Reject
                                                    </div>

                                                    <div className='dropdown-element'>
                                                        <a href={`${process.env.REACT_APP_hostURL}/api/uploads/${paper.filePath}`} target="_blank" rel="noopener noreferrer" download>View Pdf</a>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <p className="paper-abstract" style={{ color: '#555', fontSize: '1rem', marginTop: '8px' }}>
                                            {paper.abstract?.length > 100 ? paper.abstract.substring(0, 100) + '...' : paper.abstract || 'No Abstract'}
                                        </p>

                                        <div className='flex-user-details' style={{
                                            display: 'flex', flexDirection: 'column', gap: '4px', padding: '12px', border: '1px solid #e0e0e0', borderRadius: '6px', backgroundColor: '#f9f9f9', marginTop: '12px'
                                        }}>
                                            <span className="author-name" style={{ fontWeight: 'bold', fontSize: '1rem', color: '#333' }}>
                                                Author: {paper.author || 'Unknown Author'}
                                            </span>
                                            <span className="user-email" style={{ color: '#555' }}>
                                                Published by: {paper.email || 'Unknown Email'}
                                            </span>

                                            <div style={{ display: 'flex', fontSize: '0.9rem', color: '#777', gap: '8px' }}>
                                                <span className="user-createdAt">
                                                    Created At: {paper.createdAt ? new Date(paper.createdAt).toLocaleDateString('en-GB') : 'Unknown creation'}
                                                </span>
                                                {paper.createdAt !== paper.updatedAt && (
                                                    <span className="user-updatedAt">
                                                        Updated At: {paper.updatedAt ? new Date(paper.updatedAt).toLocaleDateString('en-GB') : 'Unknown updation'}
                                                    </span>
                                                )}
                                            </div>

                                            <span className={`status-label status-${paper.status.toLowerCase().replace(/\s+/g, '-')}`} style={{
                                                display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold', fontSize: '1rem', marginTop: '8px'
                                            }}>
                                                {paper.status === 'reviewed' ? (
                                                    <>
                                                        <span style={{ color: 'green' }}>✔✔</span> Reviewed
                                                    </>
                                                ) : paper.status === 'rejected' ? (
                                                    <>
                                                        <span style={{ color: 'red' }}>❌</span> Rejected
                                                    </>
                                                ) : (
                                                    <>
                                                        <span style={{ color: 'gold' }}>●</span> Under Review
                                                    </>
                                                )}
                                            </span>
                                        </div>
                                    </div>

                                </div>
                            ))}
                        </div>
                    ))}
                </>
            )}


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
