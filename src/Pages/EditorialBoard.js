import React from 'react';

const EditorialBoard = () => {
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
    };

    const boardMembers = [
        { name: 'Samuel Westwood', title: 'Editor-In-Chief', email: 'samuel@example.com' },
        { name: 'Andrew Chan', title: 'Editor', email: 'andrew@example.com' },
        { name: 'Simone Reppermund', title: 'Editor', email: 'simone@example.com' },
        { name: 'Bhavik Patel', title: 'Editor', email: 'bhavik@example.com' },
        { name: 'Quentin Hanley', title: 'Editor', email: 'quentin@example.com' },
        { name: 'Claire Turner', title: 'Editor', email: 'claire@example.com' },
        { name: 'Weiguang Cui', title: 'Editor', email: 'weiguang@example.com' },
    ];

    return (
        <div style={containerStyle}>
            <h1 style={headerStyle}>Editorial Board</h1>
            <ul style={listStyle}>
                {boardMembers.map((member, index) => (
                    <li key={index} style={listItemStyle}>
                        <strong>{member.title}: </strong>
                        {member.name}
                        <br />
                        <a href={`mailto:${member.email}`} style={{ color: '#007bff', textDecoration: 'none' }}>
                            {member.email}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EditorialBoard;
