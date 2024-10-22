import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [otpStep, setOtpStep] = useState(false); // State to manage OTP input visibility
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        contact: '',
        otp: '' // Added for OTP
    });

    useEffect(() => {
        // Show message if the page is refreshed
        setMessage('Please complete your signup process.');
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const finalData = {
            ...formData,
            name: formData.name.trim().toLowerCase(),
            email: formData.email.trim().toLowerCase(),
            contact: formData.contact.trim(),
            password: formData.password
        };

        if (otpStep) {
            // Handle OTP verification
            try {
                const response = await fetch(`${process.env.REACT_APP_hostURL}/auth/verify-otp-signup`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                    credentials: 'include',
                });

                const result = await response.json();

                if (response.ok) {
                    setMessage('OTP verified successfully!');
                    navigate('/', { replace: true });
                } else {
                    setMessage(result.message || 'Verification failed. Please try again.');
                }
            } catch (error) {
                console.error('Error:', error);
                setMessage('An error occurred during OTP verification. Please try again.');
            }
        } else {
            // Handle user signup
            try {
                const response = await fetch(`${process.env.REACT_APP_hostURL}/auth/signup`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(finalData),
                    credentials: 'include',
                });

                const result = await response.json();

                if (response.ok) {
                    setOtpStep(true); // Switch to OTP step
                    setMessage('Signup successful! Please check your email for the OTP.');
                } else {
                    setMessage(result.message || 'Signup failed. Please try again.');
                }

            } catch (error) {
                console.error('Error:', error);
                setMessage('An error occurred during signup. Please try again.');
            }
        }
        setLoading(false);
        setTimeout(() => setMessage(''), 2000);
    };

    return (
        <>
            <br />
            <div className="container d-flex justify-content-center align-items-center min-vh-100">
                <div className="col-12 col-sm-8 col-md-6 col-lg-4">
                    <h1>{otpStep ? 'Verify OTP' : 'Signup'}</h1>
                    <form onSubmit={handleSubmit}>
                        {!otpStep && !loading && (
                            <>
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="form-control mb-3"
                                    required
                                />

                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="form-control mb-3"
                                    required
                                />

                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="form-control mb-3"
                                    required
                                />

                                <label htmlFor="contactNo">Contact No</label>
                                <input
                                    type="tel"
                                    id="contact"
                                    name="contact"
                                    value={formData.contact}
                                    onChange={handleChange}
                                    className="form-control mb-3"
                                    required
                                />
                            </>
                        )}

                        {otpStep && (
                            <>
                                <label htmlFor="otp">Enter OTP</label>
                                <input
                                    type="text"
                                    id="otp"
                                    name="otp"
                                    value={formData.otp}
                                    onChange={handleChange}
                                    className="form-control mb-3"
                                    required
                                />
                            </>
                        )}
                        {!loading && (
                            <button type="submit" className="btn btn-outline-success btn-block btn-form-auth">
                                {otpStep ? 'Verify OTP' : 'Sign Up'}
                            </button>
                        )}
                    </form>

                    {/* Loader container */}
                    <div className="d-flex justify-content-center align-items-center mt-4">
                        {loading && <span className="loader"></span>}
                    </div>
                    {message && <p>{message}</p>}
                </div>
            </div>
        </>
    );
};

export default Signup;

