import React from 'react';

const Home = () => {
    return (
        <div style={{ margin: 'auto', padding: '20px', fontSize: '1.1rem', lineHeight: '1.6' }}>
            <h2 id="home_pei_max" className='d-none d-lg-flex' style={{ fontSize: '2rem', textAlign: 'center', color: '#333' }}>
                Welcome to PEI :
                <img
                    src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=20&duration=3000&pause=1000&color=0066cc&vCenter=true&width=435&height=70&lines=Submit+Research+Paper;Explore+Our+Journals;Contribute+in+Research;24%2F7+Support"
                    alt="Typing SVG"
                />
            </h2>
            <h2 id="home_pei_min" className='d-lg-none' style={{ fontSize: '2rem', textAlign: 'center', color: '#333' }}>
                Welcome to PEI :
                <img
                    src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=20&duration=3000&pause=1000&color=0066cc&vCenter=true&width=435&height=70&lines=Submit+Research+Paper;Explore+Our+Journals;Contribute+to+Knowledge;24%2F7+Support"
                    alt="Typing SVG"
                />
            </h2>

            <blockquote style={{ borderLeft: '5px solid rgba(0, 0, 0, 0.1)', padding: '20px', color: 'rgb(19, 15, 15)', fontSize: '1.1rem', marginTop: '20px' }}>
                <a href="https://example.com" style={{ fontStyle: 'italic', textDecoration: 'underline', fontWeight: 'bold' }}>PIONEERING ENGINEERING INSIGHT</a>
                (ISSN:XXXX-XXXX) is dedicated to publishing high-quality research in the field of Engineering. We provide a platform for scholars, researchers, and practitioners to share insights and drive advancements in technology and engineering management.
                <br /><br />
                The journal integrates engineering, science, and management disciplines. We cover the broad spectrum of managerial concerns within technology-driven organizations, such as research and development (R&D) management, innovation processes, project management, human resources, and strategic planning.
                <br /><br />
                Beyond R&D, our scope includes new product development, technology fusion, marketing, and forecasting, providing an interface between technology and corporate functions like manufacturing and administration.
                <br /><br />
                Our mission is to contribute to theory development and practice by serving as a premier forum for publishing pioneering research on all aspects of technology, innovation, and engineering management.
                <br /><br />
                <strong>Scopus Indexing Link:</strong> <a href="https://www.scopus.com/sourceid/XXXX" style={{ textDecoration: 'underline' }}>https://www.scopus.com/sourceid/XXXX</a>
            </blockquote>

            <h3 style={{ fontSize: '1.8rem', color: 'rgb(19, 15, 15)', marginTop: '30px', textAlign: 'center' }}>Journal Insights</h3>

            <div style={{
                padding: '20px',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
                marginTop: '20px',
                backgroundColor: '#ffffff',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                maxWidth: '800px',
                margin: 'auto',
                color: 'rgb(19, 15, 15)'
            }}>
                <div style={{ marginBottom: '20px' }}>
                    <h3 style={{ borderBottom: '2px solid #0066cc', paddingBottom: '5px' }}>Aims & Scope</h3>
                    <p style={{ color: '#333' }}>
                        <i>Pioneering Engineering Insight</i> is an international scholarly refereed research journal dedicated to the theory and practice of technology, innovation, and engineering management. It bridges engineering, science, and management disciplines, focusing on the integration of technology in organizations.
                    </p>
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <strong style={{ fontSize: '1.1rem', color: '#0066cc' }}>ISSN:</strong>
                    <p style={{ color: '#333', marginLeft: '10px' }}>XXXX-XXXX</p>
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <strong style={{ fontSize: '1.1rem', color: '#0066cc' }}>Subject Areas:</strong>
                    <p style={{ color: '#333', marginLeft: '10px' }}>
                        All areas of Engineering & Management, including Accounting, Information Systems, Management Science, Operations Research, and Strategy and Innovation Management.
                    </p>
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <strong style={{ fontSize: '1.1rem', color: '#0066cc' }}>Impact:</strong>
                    <p style={{ color: '#333', marginLeft: '10px' }}>
                        Cite Score: 7.2<br />
                        Impact Factor: 4.8
                    </p>
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <strong style={{ fontSize: '1.1rem', color: '#0066cc' }}>Publication Charges:</strong>
                    <p style={{ color: '#333', marginLeft: '10px' }}>2000 INR or 100 USD for article publishing (open access)</p>
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <strong style={{ fontSize: '1.1rem', color: '#0066cc' }}>Publishing Timeline:</strong>
                    <p style={{ color: '#333', marginLeft: '10px' }}>2 days</p>
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <strong style={{ fontSize: '1.1rem', color: '#0066cc' }}>Peer Review Process:</strong>
                    <p style={{ color: '#333', marginLeft: '10px' }}>
                        Manuscripts submitted to <i>Pioneering Engineering Insight</i> undergo approval by the Editor-in-chief and a formal peer review with collaboration from editorial board members and independent referees. Authors and reviewers are encouraged to use the electronic submission and review system.
                    </p>
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <strong style={{ fontSize: '1.1rem', color: '#0066cc' }}>Blind Review Method:</strong>
                    <p style={{ color: '#333', marginLeft: '10px' }}>
                        PEI employs a double-blind review method for all submissions, ensuring author and reviewer identities remain confidential.
                    </p>
                </div>

                <p style={{ color: '#333', fontWeight: 'bold', marginTop: '20px' }}>Thank you,</p>
                <p style={{ color: '#333', marginBottom: '0' }}>Editor-in-chief</p>
                <p style={{ color: '#333' }}>Samuel Westwood</p>
                <p style={{ color: '#333' }}>Website: <a href="https://pei.com" style={{ textDecoration: 'underline', color: '#0066cc' }}>https://pei.com</a></p>
                <p style={{ color: '#333' }}>Email Id: <a href="mailto:editor@pei.com" style={{ textDecoration: 'underline', color: '#0066cc' }}>editor@pei.com</a></p>
            </div>

        </div>
    );
}

export default Home;

