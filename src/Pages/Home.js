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
                &nbsp;is dedicated to publishing high-quality research in the field of Engineering. We provide a platform for scholars, researchers, and practitioners to share insights and drive advancements in technology and engineering management.
            </blockquote>

            <Slider />

            <h3 style={{ fontSize: '1.8rem', color: 'rgb(19, 15, 15)', marginTop: '30px', textAlign: 'center' }}>Journal Insights</h3>

            <div className="grid" style={{ maxWidth: '900px', margin: '65px auto', gap: '90px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                {['We Publish', 'Article Preparation', 'Peer Review', 'ITME Vision'].map((title, index) => (
                    <div style={cardStyle} key={index} data-aos="fade-up">
                        <h4 style={cardHeaderStyle}>{title}</h4>
                        <p style={cardTextStyle}>
                            {getCardText(title)}
                        </p>
                    </div>
                ))}
            </div>

            <div style={{
                width: '100%',
                padding: '20px',
                // border: '1px solid rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
                backgroundColor: '#ffffff',
                // boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                margin: '20px 0',
                color: 'rgb(19, 15, 15)',
            }}>
                <div style={{ fontSize: '1.5rem', color: '#333', borderBottom: '2px solid #0066cc', paddingBottom: '5px' }}></div>
                {isWindowScrolled ? <CurrentIssue /> : <Loader />}
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
        case 'We Publish':
            return 'We publish different types of scholarly literature, some of which require original research and some that are based on comprehensive analysis.';
        case 'Article Preparation':
            return 'As part of the submission process, authors are requested to follow the guidelines before submission of manuscripts.';
        case 'Peer Review':
            return 'ITME follows a double-blind peer review process where author and reviewer details are maintained confidential.';
        case 'ITME Vision':
            return 'We at ITME aim to promote scientific knowledge globally by publishing high-quality, peer-reviewed content.';
        default:
            return '';
    }
};

const cardStyle = {
    padding: '20px',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    color: 'rgb(19, 15, 15)'
};

const cardHeaderStyle = {
    fontSize: '1.2rem',
    color: '#0066cc',
    borderBottom: '2px solid #0066cc',
    paddingBottom: '5px',
    marginBottom: '10px'
};

const cardTextStyle = {
    color: '#333'
};

export default Home;
