import React, { useEffect, useState } from 'react';
import useAuth from '../Hooks/useAuth';

const Dashboard = () => {
    const { user } = useAuth();
    const [papers, setPapers] = useState([]);

    // Fetch user's research papers
    useEffect(() => {
        const fetchPapers = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_hostURL}/api/research`, {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!response.ok) {
                    const errorText = await response.text(); // Read the response as text for debugging
                    throw new Error(`Server Error: ${response.status} - ${errorText}`);
                }

                const data = await response.json();
                setPapers(data);
            } catch (error) {
                console.error('Error fetching research papers:', error);
            }
        };


        fetchPapers();
    }, []);

    return (
        <div>
            <h1>Hello, {user.name}</h1>
            <h2>Your Research Papers</h2>
            {papers.length === 0 ? (
                <p>No research papers uploaded yet.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>View</th>
                            <th>Download</th>
                        </tr>
                    </thead>
                    <tbody>
                        {papers.map((paper) => (
                            <tr key={paper._id}>
                                <td>{paper.title}</td>
                                <td>
                                    <a
                                        href={`${process.env.REACT_APP_hostURL}/api/uploads/${paper.filePath}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        View
                                    </a>
                                </td>
                                <td>
                                    <a href={`${process.env.REACT_APP_hostURL}/api/uploads/${paper.filePath}`} target="_blank" download>
                                        Download
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Dashboard;
