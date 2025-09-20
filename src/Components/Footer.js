import React from "react";
import { Link } from "react-router-dom";
import "../CSS/Footer.css";

// Icon social links (user requested icons only with correct URLs)
const socialLinks = [
    { label: "Instagram", icon: "fab fa-instagram", url: "https://www.instagram.com/krmuniv/" },
    { label: "X (Twitter)", icon: "fab fa-x-twitter", url: "https://x.com/krmuniversity" },
    { label: "Facebook", icon: "fab fa-facebook-f", url: "https://facebook.com/krmuniv" },
    { label: "LinkedIn", icon: "fab fa-linkedin-in", url: "https://www.linkedin.com/school/krmuniv/" },
];

const Footer = React.memo(() => {
    return (
        <footer className="footer">
            <div className="footer-main">
                {/* LEFT: Logo + Contact */}
                <div className="footer-left">
                    <div className="footer-contact-section">
                        <img src="/logo.png" alt="University Logo" className="footer-logo-main enlarged" onError={(e)=>{e.currentTarget.src='/krmu.png';}} />
                        <h4 className="footer-section-title">Contact Information</h4>
                        <div className="footer-contact-list">
                            <div className="footer-contact-item">
                                <span className="footer-contact-label">Address:</span>
                                <span className="footer-contact-text">K.R. Mangalam University, Sohna Road, Gurugram, Haryana 122103</span>
                            </div>
                            <div className="footer-contact-item">
                                <span className="footer-contact-label">General SOET:</span>
                                <a href="mailto:dean.soet@krmangalam.edu.in" className="footer-contact-link">dean.soet@krmangalam.edu.in</a>
                            </div>
                            {/* <div className="footer-contact-item">
                                <span className="footer-contact-label">Conference / Events:</span>
                                <a href="mailto:soetconference@krmangalam.edu.in" className="footer-contact-link">soetconference@krmangalam.edu.in</a>
                            </div> */}
                        </div>
                    </div>
                </div>

                {/* CENTER: Journal Info */}
                <div className="footer-center">
                    <div className="footer-journal-section">
                        <div className="footer-logo-combination">
                            <img src="/ITME.png" alt="ITME Logo" className="footer-logo-itme" />
                            <span className="footer-logo-separator">×</span>
                            <img src="/krmu.png" alt="K.R. Mangalam University Logo" className="footer-logo-krmu" />
                        </div>
                        <div className="footer-journal-text">
                            <h3>ITME</h3>
                            <p>Innovative Trends in Multidisciplinary Engineering</p>
                            <p className="footer-publisher">Published by K.R. Mangalam University</p>
                        </div>
                    </div>
                </div>

                {/* RIGHT: Links + Social icons */}
                <div className="footer-right">
                    <div className="footer-links-section">
                        <div className="footer-links-group">
                            <h4>Quick Links</h4>
                            <Link to="/about" className="footer-link">About Journal</Link>
                            <Link to="/editorial-leadership" className="footer-link">Editorial Leadership</Link>
                            <Link to="/archives" className="footer-link">Archives</Link>
                            <Link to="/current-issue" className="footer-link">Current Issue</Link>
                            <Link to="/author-guidelines" className="footer-link">Author Guidelines</Link>
                        </div>
                        <div className="footer-links-group">
                            <h4>Support</h4>
                            <Link to="/contact" className="footer-link">Contact Us</Link>
                            <a href="mailto:support.itme@krmangalam.edu.in" className="footer-link">Technical Support</a>
                            <a href="mailto:editor.itme@krmangalam.edu.in" className="footer-link">Editorial Office</a>
                        </div>
                        <div className="footer-links-group">
                            <h4>Policies</h4>
                            <Link to="/privacy-policy" className="footer-link">Privacy Policy</Link>
                            <Link to="/terms-and-conditions" className="footer-link">Terms & Conditions</Link>
                        </div>
                    </div>
                    <div className="footer-social-icons" aria-label="Social media links">
                        {socialLinks.map((s, i) => (
                            <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label={s.label} title={s.label}>
                                <i className={s.icon} aria-hidden="true"></i>
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p className="footer-copyright">© 2025 ITME Journal - K.R. Mangalam University. All rights reserved.</p>
                <p className="footer-issn">International Peer-Reviewed Journal | Open Access Publication</p>
            </div>
        </footer>
    );
});

export default Footer;