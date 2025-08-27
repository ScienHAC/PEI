import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_hostURL}/auth/contact-us`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        // Display the specific error message from the backend
        setSnackbar({
          open: true,
          message: responseData.message || 'Failed to send message. Please try again.',
          severity: 'error'
        });
        return;
      }

      // Success - show success message and reset form
      setSnackbar({
        open: true,
        message: responseData.message || 'Message sent successfully!',
        severity: 'success'
      });
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });

    } catch (error) {
      console.error('Contact form error:', error);
      setSnackbar({
        open: true,
        message: 'Network error. Please check your connection and try again.',
        severity: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  return (
    <div className="contact-form-container">
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p className="contact-description">
          Get in touch with the ITME Journal editorial team. We're here to help with your inquiries.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Full Name <span className="required">*</span></label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name (2-100 characters)"
            required
            minLength={2}
            maxLength={100}
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address <span className="required">*</span></label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number <span className="required">*</span></label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number (8-15 digits)"
            required
            minLength={8}
            maxLength={15}
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="subject">Subject <span className="required">*</span></label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Enter subject (3-200 characters)"
            required
            minLength={3}
            maxLength={200}
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message <span className="required">*</span></label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Enter your message (10-5000 characters)"
            required
            minLength={10}
            maxLength={5000}
            disabled={isSubmitting}
            rows={6}
          />
          <small className="character-count">
            {formData.message.length}/5000 characters
          </small>
        </div>

        <button
          type="submit"
          className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="spinner"></span>
              Sending...
            </>
          ) : (
            'Send Message'
          )}
        </button>
      </form>

      {/* Contact Information */}
      <div className="contact-info">
        <h3>Contact Information</h3>
        <div className="contact-details">
          <div className="contact-item">
            <i className="fas fa-envelope"></i>
            <span>support.itme@krmangalam.edu.in</span>
          </div>
          <div className="contact-item">
            <i className="fas fa-globe"></i>
            <span>https://itme.krmangalam.edu.in</span>
          </div>
        </div>
      </div>

      {/* Snackbar for success/error messages */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MuiAlert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </MuiAlert>
      </Snackbar>

      <style>{`
        .contact-form-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          background-color: #ffffff;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .contact-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .contact-header h1 {
          color: #003366;
          margin-bottom: 10px;
          font-size: 2.5rem;
        }

        .contact-description {
          color: #666;
          font-size: 1.1rem;
          margin-bottom: 0;
        }

        .contact-form .form-group {
          margin-bottom: 20px;
        }

        .contact-form label {
          font-weight: 600;
          display: block;
          margin-bottom: 8px;
          font-size: 1rem;
          color: #333;
        }

        .required {
          color: #dc3545;
        }

        .contact-form input,
        .contact-form textarea {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #e1e5e9;
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
          background-color: #fafafa;
        }

        .contact-form input:focus,
        .contact-form textarea:focus {
          outline: none;
          border-color: #003366;
          box-shadow: 0 0 0 3px rgba(0, 51, 102, 0.1);
          background-color: #ffffff;
        }

        .contact-form input:disabled,
        .contact-form textarea:disabled {
          background-color: #f8f9fa;
          opacity: 0.7;
          cursor: not-allowed;
        }

        .contact-form textarea {
          resize: vertical;
          min-height: 120px;
        }

        .character-count {
          display: block;
          text-align: right;
          font-size: 0.9rem;
          color: #666;
          margin-top: 4px;
        }

        .submit-button {
          background: linear-gradient(135deg, #003366, #004080);
          color: #fff;
          padding: 14px 32px;
          border: none;
          border-radius: 8px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          min-height: 50px;
          width: 100%;
        }

        .submit-button:hover:not(:disabled) {
          background: linear-gradient(135deg, #004080, #0056b3);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 51, 102, 0.3);
        }

        .submit-button:disabled {
          background: #6c757d;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid transparent;
          border-top: 2px solid #ffffff;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .contact-info {
          margin-top: 40px;
          padding: 24px;
          background-color: #f8f9fa;
          border-radius: 8px;
          border-left: 4px solid #003366;
        }

        .contact-info h3 {
          color: #003366;
          margin-bottom: 16px;
          font-size: 1.3rem;
        }

        .contact-details {
          display: grid;
          gap: 12px;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 1rem;
        }

        .contact-item i {
          color: #003366;
          width: 20px;
          text-align: center;
        }

        @media (max-width: 768px) {
          .contact-form-container {
            margin: 10px;
            padding: 16px;
          }

          .contact-header h1 {
            font-size: 2rem;
          }

          .submit-button {
            padding: 12px 24px;
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
}

export default ContactForm;
