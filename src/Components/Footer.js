import React from "react";
import { Link } from "react-router-dom";
import itme_logo from "../Images/ITME_LOGO.png";
import "../CSS/Footer.css"; // if you extract styles to a separate file

const Footer = React.memo(({ name }) => {
    return (
        <footer className="footer">
            {/* Top Section with logo, policy, and contact details */}
            <div className="footer-top">
                {/* Logo at the top/left */}
                <div className="footer-logo">
                    <img src={itme_logo} alt="ITME Logo" className="footer-logo-img" />
                </div>

                {/* Privacy Policy and Terms */}
                <div className="footer-policy">
                    <Link to="/privacy-policy" className="footer-link">
                        Privacy Policy
                    </Link>
                    <Link to="/terms-and-conditions" className="footer-link">
                        Terms &amp; Conditions
                    </Link>
                </div>

                {/* Contact details */}
                <div className="footer-contact">
                    <Link to="/contact" className="footer-link">
                        Contact Us
                    </Link>
                    <span className="footer-contact-text">
                        <a href="mailto:support.itme@krmangalam.edu.in" className="footer-link">
                            support.itme@krmangalam.edu.in
                        </a>
                        <a href="mailto:editor.itme@krmangalam.edu.in" className="footer-link">
                            editor.itme@krmangalam.edu.in
                        </a>
                    </span>
                </div>
            </div>

            {/* Bottom Section with Copyright */}
            <div className="footer-bottom">
                <p className="footer-copyright">
                    Copyright ©️ {name} 2025. All rights reserved.
                </p>
            </div>
        </footer>
    );
});

export default Footer;
