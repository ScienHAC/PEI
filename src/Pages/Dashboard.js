import React, { useEffect, useState } from 'react';
import useAuth from '../Hooks/useAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faImage } from '@fortawesome/free-solid-svg-icons';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import '../CSS/Dashboard.css';
import Loader from '../MyComponents/Loader';

const Dashboard = () => {
    const { user } = useAuth();
    const [papers, setPapers] = useState([]);
    const [statusFilter, setStatusFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const [editOpen, setEditOpen] = useState(null);
    const [updatedPapers, setUpdatedPapers] = useState({});
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const papersPerPage = 5;

    useEffect(() => {
        const fetchPapers = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_hostURL}/api/research`, {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Server Error: ${response.status} - ${errorText}`);
                }
                const result = await response.json();
                const data = result.reverse();
                setPapers(data);
            } catch (error) {
                console.error('Error fetching research papers:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPapers();
    }, []);

    // Calculate total counts
    const totalPapers = papers.length;
    const totalUnderReview = papers.filter(paper => paper.status === 'under review').length;
    const totalReviewed = papers.filter(paper => paper.status === 'reviewed').length;
    const totalRejected = papers.filter(paper => paper.status === 'rejected').length;

    const filteredPapers = papers.filter(paper => {
        if (statusFilter === 'all') return true;
        return paper.status === statusFilter;
    });

    const indexOfLastPaper = currentPage * papersPerPage;
    const indexOfFirstPaper = indexOfLastPaper - papersPerPage;
    const currentPapers = filteredPapers.slice(indexOfFirstPaper, indexOfLastPaper);
    const totalPages = Math.ceil(filteredPapers.length / papersPerPage);

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    const toggleDropdown = (paperId) => {
        setDropdownOpen(dropdownOpen === paperId ? null : paperId);
    };

    const hideDropdown = () => {
        setDropdownOpen(null);
    };

    const toggleEdit = (paperId) => {
        setEditOpen(editOpen === paperId ? null : paperId);
        setUpdatedPapers((prev) => ({ ...prev, [paperId]: {} }));
    };

    const handleInputChange = (e, paperId, field) => {
        const value = field === 'thumbnail' ? e.target.files[0] : e.target.value;

        setUpdatedPapers((prev) => ({
            ...prev,
            [paperId]: {
                ...prev[paperId],
                [field]: value
            }
        }));
    };

    const handleSave = async (paper) => {
        try {
            const formData = new FormData();

            formData.append('title', updatedPapers[paper._id]?.title || paper.title);
            formData.append('abstract', updatedPapers[paper._id]?.abstract || paper.abstract);

            if (updatedPapers[paper._id]?.thumbnail) {
                formData.append('thumbnail', updatedPapers[paper._id].thumbnail);
            }

            const response = await fetch(`${process.env.REACT_APP_hostURL}/api/publish/research/${paper._id}`, {
                method: 'PUT',
                credentials: 'include',
                body: formData,
            });

            if (response.ok) {
                const updatedPaper = await response.json();
                setPapers((prevPapers) =>
                    prevPapers.map((prevPaper) =>
                        prevPaper._id === updatedPaper._id ? updatedPaper : prevPaper
                    )
                );

                setSnackbarMessage('Paper updated successfully!');
                setSnackbarOpen(true);
                setEditOpen(null);
            } else {
                const errorText = await response.text();
                throw new Error(`Failed to update paper: ${errorText}`);
            }
        } catch (error) {
            console.error('Error updating paper:', error);
            setSnackbarMessage('Error updating paper');
            setSnackbarOpen(true);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <div className="dashboard-container">
            <p className="user-name">Welcome back, {user.name}</p>
            <h1>Dashboard</h1>
            {loading ? (
                <Loader />
            ) : (
                <>

                    {/* Summary Section for Paper Counts */}
                    <div className="summary-section">
                        <div className="summary-item">
                            <span className="summary-label">Total:</span>
                            <span className="summary-count">{totalPapers}</span>
                        </div>
                        <div className="summary-item">
                            <span className="summary-label">Under Review:</span>
                            <span className="summary-count">{totalUnderReview}</span>
                        </div>
                        <div className="summary-item">
                            <span className="summary-label">Reviewed:</span>
                            <span className="summary-count">{totalReviewed}</span>
                        </div>
                        <div className="summary-item">
                            <span className="summary-label">Rejected:</span>
                            <span className="summary-count">{totalRejected}</span>
                        </div>
                    </div>

                    {/* <div className="top-buttons">
                        <button className={`filter-btn ${statusFilter === 'all' ? 'active' : ''}`} onClick={() => setStatusFilter('all')}>All</button>
                        <button className={`filter-btn ${statusFilter === 'under review' ? 'active' : ''}`} onClick={() => setStatusFilter('under review')}>Under Review</button>
                        <button className={`filter-btn ${statusFilter === 'reviewed' ? 'active' : ''}`} onClick={() => setStatusFilter('reviewed')}>Reviewed</button>
                        <button className={`filter-btn ${statusFilter === 'rejected' ? 'active' : ''}`} onClick={() => setStatusFilter('rejected')}>Rejected</button>
                    </div> */}
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

            <div className="paper-list">
                {loading ? (
                    <Loader />
                ) : (
                    <>
                        {currentPapers.map((paper) => (
                            paper && paper._id && (
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
                                        <h3
                                            className="paper-title"
                                            onClick={() => window.open(`/view/${paper._id}`, '_blank')}
                                            style={{
                                                fontFamily: "'Roboto Slab', serif", // Scientific, modern serif font
                                                fontSize: '1.3rem',
                                                fontWeight: 'bold',
                                                color: '#2C3E50',
                                                textAlign: 'left',
                                                marginBottom: '8px',
                                                cursor: 'pointer',
                                                lineHeight: '1.5',
                                            }}
                                        >
                                            {paper.title || 'No Title'}
                                        </h3>

                                        <p
                                            className="paper-abstract"
                                            style={{
                                                fontFamily: "'Open Sans', sans-serif", // Clean, readable sans-serif font
                                                fontSize: '1rem',
                                                color: '#5D6D7E',
                                                textAlign: 'justify',
                                                lineHeight: '1.6',
                                                marginBottom: '16px',
                                                backgroundColor: '#F8F9FA', // Light background for contrast
                                                padding: '10px',
                                                borderRadius: '8px',
                                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                            }}
                                        >
                                            {paper.abstract?.length > 100
                                                ? paper.abstract.substring(0, 100) + '...'
                                                : paper.abstract || 'No Abstract'}
                                        </p>

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
                                        {statusFilter === 'all' ? (
                                            <span className={`status-label status-${paper.status.toLowerCase().replace(/\s+/g, '-')}`} style={{
                                                display: 'flex', alignItems: 'center', gap: '6px', fontSize: '1rem', marginTop: '8px'
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
                                        ) : null}
                                        <div className="paper-footer">
                                            <span className="author-name">Author: {paper.author || 'Unknown Author'}</span>
                                            <div className="options-menu">
                                                <FontAwesomeIcon
                                                    icon={faEllipsisV}
                                                    className="options-icon"
                                                    onClick={() => toggleDropdown(paper._id)}
                                                />
                                                {dropdownOpen === paper._id && (
                                                    <div className="dropdown-menu" onMouseLeave={hideDropdown}>
                                                        <div className='dropdown-element'>
                                                            <a href={`${process.env.REACT_APP_hostURL}/api/uploads/${paper.filePath}`} target="_blank" rel="noopener noreferrer">View Pdf</a>
                                                        </div>
                                                        <div onClick={() => toggleEdit(paper._id)} className="dropdown-element">Edit</div>
                                                        <div className='dropdown-element'>
                                                            <a href={`${process.env.REACT_APP_hostURL}/api/uploads/${paper.filePath}`} download>Download</a>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Edit Form */}
                                        {editOpen === paper._id && (
                                            <div className="edit-form">
                                                <div>
                                                    <label>Title:</label>
                                                    <input
                                                        type="text"
                                                        value={updatedPapers[paper._id]?.title || paper.title || ''}
                                                        onChange={(e) => handleInputChange(e, paper._id, 'title')}
                                                    />
                                                </div>
                                                <div>
                                                    <label>Abstract:</label>
                                                    <textarea
                                                        value={updatedPapers[paper._id]?.abstract || paper.abstract || ''}
                                                        onChange={(e) => handleInputChange(e, paper._id, 'abstract')}
                                                    />
                                                </div>
                                                <div>
                                                    <label>Thumbnail:</label>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        className="rounded-file-input"
                                                        onChange={(e) => handleInputChange(e, paper._id, 'thumbnail')}
                                                    />
                                                </div>
                                                <button className="btn btn-success" onClick={() => handleSave(paper)}>Save</button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )
                        ))}
                    </>
                )}
            </div>

            {/* Pagination */}
            <div className="pagination">
                {currentPage > 1 && (
                    <button className="page-btn" onClick={handlePreviousPage} disabled={currentPage === 1}>
                        Previous
                    </button>
                )}

                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        className={`page-btn ${currentPage === index + 1 ? 'active' : ''}`}
                        onClick={() => handlePageClick(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
                {currentPage < totalPages && (
                    <button className="page-btn" onClick={handleNextPage} disabled={currentPage === totalPages}>
                        Next
                    </button>
                )}
            </div>

            {/* Snackbar for notifications */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleSnackbarClose} severity="success">
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Dashboard;
