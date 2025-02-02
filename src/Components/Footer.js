import React from "react";
import { Link } from "react-router-dom";
import itme_logo from '../Images/ITME_LOGO.png';

const Footer = ({ name }) => {
    return (
        <footer style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#1c1c1e',
            color: '#fff',
            padding: '20px',
            fontSize: '0.9rem',
            textAlign: 'center'
        }}>
            {/* Top Section with logo, policy, and contact details */}
            <div style={{
                width: '80vw',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '15px 100px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
                {/* Logo on the left */}
                <div style={{ flex: '1', display: 'flex', alignItems: 'center', paddingLeft: '20px' }}>
                    <img src={itme_logo} alt="ITME Logo" style={{ width: '100px', height: 'auto', transform: 'scale(1.5)' }} />
                </div>

                {/* Privacy Policy and other details in the middle */}
                <div style={{ flex: '2', textAlign: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <Link to="/privacy-policy" style={linkStyle}>Privacy Policy</Link>
                        <Link to='/terms-and-conditions' style={linkStyle}>Terms & Conditions</Link>
                    </div>
                </div>

                {/* Contact details on the right */}
                <div style={{ flex: '1', textAlign: 'right', paddingRight: '20px' }}>
                    <Link to="/contact" style={linkStyle}>Contact Us</Link>
                    <span style={{ color: '#a8a8a8', display: 'block', marginBottom: '5px' }}>Phone: +91 90693 60400</span>
                    <a href="mailto:itme@krmangalam.edu.in" style={linkStyle}>Email: itme@krmangalam.edu.in</a>
                </div>
            </div>

            {/* Bottom Section with Copyright */}
            <div style={{ paddingTop: '10px' }}>
                <p style={{ color: '#a8a8a8', margin: 0 }}>Copyright ©️ {name} 2025. All rights reserved.</p>
            </div>
        </footer>
    );
};

// Link style with transition for smooth color change
const linkStyle = {
    color: '#a8a8a8',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
    marginBottom: '5px',
    display: 'block'
};

export default Footer;
