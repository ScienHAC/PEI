import React from 'react';

const AbstractingandIndexing = () => {
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

    return (
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
                    'Consultants’ Report',
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
    );
};

export default AbstractingandIndexing;
