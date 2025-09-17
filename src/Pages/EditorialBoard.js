import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import reviewers from '../assets/reviewer_committee_list.json';
import data from '../assets/editorialBoard.json';
import '../CSS/EditorialBoard.css';

// --- Utilities ---
// Preserve the input JSON order for both roles and members (no alphabetic sort)
const groupByRole = (items) => {
    const map = new Map();
    const roleOrder = [];
    items.forEach(m => {
        const role = m.role || 'Member';
        if (!map.has(role)) { map.set(role, []); roleOrder.push(role); }
        map.get(role).push(m); // keep insertion order
    });
    return roleOrder.map(r => ({ title: r, members: map.get(r) }));
};

const avatarColors = [
    'hsl(210,50%,18%)',
    'hsl(200,70%,45%)',
    'hsl(205,55%,32%)',
    'hsl(198,65%,52%)',
    'hsl(210,40%,28%)',
    'hsl(195,60%,40%)'
];

let imageContext;
try { imageContext = require.context('../Images', false, /\.(png|jpe?g|webp|svg)$/); } catch { imageContext = null; }
const getImage = (filename) => {
    if (!filename || !imageContext) return null;
    try { return imageContext('./' + filename); } catch { return null; }
};
const getInitials = (name) => {
    if (!name) return '?';
    const parts = name.trim().split(/\s+/);
    if (!parts.length) return '?';
    return (parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : '')).toUpperCase();
};
const colorFor = (name) => avatarColors[name.charCodeAt(0) % avatarColors.length];

// Normalize salutation across possible JSON key variants
const getSalutation = (r) => {
    const val = (r && (r['Salutation\u00A0'] || r['Salutation '] || r['Salutation'])) || '';
    return (val || 'Dr.').toString().trim();
};

// Inline icons (no external deps)
const MailIcon = (props) => (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
    </svg>
);
const MapPinIcon = (props) => (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
    </svg>
);

const displayRole = (role) => role || 'Member';
const sectionTitle = (title) => title || 'Section';

const MemberCard = ({ member }) => {
    const img = getImage(member.image);
    const initials = getInitials(member.name);
    const bg = colorFor(member.name || '?');
    return (
        <div className="eb-card modern">
            <div className="eb-photo-frame avatar" style={!img ? { background: bg } : undefined}>
                {img ? <img src={img} alt={member.name} /> : <div className="eb-initial-avatar big" aria-label={member.name}>{initials}</div>}
            </div>
            <div className="eb-card-body">
                <div className="eb-role-badge">{displayRole(member.role)}</div>
                <h3 className="eb-name-lg">{member.name}</h3>
                {member.affiliation && (
                    <div className="eb-info-line"><MapPinIcon className="eb-icon" /><span className="eb-affiliation-lg">{member.affiliation}</span></div>
                )}
                {member.email && (
                    <div className="eb-info-line">
                        <MailIcon className="eb-icon" />
                        <a
                            href={`mailto:${member.email}`}
                            className="eb-email-link"
                            style={{ cursor: 'pointer' }}
                        >
                            {member.email}
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

const EditorialBoard = () => {
    const sections = useMemo(() => groupByRole(data), []);
    return (
            <div className="eb-modern-wrapper">
                <header className="eb-clean-header">
                    <h1 className="eb-clean-title">ITME Editorial Leadership</h1>
                    <p className="eb-clean-sub">A collaborative panel of editors and subject experts supporting quality, integrity, and multidisciplinary relevance.</p>
                </header>
            {sections.map((section, idx) => (
                <section key={section.title} className="eb-modern-section" style={idx>0?{marginTop: '40px'}:undefined}>
                    <h2>{sectionTitle(section.title)}</h2>
                    <div className="eb-grid-modern">
                        {section.members.map(m => <MemberCard key={m.email || m.id || m.name} member={m} />)}
                    </div>
                </section>
            ))}
            {/* Reviewer Committee preview section */}
            <section className="eb-modern-section" style={{marginTop: '52px'}}>
                <h2>Reviewer Committee</h2>
                <div className="eb-grid-modern">
                    {reviewers.slice(0,6).map((r) => (
                        <div key={r.ID} className="eb-card modern" style={{gap:14}}>
                            <div style={{width:56,height:56,borderRadius:14,background:'linear-gradient(135deg,#0b5d73,#13a1b4)',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:700,flexShrink:0}}>
                                {(r['Full Name']||'?').toString().trim().split(/\s+/).slice(0,2).map(w=>w[0]).join('').toUpperCase()}
                            </div>
                            <div className="eb-card-body">
                                <div className="eb-role-badge">{getSalutation(r)}</div>
                                <h3 className="eb-name-lg" style={{marginBottom:2}}>{(r['Full Name']||'').toString().trim()}</h3>
                                {r['Current Designation'] && (
                                    <div className="eb-affiliation-lg" style={{marginBottom:4}}>{r['Current Designation']}</div>
                                )}
                                {r['Institutional Affiliation'] && (
                                    <div className="eb-info-line"><span className="eb-affiliation-lg" style={{margin:0}}>{r['Institutional Affiliation']}</span></div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:16}}>
                    <div style={{color:'#32535c',fontSize:14}}>Peer review support: <strong>{reviewers.length}</strong> reviewers</div>
                    <Link to="/reviewers" style={{color:'#0a6079',fontWeight:600}}>View all reviewers →</Link>
                </div>
            </section>
        </div>
    );
};

export default EditorialBoard;
