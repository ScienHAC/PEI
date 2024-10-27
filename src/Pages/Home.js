import React from 'react';
import CurrentIssue from '../Pages/CurrentIssue';

const Home = () => {
    return (
        <div style={{ maxWidth: '1200px', margin: 'auto', padding: '20px', fontSize: '1.1rem', lineHeight: '1.6' }}>
            <h2 id="home_pei_max" className="d-none d-lg-flex" style={{ fontSize: '2rem', textAlign: 'center', color: '#333' }}>
                Welcome to PEI :
                <img
                    src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=20&duration=3000&pause=1000&color=0066cc&vCenter=true&width=435&height=70&lines=Submit+Research+Paper;Explore+Our+Journals;Contribute+in+Research;24%2F7+Support"
                    alt="Typing SVG"
                />
            </h2>
            <h2 id="home_pei_min" className="d-lg-none" style={{ fontSize: '2rem', textAlign: 'center', color: '#333' }}>
                Welcome to PEI :
                <img
                    src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=20&duration=3000&pause=1000&color=0066cc&vCenter=true&width=435&height=70&lines=Submit+Research+Paper;Explore+Our+Journals;Contribute+to+Knowledge;24%2F7+Support"
                    alt="Typing SVG"
                />
            </h2>

            <blockquote style={{ borderLeft: '5px solid rgba(0, 0, 0, 0.1)', padding: '20px', color: 'rgb(19, 15, 15)', fontSize: '1.1rem', marginTop: '20px' }}>
                <a href="https://example.com" style={{ fontStyle: 'italic', textDecoration: 'underline', fontWeight: 'bold' }}>PIONEERING ENGINEERING INSIGHT</a>
                (ISSN:XXXX-XXXX) is dedicated to publishing high-quality research in the field of Engineering. We provide a platform for scholars, researchers, and practitioners to share insights and drive advancements in technology and engineering management.
                {/* Additional content here */}
            </blockquote>

            <h3 style={{ fontSize: '1.8rem', color: 'rgb(19, 15, 15)', marginTop: '30px', textAlign: 'center' }}>Journal Insights</h3>

            {/* Two-column layout for cards */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '20px',
                maxWidth: '800px',
                margin: '20px auto',
            }}>
                <div style={cardStyle}>
                    <h4 style={cardHeaderStyle}>We Publish</h4>
                    <p style={cardTextStyle}>
                        We publish different types of scholarly literature, some of which require original research and some that are based on comprehensive analysis.
                    </p>
                </div>

                <div style={cardStyle}>
                    <h4 style={cardHeaderStyle}>Article Preparation</h4>
                    <p style={cardTextStyle}>
                        As part of the submission process, authors are requested to follow the guidelines before submission of manuscripts.
                    </p>
                </div>

                <div style={cardStyle}>
                    <h4 style={cardHeaderStyle}>Peer Review</h4>
                    <p style={cardTextStyle}>
                        PEI follows a double-blind peer review process where author and reviewer details are maintained confidential.
                    </p>
                </div>

                <div style={cardStyle}>
                    <h4 style={cardHeaderStyle}>PEI Vision</h4>
                    <p style={cardTextStyle}>
                        We at PEI aim to promote scientific knowledge globally by publishing high-quality, peer-reviewed content that readers can freely access, adapt, and share, supporting progress in research.
                    </p>
                </div>
            </div>

            {/* Current Issue Section */}
            <div style={{
                width: '100%',
                padding: '20px',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
                backgroundColor: '#ffffff',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                margin: '20px 0',
                color: 'rgb(19, 15, 15)',
            }}>
                <h3 style={{ fontSize: '1.5rem', color: '#333', borderBottom: '2px solid #0066cc', paddingBottom: '5px' }}>Current Issue</h3>
                <CurrentIssue />
            </div>
        </div>
    );
}

// Styles for individual cards
const cardStyle = {
    padding: '20px',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    color: 'rgb(19, 15, 15)'
};

const cardHeaderStyle = {
    fontSize: '1.2rem',
    color: '#0066cc',
    borderBottom: '2px solid #0066cc',
    paddingBottom: '5px',
    marginBottom: '10px'
};

const cardTextStyle = {
    color: '#333'
};

export default Home;
