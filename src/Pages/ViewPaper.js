// src/pages/ViewPaper.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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
                console.log(result);
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
            <h1 style={{ fontSize: '2em', marginBottom: '10px' }}>{paper.title || 'Untitled'}</h1>
            <p><strong>Abstract:</strong> {paper.abstract || 'No abstract provided.'}</p>
            <p><strong>Author:</strong> {paper.author}</p>
            <p><strong>Contact No:</strong> {paper.contactNo}</p>
            <p><strong>Journal:</strong> {paper.journal}</p>
            <p><strong>Country:</strong> {paper.country}</p>
            <p><strong>Created At:</strong> {new Date(paper.createdAt).toLocaleDateString()}</p>
            <p><strong>Updated At:</strong> {new Date(paper.updatedAt).toLocaleDateString()}</p>
            {paper.pdf && (
                <div>
                    <h3>PDF Attachment:</h3>
                    <a href={paper.pdf} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'blue' }}>
                        Open PDF
                    </a>
                    <br />
                    <a href={paper.pdf} download style={{ textDecoration: 'none', color: 'blue' }}>
                        Download PDF
                    </a>
                </div>
            )}
        </div>
    );
};

export default ViewPaper;
