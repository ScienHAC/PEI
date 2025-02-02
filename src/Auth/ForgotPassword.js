import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        email: '',
        otp: '',
        newPassword: ''
    });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (step === 1) {
            // Step 1: Send OTP to email
            try {
                const response = await fetch(`${process.env.REACT_APP_hostURL}/auth/forgot-password`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: formData.email }),
                });

                const result = await response.json();
                if (response.ok) {
                    setStep(2); // Move to OTP step
                    setMessage('OTP sent to your email!');
                } else {
                    setMessage(result.message || 'Failed to send OTP. Please try again.');
                }
            } catch (error) {
                console.error('Error:', error);
                setMessage('An error occurred. Please try again.');
            }
        } else {
            // Step 2: Verify OTP and reset password
            try {
                const response = await fetch(`${process.env.REACT_APP_hostURL}/auth/reset-password`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });

                const result = await response.json();
                if (response.ok) {
                    setMessage('Password reset successful! Redirecting to login...');
                    setTimeout(() => navigate('/login', { replace: true }), 2000);
                } else {
                    setMessage(result.message || 'Failed to reset password. Please try again.');
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
            <div className="container d-flex justify-content-center align-items-center ">
                <div className="col-12 col-sm-8 col-md-6 col-lg-4">
                    <h1>{step === 1 ? 'Forgot Password' : 'Reset Password'}</h1>
                    <form onSubmit={handleSubmit}>
                        {/* Email Field */}
                        {step === 1 && (
                            <>
                                <label htmlFor="email">Enter your email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="form-control mb-3"
                                    required
                                />
                            </>
                        )}

                        {/* OTP and New Password Fields */}
                        {step === 2 && (
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

                                <label htmlFor="newPassword">New Password</label>
                                <div className="password-container" style={{ position: 'relative' }}>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="newPassword"
                                        name="newPassword"
                                        value={formData.newPassword}
                                        onChange={handleChange}
                                        className="form-control mb-3"
                                        required
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

                        {/* Submit Button */}
                        {!loading && (
                            <button type="submit" className="btn btn-outline-success btn-block btn-form-auth">
                                {step === 1 ? 'Send OTP' : 'Reset Password'}
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

export default ForgotPassword;
