// import React, { useEffect, useState } from 'react';
// import useAuth from '../Hooks/useAuth';

// const Dashboard = () => {
//     const { user } = useAuth();
//     const [papers, setPapers] = useState([]);

//     // Fetch user's research papers
//     useEffect(() => {
//         const fetchPapers = async () => {
//             try {
//                 const response = await fetch(`${process.env.REACT_APP_hostURL}/api/research`, {
//                     method: 'GET',
//                     credentials: 'include',
//                 });

//                 if (!response.ok) {
//                     const errorText = await response.text(); // Read the response as text for debugging
//                     throw new Error(`Server Error: ${response.status} - ${errorText}`);
//                 }

//                 const data = await response.json();
//                 setPapers(data);
//             } catch (error) {
//                 console.error('Error fetching research papers:', error);
//             }
//         };


//         fetchPapers();
//     }, []);

//     return (
//         <div>
//             <h1>Hello, {user.name}</h1>
//             <h2>Your Research Papers</h2>
//             {papers.length === 0 ? (
//                 <p>No research papers uploaded yet.</p>
//             ) : (
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>Title</th>
//                             <th>View</th>
//                             <th>Download</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {papers.map((paper) => (
//                             <tr key={paper._id}>
//                                 <td>{paper.title}</td>
//                                 <td>
//                                     <a
//                                         href={`${process.env.REACT_APP_hostURL}/api/uploads/${paper.filePath}`}
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                     >
//                                         View
//                                     </a>
//                                 </td>
//                                 <td>
//                                     <a href={`${process.env.REACT_APP_hostURL}/api/uploads/${paper.filePath}`} target="_blank" rel="noopener noreferrer" download>
//                                         Download
//                                     </a>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             )}
//         </div>
//     );
// };

// export default Dashboard;

import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import '../CSS/Dashboard.css'; // Assuming you will use custom CSS for styling

const Dashboard = () => {
    const [papers, setPapers] = useState([]);
    const [statusFilter, setStatusFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [dropdownOpen, setDropdownOpen] = useState(null); // Track the open dropdown
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
        setDropdownOpen(dropdownOpen === paperId ? null : paperId); // Toggle dropdown open state
    };

    const hideDropdown = () => {
        setDropdownOpen(null);
    };

    return (
        <div className="dashboard-container">
            <div className="top-buttons">
                <button
                    className={`filter-btn ${statusFilter === 'all' ? 'active' : ''}`}
                    onClick={() => setStatusFilter('all')}
                >
                    All
                </button>
                <button
                    className={`filter-btn ${statusFilter === 'under review' ? 'active' : ''}`}
                    onClick={() => setStatusFilter('under review')}
                >
                    Under Review
                </button>
                <button
                    className={`filter-btn ${statusFilter === 'reviewed' ? 'active' : ''}`}
                    onClick={() => setStatusFilter('reviewed')}
                >
                    Reviewed
                </button>
            </div>

            <div className="paper-list">
                {currentPapers.map((paper) => (
                    <div className="paper-card" key={paper._id}>
                        <div className="left-thumbnail">
                            {paper.thumbnail ? (
                                <img src={`${process.env.REACT_APP_hostURL}/uploads/${paper.thumbnail}`} alt="thumbnail" />
                            ) : (
                                <FontAwesomeIcon icon={faFileAlt} className="placeholder-icon" />
                            )}
                        </div>
                        <div className="right-details">
                            <h3 className="paper-title" onClick={() => window.open(`/view/${paper._id}`, '_blank')}>
                                {paper.title}
                            </h3>
                            <p className="paper-abstract">
                                {paper.abstract.length > 100 ? paper.abstract.substring(0, 100) + '...' : paper.abstract}
                            </p>
                            <div className="paper-footer">
                                <span className="author-name">{paper.author}</span>
                                <div className="options-menu">
                                    <FontAwesomeIcon
                                        icon={faEllipsisV}
                                        className="options-icon"
                                        onClick={() => toggleDropdown(paper._id)}
                                    />
                                    {dropdownOpen === paper._id && (
                                        <div className="dropdown-menu" onMouseLeave={hideDropdown}>
                                            <a
                                                href={`${process.env.REACT_APP_hostURL}/api/uploads/${paper.filePath}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                View Pdf
                                            </a>
                                            <a href={`/edit/${paper._id}`}>Edit</a>
                                            <a href={`${process.env.REACT_APP_hostURL}/api/uploads/${paper.filePath}`} download>Download</a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="pagination">
                {[...Array(totalPages)].map((_, i) => (
                    <button
                        key={i}
                        className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
                        onClick={() => handlePageClick(i + 1)}
                    >
                        {i + 1}
                    </button>
                ))}
                {totalPages > 5 && (
                    <>
                        <span>...</span>
                        <button className="page-btn" onClick={() => handlePageClick(totalPages)}>{totalPages}</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Dashboard;


