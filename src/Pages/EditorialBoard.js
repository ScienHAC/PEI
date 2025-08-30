import React, { useMemo } from 'react';
import '../CSS/EditorialBoard.css';
import data from '../assets/editorialBoard.json';

// Utility: group members by role preserving desired display order
const groupByRole = (items) => {
    const order = ['Editor-in-Chief','Editor','Associate Editor','Advisory Board','International Advisory Board'];
    const map = new Map();
    items.forEach(m => { const role = m.role || 'Member'; if(!map.has(role)) map.set(role, []); map.get(role).push(m); });
    // sort each group's members alphabetically
    map.forEach(list => list.sort((a,b)=>a.name.localeCompare(b.name)));
    // build ordered array
    const result = [];
    order.forEach(r => { if(map.has(r)) result.push({ title:r, members: map.get(r)}); });
    // append any remaining roles
    map.forEach((v,k)=>{ if(!order.includes(k)) result.push({title:k, members:v}); });
    return result;
};

// Basic initials avatar color generator
const palette = ['#0a5a70','#0c6880','#065062','#084c61','#0b657c'];
const InitialAvatar = ({ name }) => {
    const initials = (name||'?').split(/\s+/).filter(Boolean).slice(0,2).map(w=>w[0].toUpperCase()).join('');
    const color = palette[initials.charCodeAt(0)%palette.length];
    return (
        <div className="eb-initial-avatar" style={{ background: color }} aria-label={name} role="img">{initials}</div>
    );
};

const EditorialBoard = () => {
    const sections = useMemo(()=> groupByRole(data), []);
    const imageBase = '/assets/editorial/'; // instruct to place images in public/assets/editorial OR adjust build copying

    return (
        <div className="editorial-board-wrapper">
            <header className="eb-header">
                <h1>Editorial Board</h1>
                <p className="eb-subtitle">Leadership and advisory members guiding the quality and vision of the journal.</p>
            </header>
            <div className="eb-grid">
                {sections.map(section => (
                    <div key={section.title} className="eb-section-card">
                        <h2 className="eb-section-title">{section.title}</h2>
                        <ul className="eb-simple-list">
                            {section.members.map(m => {
                                const imgSrc = m.image ? imageBase + m.image : null;
                                return (
                                    <li key={m.id || m.email || m.name} className="eb-simple-item with-photo">
                                        <div className="eb-photo-frame small">
                                            {imgSrc ? (
                                                <img src={imgSrc} alt={m.name} onError={(e)=>{e.currentTarget.onerror=null; e.currentTarget.replaceWith(document.createElement('div'));}} />
                                            ) : (
                                                <InitialAvatar name={m.name} />
                                            )}
                                        </div>
                                        <div className="eb-simple-info">
                                            <strong className="eb-simple-name">{m.name}</strong>
                                            <span className="eb-role-inline">{m.role}</span>
                                            <span className="eb-simple-affil">{m.affiliation}</span>
                                            {m.email && <a href={`mailto:${m.email}`} className="eb-simple-email">{m.email}</a>}
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EditorialBoard;
