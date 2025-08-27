import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Award, Users, Clock, BookOpen, Globe, CheckCircle, Mail, Phone, User, Edit, Target, Zap, Shield } from 'lucide-react';

const About = () => {
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }, []);

    const containerStyle = {
        maxWidth: '1200px',
        margin: '20px auto',
        padding: '0 20px',
        fontFamily: 'Roboto, sans-serif',
        color: '#333',
        lineHeight: '1.6'
    };

    const heroSectionStyle = {
        background: 'linear-gradient(135deg, #084c61 0%, #0d5f75 100%)',
        color: 'white',
        padding: '80px 40px',
        borderRadius: '15px',
        textAlign: 'center',
        marginBottom: '40px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(8, 76, 97, 0.2)'
    };

    const headerStyle = {
        fontSize: '3rem',
        fontWeight: 'bold',
        marginBottom: '20px',
        textShadow: '0 2px 4px rgba(0,0,0,0.3)',
        color: '#ffffff'
    };

    const subHeaderStyle = {
        fontSize: '1.3rem',
        opacity: 0.95,
        maxWidth: '800px',
        margin: '0 auto',
        fontWeight: '300',
        color: '#ffffff'
    };

    const sectionStyle = {
        backgroundColor: '#ffffff',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        marginBottom: '30px',
        border: '1px solid rgba(8, 76, 97, 0.1)'
    };

    const featureCardStyle = {
        backgroundColor: '#f8f9fa',
        padding: '30px',
        borderRadius: '12px',
        textAlign: 'center',
        height: '100%',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        border: '1px solid #e9ecef',
        cursor: 'pointer'
    };

    const statsStyle = {
        backgroundColor: '#084c61',
        color: 'white',
        padding: '50px 40px',
        borderRadius: '12px',
        textAlign: 'center',
        margin: '40px 0',
        position: 'relative',
        overflow: 'hidden'
    };

    const contactSectionStyle = {
        backgroundColor: '#f8f9fa',
        padding: '50px 40px',
        borderRadius: '15px',
        border: '2px solid #084c61',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
    };

    const buttonStyle = {
        backgroundColor: isHovered ? '#0d5f75' : '#084c61',
        color: '#fff',
        padding: '15px 30px',
        borderRadius: '8px',
        textDecoration: 'none',
        fontSize: '1.1rem',
        fontWeight: 'bold',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 15px rgba(8, 76, 97, 0.3)',
        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px'
    };

    const features = [
        {
            icon: <Zap size={40} color="#084c61" />,
            title: 'Fast, Quality & Easy Publishing',
            description: 'Our streamlined process allows researchers to share their findings quickly and efficiently with rapid peer review and publication timeline.'
        },
        {
            icon: <Users size={40} color="#084c61" />,
            title: 'Distinguished Editorial Board',
            description: 'Supported by prominent individuals from renowned universities, colleges, and corporations across USA, Australia, Canada, Japan, China, and India.'
        },
        {
            icon: <Globe size={40} color="#084c61" />,
            title: 'Scholarly Open Access Initiative',
            description: 'Committed to providing genuine and reliable contributions to the scientific community through open access publishing.'
        },
        {
            icon: <Shield size={40} color="#084c61" />,
            title: 'Quality & Integrity Standards',
            description: 'Upholding the highest standards of quality and integrity in the research publication process with rigorous peer review.'
        },
        {
            icon: <Target size={40} color="#084c61" />,
            title: 'Global Networking Platform',
            description: 'Conferences and events featuring renowned speakers, interactive sessions, world-class exhibitions, and poster presentations.'
        },
        {
            icon: <Award size={40} color="#084c61" />,
            title: 'Academic Career Advancement',
            description: 'Numerous benefits aimed at strengthening research skills and advancing academic careers in engineering and science.'
        }
    ];

    const stats = [
        { value: '2', label: 'Issues Per Year', icon: <BookOpen size={30} />, subtitle: 'Quarterly Publication' },
        { value: '15%', label: 'Acceptance Rate', icon: <Award size={30} />, subtitle: 'Highly Selective' },
        { value: '2 Weeks', label: 'Review Time', icon: <Clock size={30} />, subtitle: 'Rapid Process' },
        { value: '50+', label: 'Global Reviewers', icon: <Users size={30} />, subtitle: 'International Board' }
    ];

    return (
        <div style={containerStyle}>
            {/* Hero Section */}
            <div style={heroSectionStyle} data-aos="fade-up">
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                    zIndex: 0
                }} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <h1 style={headerStyle}>INNOVATIVE TRENDS IN MULTIDISCIPLINARY ENGINEERING</h1>
                    <p style={subHeaderStyle}>
                        An international, peer-reviewed online journal advancing research excellence in tribology, materials engineering, and interdisciplinary sciences through our Scholarly Open Access Initiative
                    </p>
                    <div style={{ marginTop: '30px', display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        {/* <span style={{
                            backgroundColor: 'rgba(255,255,255,0.2)',
                            padding: '8px 20px',
                            borderRadius: '25px',
                            fontSize: '0.9rem',
                            fontWeight: '500'
                        }}>
                            ISSN: XXXX-XXXX
                        </span> */}
                        <span style={{
                            backgroundColor: 'rgba(255,255,255,0.2)',
                            padding: '8px 20px',
                            borderRadius: '25px',
                            fontSize: '0.9rem',
                            fontWeight: '500'
                        }}>
                            Quarterly Publication
                        </span>
                        <span style={{
                            backgroundColor: 'rgba(255,255,255,0.2)',
                            padding: '8px 20px',
                            borderRadius: '25px',
                            fontSize: '0.9rem',
                            fontWeight: '500'
                        }}>
                            Open Access
                        </span>
                    </div>
                </div>
            </div>

            {/* About K.R. Mangalam University Content */}
            <div style={sectionStyle} data-aos="fade-up" data-aos-delay="50">
                <h2 style={{
                    fontSize: '2.2rem',
                    color: '#084c61',
                    marginBottom: '25px',
                    textAlign: 'center',
                    position: 'relative'
                }}>
                    About K.R. Mangalam University
                    <div style={{
                        position: 'absolute',
                        bottom: '-10px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '60px',
                        height: '3px',
                        backgroundColor: '#084c61'
                    }} />
                </h2>
                <div style={{ fontSize: '1.2rem', lineHeight: '1.8', textAlign: 'justify' }}>
                    <p style={{ marginBottom: '20px' }}>
                        <strong style={{ color: '#084c61' }}>K.R. Mangalam University (KRMU), Gurugram,</strong> is a leading multidisciplinary university established in 2013 with a vision to shape future leaders through innovative education, research, and global exposure. The university is committed to academic excellence, experiential learning, and industry integration, providing a vibrant platform for students to develop professional competencies, research skills, and ethical values. With its state-of-the-art campus, distinguished faculty, and strong industry collaborations, KRMU empowers students to pursue cutting-edge research and contribute meaningfully to society.
                    </p>
                </div>
            </div>

            {/* About SOET Content */}
            <div style={sectionStyle} data-aos="fade-up" data-aos-delay="75">
                <h2 style={{
                    fontSize: '2.2rem',
                    color: '#084c61',
                    marginBottom: '25px',
                    textAlign: 'center',
                    position: 'relative'
                }}>
                    About the School of Engineering & Technology (SOET)
                    <div style={{
                        position: 'absolute',
                        bottom: '-10px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '60px',
                        height: '3px',
                        backgroundColor: '#084c61'
                    }} />
                </h2>
                <div style={{ fontSize: '1.2rem', lineHeight: '1.8', textAlign: 'justify' }}>
                    <p style={{ marginBottom: '20px' }}>
                        <strong style={{ color: '#084c61' }}>The School of Engineering & Technology (SOET)</strong> at K.R. Mangalam University is at the forefront of engineering and technological education, research, and innovation. SOET offers a wide range of undergraduate, postgraduate, and doctoral programs in fields such as Computer Science & Engineering, Artificial Intelligence & Machine Learning, Data Science, Cyber Security, Cloud Computing, Full-Stack Development, Mechanical Engineering, and Electric Vehicles.
                    </p>
                    <p style={{ marginBottom: '20px' }}>
                        SOET follows a project-based and research-oriented pedagogy, encouraging students to work on real-world problems and interdisciplinary innovations. Through strong academic–industry partnerships with leading organizations like IBM, Siemens, Xebia, and ImaginXP, the school provides students with opportunities for live projects, internships, and incubation support.
                    </p>
                    <p style={{ marginBottom: '20px' }}>
                        Equipped with modern laboratories, advanced research facilities, and a team of dedicated faculty, SOET actively fosters an environment of creativity, critical thinking, and collaboration. The school also organizes hackathons, conferences, workshops, and expert lectures, nurturing talent and promoting a culture of research-driven excellence.
                    </p>
                    <p style={{ marginBottom: '20px' }}>
                        By managing the <strong style={{ color: '#084c61' }}>Innovative Trends in Multidisciplinary Engineering (ITME) Journal</strong>, SOET further strengthens its mission of advancing scholarly research and providing a platform for knowledge exchange in engineering and technology at both national and global levels.
                    </p>
                </div>
            </div>

            {/* About Content */}
            <div style={sectionStyle} data-aos="fade-up" data-aos-delay="100">
                <h2 style={{
                    fontSize: '2.2rem',
                    color: '#084c61',
                    marginBottom: '25px',
                    textAlign: 'center',
                    position: 'relative'
                }}>
                    About ITME
                    <div style={{
                        position: 'absolute',
                        bottom: '-10px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '60px',
                        height: '3px',
                        backgroundColor: '#084c61'
                    }} />
                </h2>
                <div style={{ fontSize: '1.2rem', lineHeight: '1.8', textAlign: 'justify' }}>
                    <p style={{ marginBottom: '20px' }}>
                        <strong style={{ color: '#084c61' }}>Innovative Trends in Multidisciplinary Engineering (ITME)</strong> is an international, peer-reviewed online journal published quarterly. Our mission is to provide a platform for genuine and reliable contributions to the scientific community through our Scholarly Open Access Initiative.
                    </p>
                    <p style={{ marginBottom: '20px' }}>
                        ITME is committed to upholding the highest standards of quality and integrity in the research publication process. With a distinguished editorial board comprising eminent professionals, we ensure rapid and thorough peer review. This process not only enhances the quality of published research but also fosters academic collaboration across various branches of engineering, science, and related fields.
                    </p>
                    <p style={{ marginBottom: '20px' }}>
                        Conferences affiliated with ITME serve as a perfect platform for global networking, bringing together renowned speakers and scientists from around the world. These events feature enlightening interactive sessions, world-class exhibitions, and poster presentations, creating an exciting and memorable experience for participants.
                    </p>
                    <p style={{ marginBottom: '20px' }}>
                        Our infrastructure, facilities, and dedicated associates significantly impact the academic community and society at large, providing numerous benefits aimed at strengthening research skills and advancing academic careers.
                    </p>
                </div>
            </div>

            {/* Key Features */}
            <div data-aos="fade-up" data-aos-delay="200">
                <h2 style={{
                    fontSize: '2rem',
                    color: '#084c61',
                    textAlign: 'center',
                    marginBottom: '40px',
                    fontWeight: 'bold'
                }}>
                    Why Choose ITME?
                </h2>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '25px',
                    marginBottom: '40px'
                }}>
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            style={featureCardStyle}
                            data-aos="zoom-in"
                            data-aos-delay={index * 100}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-5px)';
                                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.08)';
                            }}
                        >
                            <div style={{ marginBottom: '20px' }}>{feature.icon}</div>
                            <h3 style={{
                                color: '#084c61',
                                fontSize: '1.3rem',
                                marginBottom: '15px',
                                fontWeight: 'bold'
                            }}>
                                {feature.title}
                            </h3>
                            <p style={{ color: '#555', fontSize: '1rem', lineHeight: '1.6' }}>
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Statistics Section */}
            <div style={statsStyle} data-aos="fade-up" data-aos-delay="300">
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(45deg, rgba(255,255,255,0.05) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.05) 75%, transparent 75%, transparent)',
                    backgroundSize: '20px 20px',
                    zIndex: 0
                }} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '40px', fontWeight: 'bold', color: '#ffffff' }}>
                        ITME by Numbers
                    </h2>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '30px'
                    }}>
                        {stats.map((stat, index) => (
                            <div key={index} data-aos="fade-up" data-aos-delay={index * 100}>
                                <div style={{ marginBottom: '10px', opacity: 0.8 }}>{stat.icon}</div>
                                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '5px', color: '#ffffff' }}>
                                    {stat.value}
                                </div>
                                <div style={{ fontSize: '1rem', opacity: 0.9, color: '#ffffff' }}>{stat.label}</div>
                                <div style={{ fontSize: '0.85rem', opacity: 0.7, color: '#ffffff', marginTop: '5px' }}>
                                    {stat.subtitle}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Journal Scope Section */}
            <div style={sectionStyle} data-aos="fade-up" data-aos-delay="350">
                <h2 style={{
                    fontSize: '2rem',
                    color: '#084c61',
                    marginBottom: '25px',
                    textAlign: 'center',
                    fontWeight: 'bold'
                }}>
                    Journal Scope & Coverage
                </h2>
                <div style={{ fontSize: '1.1rem', lineHeight: '1.7', textAlign: 'justify' }}>
                    <p style={{ marginBottom: '15px' }}>
                        As a highly-selective, peer-reviewed journal, ITME covers a broad spectrum of topics across various branches of engineering, science, and related fields. Our publication scope includes but is not limited to:
                    </p>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '20px',
                        marginTop: '25px'
                    }}>
                        {[
                            { name: 'Artificial Intelligence', img: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=100&h=80&fit=crop&crop=center' },
                            { name: 'Machine Learning', img: 'https://images.unsplash.com/photo-1516110833967-0b5716ca1387?w=100&h=80&fit=crop&crop=center' },
                            { name: 'Cyber Security', img: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=100&h=80&fit=crop&crop=center' },
                            { name: 'Quantum Computing', img: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=100&h=80&fit=crop&crop=center' },
                            { name: 'BlockChain', img: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=100&h=80&fit=crop&crop=center' },
                            { name: 'Mechanical & Civil', img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=80&fit=crop&crop=center' },
                            { name: 'SDT', img: 'https://images.unsplash.com/photo-1484417894907-623942c8ee29?w=100&h=80&fit=crop&crop=center' },
                            { name: 'Data Science & Analytics', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=80&fit=crop&crop=center' },
                            { name: 'IoT & Smart Systems', img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=100&h=80&fit=crop&crop=center' },
                            { name: 'Robotics', img: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=100&h=80&fit=crop&crop=center' },
                            { name: 'Biomedical Engineering', img: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=100&h=80&fit=crop&crop=center' },
                            { name: 'Environmental Engineering', img: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=100&h=80&fit=crop&crop=center' }
                        ].map((topic, index) => (
                            <div key={index} style={{
                                backgroundColor: '#f8f9fa',
                                padding: '15px',
                                borderRadius: '8px',
                                border: '1px solid #e9ecef',
                                textAlign: 'center',
                                transition: 'transform 0.2s ease',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '10px'
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.backgroundColor = '#e9ecef';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = '';
                                    e.currentTarget.style.backgroundColor = '#f8f9fa';
                                }}
                                data-aos="fade-up"
                                data-aos-delay={index * 50}
                            >
                                <img 
                                    src={topic.img} 
                                    alt={topic.name}
                                    style={{
                                        width: '60px',
                                        height: '48px',
                                        borderRadius: '6px',
                                        objectFit: 'cover',
                                        border: '2px solid #084c61'
                                    }}
                                />
                                <span style={{
                                    fontWeight: '600',
                                    color: '#084c61',
                                    fontSize: '0.95rem'
                                }}>
                                    {topic.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <div style={sectionStyle} data-aos="fade-up" data-aos-delay="400">
                <div style={{ textAlign: 'center' }}>
                    <h2 style={{
                        fontSize: '2rem',
                        color: '#084c61',
                        marginBottom: '20px',
                        fontWeight: 'bold'
                    }}>
                        Join the ITME Community
                    </h2>
                    <p style={{
                        fontSize: '1.2rem',
                        marginBottom: '30px',
                        color: '#555',
                        maxWidth: '600px',
                        margin: '0 auto 30px'
                    }}>
                        Contribute to cutting-edge research, collaborate with global experts, and advance the frontiers of tribology and materials engineering through our international platform.
                    </p>
                    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link
                            to="/signup"
                            style={{
                                ...buttonStyle,
                                backgroundColor: '#084c61'
                            }}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            <Edit size={20} />
                            Submit Your Research
                        </Link>
                        <Link
                            to="/developers"
                            style={{
                                ...buttonStyle,
                                backgroundColor: 'transparent',
                                color: '#084c61',
                                border: '2px solid #084c61'
                            }}
                        >
                            <User size={20} />
                            Meet Our Team
                        </Link>
                    </div>
                </div>
            </div>

            {/* Enhanced Contact Section - Fixed email overflow */}
            <div style={contactSectionStyle} data-aos="fade-up" data-aos-delay="500">
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23084c61" fill-opacity="0.03"%3E%3Cpath d="M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z"/%3E%3C/g%3E%3C/svg%3E")',
                    zIndex: 0
                }} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <h2 style={{
                        fontSize: '2.2rem',
                        color: '#084c61',
                        marginBottom: '15px',
                        fontWeight: 'bold'
                    }}>
                        Contact ITME
                    </h2>
                    <p style={{
                        fontSize: '1.1rem',
                        color: '#666',
                        marginBottom: '35px',
                        maxWidth: '500px',
                        margin: '0 auto 35px'
                    }}>
                        Have questions? Need support? Our dedicated team is here to assist you with all your inquiries and technical support.
                    </p>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '25px',
                        maxWidth: '900px',
                        margin: '0 auto'
                    }}>

                        <div style={{
                            backgroundColor: 'white',
                            padding: '25px',
                            borderRadius: '10px',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                            border: '1px solid #e9ecef',
                            textAlign: 'center'
                        }}>
                            <Mail size={24} color="#084c61" style={{ marginBottom: '10px' }} />
                            <h3 style={{ color: '#084c61', fontSize: '1rem', marginBottom: '10px', fontWeight: 'bold' }}>Technical Support</h3>
                            <a href="mailto:support.itme@krmangalam.edu.in" style={{
                                color: '#007bff',
                                textDecoration: 'none',
                                fontSize: '0.85rem',
                                wordBreak: 'break-all',
                                display: 'block',
                                lineHeight: '1.4'
                            }}>
                                support.itme@krmangalam.edu.in
                            </a>
                        </div>

                        <div style={{
                            backgroundColor: 'white',
                            padding: '25px',
                            borderRadius: '10px',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                            border: '1px solid #e9ecef',
                            textAlign: 'center'
                        }}>
                            <Edit size={24} color="#084c61" style={{ marginBottom: '10px' }} />
                            <h3 style={{ color: '#084c61', fontSize: '1rem', marginBottom: '10px', fontWeight: 'bold' }}>Editorial Office</h3>
                            <a href="mailto:editor.itme@krmangalam.edu.in" style={{
                                color: '#007bff',
                                textDecoration: 'none',
                                fontSize: '0.85rem',
                                wordBreak: 'break-all',
                                display: 'block',
                                lineHeight: '1.4'
                            }}>
                                editor.itme@krmangalam.edu.in
                            </a>
                        </div>
                    </div>

                    <div style={{
                        marginTop: '30px',
                        padding: '20px',
                        backgroundColor: 'rgba(8, 76, 97, 0.05)',
                        borderRadius: '8px',
                        border: '1px solid rgba(8, 76, 97, 0.1)'
                    }}>
                        <p style={{
                            margin: 0,
                            color: '#555',
                            fontSize: '0.9rem',
                            fontStyle: 'italic',
                            textAlign: 'center'
                        }}>
                            <CheckCircle size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                            For any queries, complaints, or technical support, please don't hesitate to contact us via the above channels. We typically respond within 24 hours during business days.
                        </p>
                    </div>
                </div>
            </div>

            {/* Add CSS for smooth animations and responsive design */}
            <style jsx="true">{`
                @media (max-width: 768px) {
                    .container {
                        padding: 10px;
                    }
                    
                    .hero-section {
                        padding: 40px 20px !important;
                    }
                    
                    .hero-section h1 {
                        font-size: 2rem !important;
                    }
                    
                    .section {
                        padding: 20px !important;
                        margin-bottom: 20px !important;
                    }
                    
                    .stats-grid {
                        grid-template-columns: repeat(2, 1fr) !important;
                    }
                    
                    .contact-grid {
                        grid-template-columns: 1fr !important;
                    }
                }
                
                @media (max-width: 600px) {
                    .contact-section .grid {
                        grid-template-columns: 1fr !important;
                    }
                    
                    .contact-section .email-text {
                        font-size: 0.8rem !important;
                    }
                }
                
                @media (max-width: 480px) {
                    .stats-grid {
                        grid-template-columns: 1fr !important;
                    }
                    
                    .hero-section h1 {
                        font-size: 1.8rem !important;
                    }
                    
                    .hero-section {
                        padding: 30px 15px !important;
                    }
                    
                    .contact-section .email-text {
                        font-size: 0.75rem !important;
                    }
                }
            `}</style>
        </div>
    );
};

export { About };