import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../Components/Loader';
import '../CSS/VolumePage.css';

const CurrentIssue = () => {
    const [latestYear, setLatestYear] = useState(null);
    const [currentVolumeData, setCurrentVolumeData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLatestYear = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_hostURL}/api/archives/years`);
                const years = response.data.years;
                const latest = Math.max(...years);
                setLatestYear(latest);
                fetchCurrentVolumeData(latest);
            } catch (error) {
                console.error("Error fetching years:", error);
            } finally {
                setLoading(false);
            }
        };

        const fetchCurrentVolumeData = async (year) => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_hostURL}/api/archives/volumes/${year}`);
                const volume = response.data.volumes ? response.data.volumes : [];
                setCurrentVolumeData(volume);
            } catch (error) {
                console.error("Error fetching current volume data:", error);
            }
        };

        fetchLatestYear();
    }, []);

    if (loading) return <Loader />;

    return (
        <div className="current-issue">
            <h1 className="current-issue-heading">Current Issue</h1>
            {currentVolumeData && currentVolumeData.length > 0 ? (
                <div>
                    <h2 className="current-issue-subheading">Latest Volume Data for Year: {latestYear}</h2>
                    <ul className="current-issue-list">
                        {currentVolumeData.map((volume, volIndex) => (
                            volume.volumes.length > 0 && (
                                <li key={volIndex} className="current-issue-item" style={{ listStyle: 'none' }}>
                                    <h3 className="quarter-title">{`${volume.quarter}`}</h3>
                                    {volume.volumes.slice().reverse().map((volGroup, groupIndex) => (
                                        <div key={groupIndex} className="volume-group">
                                            <h4 className="group-title">{volGroup.volume}</h4>
                                            <ul className="paper-list">
                                                {volGroup.papers.slice().reverse().map((paper, paperIndex) => (
                                                    <li key={paperIndex} className="paper-card">
                                                        <div className="paper-details">
                                                            <h5 className="paper-title">{paper.title}</h5>
                                                            <p><strong>Author:</strong> {paper.author}</p>
                                                            <p><strong>Abstract:</strong> {paper.abstract}</p>
                                                            <p><strong>Published on:</strong> {new Date(paper.createdAt).toLocaleDateString()}</p>
                                                        </div>
                                                        <div className="paper-actions">
                                                            <a
                                                                href={`${process.env.REACT_APP_hostURL}/api/uploads/${paper.filePath}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="pdf-link"
                                                            >
                                                                View PDF
                                                            </a>
                                                            <a
                                                                href={`${process.env.REACT_APP_hostURL}/api/uploads/${paper.filePath}`}
                                                                download
                                                                className="pdf-link"
                                                            >
                                                                Download PDF
                                                            </a>
                                                        </div>
                                                    </li>
                                                ))}

                                            </ul>
                                        </div>
                                    ))}
                                </li>
                            )
                        ))}
                    </ul>
                </div>
            ) : (
                <p className="no-data">No data available for the current issue.</p>
            )}
        </div>
    );
};

export default CurrentIssue;
