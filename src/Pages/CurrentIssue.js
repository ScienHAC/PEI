import React from 'react';
import '../CSS/CurrentIssue.css';

const CurrentIssue = () => {
    return (
        <div className="current-issue-container">
            <div className="current-issue-content">
                <h1 className="page-title">Current Issue</h1>
                <div className="issue-details">
                    <h2>Innovative Trends in Multidisciplinary Engineering (ITME)</h2>
                    <p className="issue-info">Issue 1, Volume 1 - 2025 | December 2025 Issue</p>
                </div>
                
                <div className="call-for-papers-section">
                    <h3>Call For Papers</h3>
                    <div className="call-for-papers-image-container">
                        <img 
                            src="/ITME_Call_for_Papers.jpg" 
                            alt="ITME Call for Papers - December 2025 Issue" 
                            className="call-for-papers-image"
                            onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.nextSibling.style.display = 'block';
                            }}
                        />
                        <div className="image-fallback" style={{ display: 'none' }}>
                            <p>Call for Papers image not available. Please contact the editorial office.</p>
                        </div>
                    </div>
                    
                    <div className="download-section">
                        <p>
                            <a 
                                href="/ITME_Call_for_Papers.pdf" 
                                className="download-link"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                📄 Download Call for Papers (PDF)
                            </a>
                        </p>
                    </div>
                </div>

                <div className="submission-info">
                    <h3>Important Dates</h3>
                    <ul>
                        <li><strong>Abstract Submission Deadline:</strong> September 30, 2025</li>
                        <li><strong>Notification of Acceptance:</strong> October 15, 2025</li>
                        <li><strong>Full Paper Submission:</strong> November 15, 2025</li>
                    </ul>
                </div>

                <div className="contact-section">
                    <h3>Submission</h3>
                    <p>
                        Submit your manuscript through our <a href="/form" className="submission-link">online submission system</a> or 
                        email directly to <a href="mailto:editor.itme@krmangalam.edu.in" className="email-link">editor.itme@krmangalam.edu.in</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CurrentIssue;
