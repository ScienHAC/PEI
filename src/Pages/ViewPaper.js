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
                const response = await fetch(`${process.env.REACT_APP_hostURL}/api/research/${paperId}`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const data = await response.json();
                setPaper(data);
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
        <div>
            <h1>{paper.title || 'Untitled'}</h1>
            <p>{paper.abstract || 'No abstract provided.'}</p>
            {/* Add more paper details as necessary */}
        </div>
    );
};

export default ViewPaper;
