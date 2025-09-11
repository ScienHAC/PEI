import React, { useEffect, useState, useCallback, useRef } from 'react';
import CurrentIssue from '../Pages/CurrentIssue';
import { Link } from 'react-router-dom';
import Loader from '../Components/Loader';
import { ChevronLeft, ChevronRight, ArrowDown, BookOpen, Award, Clock, Users } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../CSS/Home.css';

const Home = () => {
    const [isWindowScrolled, setIsWindowScrolled] = useState(false);
    const [showScrollIndicator, setShowScrollIndicator] = useState(true);
    const parallaxRef = useRef(null);

    useEffect(() => {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: false,
            mirror: true
        });

        const handleScroll = () => {
            document.querySelectorAll('[data-aos]').forEach((el) => {
                const rect = el.getBoundingClientRect();
                if (rect.top >= window.innerHeight || rect.bottom <= 0) {
                    el.classList.remove('aos-animate');
                }
            });

            setIsWindowScrolled(true);

            // Hide scroll indicator after scrolling
            if (window.scrollY > 100) {
                setShowScrollIndicator(false);
            }

            // Parallax effect
            if (parallaxRef.current) {
                const scrollPosition = window.scrollY;
                parallaxRef.current.style.transform = `translateY(${scrollPosition * 0.2}px)`;
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Card style that will be applied to all cards
    const cardStyle = {
        padding: '20px',
        backgroundColor: '#f8f9fa',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    };

    const cardHeaderStyle = {
        fontSize: '1.2rem',
        color: '#084c61',
        borderBottom: '2px solid #084c61',
        paddingBottom: '8px',
        marginBottom: '15px',
        textAlign: 'center'
    };

    const cardContentStyle = {
        color: '#444',
        lineHeight: '1.6',
        fontSize: '0.95rem',
        flex: 1
    };

    const cardHoverStyle = {
        transform: 'translateY(-5px)',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)'
    };

    return (
        <div style={{ maxWidth: '1200px', margin: 'auto', padding: '20px', fontSize: '1.1rem', lineHeight: '1.6', position: 'relative' }}>
            <div className="welcome-section" style={{
                position: 'relative',
                textAlign: 'center',
                minHeight: '50vh',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '30px',
                overflow: 'hidden',
                padding: '40px 0'
            }}>
                <div className="parallax-bg" ref={parallaxRef} style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    opacity: 0.05,
                    zIndex: -1,
                    backgroundImage: 'url("https://eitfaridabad.com/wp-content/uploads/2024/05/EIT-blog-image-2.jpg")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}></div>

                <div className="welcome-content" style={{
                    flex: '1 1 60%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    textAlign: 'left',
                    paddingRight: '40px'
                }}>
                    <h2 id="home_itme_max" className="d-none d-lg-block" style={{
                        fontSize: '2.8rem',
                        color: '#084c61',
                        marginBottom: '15px',
                        fontWeight: 'bold'
                    }}>
                        Welcome to ITME
                    </h2>
                    <h2 id="home_itme_min" className="d-lg-none" style={{
                        fontSize: '2.2rem',
                        color: '#084c61',
                        marginBottom: '15px',
                        fontWeight: 'bold'
                    }}>
                        Welcome to ITME
                    </h2>

                    <div className="animation-container d-none d-md-block" style={{
                        height: '70px',
                        marginBottom: '25px',
                        width: '100%'
                    }}>
                        <img
                            src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=24&duration=3000&pause=1000&color=084c61&vCenter=true&width=500&height=70&lines=Submit+Your+Research+Paper;Explore+Innovation+in+Materials;Contribute+to+Scientific+Research"
                            alt="Typing SVG"
                            style={{ width: '100%', height: 'auto' }}
                        />
                    </div>
                    <div className="animation-container d-md-none d-none d-sm-block" style={{
                        height: '50px',
                        marginBottom: '15px',
                        width: '100%'
                    }}>
                        <img
                            src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=18&duration=3000&pause=1000&color=084c61&vCenter=true&width=400&height=50&lines=Submit+Your+Research+Paper;Explore+Innovation+in+Materials;Contribute+to+Scientific+Research"
                            alt="Typing SVG"
                            style={{ width: '100%', height: 'auto' }}
                        />
                    </div>
                    <div className="animation-container d-sm-none" style={{
                        height: '40px',
                        marginBottom: '15px',
                        width: '100%'
                    }}>
                        <img
                            src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=14&duration=3000&pause=1000&color=084c61&vCenter=true&width=300&height=40&lines=Submit+Your+Research+Paper;Explore+Innovation;Contribute+to+Research"
                            alt="Typing SVG"
                            style={{ width: '100%', height: 'auto' }}
                        />
                    </div>

                    <p style={{
                        fontSize: '1.25rem',
                        maxWidth: '100%',
                        marginBottom: '30px',
                        color: '#333',
                        lineHeight: '1.6'
                    }}>
                        <span style={{ fontWeight: 'bold', color: '#084c61' }}>Innovative Trends in Multidisciplinary Engineering (ITME)</span> is a double-blind, peer-reviewed international journal, published biannually in July and December. The journal provides a high-quality platform for the dissemination of interdisciplinary research in engineering and applied sciences, with a particular emphasis on innovative approaches, emerging technologies, and advanced materials.
                    </p>
                    <p style={{
                        fontSize: '1.25rem',
                        maxWidth: '100%',
                        marginBottom: '30px',
                        color: '#333',
                        lineHeight: '1.6'
                    }}>
                        We are committed to maintaining the highest standards of academic publishing by ensuring a rigorous peer-review process, while also offering rapid review and publication timelines to support timely dissemination of research findings.
                    </p>

                    <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                        <Link to="/form" style={{
                            padding: '12px 28px',
                            backgroundColor: '#084c61',
                            color: 'white',
                            textDecoration: 'none',
                            borderRadius: '6px',
                            fontWeight: 'bold',
                            fontSize: '1rem',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                        }} className="cta-button" onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-3px)';
                            e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
                        }} onMouseLeave={(e) => {
                            e.currentTarget.style.transform = '';
                            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
                        }}>Submit Research</Link>
                        <Link to="/archives" style={{
                            padding: '12px 28px',
                            backgroundColor: 'transparent',
                            color: '#084c61',
                            textDecoration: 'none',
                            borderRadius: '6px',
                            fontWeight: 'bold',
                            fontSize: '1rem',
                            border: '2px solid #084c61',
                            transition: 'background-color 0.2s ease, transform 0.2s ease',
                        }} className="cta-button" onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(8, 76, 97, 0.1)';
                        }} onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                        }}>Browse Issues</Link>
                    </div>
                </div>

                <div className="stats-quick-view d-none d-md-flex" style={{
                    flex: '1 1 40%',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '20px',
                    maxWidth: '400px'
                }}>
                    {[
                        { label: 'Issues Per Year', value: '2', icon: <BookOpen size={24} color="#084c61" /> },
                        { label: 'Plagiarism', value: '<15%', icon: <Award size={24} color="#084c61" /> },
                        { label: 'Review Time', value: '2 Weeks', icon: <Clock size={24} color="#084c61" /> },
                        { label: 'Active Reviewers', value: '50+', icon: <Users size={24} color="#084c61" /> }
                    ].map((metric, index) => (
                        <div key={index} style={{
                            width: 'calc(50% - 15px)',
                            padding: '20px 15px',
                            backgroundColor: '#f8f9fa',
                            borderRadius: '10px',
                            boxShadow: '0 3px 6px rgba(0,0,0,0.08)',
                            textAlign: 'center',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        }} onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-5px)';
                            e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.12)';
                        }} onMouseLeave={(e) => {
                            e.currentTarget.style.transform = '';
                            e.currentTarget.style.boxShadow = '0 3px 6px rgba(0,0,0,0.08)';
                        }}>
                            <div style={{ marginBottom: '10px' }}>{metric.icon}</div>
                            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#084c61' }}>{metric.value}</div>
                            <div style={{ fontSize: '0.9rem', color: '#555', fontWeight: '500' }}>{metric.label}</div>
                        </div>
                    ))}
                </div>

                {showScrollIndicator && (
                    <div className="scroll-indicator" style={{
                        position: 'absolute',
                        bottom: '20px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        animation: 'bounce 2s infinite',
                        cursor: 'pointer',
                        zIndex: 2
                    }}
                        onClick={() => window.scrollTo({
                            top: window.innerHeight * 0.6,
                            behavior: 'smooth'
                        })}>
                        <ArrowDown size={32} color="#084c61" strokeWidth={1.5} />
                    </div>
                )}
            </div>

            <Slider />

            <div className="journal-metrics d-md-none" data-aos="fade-up" style={{
                display: 'flex',
                justifyContent: 'space-around',
                flexWrap: 'wrap',
                gap: '15px',
                margin: '40px auto',
                maxWidth: '900px',
                textAlign: 'center'
            }}>
                {[
                    { label: 'Issues Per Year', value: '2', icon: <BookOpen size={24} color="#084c61" /> },
                    { label: 'Plagiarism Acceptance Rate', value: '15%', icon: <Award size={24} color="#084c61" /> },
                    { label: 'Review Time', value: '2 Weeks', icon: <Clock size={24} color="#084c61" /> },
                    { label: 'Active Reviewers', value: '50+', icon: <Users size={24} color="#084c61" /> }
                ].map((metric, index) => (
                    <div key={index} style={{
                        minWidth: '200px',
                        padding: '20px',
                        backgroundColor: '#f8f9fa',
                        borderRadius: '8px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                        flex: '1'
                    }} data-aos="zoom-in" data-aos-delay={index * 100}>
                        <div style={{ marginBottom: '10px' }}>{metric.icon}</div>
                        <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#084c61' }}>{metric.value}</div>
                        <div style={{ fontSize: '0.9rem', color: '#555' }}>{metric.label}</div>
                    </div>
                ))}
            </div>

            <h3 style={{ fontSize: '1.8rem', color: 'rgb(19, 15, 15)', margin: '60px 0 30px', textAlign: 'center', position: 'relative', paddingBottom: '10px' }} data-aos="fade-up">
                <span style={{ position: 'relative' }}>
                    Journal Insights
                    <span style={{ position: 'absolute', bottom: '-5px', left: '50%', transform: 'translateX(-50%)', width: '80px', height: '3px', backgroundColor: '#084c61' }}></span>
                </span>
            </h3>

            {/* Cards with hover effect and centered layout */}
            <div className="card-container" style={{ maxWidth: '1000px', margin: '30px auto' }}>
                {/* First Row: 3 cards */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '25px',
                    marginBottom: '25px'
                }} data-aos="fade-up" className="card-grid">
                    {[
                        { title: 'Publication Scope', icon: '📚' },
                        { title: 'Submission Process', icon: '📤' },
                        { title: 'Review Workflow', icon: '👁️' }
                    ].map((item, index) => (
                        <div
                            style={cardStyle}
                            key={index}
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                            className="card-item"
                            onMouseEnter={(e) => {
                                for (const [key, value] of Object.entries(cardHoverStyle)) {
                                    e.currentTarget.style[key] = value;
                                }
                            }}
                            onMouseLeave={(e) => {
                                for (const key of Object.keys(cardHoverStyle)) {
                                    e.currentTarget.style[key] = cardStyle[key] || '';
                                }
                            }}
                        >
                            <div style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '10px' }}>{item.icon}</div>
                            <h4 style={cardHeaderStyle}>{item.title}</h4>
                            <p style={cardContentStyle}>
                                {getCardText(item.title)}
                            </p>
                        </div>
                    ))}
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '25px',
                    width: '66.67%',
                    margin: '0 auto'
                }} data-aos="fade-up" className="card-grid-centered">
                    {[
                        { title: 'Author Benefits', icon: '🎯' },
                        { title: 'Publication Timeline', icon: '⏱️' }
                    ].map((item, index) => (
                        <div
                            style={cardStyle}
                            key={index}
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                            className="card-item"
                            onMouseEnter={(e) => {
                                for (const [key, value] of Object.entries(cardHoverStyle)) {
                                    e.currentTarget.style[key] = value;
                                }
                            }}
                            onMouseLeave={(e) => {
                                for (const key of Object.keys(cardHoverStyle)) {
                                    e.currentTarget.style[key] = cardStyle[key] || '';
                                }
                            }}
                        >
                            <div style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '10px' }}>{item.icon}</div>
                            <h4 style={cardHeaderStyle}>{item.title}</h4>
                            <p style={cardContentStyle}>
                                {getCardText(item.title)}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="focus-areas" data-aos="fade-up" style={{
                margin: '60px 0',
                padding: '40px 30px',
                backgroundColor: '#f8f9fa',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div className="bg-dots" style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: 'radial-gradient(#084c61 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                    opacity: 0.05,
                    zIndex: 0
                }}></div>

                <h3 style={{
                    color: '#084c61',
                    fontSize: '1.5rem',
                    marginBottom: '30px',
                    textAlign: 'center',
                    position: 'relative',
                    zIndex: 1
                }}>Research Focus Areas</h3>
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '15px',
                    justifyContent: 'center',
                    position: 'relative',
                    zIndex: 1
                }}>
                    {[
                        { name: 'Artificial Intelligence', icon: '💡' },
                        { name: 'Machine Learning', icon: '🧠' },
                        { name: 'Cyber Security', icon: '🛡️' },
                        { name: 'Quantum Computing', icon: '⚛️' },
                        { name: 'BlockChain', icon: '⛓️' },
                        { name: 'Mechanical & Civil', icon: '⚙️' },
                        { name: 'SDT', icon: '💻' },
                        { name: 'Data Science & Analytics', icon: '📊' },
                        { name: 'IoT & Smart Systems', icon: '🌐' },
                        { name: 'Robotics', icon: '🤖' }
                    ].map((area, index) => (
                        <div
                            key={index}
                            data-aos="fade-up"
                            data-aos-delay={index * 50}
                            style={{
                                padding: '12px 18px',
                                backgroundColor: '#ffffff',
                                color: '#084c61',
                                borderRadius: '30px',
                                fontWeight: '500',
                                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                                border: '1px solid rgba(0, 0, 0, 0.1)',
                                fontSize: '0.9rem',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-3px)';
                                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = '';
                                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                            }}
                        >
                            <span style={{ fontSize: '1.2rem' }}>{area.icon}</span>
                            <span>{area.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{
                width: '100%',
                padding: '30px',
                borderRadius: '8px',
                backgroundColor: '#ffffff',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                margin: '50px 0',
                color: 'rgb(19, 15, 15)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
            }} data-aos="fade-up">
                <h3 style={{
                    fontSize: '1.5rem',
                    color: '#084c61',
                    borderBottom: '2px solid #084c61',
                    paddingBottom: '10px',
                    marginBottom: '20px',
                    textAlign: 'center'
                }}>Current Issue</h3>
                {isWindowScrolled ? <CurrentIssue /> : <Loader />}
            </div>

            <div className="cta-section" data-aos="fade-up" style={{
                textAlign: 'center',
                padding: '60px 30px',
                margin: '50px 0',
                backgroundColor: '#084c61',
                color: '#fff',
                borderRadius: '10px',
                boxShadow: '0 10px 20px rgba(8, 76, 97, 0.2)',
                backgroundImage: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0.05) 75%, transparent 75%, transparent)',
                backgroundSize: '20px 20px'
            }}>
                <h3 style={{ fontSize: '2rem', marginBottom: '20px', color: 'white', fontWeight: 'bold' }}>Ready to Submit Your Research?</h3>
                <p style={{ fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto 35px', opacity: 0.9 }}>
                    Join our community of researchers and contribute to advancements in engineering and materials science.
                </p>
                <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link to="/form" style={{
                        padding: '14px 30px',
                        backgroundColor: 'white',
                        color: '#084c61',
                        textDecoration: 'none',
                        borderRadius: '5px',
                        fontWeight: 'bold',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    }} className="cta-button" onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-3px)';
                        e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
                    }} onMouseLeave={(e) => {
                        e.currentTarget.style.transform = '';
                        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
                    }}>Register as Author</Link>
                    <Link to="/contact" style={{
                        padding: '14px 30px',
                        backgroundColor: 'transparent',
                        color: 'white',
                        textDecoration: 'none',
                        borderRadius: '5px',
                        fontWeight: 'bold',
                        border: '2px solid white',
                        transition: 'background-color 0.2s ease, transform 0.2s ease',
                    }} className="cta-button" onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                        e.currentTarget.style.transform = 'translateY(-3px)';
                    }} onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.transform = '';
                    }}>Contact Us</Link>
                </div>
            </div>

            {/* Add CSS for animations and responsive behavior */}
            <style jsx="true">{`
                @keyframes bounce {
                    0%, 20%, 50%, 80%, 100% {
                        transform: translateY(0) translateX(-50%);
                    }
                    40% {
                        transform: translateY(-20px) translateX(-50%);
                    }
                    60% {
                        transform: translateY(-10px) translateX(-50%);
                    }
                }
                
                @media (max-width: 992px) {
                    .card-grid {
                        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)) !important;
                    }
                    .card-grid-centered {
                        width: 100% !important;
                        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)) !important;
                    }
                    
                    .welcome-section {
                        flex-direction: column !important;
                        text-align: center !important;
                        min-height: 60vh !important;
                    }
                    
                    .welcome-content {
                        align-items: center !important;
                        text-align: center !important;
                        padding-right: 0 !important;
                        margin-bottom: 30px !important;
                    }
                }
                
                @media (max-width: 768px) {
                    .welcome-section {
                        padding: 20px 0 !important;
                    }
                }
            `}</style>
        </div>
    );
};

const Slider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const slides = [
        {
            title: 'Featured Paper on AI',
            text: 'Exploring the latest breakthroughs in artificial intelligence.',
            link: 'https://www.sciencealert.com/new-ai-breakthrough-can-finally-detect-parasitic-worm-infections',
            img: 'https://plus.unsplash.com/premium_photo-1683121710572-7723bd2e235d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXJ0aWZpY2lhbCUyMGludGVsbGlnZW5jZXxlbnwwfHwwfHx8MA%3D%3D',
        },
        {
            title: 'Latest Issue',
            text: 'Discover the most recent articles in engineering research.',
            link: 'https://www.sciencedaily.com/news/matter_energy/engineering/',
            img: 'https://eitfaridabad.com/wp-content/uploads/2024/05/EIT-blog-image-2.jpg',
        },
        {
            title: 'Special Edition on Robotics',
            text: 'Advancements in robotics and automation.',
            link: 'https://www.twi-global.com/technical-knowledge/faqs/what-is-industrial-automation-and-robotics',
            img: 'https://worldskills2022se.com/application/files/thumbnails/large/6416/6818/4256/mobile-robotics-thumb.jpg',
        },
    ];

    const nextSlide = useCallback(() => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        setTimeout(() => setIsAnimating(false), 500);
    }, [slides.length, isAnimating]);

    const prevSlide = useCallback(() => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentIndex((prevIndex) =>
            (prevIndex - 1 + slides.length) % slides.length
        );
        setTimeout(() => setIsAnimating(false), 500);
    }, [slides.length, isAnimating]);

    const goToSlide = (index) => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentIndex(index);
        setTimeout(() => setIsAnimating(false), 500);
    };

    useEffect(() => {
        let interval;
        if (!isHovered) {
            interval = setInterval(() => {
                nextSlide();
            }, 3000);
        }
        return () => clearInterval(interval);
    }, [nextSlide, isHovered]);

    return (
        <div
            className="slider-container"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            data-aos="fade-up"
            style={{
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.08)',
                borderRadius: '12px',
                overflow: 'hidden',
                position: 'relative',
                marginTop: '40px'
            }}
        >
            <div
                className="slider"
                style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                    transition: 'transform 0.5s ease-in-out'
                }}
            >
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`slide ${index === currentIndex ? 'active' : ''}`}
                    >
                        <div className="slide-overlay" style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%)',
                            zIndex: 1
                        }}></div>
                        <img src={slide.img} alt={slide.title} className="slide-image" style={{
                            transition: 'transform 8s ease',
                            transform: index === currentIndex ? 'scale(1.1)' : 'scale(1)'
                        }} />
                        <div className="slide-content" style={{
                            position: 'absolute',
                            bottom: '40px',
                            left: '0',
                            width: '100%',
                            padding: '0 20px',
                            zIndex: 2,
                            textAlign: 'center',
                            color: 'white',
                            textShadow: '0 1px 2px rgba(0,0,0,0.5)'
                        }}>
                            <h4 style={{
                                fontSize: '1.8rem',
                                marginBottom: '10px',
                                transform: index === currentIndex ? 'translateY(0)' : 'translateY(20px)',
                                opacity: index === currentIndex ? 1 : 0,
                                transition: 'transform 0.5s ease, opacity 0.5s ease',
                                transitionDelay: '0.2s'
                            }}>{slide.title}</h4>
                            <p style={{
                                fontSize: '1.1rem',
                                maxWidth: '600px',
                                margin: '0 auto 20px',
                                transform: index === currentIndex ? 'translateY(0)' : 'translateY(20px)',
                                opacity: index === currentIndex ? 1 : 0,
                                transition: 'transform 0.5s ease, opacity 0.5s ease',
                                transitionDelay: '0.3s'
                            }}>{slide.text}</p>
                            {/* <button
                                className="read-more"
                                disabled
                                style={{
                                    display: 'inline-block',
                                    padding: '8px 20px',
                                    backgroundColor: '#e0e0e0',
                                    color: '#888888',
                                    border: 'none',
                                    borderRadius: '30px',
                                    fontWeight: '500',
                                    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                                    transform: index === currentIndex ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.9)',
                                    opacity: index === currentIndex ? 0.6 : 0,
                                    transition: 'transform 0.5s ease, opacity 0.5s ease',
                                    transitionDelay: '0.4s',
                                    cursor: 'not-allowed'
                                }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                }}
                            >
                                Read More
                            </button> */}
                        </div>
                    </div>
                ))}
            </div>

            <div className="buttons">
                <span className="prev" onClick={prevSlide} style={{
                    position: 'absolute',
                    top: '50%',
                    left: '20px',
                    transform: 'translateY(-50%)',
                    backgroundColor: 'rgba(255,255,255,0.7)',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 10,
                    transition: 'background-color 0.3s ease',
                }} onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.9)';
                }} onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.7)';
                }}>
                    <ChevronLeft size={24} color="#084c61" />
                </span>
                <span className="next" onClick={nextSlide} style={{
                    position: 'absolute',
                    top: '50%',
                    right: '20px',
                    transform: 'translateY(-50%)',
                    backgroundColor: 'rgba(255,255,255,0.7)',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 10,
                    transition: 'background-color 0.3s ease',
                }} onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.9)';
                }} onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.7)';
                }}>
                    <ChevronRight size={24} color="#084c61" />
                </span>
            </div>

            <div className="dotsContainer" style={{
                position: 'absolute',
                bottom: '15px',
                left: '0',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                gap: '10px',
                zIndex: 10
            }}>
                {slides.map((_, index) => (
                    <div
                        key={index}
                        className={`dot ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => goToSlide(index)}
                        style={{
                            width: index === currentIndex ? '24px' : '8px',
                            height: '8px',
                            backgroundColor: index === currentIndex ? 'white' : 'rgba(255,255,255,0.5)',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

const getCardText = (title) => {
    switch (title) {
        case 'Publication Scope':
            return 'ITME publishes original research papers, review articles, and case studies in tribology, materials engineering, sustainable materials, and advanced manufacturing technologies.';
        case 'Submission Process':
            return 'Authors must first register an account, then navigate to Research Archive to complete submission details and upload their manuscript following our formatting guidelines.';
        case 'Review Workflow':
            return 'All submissions undergo initial screening followed by a double-blind peer review process by at least two experts, with decision notifications typically sent within two weeks.';
        case 'Author Benefits':
            return 'No publication fees, open access distribution, free digital copies, and promotion through academic networks. Fast-track review process, international visibility, comprehensive author support, and copyright retention.';
        case 'Publication Timeline':
            return 'After acceptance, manuscripts undergo copyediting, typesetting, and proofreading before being scheduled for publication in the next available biannual issue (July or December). In some cases, accepted articles may also appear as Online First publications prior to the official issue release.';
        default:
            return '';
    }
};

export default Home;