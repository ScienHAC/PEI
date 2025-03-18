import React from 'react';
import DeveloperCard from './DeveloperCard';
import '../CSS/DeveloperTeam.css';
import yashrajImg from '../assets/yashraj.jpg';
import piyushImg from '../assets/piyush.png';

// Dummy data - Replace with your team data!
const developers = [
    {
        name: 'Piyush Sharma',
        role: 'B.Tech CSE (AI & ML)',
        image: piyushImg,
        linkedin: 'https://www.linkedin.com/in/piyush-078455221/',
        github: 'https://github.com/ScienHAC'
    },
    {
        name: 'Yashraj Pahuja',
        role: 'B.Tech CSE (AI & ML)',
        image: yashrajImg,
        linkedin: 'https://www.linkedin.com/in/yashraj-pahuja-28a34b325',
        github: 'https://github.com/CYBORG-YASHRAJ'
    },
];

const DeveloperTeam = () => {
    return (
        <section className="team-section">
            <h2 className="team-title">Meet Our Developers</h2>
            <div className="team-container">
                {developers.map((dev, index) => (
                    <DeveloperCard key={index} developer={dev} />
                ))}
            </div>
        </section>
    );
};

export default DeveloperTeam;
