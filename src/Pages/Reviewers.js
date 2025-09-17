import React, { useMemo, useState } from 'react';
import reviewers from '../assets/reviewer_committee_list.json';
import '../CSS/Reviewers.css';
import SEO from '../Components/SEO';
import { Link } from 'react-router-dom';

const ITEMS_PER_PAGE = 12;

const cleanStr = (s='') => (s || '').toString().trim();
const isNumericOnly = (s='') => /^\s*\d+\s*$/.test(s||'');
const normalize = (s='') => cleanStr(s)
  .toLowerCase()
  .replace(/[\u00A0]/g,' ') // NBSP to space
  .replace(/[.,!'"()_/-]+/g,' ') // punctuation to space
  .replace(/\s+/g,' ');

// Hoisted function so it can be used inside useMemo before definition
function getSalutation(r) {
  // handle keys: 'Salutation', 'Salutation ', 'Salutation\u00A0'
  return cleanStr(r['Salutation\u00A0'] || r['Salutation '] || r['Salutation'] || 'Dr.');
}

export default function Reviewers() {
  const [q, setQ] = useState('');
  const [field, setField] = useState('all');
  const [page, setPage] = useState(1);

  const data = reviewers;

  const fields = useMemo(() => {
    const set = new Set();
    data.forEach(r => {
      const raw = cleanStr(r['Primary Field(s) of Expertise']);
      if (!raw || isNumericOnly(raw)) return;
      raw.split(/[,;&/]|\band\b/i).map(s=>cleanStr(s.replace(/\s+/g,' '))).forEach(v => {
        if (v && v.length>2) set.add(v);
      });
    });
    return Array.from(set).sort((a,b)=>a.localeCompare(b));
  }, [data]);

  const filtered = useMemo(() => {
    const termNorm = normalize(q);
    const tokens = termNorm ? termNorm.split(' ') : [];
    return data.filter(r => {
      const sal = getSalutation(r);
      const name = cleanStr(r['Full Name']);
      const combo = `${sal} ${name}`;
      const hay = normalize([
        name,
        combo,
        r['Institutional Affiliation'],
        r['Primary Field(s) of Expertise'],
        r['Specific Research Interests (Keywords)'],
        sal,
        r['Current Designation']
      ].map(x=>cleanStr(x)).filter(Boolean).join(' | '));

      const inSearch = !tokens.length || tokens.every(t => hay.includes(t));
      const inField = field === 'all' || cleanStr(r['Primary Field(s) of Expertise']).toLowerCase().includes(field.toLowerCase());
      return inSearch && inField;
    });
  }, [data, q, field]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const start = (page-1) * ITEMS_PER_PAGE;
  const pageItems = filtered.slice(start, start + ITEMS_PER_PAGE);

  const onFilterChange = (e) => { setField(e.target.value); setPage(1); };
  const onSearchChange = (e) => { setQ(e.target.value); setPage(1); };

  const short = (s='', n=60) => (s && s.length>n ? s.slice(0,n)+'…' : s);
  const pills = (s='') => (s||'').split(/[,;&]/).map(x=>cleanStr(x)).filter(Boolean).slice(0,3);

  // getSalutation defined above

  return (
    <div className="rv-wrap">
      <SEO title="Reviewer Committee – ITME" url="/reviewers" description="Explore the ITME reviewer committee spanning materials, mechanical, computational, sustainable, design & manufacturing, and allied domains." />
      <header className="rv-hero">
        <div className="rv-hero-inner">
          <h1>Reviewer Committee</h1>
          <p>Trusted peer reviewers supporting clarity, rigor, and multidisciplinary relevance. Currently {data.length} members.</p>
          <div className="rv-controls">
            <input className="rv-input" placeholder="Search name, salutation, institution, or expertise" value={q} onChange={onSearchChange} />
            <select className="rv-select" value={field} onChange={onFilterChange}>
              <option value="all">All fields</option>
              {fields.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>
          {(q || field!=='all') && (
            <div className="rv-filterbar">
              Showing {filtered.length} of {data.length} reviewers
              <button className="rv-clear" onClick={()=>{setQ(''); setField('all');}}>Clear</button>
            </div>
          )}
        </div>
      </header>

      <main className="rv-grid">
        {pageItems.map(r => (
          <article key={r.ID} className="rv-card">
            <div className="rv-card-head">
              <div className="rv-head-text">
                <h3>{getSalutation(r)} {cleanStr(r['Full Name'])}</h3>
                <div className="rv-role">{cleanStr(r['Current Designation']) || 'Reviewer'}</div>
              </div>
            </div>
            <div className="rv-affil">{cleanStr(r['Institutional Affiliation'])}</div>
            <div className="rv-expertise"><span className="rv-label">Primary expertise:</span> {short(isNumericOnly(r['Primary Field(s) of Expertise'])? 'General' : cleanStr(r['Primary Field(s) of Expertise']))}</div>
            <div className="rv-tags">
              {pills(r['Specific Research Interests (Keywords)']).map((t,i)=>(<span key={i} className="rv-tag">{t}</span>))}
            </div>
            <div className="rv-divider" />
            <div className="rv-contact">
              {r['Email address'] && <a href={`mailto:${cleanStr(r['Email address'])}`} className="rv-link">{cleanStr(r['Email address'])}</a>}
              {r['Phone number'] && <span className="rv-muted">{cleanStr(r['Phone number'])}</span>}
            </div>
          </article>
        ))}
      </main>

      {totalPages>1 && (
        <nav className="rv-pager">
          <button disabled={page===1} onClick={()=>setPage(p=>Math.max(1,p-1))}>Prev</button>
          <span>Page {page} / {totalPages}</span>
          <button disabled={page===totalPages} onClick={()=>setPage(p=>Math.min(totalPages,p+1))}>Next</button>
        </nav>
      )}

      <footer className="rv-footer-note">
        Looking for editorial leadership? See the <Link to="/editorial-leadership">Editorial Leadership</Link>.
      </footer>
    </div>
  );
}
