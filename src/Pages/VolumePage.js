import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../CSS/VolumePage.css';
import Loader from '../Components/Loader';

const VolumePage = () => {
    const { quarter, volumeNumber } = useParams();
    const [volumeData, setVolumeData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVolumeData = async () => {
            try {
                const year = quarter.split('-').pop();
                const response = await axios.get(`${process.env.REACT_APP_hostURL}/api/archives/volumes/${year}`);
                const volume = response.data.volumes ? response.data.volumes : [];
                setVolumeData(volume);
            } catch (error) {
                console.error("Error fetching volume data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchVolumeData();
    }, [quarter, volumeNumber]);

    const formatVolumeNumber = (num) => {
        return `Volume ${num.replace('volume', '').trim()}`;
    };

    if (loading) return <Loader />;

    return (
        <div className="volume-page">
            <h1 className="volume-heading">{`${formatVolumeNumber(volumeNumber)} for Quarter: ${quarter}`}</h1>
            {volumeData && volumeData.length > 0 ? (
                <div>
                    <h2 className="volume-subheading">Papers in this Volume:</h2>
                    <ul className="volume-list">
                        {volumeData.map((volume, volIndex) => (
                            <li key={volIndex} className="volume-item">
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
                        ))}
                    </ul>
                </div>
            ) : (
                <p className="no-data">No data available for this volume.</p>
            )}
        </div>
    );
};

export default VolumePage;
