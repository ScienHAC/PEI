import React from 'react';

const DeveloperCard = ({ developer }) => {
    return (
        <div className="developer-card">
            <div className="card-image">
                <img src={developer.image} alt={developer.name} />
            </div>
            <div className="card-content">
                <h3>{developer.name}</h3>
                <p>{developer.role}{developer.batch ? ` • ${developer.batch}` : ''}</p>
                <div className="social-links">
                    <a href={developer.linkedin} target="_blank" rel="noreferrer">
                        <i className="fab fa-linkedin"></i>
                    </a>
                    <a href={developer.github} target="_blank" rel="noreferrer">
                        <i className="fab fa-github"></i>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default DeveloperCard;
