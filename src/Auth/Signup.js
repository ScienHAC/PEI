import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PrivacyPolicy from "../Pages/PrivacyPolicy";
import TermsandConditions from "../Pages/TermsandConditions";
import { Modal, Button } from "react-bootstrap";

const Signup = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [otpStep, setOtpStep] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        contact: "",
        otp: "",
    });
    const [termsChecked, setTermsChecked] = useState(false);
    const [showPrivacyModal, setShowPrivacyModal] = useState(false);
    const [showTermsModal, setShowTermsModal] = useState(false);

    useEffect(() => {
        setMessage("Please complete your signup process.");
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleCheckboxChange = (e) => {
        setTermsChecked(e.target.checked);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const finalData = {
            ...formData,
            name: formData.name.trim().toLowerCase(),
            email: formData.email.trim().toLowerCase(),
            contact: formData.contact.trim(),
            password: formData.password,
        };

        if (otpStep) {
            try {
                const response = await fetch(
                    `${process.env.REACT_APP_hostURL}/auth/verify-otp-signup`,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(formData),
                        credentials: "include",
                    }
                );

                const result = await response.json();

                if (response.ok) {
                    setMessage("OTP verified successfully!");
                    navigate("/", { replace: true });
                } else {
                    setMessage(result.message || "Verification failed. Please try again.");
                }
            } catch (error) {
                console.error("Error:", error);
                setMessage("An error occurred during OTP verification. Please try again.");
            }
        } else {
            try {
                const response = await fetch(`${process.env.REACT_APP_hostURL}/auth/signup`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(finalData),
                    credentials: "include",
                });

                const result = await response.json();

                if (response.ok) {
                    setOtpStep(true);
                    setMessage("Signup successful! Please check your email for the OTP.");
                } else {
                    setMessage(result.message || "Signup failed. Please try again.");
                }
            } catch (error) {
                console.error("Error:", error);
                setMessage("An error occurred during signup. Please try again.");
            }
        }
        setLoading(false);
        setTimeout(() => setMessage(""), 2000);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <div className="container d-flex justify-content-center align-items-center">
                <div className="col-12 col-sm-8 col-md-6 col-lg-4">
                    <h1>{otpStep ? "Verify OTP" : "Signup"}</h1>
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
                                <div className="password-container" style={{ position: "relative" }}>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="form-control mb-3"
                                        required
                                    />
                                    <span
                                        className="toggle-password"
                                        onClick={togglePasswordVisibility}
                                        style={{
                                            cursor: "pointer",
                                            position: "absolute",
                                            right: "10px",
                                            top: "10px",
                                        }}
                                    >
                                        {showPassword ? (
                                            <i className="fa fa-eye-slash" style={{ fontSize: "20px" }}></i>
                                        ) : (
                                            <i className="fa fa-eye" style={{ fontSize: "20px" }}></i>
                                        )}
                                    </span>
                                </div>

                                <label htmlFor="contact">Contact No</label>
                                <input
                                    type="tel"
                                    id="contact"
                                    name="contact"
                                    value={formData.contact}
                                    onChange={handleChange}
                                    className="form-control mb-3"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    required
                                />

                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="termsCheckbox"
                                        checked={termsChecked}
                                        onChange={handleCheckboxChange}
                                        style={{ cursor: 'pointer' }}
                                    />
                                    <label className="form-check-label" htmlFor="termsCheckbox">
                                        I agree to the{" "}
                                        <button
                                            type="button"
                                            className="btn btn-link p-0"
                                            onClick={() => setShowPrivacyModal(true)}
                                        >
                                            Privacy Policy
                                        </button>{" "}
                                        and{" "}
                                        <button
                                            type="button"
                                            className="btn btn-link p-0"
                                            onClick={() => setShowTermsModal(true)}
                                        >
                                            Terms and Conditions
                                        </button>
                                    </label>
                                </div>
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
                            <button
                                type="submit"
                                className="btn btn-outline-success btn-block btn-form-auth"
                                disabled={!termsChecked}
                                style={{
                                    cursor: termsChecked ? 'pointer' : 'not-allowed',
                                }}
                            >
                                {otpStep ? "Verify OTP" : "Sign Up"}
                            </button>
                        )}
                    </form>

                    <div className="d-flex justify-content-center align-items-center mt-4">
                        {loading && <span className="loader"></span>}
                    </div>
                    {message && <p>{message}</p>}
                </div>
            </div>

            {/* Privacy Policy Modal */}
            <Modal show={showPrivacyModal} onHide={() => setShowPrivacyModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Privacy Policy</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <PrivacyPolicy />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowPrivacyModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Terms and Conditions Modal */}
            <Modal show={showTermsModal} onHide={() => setShowTermsModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Terms and Conditions</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TermsandConditions />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowTermsModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Signup;
