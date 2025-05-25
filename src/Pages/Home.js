import React, { useEffect, useState, useCallback } from 'react';
import CurrentIssue from '../Pages/CurrentIssue';
import { Link } from 'react-router-dom';
import Loader from '../Components/Loader';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../CSS/Home.css';

const Home = () => {
    const [isWindowScrolled, setIsWindowScrolled] = useState(false);
    useEffect(() => {
        AOS.init({ duration: 800, easing: 'ease-in-out', once: false });

        const handleScroll = () => {
            document.querySelectorAll('[data-aos]').forEach((el) => {
                const rect = el.getBoundingClientRect();
                if (rect.top >= window.innerHeight || rect.bottom <= 0) {
                    el.classList.remove('aos-animate');
                }
            });
            setIsWindowScrolled(true);
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

    return (
        <div style={{ maxWidth: '1200px', margin: 'auto', padding: '20px', fontSize: '1.1rem', lineHeight: '1.6' }}>
            <h2 id="home_pei_max" className="d-none d-lg-flex" style={{ fontSize: '2rem', textAlign: 'center', color: '#333' }}>
                Welcome to ITME :
                <img
                    src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=20&duration=3000&pause=1000&color=0066cc&vCenter=true&width=435&height=70&lines=Submit+Research+Paper;Explore+Our+Journals;Contribute+in+Research;24%2F7+Support"
                    alt="Typing SVG"
                />
            </h2>
            <h2 id="home_pei_min" className="d-lg-none" style={{ fontSize: '1.5rem', textAlign: 'center', color: '#333' }}>
                Welcome to ITME :
                <img
                    src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=20&duration=3000&pause=1000&color=0066cc&vCenter=true&width=300&height=70&lines=Submit+Research+Paper;Explore+Our+Journals;Contribute+to+Knowledge;24%2F7+Support"
                    alt="Typing SVG"
                />
            </h2>

            <blockquote style={{ borderLeft: '5px solid rgba(0, 0, 0, 0.1)', padding: '20px', color: 'rgb(19, 15, 15)', fontSize: '1.1rem', marginTop: '20px' }}>
                <Link to="/" style={{ fontStyle: 'italic', textDecoration: 'underline', fontWeight: 'bold' }}>Innovations in Tribology and Materials Engineering</Link>
                &nbsp;is a double-blind, peer-reviewed journal published bi-annually in June and December. We provide a platform for interdisciplinary research in engineering materials with no publication fees and a rapid review process.
            </blockquote>

            <Slider />

            <h3 style={{ fontSize: '1.8rem', color: 'rgb(19, 15, 15)', marginTop: '30px', textAlign: 'center', position: 'relative', paddingBottom: '10px' }} data-aos="fade-up">
                <span style={{ position: 'relative' }}>
                    Journal Insights
                    <span style={{ position: 'absolute', bottom: '-5px', left: '50%', transform: 'translateX(-50%)', width: '80px', height: '3px', backgroundColor: '#084c61' }}></span>
                </span>
            </h3>

            {/* Using grid with responsive columns */}
            <div className="card-container" style={{ maxWidth: '1000px', margin: '30px auto' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '25px',
                    marginBottom: '25px'
                }} data-aos="fade-up">
                    {[
                        { title: 'Publication Scope', icon: '📚' },
                        { title: 'Submission Process', icon: '📤' },
                        { title: 'Review Workflow', icon: '👁️' },
                        { title: 'Author Benefits', icon: '🎯' },
                        { title: 'Publication Timeline', icon: '⏱️' }
                    ].map((item, index) => (
                        <div style={cardStyle} key={index} data-aos-delay={index * 100}>
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
                margin: '40px 0',
                padding: '30px',
                backgroundColor: '#f8f9fa',
                borderRadius: '10px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                border: '1px solid rgba(0, 0, 0, 0.1)'
            }}>
                <h3 style={{ color: '#084c61', fontSize: '1.5rem', marginBottom: '20px', textAlign: 'center' }}>Research Focus Areas</h3>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center' }}>
                    {[
                        'Sustainable Materials',
                        'Bio-inspired Materials',
                        'Energy Materials',
                        'Computational Materials Science',
                        'Extreme Environment Materials',
                        'Healthcare & Wearables',
                        'Additive Manufacturing',
                        'AI Materials'
                    ].map((area, index) => (
                        <div key={index} style={{
                            padding: '10px 16px',
                            backgroundColor: '#ffffff',
                            color: '#084c61',
                            borderRadius: '30px',
                            fontWeight: '500',
                            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                            border: '1px solid rgba(0, 0, 0, 0.1)',
                            fontSize: '0.9rem'
                        }}>
                            {area}
                        </div>
                    ))}
                </div>
            </div>

            <div style={{
                width: '100%',
                padding: '20px',
                borderRadius: '8px',
                backgroundColor: '#ffffff',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                margin: '40px 0',
                color: 'rgb(19, 15, 15)',
            }}>
                <h3 style={{ fontSize: '1.5rem', color: '#084c61', borderBottom: '2px solid #084c61', paddingBottom: '10px', marginBottom: '20px' }}>Current Issue</h3>
                {isWindowScrolled ? <CurrentIssue /> : <Loader />}
            </div>

            <div className="cta-section" data-aos="fade-up" style={{
                textAlign: 'center',
                padding: '40px 20px',
                margin: '30px 0',
                backgroundColor: '#f8f9fa',
                color: '#333',
                borderRadius: '10px',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
            }}>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '20px', color: '#084c61' }}>Ready to Submit Your Research?</h3>
                <p style={{ fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto 25px' }}>
                    Join our community of researchers and contribute to advancements in engineering and materials science.
                </p>
                <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link to="/signup" style={{
                        padding: '12px 30px',
                        backgroundColor: '#084c61',
                        color: 'white',
                        textDecoration: 'none',
                        borderRadius: '5px',
                        fontWeight: 'bold',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    }}>Register as Author</Link>
                    <Link to="/contact" style={{
                        padding: '12px 30px',
                        backgroundColor: 'transparent',
                        color: '#084c61',
                        textDecoration: 'none',
                        borderRadius: '5px',
                        fontWeight: 'bold',
                        border: '2px solid #084c61',
                    }}>Contact Us</Link>
                </div>
            </div>
        </div>
    );
};

const Slider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

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
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, [slides.length]);

    const prevSlide = useCallback(() => {
        setCurrentIndex((prevIndex) =>
            (prevIndex - 1 + slides.length) % slides.length
        );
    }, [slides.length]);

    const goToSlide = (index) => {
        setCurrentIndex(index);
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
        >
            <div
                className="slider"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`slide ${index === currentIndex ? 'active' : ''}`}
                    >
                        <img src={slide.img} alt={slide.title} className="slide-image" />
                        <h4>{slide.title}</h4>
                        <p>{slide.text}</p>
                        <a
                            href={slide.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="read-more"
                        >
                            Read More
                        </a>
                    </div>
                ))}
            </div>

            <div className="buttons">
                <span className="prev" onClick={prevSlide}>
                    <ChevronLeft size={24} />
                </span>
                <span className="next" onClick={nextSlide}>
                    <ChevronRight size={24} />
                </span>
            </div>

            <div className="dotsContainer">
                {slides.map((_, index) => (
                    <div
                        key={index}
                        className={`dot ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => goToSlide(index)}
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
            return 'No publication fees, open access distribution, indexing in major databases, free digital copies, and promotion of published articles through our academic networks.';
        case 'Publication Timeline':
            return 'After acceptance, manuscripts undergo copyediting, typesetting, and proofreading before publication in the next available issue (June or December) or as online first articles.';
        default:
            return '';
    }
};

export default Home;
