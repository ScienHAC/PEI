import React from 'react'
import { Link } from 'react-router-dom'
export default function Header() {
    return (
        <>
            <div id="topBar">
                <h2 className="jnhd">PIONEERING ENGINEERING INSIGHT</h2>
                <p className="jndh">
                    ISSN: 0923--4748 Scopus Indexed and Multidisciplinary Journal
                </p>
            </div>
            <nav
                className="navbar navbar-expand-lg navbar-light mx-auto"
                style={{ backgroundColor: "#e3f2fd" }}
            >
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
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">
                                Welcome to JETM<span className="sr-only">(current)</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">
                                About
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="google.com">
                                Abstracting & Indexing
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link disabled" to="google.com">
                                Current Issue
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="google.com">
                                Archives
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="google.com">
                                Editorial Board
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="google.com">
                                Contact Us
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/form">
                                Research Archive
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}
