import React from 'react';
import SEO from '../Components/SEO';

const indexes = [
    { name: 'Crossref', desc: 'DOI registration and metadata distribution for all accepted articles.', status: 'Active' },
    { name: 'Google Scholar', desc: 'Scholarly search discovery via structured metadata and full‑text indexing.', status: 'Active' },
    { name: 'Index Copernicus', desc: 'Journal profile and indexing services supporting broader visibility.', status: 'Active' },
    { name: 'NASA ADS', desc: 'Astrophysics Data System coverage for applicable domains and citations.', status: 'Active' },
    { name: 'ANED', desc: 'American National Engineering Database listing to broaden engineering reach.', status: 'Active' },
];

const chipColor = (s) => ({
    Active: '#0a7d5a', Pending: '#b07400', Inactive: '#7a0a0a'
}[s] || '#0a6079');

export default function AbstractingandIndexing() {
    return (
        <div style={{ padding: '40px 20px', background: '#f5f7fa', minHeight: '70vh' }}>
            <SEO title="Abstracting & Indexing – ITME" url="/abstracting-indexing" description="Indexing and abstracting partners for the ITME journal, including Crossref, Google Scholar, Index Copernicus, NASA ADS, and ANED." />
            <div style={{ maxWidth: 1040, margin: '0 auto', fontFamily: 'Inter, Arial, sans-serif' }}>
                <header style={{ textAlign: 'center', margin: '8px 0 28px' }}>
                    <h1 style={{ margin: 0, color: '#083a47' }}>Abstracting & Indexing</h1>
                    <p style={{ color: '#45636c' }}>Our content is registered with Crossref for persistent DOIs and made discoverable through key indexing networks.</p>
                </header>

                <section style={{ display: 'grid', gap: 22, gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))' }}>
                    {indexes.map(x => (
                        <article key={x.name} style={cardStyle}>
                            <div style={badgeStyle}>{x.name}</div>
                            <h3 style={cardTitleStyle}>{x.name}</h3>
                            <p style={cardTextStyle}>{x.desc}</p>
                            <div style={{ marginTop: 'auto', display:'flex', alignItems:'center', gap:8 }}>
                                <span style={{ fontSize: 12, color: '#46646d' }}>Status:</span>
                                <span style={{ fontSize: 12, fontWeight: 700, color: chipColor(x.status) }}>{x.status}</span>
                            </div>
                        </article>
                    ))}
                </section>

                <aside style={{ marginTop: 28, color: '#607b84', fontSize: 13 }}>
                    Note: Service names above reflect current indexing, registration, or discovery pathways. Additional databases may be added over time.
                </aside>
            </div>
        </div>
    );
}

const cardStyle = {
    background: '#ffffff',
    borderRadius: 18,
    padding: '22px 20px 18px',
    boxShadow: '0 6px 18px -4px rgba(20,60,74,0.18), 0 2px 6px rgba(20,60,74,0.12)',
    position: 'relative',
    minHeight: 160,
    display: 'flex',
    flexDirection: 'column'
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
    fontSize: '1.05rem',
    margin: '12px 0 6px',
    lineHeight: 1.35,
    color: '#0e3d4b',
    fontWeight: 700
};

const cardTextStyle = {
    fontSize: '.9rem',
    margin: 0,
    color: '#4c626b',
    lineHeight: 1.5
};
