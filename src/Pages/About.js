import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ShieldCheck, Users, Clock, BookOpen, Globe, FileCheck2, Layers, Edit, User, Mail, CheckCircle } from 'lucide-react';

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

    // Refined, realistic value propositions (no over-claiming)
    const features = [
        {
            icon: <ShieldCheck size={40} color="#084c61" />,
            title: 'Rigorous Peer Review',
            description: 'Multi‑disciplinary evaluation emphasizing methodological clarity, reproducibility, and scholarly integrity.'
        },
        {
            icon: <Users size={40} color="#084c61" />,
            title: 'Experienced Editorial Oversight',
            description: 'An editorial team committed to transparent decision processes and ethical publication standards.'
        },
        {
            icon: <BookOpen size={40} color="#084c61" />,
            title: 'Biannual Issues',
            description: 'Two carefully curated issues (July & December) highlighting emerging directions across engineering domains.'
        },
        {
            icon: <Globe size={40} color="#084c61" />,
            title: 'Inclusive Multidisciplinary Scope',
            description: 'Welcomes research that bridges traditional engineering silos with applied sciences and technology innovation.'
        },
        {
            icon: <FileCheck2 size={40} color="#084c61" />,
            title: 'Ethics & Quality Compliance',
            description: 'Adherence to recognized publication ethics, plagiarism screening, and transparent revisions.'
        },
        {
            icon: <Layers size={40} color="#084c61" />,
            title: 'Structured Author Guidance',
            description: 'Clear formatting template, scope clarification FAQs, and responsive editorial communication.'
        }
    ];

    const stats = [
        { value: '2', label: 'Issues Per Year', icon: <BookOpen size={30} />, subtitle: 'Biannual (Jul & Dec)' },
        { value: 'Screened', label: 'Plagiarism', icon: <ShieldCheck size={30} />, subtitle: 'Similarity Checked' },
        { value: 'Structured', label: 'Peer Review', icon: <Clock size={30} />, subtitle: 'Editorially Managed' },
        { value: 'Diverse', label: 'Disciplinary Reach', icon: <Globe size={30} />, subtitle: 'Cross‑Field Focus' }
    ];

    return (
        <div style={containerStyle}>
            {/* Hero Section */}
            <div style={{ ...heroSectionStyle, backgroundAttachment:'fixed' }} data-aos="fade-up">
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
                    <img src="/ITME_LOGO.png" alt="ITME Logo" style={{ width:110, height:'auto', marginBottom:25, filter:'drop-shadow(0 4px 8px rgba(0,0,0,0.25))' }} />
                    <h1 style={headerStyle}>INNOVATIVE TRENDS IN MULTIDISCIPLINARY ENGINEERING</h1>
                    <p style={subHeaderStyle}>
                        Innovative Trends in Multidisciplinary Engineering (ITME) is a peer‑reviewed international journal published biannually (July & December). We curate methodologically sound, ethically responsible research spanning core and emerging engineering domains.
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
                            Biannual Issues
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
                    <p style={{ marginTop:35, fontSize:'0.95rem', opacity:0.9 }}>
                        Learn more about our parent institution: <Link to="/krmangalam-university" style={{ color:'#fff', textDecoration:'underline', fontWeight:600 }}>K.R. Mangalam University →</Link>
                    </p>
                </div>
            </div>

            {/* About K.R. Mangalam University Content (commented out as requested)
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
            */}

            {/* About SOET Content (commented out as requested)
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
            */}

            {/* About Content (refined) */}
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
                <div style={{ fontSize: '1.08rem', lineHeight: '1.75', textAlign: 'justify' }}>
                    <p style={{ marginBottom: '18px' }}>
                        <strong style={{ color: '#084c61' }}>Innovative Trends in Multidisciplinary Engineering (ITME)</strong> advances cross‑disciplinary engineering scholarship by providing an ethically grounded, editor‑guided platform for original research, technical developments, design methodologies, computational models, sustainable engineering solutions, and applied innovation case studies.
                    </p>
                    <p style={{ marginBottom: '18px' }}>
                        We emphasize clarity of contribution, transparent methodology, responsible data use, and relevance to contemporary engineering challenges—from intelligent systems and advanced materials to energy resilience, manufacturing processes, infrastructure optimization, and human‑centered engineering design.
                    </p>
                    <p style={{ marginBottom: '18px' }}>
                        Our biannual model allows careful curation rather than volume‑driven output. Submitted manuscripts undergo similarity screening and structured peer evaluation focused on originality, technical rigor, and disciplinary relevance. Reviewer feedback aims to be constructive, guiding refinement where merited.
                    </p>
                    <p style={{ marginBottom: '0' }}>
                        ITME maintains a living scope—responsive to emerging intersections (e.g., AI‑enabled engineering analytics, sustainable process integration, cyber‑physical systems)—while retaining grounding in core applied and theoretical engineering foundations.
                    </p>
                </div>
            </div>

            {/* Value Propositions */}
            <div data-aos="fade-up" data-aos-delay="200">
                <h2 style={{
                    fontSize: '2rem',
                    color: '#084c61',
                    textAlign: 'center',
                    marginBottom: '40px',
                    fontWeight: 'bold'
                }}>
                    What ITME Provides
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

            {/* Parallax Highlight Band */}
            <div style={{ position:'relative', margin:'70px 0 40px', borderRadius:16, overflow:'hidden' }} data-aos="fade-up" data-aos-delay="250">
                <div style={{
                    background:'linear-gradient(120deg,#084c61 0%,#0d6f77 40%,#128294 90%)',
                    backgroundAttachment:'fixed',
                    padding:'70px 30px'
                }}>
                    <div style={{ maxWidth:1000, margin:'0 auto', display:'grid', gap:32, gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))' }}>
                        {stats.map((stat,i)=> (
                            <div key={i} style={{ textAlign:'center', color:'#fff' }}>
                                <div style={{ opacity:.85, marginBottom:6 }}>{stat.icon}</div>
                                <div style={{ fontSize:'2rem', fontWeight:700, letterSpacing:.5 }}>{stat.value}</div>
                                <div style={{ fontSize:'.9rem', fontWeight:500, opacity:.9 }}>{stat.label}</div>
                                <div style={{ fontSize:'.7rem', opacity:.65, marginTop:4 }}>{stat.subtitle}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Statistics Section (secondary narrative) */}
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
                        Editorial Ethos
                    </h2>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '30px'
                    }}>
                        {[ 
                            {title:'Integrity', text:'Similarity screening + ethical compliance checks precede review allocation.'},
                            {title:'Constructive Review', text:'Focus on methodological clarity, contribution framing, and reproducibility cues.'},
                            {title:'Transparent Decisions', text:'Editorial recommendations grounded in reviewer convergence & scope fit.'},
                            {title:'Curated Scope', text:'Biannual pacing enables careful thematic balance across submissions.'}
                        ].map((b,i)=>(
                            <div key={i} style={{ background:'rgba(255,255,255,0.08)', padding:'18px 16px', borderRadius:10 }}>
                                <h3 style={{ margin:'0 0 8px', fontSize:'1.05rem', color:'#fff', fontWeight:600 }}>{b.title}</h3>
                                <p style={{ margin:0, fontSize:'.8rem', lineHeight:1.4, color:'#dfeff2' }}>{b.text}</p>
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
                        Contribute to cutting-edge research, collaborate with global experts, and advance the frontiers of engineering and materials science through our international platform.
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