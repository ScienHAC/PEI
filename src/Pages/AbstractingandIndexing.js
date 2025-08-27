import React from 'react';

const AbstractingandIndexing = () => {
    /* 
    // Commented out original content - will be restored later
    const containerStyle = {
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '800px',
        margin: '20px auto',
    };

    const headerStyle = {
        fontFamily: 'Roboto Slab, serif',
        fontSize: '2.5rem',
        color: '#333',
        textAlign: 'center',
        marginBottom: '20px',
    };

    const listStyle = {
        listStyleType: 'none',
        padding: '0',
    };

    const listItemStyle = {
        fontSize: '1.2rem',
        color: '#555',
        padding: '8px 0',
        borderBottom: '1px solid #ddd',
        transition: 'background-color 0.3s',
    };

    const hoverStyle = {
        backgroundColor: '#e8f0fe',
    };
    */

    return (
        <>
            <style>
                {`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                    
                    @keyframes pulse {
                        0%, 100% { opacity: 1; }
                        50% { opacity: 0.6; }
                    }
                `}
            </style>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '60vh',
                padding: '40px',
                backgroundColor: '#f9f9f9',
            }}>
                <div style={{
                    fontSize: '4rem',
                    color: '#084c61',
                    animation: 'spin 2s linear infinite',
                    marginBottom: '20px',
                }}>⚙️</div>
                <div style={{
                    fontSize: '2rem',
                    color: '#333',
                    fontFamily: 'Roboto Slab, serif',
                    textAlign: 'center',
                    animation: 'pulse 1.5s ease-in-out infinite',
                }}>Updating...</div>
                <p style={{ 
                    fontSize: '1.1rem', 
                    color: '#666', 
                    textAlign: 'center', 
                    marginTop: '10px',
                    fontStyle: 'italic'
                }}>
                    We're currently updating our abstracting and indexing information. Please check back soon.
                </p>
            </div>
            
            {/* 
            // Original content commented out for future restoration
            <div style={containerStyle}>
                <h1 style={headerStyle}>Abstracting & Indexing</h1>
                <ul style={listStyle}>
                    {[
                        'ABI/Inform',
                        'CAD/CAM Abstracts',
                        'Cambridge Scientific Abstracts',
                        'Current Contents',
                        'Engineering Index',
                        'INSPEC',
                        'Management Contents',
                        'Social Sciences Citation Index',
                        'Technical Education Abstracts',
                        'Consultants' Report',
                        'Academic Journal Guide (Chartered Association of Business Schools)',
                        'Scopus',
                        'Science Citation Index',
                    ].map((item, index) => (
                        <li
                            key={index}
                            style={listItemStyle}
                            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = hoverStyle.backgroundColor; }}
                            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
            */}
        </>
    );
};

export default AbstractingandIndexing;
