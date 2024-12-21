import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [otpStep, setOtpStep] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        otp: ''
    });

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
            email: formData.email.trim().toLowerCase(),
            password: formData.password
        };
        if (otpStep) {
            // Handle OTP verification
            try {
                const response = await fetch(`${process.env.REACT_APP_hostURL}/auth/verify-otp-login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                    credentials: 'include',
                });

                const result = await response.json();

                if (response.ok) {
                    setMessage('Otp verified successfully!');
                    navigate('/', { replace: true });
                } else {
                    setMessage(result.message || 'Verification failed. Please try again.');
                }
            } catch (error) {
                console.error('Error:', error);
                setMessage('An error occurred. Please try again.');
            }
        } else {
            // Handle user login
            try {
                const response = await fetch(`${process.env.REACT_APP_hostURL}/auth/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(finalData),
                    credentials: 'include',
                });

                const result = await response.json();

                if (response.ok) {
                    setOtpStep(true); // Switch to OTP step
                    setMessage('Login successful!');
                } else {
                    setMessage(result.message || 'Login failed. Please try again.');
                }

            } catch (error) {
                console.error('Error:', error);
                setMessage('An error occurred. Please try again.');
            }
        }
        setLoading(false);
        setTimeout(() => setMessage(''), 2000);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <br />
            <div className="container d-flex justify-content-center align-items-center min-vh-100">
                <div className="col-12 col-sm-8 col-md-6 col-lg-4">
                    <h1>{otpStep ? 'Verify OTP' : 'Login'}</h1>
                    <form onSubmit={handleSubmit}>
                        {/* Email and Password Fields */}
                        {!otpStep && !loading && (
                            <>
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
                                <div className="password-container" style={{ position: 'relative' }}>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="form-control mb-3"
                                        required
                                        style={{ paddingLeft: 'auto' }}
                                    />

                                    {/* Eye icon to toggle visibility on the left */}
                                    <span
                                        className="toggle-password"
                                        onClick={togglePasswordVisibility}
                                        style={{
                                            cursor: 'pointer',
                                            position: 'absolute',
                                            right: '10px',
                                            top: '10px',
                                        }}
                                    >
                                        {showPassword ? (
                                            <i className="fa fa-eye-slash" style={{ fontSize: '20px' }}></i>
                                        ) : (
                                            <i className="fa fa-eye" style={{ fontSize: '20px' }}></i>
                                        )}
                                    </span>
                                </div>
                            </>
                        )}

                        {/* OTP Field */}
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

                        {/*  Submit Button  */}
                        {!loading && (
                            <button type="submit" className="btn btn-outline-success btn-block btn-form-auth">
                                {otpStep ? 'Verify OTP' : 'Login'}
                            </button>
                        )}
                        <button className="btn btn-link" onClick={() => navigate('/forgot-password')}>
                            Forgot Password?
                        </button>
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

export default Login;
