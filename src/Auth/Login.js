import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [otpStep, setOtpStep] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        otp: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value.trim().toLowerCase()
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
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
                    body: JSON.stringify(formData),
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

    return (
        <div>
            <h1>{otpStep ? 'Verify OTP' : 'Login'}</h1>
            <form onSubmit={handleSubmit}>
                {!otpStep && (
                    <>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
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
                            required
                        />
                    </>
                )}
                <button type="submit" className="btn btn-outline-success my-2 my-sm-0">
                    {otpStep ? 'Verify OTP' : 'Login'}
                </button>
            </form>

            {loading && <p>Loading...</p>}
            {message && <p>{message}</p>}
        </div>
    );
};

export default Login;
