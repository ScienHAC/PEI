import React, { useState, useEffect, useCallback, useRef } from 'react';
import '../CSS/Header.css';
import * as DarkReader from 'darkreader';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import useAuth from '../Hooks/useAuth';

const Header = React.memo(() => {
    const { isAuthenticated, refreshAuthStatus, isAdmin, user, role } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const userDetailsRef = useRef(null);
    const [showUserDetails, setShowUserDetails] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return JSON.parse(localStorage.getItem('isDarkMode')) || false;
    });

    useEffect(() => {
        localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));

        DarkReader.setFetchMethod(window.fetch);
        if (isDarkMode) {
            DarkReader.enable({
                brightness: 100,
                contrast: 90,
                sepia: 10,
            });
        } else {
            DarkReader.disable();
        }

        return () => {
            DarkReader.disable();
        };
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    const refreshAuth = useCallback(() => {
        refreshAuthStatus();
    }, [refreshAuthStatus]);

    useEffect(() => {
        refreshAuth();
    }, [location, refreshAuth]);

    // Login & signup handlers retained (commented) for future activation
    // const handleLogin = () => { navigate('/login'); refreshAuth(); };
    // const handleSignup = () => { navigate('/signup'); refreshAuth(); };
    const handleLogout = () => {
        // Logout user
        fetch(`${process.env.REACT_APP_hostURL}/auth/logout`, {
            method: 'POST',
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
            setShowUserDetails(true);
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
                    <span><FontAwesomeIcon className="mx-2" icon={faEnvelope} />support.itme@krmangalam.edu.in</span>
                    <span>K.R. Mangalam University</span>
                </div>
            </div>
            <div id="topBar">
                {/* for wider screen */}
                <div id="innerBar-max" className='d-none d-md-flex'>
                    <div className="header-left-logo">
                        <img src="/itme_2.png" alt="University Logo" className="logo-max" />
                    </div>
                    <div id='childBar-max'>
                        <h2 className="jnhd-max">INNOVATIVE TRENDS IN MULTIDISCIPLINARY ENGINEERING</h2>
                        <div className="header-subtitle">
                            <span className="issn-text">International Peer-Reviewed Journal by School Of Engineering & Technology , K.R. Mangalam University, Gurugram.</span>
                        </div>
                    </div>
                    <div className="header-right-logo">
                        <img src="/krmu.png" alt="KRMU Logo" className="itme-logo-max" />
                    </div>
                </div>
                {/* for tablet and mobile */}
                <div id="innerBar-min" className='d-md-none'>
                    <img className="logo-min" src="/itme_2.png" alt="University Logo" />
                    <div id='childBar-min'>
                        <h2 className="jnhd-min">INNOVATIVE TRENDS IN MULTIDISCIPLINARY ENGINEERING</h2>
                        <div className="header-subtitle-mobile">
                            <span className="issn-text-mobile">International Journal</span>
                        </div>
                    </div>
                    <img className="logo-min" src="/krmu.png" alt="KRMU Logo" />
                </div>
            </div>

            <nav className="navbar navbar-expand-lg navbar-light mx-auto navbar-custom" style={{ backgroundColor: "rgba(8, 76, 97, 0.08)" }}>
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
                    <button className="theme-toggle-btn" onClick={toggleDarkMode} aria-label="Toggle dark mode">
                        <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
                    </button>
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
                                    {role === 'reviewer' ? (
                                        <Link to="/reviewer/dashboard">Go to Dashboard</Link>
                                    ) : (
                                        <Link to="/dashboard">Go to Dashboard</Link>
                                    )}
                                    <Link to="/profile" style={{ display: 'block', marginTop: '5px' }}>View Profile</Link>
                                </div>
                            )}
                        </>
                    ) : (
                        // Login / Signup hidden during initial launch
                        null
                    )}
                </div>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto nav-link-custom">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">
                                Welcome to ITME <span className="sr-only">(current)</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/abstracting-indexing">Abstracting & Indexing</Link>
                        </li>

                        {/* Dropdown for Publications */}
                        <li className="nav-item dropdown">
                            <button
                                className="nav-link dropdown-toggle"
                                id="navbarDropdown"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Publications
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li>
                                    <Link className="dropdown-item" to="/current-issue">Current Issue</Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/archives">Archives</Link>
                                </li>
                            </ul>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/editorial-board">Editorial Board</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/contact">Contact Us</Link>
                        </li>

                        {/* Role-Based Links */}
                        {/* Active placeholder: Submit Manuscript (goes to staged placeholder form) */}
                        <li className="nav-item">
                            <Link className="nav-link" to="/form">Submit Manuscript</Link>
                        </li>

                        {isAdmin && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin">Admin</Link>
                            </li>
                        )}
                    </ul>
                    {/* Buttons on the right for larger screens */}
                    <div className="d-none d-lg-flex align-items-center">
                        <button className="theme-toggle-btn me-2" onClick={toggleDarkMode} aria-label="Toggle dark mode">
                            <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
                        </button>
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
                                            top: '60px',
                                            right: '20px',
                                            backgroundColor: '#fff',
                                            border: '1px solid #ccc',
                                            padding: '10px',
                                            borderRadius: '5px',
                                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'
                                        }}
                                        onMouseEnter={handleMouseEnter}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        <p><strong>User Dashboard</strong></p>
                                        <p>Name: {user.name}</p>
                                        <p>Email: {user.email}</p>
                                        {role === 'reviewer' ? (
                                            <Link to="/reviewer/dashboard">Go to Dashboard</Link>
                                        ) : (
                                            <Link to="/dashboard">Go to Dashboard</Link>
                                        )}
                                        <Link to="/profile" style={{ display: 'block', marginTop: '5px' }}>View Profile</Link>
                                    </div>
                                )}
                            </>
                        ) : null}
                    </div>
                </div>
            </nav>
        </>
    );
});

export default Header;
