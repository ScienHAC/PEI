import React, { useState, useEffect, useCallback, useRef } from 'react';
import pei_logo from '../Images/PEI_LOGO.png';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import useAuth from '../Hooks/useAuth';
export default function Header() {
    const { isAuthenticated, refreshAuthStatus, isAdmin, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const userDetailsRef = useRef(null);
    const [showUserDetails, setShowUserDetails] = useState(false);
    const refreshAuth = useCallback(() => {
        refreshAuthStatus();
    }, [refreshAuthStatus]);

    useEffect(() => {
        refreshAuth();
    }, [location, refreshAuth]);

    const handleLogin = () => {
        navigate('/login');
        refreshAuth();
    };
    const handleSignup = () => {
        navigate('/signup');
        refreshAuth();
    };
    const handleLogout = () => {
        // Logout user
        fetch(`${process.env.REACT_APP_hostURL}/auth/logout`, {
            method: 'GET',
            credentials: 'include',
        })
            .then((response) => {
                if (response.ok) {
                    navigate('/', { replace: true });
                    refreshAuth();
                } else {
                    console.error('Error:', response);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };
    const handleMouseEnter = () => {
        setShowUserDetails(true);
    };

    const handleMouseLeave = () => {
        setShowUserDetails(false);
    };

    const handleClickOutside = (event) => {
        if (userDetailsRef.current && !userDetailsRef.current.contains(event.target)) {
            setShowUserDetails(false);
        }
    };
    useEffect(() => {
        if (showUserDetails) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showUserDetails]);

    return (
        <>
            <div id='info-bar'>
                <div id='child-info-bar'>
                    <span><FontAwesomeIcon className="mx-2" icon={faEnvelope} />info@pei.com</span>
                    <span><FontAwesomeIcon className="mx-2" icon={faPhone} />+(91) 99999 40157</span>
                </div>
            </div>
            <div id="topBar">
                {/* for wider screen */}
                <div id="innerBar-max" className='d-none d-lg-flex'>
                    <img className="logo-max" src={pei_logo} alt="Logo" />
                    <div id='childBar-max'>
                        <h2 className="jnhd-max">Pioneering Engineering Insight</h2>
                        <p className="jndh-max">
                            ISSN: 0923-4748
                        </p>
                    </div>
                </div>
                {/* for mobile pr lower screen */}
                <div id="innerBar-min" className='d-lg-none'>
                    <img className="logo-min" src={pei_logo} alt="Logo" />
                    <div id='childBar-min'>
                        <h2 className="jnhd-min">Pioneering Engineering Insight</h2>
                        <p className="jndh-min">
                            ISSN: 0923-4748
                        </p>
                    </div>
                </div>
            </div>

            <nav className="navbar navbar-expand-lg navbar-light mx-auto navbar-custom" style={{ backgroundColor: "#e3f2fd" }}>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Buttons that stay outside the collapsible part */}

                <div className="d-flex ms-auto d-lg-none">
                    {isAuthenticated ? (
                        <>
                            <button
                                className="btn btn-outline-success mx-2"
                                id="User_btn"
                                onClick={() => setShowUserDetails(!showUserDetails)}
                                onMouseEnter={handleMouseEnter}
                            >
                                <i className="fa-regular fa-user"></i>
                            </button>
                            <button className="btn btn-outline-success mx-2" id="Logout_btn" onClick={handleLogout}>
                                <i className="fa fa-sign-out" aria-hidden="true"></i>
                            </button>
                            {showUserDetails && (
                                <div
                                    ref={userDetailsRef}
                                    className="user-details-dropdown"
                                    style={{
                                        position: 'absolute',
                                        top: '60px', // Adjust as needed
                                        right: '20px', // Adjust as needed
                                        backgroundColor: '#fff',
                                        border: '1px solid #ccc',
                                        padding: '10px',
                                        borderRadius: '5px',
                                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                                    }}
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <p><strong>User Dashboard</strong></p>
                                    <p>Name: {user.name}</p>
                                    <p>Email: {user.email}</p>
                                    <Link to="/dashboard">Go to Dashboard</Link>
                                    <Link to="/profile" style={{ display: 'block', marginTop: '5px' }}>View Profile</Link>
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            <button className="btn btn-outline-success mx-2" id="Login_btn" onClick={handleLogin}>
                                Login
                            </button>
                            <button className="btn btn-outline-success mx-2" id="Signup_btn" onClick={handleSignup}>
                                Sign Up
                            </button>
                        </>
                    )}
                </div>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto nav-link-custom">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">Welcome to PEI<span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="google.com">Abstracting & Indexing</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link disabled" to="google.com">Current Issue</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="google.com">Archives</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="google.com">Editorial Board</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="google.com">Contact Us</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/form">Research Archive</Link>
                        </li>
                        {isAdmin ? (
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin">Admin</Link>
                            </li>
                        ) : (
                            null
                        )}
                    </ul>

                    {/* Buttons on the right for larger screens */}
                    <div className="d-none d-lg-flex">
                        {isAuthenticated ? (
                            <>
                                <button
                                    className="btn btn-outline-success mx-2"
                                    id="User_btn"
                                    onClick={() => setShowUserDetails(!showUserDetails)}
                                    onMouseEnter={handleMouseEnter}
                                >
                                    <i className="fa-regular fa-user"></i>
                                </button>
                                <button className="btn btn-outline-success mx-2" id="Logout_btn" onClick={handleLogout}>
                                    <i className="fa fa-sign-out" aria-hidden="true"></i>
                                </button>
                                {/* Conditionally render user dashboard details */}
                                {showUserDetails && (
                                    <div
                                        ref={userDetailsRef}
                                        className="user-details-dropdown"
                                        style={{
                                            position: 'absolute',
                                            top: '60px', // Adjust as needed
                                            right: '20px', // Adjust as needed
                                            backgroundColor: '#fff',
                                            border: '1px solid #ccc',
                                            padding: '10px',
                                            borderRadius: '5px',
                                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                                        }}
                                        onMouseEnter={handleMouseEnter}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        <p><strong>User Dashboard</strong></p>
                                        <p>Name: {user.name}</p>
                                        <p>Email: {user.email}</p>
                                        <Link to="/dashboard">Go to Dashboard</Link>
                                        <Link to="/profile" style={{ display: 'block', marginTop: '5px' }}>View Profile</Link>
                                    </div>
                                )}
                            </>
                        ) : (
                            <>
                                <button className="btn btn-outline-success mx-2" id="Login_btn" onClick={handleLogin}>
                                    Login
                                </button>
                                <button className="btn btn-outline-success mx-2" id="Signup_btn" onClick={handleSignup}>
                                    Sign Up
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </>
    )
}