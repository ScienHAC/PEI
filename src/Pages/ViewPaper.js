import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import Loader from '../MyComponents/Loader';

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

    if (loading) return <Loader />;
    if (!paper) return <div>Sorry, paper not found.</div>;

    return (
        <div style={{
            padding: '30px',
            maxWidth: '850px',
            margin: 'auto',
            boxShadow: '0 6px 12px rgba(0,0,0,0.1)',
            borderRadius: '12px',
            backgroundColor: '#f9f9f9',
            fontFamily: '"Roboto Slab", serif',
            color: '#333',
            lineHeight: '1.6'
        }}>
            {paper.thumbnail ? (
                <img
                    src={`${process.env.REACT_APP_hostURL}/api/uploads/thumbnails/${paper.thumbnail}`}
                    alt="thumbnail"
                    style={{
                        display: 'block',
                        margin: '20px auto',
                        width: '120px',
                        height: 'auto',
                        borderRadius: '10px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
                    }}
                />
            ) : (
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '120px',
                    height: '120px',
                    margin: '20px auto',
                    backgroundColor: '#e0e0e0',
                    borderRadius: '10px'
                }}>
                    <FontAwesomeIcon icon={faImage} style={{ fontSize: '50px', color: '#bbb' }} />
                </div>
            )}

            <h1 style={{
                fontSize: '2.2em',
                marginBottom: '15px',
                textAlign: 'center',
                color: '#333',
                wordBreak: 'break-word'
            }}>{paper.title || 'Untitled'}</h1>

            <p style={{ fontSize: '1.1em', wordBreak: 'break-word' }}>
                <strong>Abstract:</strong> {paper.abstract || 'No abstract provided.'}
            </p>
            <div style={{
                fontSize: '1em',
                color: '#555',
                marginTop: '15px',
                paddingBottom: '10px',
                borderBottom: '1px solid #ddd'
            }}>
                <p><strong>Author:</strong> {paper.author}</p>
                <p><strong>Contact No:</strong> {paper.contactNumber}</p>
                <p><strong>Article Type:</strong> {paper.articleType}</p>
                <p><strong>Journal:</strong> {paper.journal}</p>
                <p><strong>Country:</strong> {paper.country}</p>
                <p><strong>Created At:</strong> {new Date(paper.createdAt).toLocaleDateString()}</p>
                <p><strong>Updated At:</strong> {new Date(paper.updatedAt).toLocaleDateString()}</p>
                <p><strong>Email:</strong> {paper.email}</p>
            </div>

            {paper.filePath && (
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <h3 style={{ fontSize: '1.5em', color: '#333' }}>PDF Attachment</h3>
                    <a href={`${process.env.REACT_APP_hostURL}/api/uploads/${paper.filePath}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: 'block',
                            color: '#007bff',
                            textDecoration: 'none',
                            fontSize: '1.1em',
                            marginTop: '10px'
                        }}>
                        Open PDF
                    </a>
                    <a href={`${process.env.REACT_APP_hostURL}/api/uploads/${paper.filePath}`}
                        download
                        style={{
                            color: '#007bff',
                            textDecoration: 'none',
                            fontSize: '1.1em',
                            marginTop: '5px'
                        }}>
                        Download PDF
                    </a>
                </div>
            )}

            <div style={{ marginTop: '25px', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                <embed
                    src={`${process.env.REACT_APP_hostURL}/api/uploads/${paper.filePath}`}
                    type="application/pdf"
                    width="100%"
                    height="600px"
                    style={{ border: 'none' }}
                />
            </div>
        </div>
    );
};

export default ViewPaper;
