import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../CSS/About.css';
import { ShieldCheck, Users, BookOpen, Globe, FileCheck2, Layers, Clock, Mail, CheckCircle, Edit, Phone } from 'lucide-react';

const About = () => {
    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        AOS.init({ duration: 750, once: true, easing: 'ease-out-cubic' });
    }, []);

    const valueProps = [
        { icon: <ShieldCheck size={34} />, title: 'Ethical & Screened', text: 'All submissions similarity‑checked and evaluated for integrity before review allocation.' },
        { icon: <Users size={34} />, title: 'Editorial Stewardship', text: 'Decisions emphasize clarity of contribution, methodological soundness, and relevance.' },
        { icon: <BookOpen size={34} />, title: 'Biannual Curation', text: 'July & December issues allow focus on quality over volume—balanced thematic coverage.' },
        { icon: <Globe size={34} />, title: 'Cross-Disciplinary Reach', text: 'Interfaces of mechanical, computing, materials, energy, intelligent & sustainable systems.' },
        { icon: <FileCheck2 size={34} />, title: 'Structured Guidance', text: 'Clear template, scope FAQs, revision transparency, and responsive editorial assistance.' },
        { icon: <Layers size={34} />, title: 'Applied + Foundational', text: 'Welcomes robust theoretical models, validated experiments, data-driven engineering insights.' }
    ];

    const scopePillars = [
        'Advanced & Smart Materials',
        'Sustainable & Thermal Systems',
        'Computational & Data-Driven Engineering',
        'Intelligent / Autonomous Systems',
        'Manufacturing Processes & Design Optimization',
        'Energy, Reliability & Infrastructure Resilience'
    ];

    const authorPath = [
        { step: '1', title: 'Prepare Manuscript', text: 'Use the official template; ensure formatting & ethical declarations.' },
        { step: '2', title: 'Submit & Screen', text: 'Similarity + scope screening prior to editor assignment.' },
        { step: '3', title: 'Peer Review', text: 'Targeted reviewers assess originality, rigor, clarity.' },
        { step: '4', title: 'Revision Cycle', text: 'Constructive improvements guided by consolidated feedback.' },
        { step: '5', title: 'Acceptance & Issue', text: 'Approved articles queued for the next biannual issue.' }
    ];

    const editorialPrinciples = [
        { title: 'Integrity First', text: 'Ethics, authorship clarity, conflict transparency.' },
        { title: 'Relevance & Clarity', text: 'Explicit problem framing and verifiable outcomes.' },
        { title: 'Methodological Soundness', text: 'Repeatability, appropriate controls, justified models.' },
        { title: 'Constructive Dialogue', text: 'Reviews framed to elevate—not obstruct—valid work.' }
    ];

        // Journal scope topic cards with representative imagery (authentic, non‑exaggerated labels)
        const scopeTopics = [
            { name: 'Artificial Intelligence', img: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=640&auto=format&fit=crop&q=60' },
            { name: 'Machine Learning', img: 'https://images.unsplash.com/photo-1516110833967-0b5716ca1387?w=640&auto=format&fit=crop&q=60' },
            { name: 'Cyber Security', img: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=640&auto=format&fit=crop&q=60' },
            { name: 'Quantum Computing', img: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=640&auto=format&fit=crop&q=60' },
            { name: 'Blockchain Systems', img: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=640&auto=format&fit=crop&q=60' },
            { name: 'Mechanical & Civil', img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=640&auto=format&fit=crop&q=60' },
            { name: 'Smart / IoT Systems', img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=640&auto=format&fit=crop&q=60' },
            { name: 'Robotics & Automation', img: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=640&auto=format&fit=crop&q=60' },
            { name: 'Biomedical Engineering', img: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=640&auto=format&fit=crop&q=60' },
            { name: 'Energy & Sustainability', img: 'https://images.unsplash.com/photo-1509395062183-67c5ad6faff9?w=640&auto=format&fit=crop&q=60' },
            { name: 'Data & Computational Models', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=640&auto=format&fit=crop&q=60' },
            { name: 'Materials Engineering', img: 'https://images.unsplash.com/photo-1581093803931-46e730e7622e?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWVjaGFuaWNhbCUyMGVuZ2luZWVyaW5nfGVufDB8fDB8fHww' }
        ];

    return (
        <main className="about-wrapper" aria-labelledby="about-journal-heading">
            <section className="about-hero" data-aos="fade-up">
                <div className="about-hero__overlay" />
                <div className="about-hero__inner">
                    <img src="/logo.png" alt="ITME Journal Logo" className="about-hero__logo" />
                    <h1 id="about-journal-heading" className="about-hero__title">Innovative Trends in Multidisciplinary Engineering</h1>
                    <p className="about-hero__tagline">A biannual, peer‑reviewed platform advancing responsibly curated research across intersecting engineering domains.</p>
                    <div className="about-hero__badges" aria-label="Journal attributes">
                        <span className="badge-pill">Biannual Issues</span>
                        <span className="badge-pill">Open Access</span>
                        <span className="badge-pill">Ethics Aligned</span>
                    </div>
                    <p className="about-hero__linkline">Parent Institution: <Link to="/krmangalam-university" className="link-inline">K.R. Mangalam University →</Link></p>
                </div>
            </section>

            <section className="about-section" data-aos="fade-up" aria-labelledby="value-props-heading">
                <h2 id="value-props-heading" className="section-title">What ITME Provides</h2>
                <div className="value-grid">
                    {valueProps.map(v => (
                        <div key={v.title} className="value-card" tabIndex={0}>
                            <div className="value-icon" aria-hidden="true">{v.icon}</div>
                            <h3 className="value-title">{v.title}</h3>
                            <p className="value-text">{v.text}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="about-section alt" aria-labelledby="scope-heading" data-aos="fade-up">
                <h2 id="scope-heading" className="section-title">Scope & Disciplinary Interfaces</h2>
                <p className="lead-text">
                    ITME welcomes original research articles, technical briefs, design methodologies, computational models, experimental studies, and integrative reviews that advance engineering problem‑solving, sustainability, performance optimization, reliability, or system intelligence.
                </p>
                <ul className="pillar-list" aria-label="Core focus pillars">
                    {scopePillars.map(p => <li key={p} className="pillar-item">{p}</li>)}
                </ul>
                <p className="small-note">Emerging intersections (AI‑assisted engineering analytics, cyber‑physical systems, resilient infrastructure) are encouraged when grounded in technical rigor.</p>
            </section>

            <section className="about-section" aria-labelledby="author-path-heading" data-aos="fade-up">
                <h2 id="author-path-heading" className="section-title">Author Pathway</h2>
                <div className="path-grid">
                    {authorPath.map(s => (
                        <div key={s.step} className="path-step">
                            <div className="step-index" aria-label={`Step ${s.step}`}>{s.step}</div>
                            <h3 className="step-title">{s.title}</h3>
                            <p className="step-text">{s.text}</p>
                        </div>
                    ))}
                </div>
                <div className="cta-wrapper">
                    <Link to="/form" className="cta-btn"><Edit size={18} /> Submit Manuscript</Link>
                </div>
            </section>

            <section className="about-section ethos" aria-labelledby="ethos-heading" data-aos="fade-up">
                <h2 id="ethos-heading" className="section-title">Editorial Principles</h2>
                <div className="ethos-grid">
                    {editorialPrinciples.map(e => (
                        <div key={e.title} className="ethos-card">
                            <h3 className="ethos-title">{e.title}</h3>
                            <p className="ethos-text">{e.text}</p>
                        </div>
                    ))}
                </div>
            </section>

                    {/* Journal Scope & Coverage with imagery */}
                    <section className="about-section scope" aria-labelledby="journal-scope-heading" data-aos="fade-up">
                        <h2 id="journal-scope-heading" className="section-title">Journal Scope & Coverage</h2>
                        <p className="lead-text">
                            The journal embraces methodologically sound, ethically responsible work across foundational and applied engineering domains. Below is a non‑exhaustive map of representative focus areas—emerging intersections are considered when technically rigorous and within multidisciplinary relevance.
                        </p>
                        <div className="scope-grid">
                            {scopeTopics.map((t,i) => (
                                <figure key={t.name} className="scope-card" data-aos="zoom-in" data-aos-delay={50 + i * 40}>
                                    <div className="scope-media" aria-hidden="true">
                                        <img loading="lazy" src={t.img} alt={t.name + ' illustrative'} />
                                    </div>
                                    <figcaption className="scope-caption">{t.name}</figcaption>
                                </figure>
                            ))}
                        </div>
                        <p className="small-note" style={{marginTop:'1.75rem'}}>Images are illustrative only—selection does not imply exclusivity; authors should consult the template & guidance before submission.</p>
                    </section>

            <section className="about-section contact" aria-labelledby="contact-heading" data-aos="fade-up">
                <h2 id="contact-heading" className="section-title">Contact & Support</h2>
                <div className="contact-grid">
                    <div className="contact-card" data-aos="zoom-in" data-aos-delay="50">
                        <Mail size={26} className="contact-icon" />
                        <h3 className="contact-label">Manuscript / Editorial</h3>
                        <p className="contact-text">Submission status, reviewer queries, scope clarification.</p>
                        <a href="mailto:editor.itme@krmangalam.edu.in" className="contact-link">editor.itme@krmangalam.edu.in</a>
                    </div>
                    <div className="contact-card" data-aos="zoom-in" data-aos-delay="90">
                        <ShieldCheck size={26} className="contact-icon" />
                        <h3 className="contact-label">Ethics & Integrity</h3>
                        <p className="contact-text">Plagiarism concerns, authorship, conflict disclosure.</p>
                        <a href="mailto:editor.itme@krmangalam.edu.in" className="contact-link">editor.itme@krmangalam.edu.in</a>
                    </div>
                    <div className="contact-card" data-aos="zoom-in" data-aos-delay="130">
                        <Mail size={26} className="contact-icon" />
                        <h3 className="contact-label">Technical Support</h3>
                        <p className="contact-text">Platform access or file upload issues.</p>
                        <a href="mailto:support.itme@krmangalam.edu.in" className="contact-link">support.itme@krmangalam.edu.in</a>
                    </div>
                    <div className="contact-card" data-aos="zoom-in" data-aos-delay="170">
                        <Phone size={26} className="contact-icon" />
                        <h3 className="contact-label">Academic Liaison</h3>
                        <p className="contact-text">Dean (SOET) – academic coordination (business hrs IST).</p>
                        <span className="contact-text">+91‑9811911970</span>
                    </div>
                    <div className="contact-card" data-aos="zoom-in" data-aos-delay="210">
                        <Clock size={26} className="contact-icon" />
                        <h3 className="contact-label">Typical Response</h3>
                        <p className="contact-text">Initial acknowledgement within 1–2 business days.</p>
                        <p className="contact-text">Complex ethical reviews may require additional time.</p>
                    </div>
                    <div className="contact-card emphasis" data-aos="zoom-in" data-aos-delay="250">
                        <CheckCircle size={24} className="contact-icon" />
                        <p className="contact-text tight"><strong>Format tip:</strong> Subject line =&nbsp;<em>“Manuscript ID (if any) – Short Topic (≤60 chars)”</em>. Attach revised files only when requested.</p>
                    </div>
                </div>
            </section>

            <footer className="about-footer" aria-label="Footer quick link">
                <Link to="/krmangalam-university" className="footer-link">Visit K.R. Mangalam University Profile →</Link>
            </footer>
        </main>
    );
};

export { About };