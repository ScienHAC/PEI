import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from '../Components/Loader';

const Archives = () => {
    const [years, setYears] = useState([]);
    const [selectedYear, setSelectedYear] = useState(null);
    const [volumesData, setVolumesData] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {

        setLoading(true);
        axios.get(`${process.env.REACT_APP_hostURL}/api/archives/years`)
            .then(response => setYears(response.data.years))
            .catch(error => console.error("Error fetching years:", error))
            .finally(() => setLoading(false));
    }, []);

    const handleYearClick = (year) => {
        setSelectedYear(selectedYear === year ? null : year);
        setLoading(true);
        axios.get(`${process.env.REACT_APP_hostURL}/api/archives/volumes/${year}`)
            .then(response => {

                const reversedVolumes = response.data.volumes ? response.data.volumes.reverse() : [];
                setVolumesData(reversedVolumes);
            })
            .catch(error => console.error("Error fetching volumes:", error))
            .finally(() => setLoading(false));
    };

    const handleVolumeClick = (quarter, volumeNumber) => {
        const formattedVolume = volumeNumber.toLowerCase().replace(/\s+/g, '');
        navigate(`/archives/${quarter}/${formattedVolume}`);
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
            <h1 style={{ textAlign: 'center', fontWeight: 'bold', color: '#333' }}>Archives</h1>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
                {years.map((year) => (
                    <div key={year} style={{ position: 'relative', margin: '10px 0', width: '250px' }}>
                        <button
                            onClick={() => handleYearClick(year)}
                            style={{
                                padding: '15px',
                                fontSize: '16px',
                                cursor: 'pointer',
                                backgroundColor: '#007BFF',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                transition: 'background-color 0.3s, transform 0.3s',
                                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                                width: '100%',
                                fontWeight: 'bold',
                            }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007BFF'}
                            onFocus={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                            onBlur={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            {year}
                        </button>

                        {/* Dropdown for volumes */}
                        {selectedYear === year && (
                            <div style={{
                                top: '100%',
                                left: '0',
                                width: '100%',
                                backgroundColor: '#fff',
                                border: '1px solid #ccc',
                                borderRadius: '5px',
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                                zIndex: '1',
                                marginTop: '5px',
                                display: 'flex',
                                flexDirection: 'column',
                            }}>
                                {volumesData.map(({ quarter, volumes }) => (
                                    <div key={quarter} style={{ padding: '10px' }}>
                                        <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#333' }}>{quarter}</h3>
                                        {volumes.length > 0 ? (
                                            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
                                                {volumes.map((volume, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() => handleVolumeClick(quarter.replace(/\s+/g, '-').toLowerCase(), volume.volume)}
                                                        style={{
                                                            padding: '10px 15px',
                                                            fontSize: '14px',
                                                            cursor: 'pointer',
                                                            backgroundColor: '#28A745',
                                                            color: 'white',
                                                            border: 'none',
                                                            borderRadius: '5px',
                                                            transition: 'background-color 0.3s, transform 0.3s',
                                                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                                                        }}
                                                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#218838'}
                                                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#28A745'}
                                                        onFocus={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                                        onBlur={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                                    >
                                                        {volume.volume}
                                                    </button>
                                                ))}
                                            </div>
                                        ) : (
                                            <div style={{ padding: '10px', textAlign: 'center', color: '#333' }}>
                                                No Paper Published.
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {/* Show loader when data is being fetched */}
            {loading && <Loader />}
        </div>
    );
};

export default Archives;
