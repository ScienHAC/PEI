import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const About = () => {
    const [isHovered, setIsHovered] = useState(false);

    const containerStyle = {
        maxWidth: '800px',
        padding: '40px',
        backgroundColor: '#f9f9f9',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        margin: '20px auto',
        fontFamily: 'Roboto, sans-serif',
        color: '#333',
    };

    const headerStyle = {
        fontSize: '2.5rem',
        color: '#007bff',
        textAlign: 'center',
        marginBottom: '30px',
    };

    const paragraphStyle = {
        fontSize: '1.2rem',
        marginBottom: '20px',
        lineHeight: '1.8',
    };

    const listStyle = {
        listStyleType: 'disc',
        paddingLeft: '20px',
        marginBottom: '20px',
        lineHeight: '1.6',
    };

    const listItemStyle = {
        marginBottom: '10px',
    };


    const buttonStyle = {
        backgroundColor: isHovered ? '#0056b3' : '#007bff',
        color: '#fff',
        padding: '12px 24px',
        borderRadius: '5px',
        textDecoration: 'none',
        fontSize: '1rem',
        fontWeight: 'bold',
        transition: 'background-color 0.3s ease',
    };

    return (
        <div style={containerStyle}>
            <h1 style={headerStyle}>About Innovations in Tribology and Materials Engineering (ITME)</h1>
            <p style={paragraphStyle}>
                Innovations in Tribology and Materials Engineering (ITME) is an international, peer-reviewed online journal published bi-monthly. Our mission is to provide a platform for genuine and reliable contributions to the scientific community through our Scholarly Open Access Initiative.
            </p>
            <p style={paragraphStyle}>
                ITME is committed to upholding the highest standards of quality and integrity in the research publication process. With a distinguished editorial board comprising eminent professionals, we ensure rapid and thorough peer review. This process not only enhances the quality of published research but also fosters academic collaboration.
            </p>
            <p style={paragraphStyle}>
                Conferences affiliated with ITME serve as a perfect platform for global networking, bringing together renowned speakers and scientists from around the world. These events feature enlightening interactive sessions, world-class exhibitions, and poster presentations, creating an exciting and memorable experience for participants.
            </p>
            <p style={paragraphStyle}>
                As a highly-selective, peer-reviewed journal, ITME covers a broad spectrum of topics across various branches of engineering, science, and related fields. We provide numerous benefits aimed at strengthening research skills and advancing academic careers, including:
            </p>
            <ul style={listStyle}>
                <li style={listItemStyle}><strong>Fast, Quality & Easy Paper Publishing Process</strong>: Our streamlined process allows researchers to share their findings quickly and efficiently.</li>
                <li style={listItemStyle}><strong>Distinguished Editorial Board</strong>: Our board is supported by an international review board consisting of prominent individuals from well-known universities, colleges, and corporations across the globe, including the United States, Australia, Canada, Japan, China, and India.</li>
            </ul>
            <p style={paragraphStyle}>
                Our infrastructure, facilities, and dedicated associates significantly impact the academic community and society at large.
            </p>

            {/* 🔵 Button for Developer Team */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
                <Link
                    to="/developers"
                    style={buttonStyle}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    Meet Our Developer Team
                </Link>
            </div>
        </div>
    );
};

export { About };
