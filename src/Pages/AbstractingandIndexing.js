import React from 'react';
import Maintenance from '../Components/Maintenance';

// Abstracting & Indexing page: professional placeholder + preview of upcoming indexing targets.
// Original draft list retained below (commented) for future reinstatement.

const upcoming = [
    'CrossRef DOI Registration',
    'Google Scholar',
    'Directory of Open Access Journals (DOAJ)',
    'Scopus (Evaluation Pipeline)',
    'Web of Science (Emerging Sources Citation Index)',
    'EBSCOhost',
    'INSPEC',
    'ProQuest',
];

const AbstractingandIndexing = () => {
    return (
        <div style={{ padding: '40px 20px', background: '#f5f7fa', minHeight: '70vh' }}>
            <Maintenance
                title="Abstracting & Indexing"
                message="We are enhancing our metadata quality and completing formal evaluation processes with leading indexing and abstracting services."
                note="Below is a non-exhaustive roadmap of indexing partners targeted during the initial rollout phase." />
            <div style={{ maxWidth: 1000, margin: '40px auto 0', fontFamily: 'Inter, Arial, sans-serif' }}>
                <div style={{
                    display: 'grid',
                    gap: 24,
                    gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))'
                }}>
                    {upcoming.map(item => (
                        <div key={item} style={cardStyle}>
                            <div style={badgeStyle}>{item.split(' ')[0]}</div>
                            <h4 style={cardTitleStyle}>{item}</h4>
                            <p style={cardTextStyle}>Status: <span style={{ color: '#0a6079', fontWeight: 600 }}>In Preparation</span></p>
                        </div>
                    ))}
                </div>
            </div>
            {/*
            Original list preserved for future reference:
            ABI/Inform, CAD/CAM Abstracts, Cambridge Scientific Abstracts, Current Contents, Engineering Index, INSPEC, Management Contents, Social Sciences Citation Index, Technical Education Abstracts, Consultants' Report, Academic Journal Guide (CABS), Scopus, Science Citation Index
            */}
        </div>
    );
};

const cardStyle = {
    background: '#ffffff',
    borderRadius: 18,
    padding: '22px 20px 20px',
    boxShadow: '0 6px 18px -4px rgba(20,60,74,0.18), 0 2px 6px rgba(20,60,74,0.12)',
    position: 'relative',
    minHeight: 140,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start'
};

const badgeStyle = {
    position: 'absolute',
    top: -14,
    left: 18,
    background: 'linear-gradient(135deg,#0b5d73,#0d728c)',
    color: '#fff',
    fontSize: 12,
    letterSpacing: '.5px',
    padding: '6px 12px',
    borderRadius: 14,
    boxShadow: '0 4px 10px rgba(12,80,98,0.35)'
};

const cardTitleStyle = {
    fontSize: '1rem',
    margin: '12px 0 6px',
    lineHeight: 1.35,
    color: '#0e3d4b',
    fontWeight: 600
};

const cardTextStyle = {
    fontSize: '.82rem',
    margin: 0,
    color: '#4c626b',
    lineHeight: 1.4
};

export default AbstractingandIndexing;
