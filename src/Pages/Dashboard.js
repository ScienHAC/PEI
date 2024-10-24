import React, { useEffect, useState } from 'react';
import useAuth from '../Hooks/useAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faImage } from '@fortawesome/free-solid-svg-icons';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert'; // For better styled alerts
import '../CSS/Dashboard.css'; // Assuming you will use custom CSS for styling

const Dashboard = () => {
    const { user } = useAuth();
    const [papers, setPapers] = useState([]);
    const [statusFilter, setStatusFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const [editOpen, setEditOpen] = useState(null); // Track which paper is being edited
    const [updatedPapers, setUpdatedPapers] = useState({});
    const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar state
    const [snackbarMessage, setSnackbarMessage] = useState(''); // Snackbar message
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

                const data = await response.json();
                setPapers(data);
            } catch (error) {
                console.error('Error fetching research papers:', error);
            }
        };

        fetchPapers();
    }, []);


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

    const toggleDropdown = (paperId) => {
        setDropdownOpen(dropdownOpen === paperId ? null : paperId);
    };

    const hideDropdown = () => {
        setDropdownOpen(null);
    };

    const toggleEdit = (paperId) => {
        setEditOpen(editOpen === paperId ? null : paperId);
        setUpdatedPapers((prev) => ({ ...prev, [paperId]: {} })); // Reset updated paper fields when toggling
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
            <br />
            <div className="top-buttons">
                <button className={`filter-btn ${statusFilter === 'all' ? 'active' : ''}`} onClick={() => setStatusFilter('all')}>All</button>
                <button className={`filter-btn ${statusFilter === 'under review' ? 'active' : ''}`} onClick={() => setStatusFilter('under review')}>Under Review</button>
                <button className={`filter-btn ${statusFilter === 'reviewed' ? 'active' : ''}`} onClick={() => setStatusFilter('reviewed')}>Reviewed</button>
            </div>

            <div className="paper-list">
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
                                <h3 className="paper-title" onClick={() => window.open(`/view/${paper._id}`, '_blank')}>
                                    {paper.title || 'No Title'}
                                </h3>
                                <p className="paper-abstract">
                                    {paper.abstract?.length > 100 ? paper.abstract.substring(0, 100) + '...' : paper.abstract || 'No Abstract'}
                                </p>
                                <div className="paper-footer">
                                    <span className="author-name">{paper.author || 'Unknown Author'}</span>
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



            </div>

            {/* Pagination */}
            <div className="pagination">
                {[...Array(totalPages)].map((_, i) => (
                    <button key={i} className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`} onClick={() => handlePageClick(i + 1)}>{i + 1}</button>
                ))}
                {totalPages > 5 && (
                    <>
                        <span>...</span>
                        <button className="page-btn" onClick={() => handlePageClick(totalPages)}>{totalPages}</button>
                    </>
                )}
            </div>

            {/* Snackbar for updates */}
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity="success">
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Dashboard;
