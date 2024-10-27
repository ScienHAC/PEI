// GearLoader.js
import React from 'react';

const GearLoader = () => {
    return (
        <>
            <style>
                {`
                    .spinner {
                        position: relative;
                        width: 50px;
                        height: 50px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }

                    .circle {
                        width: 12px;
                        height: 12px;
                        margin: 2px;
                        background-color: #4285f4;
                        border-radius: 50%;
                        animation: spin 1.2s linear infinite;
                    }

                    .circle:nth-child(1) { animation-delay: -0.3s; }
                    .circle:nth-child(2) { animation-delay: -0.2s; }
                    .circle:nth-child(3) { animation-delay: -0.1s; }

                    @keyframes spin {
                        0% { transform: scale(1); opacity: 1; }
                        50% { transform: scale(1.5); opacity: 0.5; }
                        100% { transform: scale(1); opacity: 1; }
                    }
                `}
            </style>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                <div className="spinner">
                    <div className="circle"></div>
                    <div className="circle"></div>
                    <div className="circle"></div>
                    <div className="circle"></div>
                </div>
            </div>
        </>
    );
};

export default GearLoader;
