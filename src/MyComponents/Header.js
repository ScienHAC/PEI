import React, { useEffect, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
export default function Header() {
    const { isAuthenticated, refreshAuthStatus } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Memoize refreshAuthStatus to avoid dependency warnings
    const refreshAuth = useCallback(() => {
        refreshAuthStatus();
    }, [refreshAuthStatus]);

    useEffect(() => {
        refreshAuth(); // Refresh on route change
    }, [location, refreshAuth]); // Add refreshAuth to dependency array

    const handleLogin = () => {
        navigate('/login');
        refreshAuth();
    };
    const handleSignup = () => {
        navigate('/signup');
        refreshAuth();
    };
    return (
        <>
            <div id="topBar">
                <h2 className="jnhd">PIONEERING ENGINEERING INSIGHT</h2>
                <p className="jndh">
                    ISSN: 0923--4748 Scopus Indexed and Multidisciplinary Journal
                </p>
            </div>

            <nav className="navbar navbar-expand-lg navbar-light mx-auto" style={{ backgroundColor: "#e3f2fd" }}>
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
                            <button className="btn btn-outline-success mx-2" id="Logout_btn">
                                <i className="fa fa-sign-out" aria-hidden="true"></i>
                            </button>
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
                    <ul className="navbar-nav me-auto">
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
                    </ul>

                    {/* Buttons on the right for larger screens */}
                    <div className="d-none d-lg-flex">
                        {isAuthenticated ? (
                            <>
                                <button className="btn btn-outline-success mx-2" id="Logout_btn">
                                    <i className="fa fa-sign-out" aria-hidden="true"></i>
                                </button>
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