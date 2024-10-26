// src/pages/ViewPaper.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

const ViewPaper = () => {
    const { paperId } = useParams();
    const [paper, setPaper] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPaperDetails = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_hostURL}/api/papers/${paperId}`, {
                    method: 'PUT',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const result = await response.json();
                setPaper(result);
            } catch (error) {
                console.error('Failed to fetch paper details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPaperDetails();
    }, [paperId]);

    if (loading) return <div>Loading...</div>;
    if (!paper) return <div>Sorry, paper not found.</div>;

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
            {paper.thumbnail ? (
                <img
                    src={`${process.env.REACT_APP_hostURL}/api/uploads/thumbnails/${paper.thumbnail}`}
                    alt="thumbnail"
                />
            ) : (
                <FontAwesomeIcon icon={faImage} className="placeholder-icon" />
            )}
            <h1 style={{ fontSize: '2em', marginBottom: '10px' }}>{paper.title || 'Untitled'}</h1>
            <p><strong>Abstract:</strong> {paper.abstract || 'No abstract provided.'}</p>
            <p><strong>Author:</strong> {paper.author}</p>
            <p><strong>Contact No:</strong> {paper.contactNumber}</p>
            <p><strong>Article Type:</strong> {paper.articleType}</p>
            <p><strong>Journal:</strong> {paper.journal}</p>
            <p><strong>Country:</strong> {paper.country}</p>
            <p><strong>Created At:</strong> {new Date(paper.createdAt).toLocaleDateString()}</p>
            <p><strong>Updated At:</strong> {new Date(paper.updatedAt).toLocaleDateString()}</p>
            {paper.filePath && (
                <div>
                    <h3>PDF Attachment:</h3>
                    <a href={`${process.env.REACT_APP_hostURL}/api/uploads/${paper.filePath}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'blue' }}>
                        Open PDF
                    </a>
                    <br />
                    <a href={`${process.env.REACT_APP_hostURL}/api/uploads/${paper.filePath}`} download style={{ textDecoration: 'none', color: 'blue' }}>
                        Download PDF
                    </a>
                </div>
            )}
        </div>
    );
};

export default ViewPaper;
