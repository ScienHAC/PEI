import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';

function BackToTopButton() {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowButton(window.scrollY > 200);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        showButton && (
            <button
                onClick={scrollToTop}
                style={{
                    position: 'fixed',
                    bottom: '60px',
                    right: '60px',
                    padding: '18px',
                    fontSize: '22px',
                    color: '#333',
                    backgroundColor: '#f5f5f5',
                    border: '1px solid #ddd',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
                    transition: 'background-color 0.3s ease, color 0.3s ease, transform 0.3s ease',
                }}
                onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#333';
                    e.target.style.color = '#ffffff';
                    e.target.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#f5f5f5';
                    e.target.style.color = '#333';
                    e.target.style.transform = 'scale(1)';
                }}
            >
                <FontAwesomeIcon icon={faChevronUp} />
            </button>
        )
    );
}

export default BackToTopButton;
