import React from "react";
import { Link } from "react-router-dom";
import pei_logo from '../Images/PEI_LOGO.png';

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
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '15px 100px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
                {/* Logo on the left */}
                <div style={{ flex: '1', display: 'flex', alignItems: 'center', paddingLeft: '20px' }}>
                    <img src={pei_logo} alt="PEI Logo" style={{ width: '100px', height: 'auto' }} />
                </div>

                {/* Privacy Policy and other details in the middle */}
                <div style={{ flex: '2', textAlign: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <Link to="/privacy-policy" style={linkStyle}>Privacy Policy</Link>
                        <span style={{ color: '#a8a8a8' }}>Terms & Conditions</span>
                    </div>
                </div>

                {/* Contact details on the right */}
                <div style={{ flex: '1', textAlign: 'right', paddingRight: '20px' }}>
                    <Link to="/contact" style={linkStyle}>Contact Us</Link>
                    <span style={{ color: '#a8a8a8', display: 'block', marginBottom: '5px' }}>Phone: +123 456 7890</span>
                    <a href="mailto:editor@pei.com" style={linkStyle}>Email: editor@pei.com</a>
                </div>
            </div>

            {/* Bottom Section with Copyright */}
            <div style={{ paddingTop: '10px' }}>
                <p style={{ color: '#a8a8a8', margin: 0 }}>Copyright ©️ {name} 2024. All rights reserved.</p>
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
