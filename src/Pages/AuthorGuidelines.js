import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../Components/SEO';
import '../CSS/VolumePage.css';

const Section = ({ number, title, children, defaultOpen = true }) => {
  const [open, setOpen] = useState(defaultOpen);
  const bodyId = `ag-sec-body-${number}`;
  return (
    <section className="ag-section card mb-3 border-0 shadow-sm" id={`ag-sec-${number}`}>      
      <div className="card-header p-0 overflow-hidden" style={{background:'linear-gradient(90deg,#084c61 0%, #0b6d8a 100%)'}}>
        <button
          type="button"
          aria-expanded={open}
            aria-controls={bodyId}
          onClick={() => setOpen(o => !o)}
          className="w-100 d-flex align-items-center gap-3 btn text-start text-white py-2 px-3 ag-toggle-btn"
          style={{fontWeight:600}}
        >
          <span className="badge bg-light text-dark" style={{minWidth:'2rem'}}>{number}</span>
          <span className="flex-grow-1" style={{letterSpacing:'0.5px'}}>{title}</span>
          <span aria-hidden="true" className="ms-auto" style={{fontSize:'1.15rem'}}>{open ? '−' : '+'}</span>
        </button>
      </div>
      <div id={bodyId} className={`ag-sec-body card-body ${open ? 'd-block' : 'd-none'}`}>
        {children}
      </div>
    </section>
  );
};

const bullet = (text) => <li>{text}</li>;

const AuthorGuidelines = () => {
  const [activeTab, setActiveTab] = useState('guidelines');
  return (
    <main className="container py-4 author-guidelines-page">
      <SEO
        title="Author Guidelines | ITME Journal"
        description="Official ITME author guidelines: structure, formatting (6–12 pages), similarity limit 15%, double-blind review, ethics, submission and contact information."
        url="/author-guidelines"
        keywords="ITME author guidelines, manuscript preparation, submission instructions, formatting requirements, ethical standards, open access licensing"
      />
      <div className="ag-hero mb-4 p-4 rounded shadow-sm" style={{background:'linear-gradient(135deg,#f5f9fa 0%, #e8f4f7 60%)'}}>
        <h1 className="h3 mb-3">Author Guidelines</h1>
        <p className="mb-2 text-secondary" style={{maxWidth:'760px'}}>Follow these instructions carefully to ensure a smooth double‑blind peer review. Submissions that do not meet the required structure, formatting, or similarity threshold (≤15%) may be returned for correction.</p>
        <div className="ag-downloads d-flex flex-wrap gap-2">
          <a className="btn btn-outline-primary btn-sm" href="/ITME_Author_Guidelines.docx" download>Download Full Guidelines (.docx)</a>
          <a className="btn btn-outline-secondary btn-sm" href="/ITME_Call_for_Papers.pdf" target="_blank" rel="noopener noreferrer">Call for Papers (PDF)</a>
          <a className="btn btn-outline-success btn-sm" href="/template.pdf" target="_blank" rel="noopener noreferrer">Sample Template (PDF)</a>
          <a className="btn btn-outline-dark btn-sm" href="/format-ITME_Paper_Submission_Template.docx" download>Manuscript Template (.docx)</a>
          <Link className="btn btn-outline-danger btn-sm" to="/form" rel="noopener noreferrer">Submit Manuscript</Link>
        </div>
      </div>
      <style>{`
        html { scroll-behavior: smooth; }
        .ag-section .ag-toggle-btn:focus { outline: 2px solid #fff; outline-offset: -2px; }
        .ag-section .card-body ul, .ag-section .card-body ol { margin-bottom:0; }
        .ag-layout { display:flex; gap:2rem; }
        @media (max-width: 991.98px){ .ag-layout { flex-direction:column; } .ag-sidebar { position:relative; top:0; max-height:none; } }
        .ag-sidebar { position:sticky; top:90px; align-self:flex-start; width:260px; max-height:calc(100vh - 110px); overflow:auto; padding:1rem 0.75rem 1.5rem; background:#ffffff; border:1px solid #dbe4e7; border-radius:0.75rem; box-shadow:0 2px 4px rgba(0,0,0,0.04), 0 6px 18px -8px rgba(0,0,0,0.08); }
        .ag-sidebar::-webkit-scrollbar { width:8px; }
        .ag-sidebar::-webkit-scrollbar-track { background:transparent; }
        .ag-sidebar::-webkit-scrollbar-thumb { background:#c5d3d8; border-radius:4px; }
        .ag-toc-root, .ag-toc-sub { list-style:none; margin:0; padding:0; }
        .ag-toc-root > li + li { margin-top:.35rem; }
  .ag-toc-link { position:relative; display:block; padding:.45rem 1.5rem .45rem 1rem; font-size:0.87rem; line-height:1.2; text-decoration:none; color:#114455; border-radius:0.4rem; font-weight:500; transition:background .25s, color .25s; }
        .ag-toc-link:hover { background:#eef6f8; color:#0a4e63; }
        .ag-toc-link.active { background:linear-gradient(90deg,#084c61 0%, #0b6d8a 90%); color:#fff; font-weight:600; box-shadow:0 2px 4px rgba(0,0,0,0.08); }
  /* Arrow indicator: rendered for all links (hidden by default) to avoid layout shift */
  .ag-toc-link::after { content:""; position:absolute; right:-12px; top:50%; transform:translate(4px,-50%); width:0; height:0; border-top:8px solid transparent; border-bottom:8px solid transparent; border-left:10px solid #0b6d8a; opacity:0; transition:opacity .28s ease, transform .28s ease; filter:drop-shadow(0 1px 2px rgba(0,0,0,0.18)); pointer-events:none; }
  .ag-toc-link.active::after { opacity:1; transform:translate(0,-50%); }
        .ag-toc-sub { margin-top:.2rem; margin-left:.2rem; border-left:1.5px solid #d6e3e7; padding-left:.4rem; }
        .ag-toc-sub li { margin:.15rem 0; }
        .ag-toc-sub .ag-toc-link { padding:.35rem .5rem .35rem 1rem; font-size:0.78rem; font-weight:500; }
        .ag-toc-heading { font-size:.75rem; text-transform:uppercase; letter-spacing:.07em; color:#5c7781; font-weight:600; padding:0 .75rem .4rem; }
        .ag-sidebar-divider { height:1px; background:linear-gradient(90deg,transparent,#cfd8db,transparent); margin:.6rem 0 .8rem; }
        .ag-mini-hint { font-size:0.65rem; padding:0 .75rem; color:#708993; line-height:1.2; }
        .ag-toc-link:focus-visible { outline:2px solid #0b6d8a; outline-offset:2px; }
      `}</style>
      <div className="mb-4">
        <ul className="nav nav-tabs" role="tablist">
          <li className="nav-item" role="presentation">
            <button className={`nav-link ${activeTab==='guidelines'?'active':''}`} onClick={()=>setActiveTab('guidelines')} role="tab">Guidelines</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className={`nav-link ${activeTab==='contact'?'active':''}`} onClick={()=>setActiveTab('contact')} role="tab">Contact Us</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className={`nav-link ${activeTab==='help'?'active':''}`} onClick={()=>setActiveTab('help')} role="tab">Help / FAQ</button>
          </li>
        </ul>
      </div>

      {activeTab === 'guidelines' && <GuidelinesWithSidebar />}

      {activeTab === 'contact' && (
        <div className="pt-3" role="tabpanel">
          <h3>Contact the Editorial Office</h3>
          <p>If you have questions about suitability, formatting, or the review process, reach out anytime.</p>
          <ul>
            <li>Email (Editorial): <a href="mailto:editor.itme@krmangalam.edu.in">editor.itme@krmangalam.edu.in</a></li>
            <li>Email (Technical Support): <a href="mailto:support.itme@krmangalam.edu.in">support.itme@krmangalam.edu.in</a></li>
            <li>Submission Form: <a href="/form">/form</a></li>
            <li>General Contact Page: <a href="/contact">/contact</a></li>
          </ul>
          <div className="alert alert-info small">Tip: Always include your manuscript title and (if available) submission ID when emailing.</div>
        </div>
      )}

      {activeTab === 'help' && (
        <div className="pt-3" role="tabpanel">
          <h3>Help / Frequently Asked Questions</h3>
          <div className="accordion" id="agHelp">
            <div className="mb-3">
              <h5 style={{cursor:'pointer'}} onClick={e=>{
                const el = e.currentTarget.nextElementSibling; el.hidden = !el.hidden;}}>How do I submit a manuscript?</h5>
              <div><p>Click the <a href="/form">Submission Form</a>, attach your manuscript (.docx) and required supplementary files, then complete the metadata fields.</p></div>
            </div>
            <div className="mb-3">
              <h5 style={{cursor:'pointer'}} onClick={e=>{const el=e.currentTarget.nextElementSibling; el.hidden=!el.hidden;}}>What is the similarity threshold?</h5>
              <div hidden><p>The maximum acceptable similarity index is 15% excluding references and boilerplate. Higher scores may lead to desk rejection.</p></div>
            </div>
            <div className="mb-3">
              <h5 style={{cursor:'pointer'}} onClick={e=>{const el=e.currentTarget.nextElementSibling; el.hidden=!el.hidden;}}>Is the review double-blind?</h5>
              <div hidden><p>Yes. Author identities are removed from the version sent to reviewers; ensure your manuscript file does not contain identifying metadata.</p></div>
            </div>
            <div className="mb-3">
              <h5 style={{cursor:'pointer'}} onClick={e=>{const el=e.currentTarget.nextElementSibling; el.hidden=!el.hidden;}}>How long does review take?</h5>
              <div hidden><p>Typical initial decision time is &lt;2 weeks depending on reviewer availability and complexity of the work.</p></div>
            </div>
            <div className="mb-3">
              <h5 style={{cursor:'pointer'}} onClick={e=>{const el=e.currentTarget.nextElementSibling; el.hidden=!el.hidden;}}>What reference style should I use?</h5>
              <div hidden><p>Use IEEE numeric style. Ensure each in-text citation number matches its ordered entry in the reference list.</p></div>
            </div>
          </div>
          <p className="mt-4 small text-muted">Didn’t find your answer? Email <a href="mailto:editor.itme@krmangalam.edu.in">editor.itme@krmangalam.edu.in</a>.</p>
        </div>
      )}

      <div className="mt-5 small text-muted">
        <p>Last updated: {new Date().toISOString().split('T')[0]}</p>
        <p>Download the detailed <a href="/ITME_Author_Guidelines.docx" download>Author Guidelines (.docx)</a> for complete policy text.</p>
      </div>
    </main>
  );
};

// --- Sidebar-enabled Guidelines component extracted for clarity ---
const GuidelinesWithSidebar = () => {
  const containerRef = useRef(null);
  const [active, setActive] = useState('ag-sec-1');
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef(null);
  
  // Memoize TOC so reference stays stable (prevents React hook exhaustive-deps warning)
  const toc = useMemo(() => ([
    { id: 'ag-sec-1', label: 'General Information' },
    { id: 'ag-sec-2', label: 'Manuscript Structure' },
    { id: 'ag-sec-3', label: 'Formatting Guidelines' },
    { id: 'ag-sec-4', label: 'References (IEEE)' },
    { id: 'ag-sec-5', label: 'Submission Procedure' },
    { id: 'ag-sec-6', label: 'Ethical Standards' },
    { id: 'ag-sec-7', label: 'Contact Information' },
  ]), []);

  // Simple and reliable scroll-based highlighting
  useEffect(() => {
    const ids = toc.map(t => t.id);
    let ticking = false;
    
    const updateActiveSection = () => {
      ticking = false;
      
      // Skip auto-detection during programmatic scrolling
      if (isScrollingRef.current) return;
      
      const scrollTop = window.scrollY;
      const viewportHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Check if we're at the very bottom
      if (scrollTop + viewportHeight >= documentHeight - 20) {
        if (active !== ids[ids.length - 1]) {
          setActive(ids[ids.length - 1]);
        }
        return;
      }
      
      // Find which section is currently most visible
      let currentSection = ids[0]; // Default to first section
      
      for (let i = 0; i < ids.length; i++) {
        const element = document.getElementById(ids[i]);
        if (!element) continue;
        
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top;
        
        // If element top is above middle of viewport, this section is active
        if (elementTop <= viewportHeight / 2) {
          currentSection = ids[i];
        } else {
          // Once we find a section below viewport middle, stop
          break;
        }
      }
      
      if (currentSection !== active) {
        setActive(currentSection);
      }
    };
    
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateActiveSection);
      }
    };
    
    // Initial check
    updateActiveSection();
    
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateActiveSection, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, [toc, active]);

  const handleClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    
    // Immediately set active state and disable auto-detection
    setActive(id);
    isScrollingRef.current = true;
    
    // Clear any existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    // Calculate target position with consistent offset
    const targetY = el.offsetTop - 90;
    
    // Scroll to position
    window.scrollTo({ top: targetY, behavior: 'smooth' });
    
    // Re-enable scroll detection after a short delay
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 600);
  };

  return (
    <div className="ag-layout" ref={containerRef}>
      <aside className="ag-sidebar" aria-label="Table of Contents">
        <div className="ag-toc-heading">On this page</div>
        <div className="ag-sidebar-divider" />
        <ul className="ag-toc-root">
          {toc.map(item => (
            <li key={item.id}>
              <a href={`#${item.id}`} onClick={(e)=>handleClick(e,item.id)} className={`ag-toc-link ${active===item.id?'active':''}`}>{item.label}</a>
            </li>
          ))}
        </ul>
        <div className="ag-sidebar-divider" />
        <p className="ag-mini-hint">Scroll to explore. Sections highlight smoothly.</p>
      </aside>
      <div className="ag-content flex-grow-1" style={{minWidth:0}}>
        <Section number={1} title="General Information" defaultOpen>
          <div id="ag-sec-1" style={{scrollMarginTop:'90px'}} />
          <ul>
            {bullet('Manuscripts must present original, unpublished research in engineering and applied sciences.')}
            {bullet('Similarity index must be ≤ 15% (references excluded).')}
            {bullet('Manuscripts must not be under review or published elsewhere.')}
            {bullet('All submissions are screened for plagiarism and scope suitability.')}
          </ul>
        </Section>
        <Section number={2} title="Manuscript Structure" defaultOpen>
          <div id="ag-sec-2" style={{scrollMarginTop:'90px'}} />
          <ol className="ag-ordered">
            <li><strong>Title Page</strong> – concise title, authors, affiliations, corresponding author marked (*).</li>
            <li><strong>Abstract</strong> – 200–250 words; concise summary; no references.</li>
            <li><strong>Keywords</strong> – 3–6 in alphabetical order.</li>
            <li><strong>Main Text</strong> – Introduction, Literature Review, Methodology, Results & Discussion, Conclusion & Future Work.</li>
            <li><strong>Acknowledgment</strong> (optional)</li>
            <li><strong>References</strong> – IEEE style, numbered in order of citation.</li>
          </ol>
        </Section>
        <Section number={3} title="Formatting Guidelines" defaultOpen>
          <div id="ag-sec-3" style={{scrollMarginTop:'90px'}} />
          <ul>
            <li>File Format: .docx (preferred) or PDF for initial review.</li>
            <li>Page Size: A4 (8.27” × 11.69”), Margins: 1 inch on all sides.</li>
            <li>Font: Times New Roman – Title 16 pt bold; Headings 12 pt bold; Body 12 pt, justified, 1.15 spacing.</li>
            <li>Length: 6–12 pages including figures, tables, references.</li>
            <li>Equations: Number sequentially (1), (2), ...</li>
            <li>Figures & Tables: Sequential numbering; Table captions above; Figure captions below (10 pt).</li>
          </ul>
        </Section>
        <Section number={4} title="References (IEEE Style)" defaultOpen>
          <div id="ag-sec-4" style={{scrollMarginTop:'90px'}} />
          <p>Cite references using square brackets [1]; list them in citation order.</p>
          <pre className="ag-code">{`[1] A. B. Author, "Title of paper," IEEE Trans. Comput., vol. 62, no. 3, pp. 123–135, Mar. 2020.
[2] C. D. Author, "Title of paper," in Proc. Int. Conf. Eng. Trends, 2022, pp. 45–52.
[3] E. F. Author, Book Title, 2nd ed. Springer, 2019.`}</pre>
        </Section>
        <Section number={5} title="Submission Procedure" defaultOpen>
          <div id="ag-sec-5" style={{scrollMarginTop:'90px'}} />
          <ol>
            <li>Prepare manuscript using the official ITME template (.docx).</li>
            <li>Ensure similarity index ≤ 15%.</li>
            <li>Submit via the portal: <a href="/form" rel="noopener noreferrer">https://itme.krmangalam.edu.in/form</a></li>
            <li>Each paper undergoes double-blind peer review.</li>
            <li>Revisions require detailed response to reviewer comments.</li>
            <li>Accepted papers published online; DOI assigned when indexing is active.</li>
          </ol>
        </Section>
        <Section number={6} title="Ethical Standards" defaultOpen>
          <div id="ag-sec-6" style={{scrollMarginTop:'90px'}} />
          <ul>
            {bullet('Disclose conflicts of interest and funding sources.')}
            {bullet('No plagiarism, duplicate submission, or manipulated data.')}
            {bullet('Credit or obtain permission for third‑party figures/tables.')}
            {bullet('Provide ethics approval IDs for human/animal studies if applicable.')}
            {bullet('Authorship must reflect actual intellectual contribution.')}
          </ul>
        </Section>
        <Section number={7} title="Contact Information" defaultOpen>
          <div id="ag-sec-7" style={{scrollMarginTop:'90px'}} />
          <address>
            Editorial Office – ITME Journal<br />
            School of Engineering and Technology<br />
            K.R. Mangalam University, Gurugram, Haryana, India<br />
            Email: <a href="mailto:editor.itme@krmangalam.edu.in">editor.itme@krmangalam.edu.in</a><br />
            Technical Support: <a href="mailto:support.itme@krmangalam.edu.in">support.itme@krmangalam.edu.in</a>
          </address>
        </Section>
      </div>
    </div>
  );
};

export default AuthorGuidelines;
