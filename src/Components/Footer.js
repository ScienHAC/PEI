import React from "react";
import { Link } from "react-router-dom";
import "../CSS/Footer.css";

const Footer = React.memo(({ name }) => {
    return (
        <footer className="footer">
            {/* Main Footer Content */}
            <div className="footer-main">
                {/* Left Section - University Logo */}
                <div className="footer-left">
                    <div className="footer-university-section">
                        <img src="/kmu.png" alt="K.R. Mangalam University Logo" className="footer-logo-main" />
                        <div className="footer-university-text">
                            <h4>K.R. Mangalam University</h4>
                            <p>Excellence in Education</p>
                        </div>
                    </div>
                </div>

                {/* Center Section - Journal Info */}
                <div className="footer-center">
                    <div className="footer-journal-section">
                        <div className="footer-logo-combination">
                            <img src="/ITME.png" alt="ITME Logo" className="footer-logo-itme" />
                            <span className="footer-logo-separator">×</span>
                            <img src="/kmu.png" alt="K.R. Mangalam University Logo" className="footer-logo-krmu" />
                        </div>
                        <div className="footer-journal-text">
                            <h3>ITME</h3>
                            <p>Innovative Trends in Multidisciplinary Engineering</p>
                            <p className="footer-publisher">Published by K.R. Mangalam University</p>
                        </div>
                    </div>
                </div>

                {/* Links Section */}
                <div className="footer-links-section">
                    <div className="footer-links-group">
                        <h4>Quick Links</h4>
                        <Link to="/about" className="footer-link">About Journal</Link>
                        <Link to="/editorial-board" className="footer-link">Editorial Board</Link>
                        <Link to="/archives" className="footer-link">Archives</Link>
                        <Link to="/current-issue" className="footer-link">Current Issue</Link>
                    </div>
                    <div className="footer-links-group">
                        <h4>Support</h4>
                        <Link to="/contact" className="footer-link">Contact Us</Link>
                        <a href="mailto:support.itme@krmangalam.edu.in" className="footer-link">
                            Technical Support
                        </a>
                        <a href="mailto:editor.itme@krmangalam.edu.in" className="footer-link">
                            Editorial Office
                        </a>
                    </div>
                    <div className="footer-links-group">
                        <h4>Policies</h4>
                        <Link to="/privacy-policy" className="footer-link">Privacy Policy</Link>
                        <Link to="/terms-and-conditions" className="footer-link">Terms & Conditions</Link>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="footer-bottom">
                <p className="footer-copyright">
                    © 2025 ITME Journal - K.R. Mangalam University. All rights reserved.
                </p>
                <p className="footer-issn">
                    International Peer-Reviewed Journal | Open Access Publication
                </p>
            </div>
        </footer>
    );
});

export default Footer;
