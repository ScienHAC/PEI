import React, { useMemo } from 'react';
import data from '../assets/editorialBoard.json';
import '../CSS/EditorialBoard.css';

// --- Utilities ---
const groupByRole = (items) => {
    const order = ['Editor-in-Chief', 'Editor', 'Editorial Board'];
    const map = new Map();
    items.forEach(m => {
        const role = m.role || 'Member';
        if (!map.has(role)) map.set(role, []);
        map.get(role).push(m);
    });
    map.forEach(list => list.sort((a, b) => a.name.localeCompare(b.name)));
    const result = [];
    order.forEach(r => { if (map.has(r)) result.push({ title: r, members: map.get(r) }); });
    map.forEach((v, k) => { if (!order.includes(k)) result.push({ title: k, members: v }); });
    return result;
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
                <div className="eb-role-badge">{member.role}</div>
                <h3 className="eb-name-lg">{member.name}</h3>
                {member.affiliation && (
                    <div className="eb-info-line"><MapPinIcon className="eb-icon" /><span className="eb-affiliation-lg">{member.affiliation}</span></div>
                )}
                {member.email && (
                    <div className="eb-info-line"><MailIcon className="eb-icon" /><a href={`mailto:${member.email}`} className="eb-email-link">{member.email}</a></div>
                )}
            </div>
        </div>
    );
};

const EditorialBoard = () => {
    const sections = useMemo(() => groupByRole(data), []);
    return (
        <div className="eb-modern-wrapper">
            <header className="eb-modern-hero">
                <h1>Editorial Board</h1>
                <p>Distinguished academics and researchers committed to advancing scholarly excellence and innovation.</p>
            </header>
            {sections.map((section, idx) => (
                <section key={section.title} className="eb-modern-section" style={idx>0?{marginTop: '40px'}:undefined}>
                    <h2>{section.title}</h2>
                    <div className="eb-grid-modern">
                        {section.members.map(m => <MemberCard key={m.id || m.email || m.name} member={m} />)}
                    </div>
                </section>
            ))}
        </div>
    );
};

export default EditorialBoard;
