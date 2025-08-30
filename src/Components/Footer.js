import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter, faLinkedinIn, faInstagram, faYoutube, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import "../CSS/Footer.css";

const socialLinks = [
    { href: 'https://www.facebook.com/', label: 'Facebook', icon: faFacebookF },
    { href: 'https://twitter.com/', label: 'Twitter', icon: faTwitter },
    { href: 'https://x.com/', label: 'X', icon: faXTwitter },
    { href: 'https://www.linkedin.com/', label: 'LinkedIn', icon: faLinkedinIn },
    { href: 'https://www.instagram.com/', label: 'Instagram', icon: faInstagram },
    { href: 'https://www.youtube.com/', label: 'YouTube', icon: faYoutube },
];

const Footer = React.memo(({ name }) => {
    return (
        <footer className="footer">
            {/* Main Footer Content */}
            <div className="footer-main">
                {/* Left Column */}
                <div className="footer-col footer-contact-col">
                    <div className="footer-logo-wrapper">
                        <img src="/logo.png" alt="K.R. Mangalam University" className="footer-main-logo enlarged" />
                    </div>
                    <h4 className="footer-section-heading">CONTACT INFORMATION</h4>
                    <div className="footer-contact-item">
                        <FontAwesomeIcon icon={faPhone} />
                        <div className="contact-info">
                            <a href="tel:01148884888" className="contact-primary">011-48884888</a>
                            <span className="contact-secondary">8800697010–15 / 8192888444</span>
                        </div>
                    </div>
                    <div className="footer-contact-item">
                        <FontAwesomeIcon icon={faEnvelope} />
                        <div className="contact-info">
                            <a href="mailto:dean.soet@krmangalam.edu.in" className="contact-primary">dean.soet@krmangalam.edu.in</a>
                            <a href="mailto:soetconference@krmangalam.edu.in" className="contact-secondary">soetconference@krmangalam.edu.in</a>
                        </div>
                    </div>
                    <div className="footer-contact-item">
                        <FontAwesomeIcon icon={faLocationDot} />
                        <div className="contact-info">
                            <span className="contact-primary">Sohna Road, Gurugram</span>
                            <span className="contact-secondary">Haryana 122103 (India)</span>
                        </div>
                    </div>
                </div>

                {/* Center Column */}
                <div className="footer-col footer-center-col">
                    <div className="footer-logo-combination flat">
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

                {/* Right Column Navigation */}
                <nav className="footer-col footer-nav-col" aria-label="Footer navigation">
                    <div className="footer-nav-columns three-cols">
                        <div className="footer-links-group">
                            <h4>QUICK LINKS</h4>
                            <Link to="/about" className="footer-link">About Journal</Link>
                            <Link to="/editorial-board" className="footer-link">Editorial Board</Link>
                            <Link to="/archives" className="footer-link">Archives</Link>
                            <Link to="/current-issue" className="footer-link">Current Issue</Link>
                        </div>
                        <div className="footer-links-group">
                            <h4>SUPPORT</h4>
                            <Link to="/contact" className="footer-link">Contact Us</Link>
                            <a href="mailto:support.itme@krmangalam.edu.in" className="footer-link">Technical Support</a>
                            <a href="mailto:editor.itme@krmangalam.edu.in" className="footer-link">Editorial Office</a>
                        </div>
                        <div className="footer-links-group">
                            <h4>POLICIES</h4>
                            <Link to="/privacy-policy" className="footer-link">Privacy Policy</Link>
                            <Link to="/terms-and-conditions" className="footer-link">Terms & Conditions</Link>
                        </div>
                    </div>
                </nav>
            </div>
            {/* Social Row (centered) */}
            <div className="footer-social-row" aria-label="Social media">
                {socialLinks.map(s => (
                    <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        className="footer-social-icon"
                    >
                        <FontAwesomeIcon icon={s.icon} />
                    </a>
                ))}
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
