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
      <div className="contact-info enhanced">
        <h3>Contact Information</h3>
        <div className="contact-details two-col">
          <div className="contact-block">
            <div className="contact-item">
              <i className="fas fa-headset" aria-hidden="true"></i>
              <div className="contact-meta">
                <span className="label">Technical Support</span>
                <a href="mailto:support.itme@krmangalam.edu.in" className="value linkable">support.itme@krmangalam.edu.in</a>
              </div>
            </div>
            <div className="contact-item">
              <i className="fas fa-user-tie" aria-hidden="true"></i>
              <div className="contact-meta">
                <span className="label">Dean (SOET)</span>
                <a href="mailto:dean.soet@krmangalam.edu.in" className="value linkable">dean.soet@krmangalam.edu.in</a>
              </div>
            </div>
          </div>
          <div className="contact-block">
            <div className="contact-item">
              <i className="fas fa-phone" aria-hidden="true"></i>
              <div className="contact-meta">
                <span className="label">Phone</span>
                <a href="tel:+919811911970" className="value">+91‑9811911970</a>
              </div>
            </div>
            <div className="contact-item">
              <i className="fas fa-globe" aria-hidden="true"></i>
              <div className="contact-meta">
                <span className="label">Official Portal</span>
                <a href="https://itme.krmangalam.edu.in" target="_blank" rel="noopener noreferrer" className="value linkable">itme.krmangalam.edu.in</a>
              </div>
            </div>
          </div>
          <div className="contact-brand">
            <img src="/ITME_LOGO.png" alt="ITME Logo" className="contact-logo" />
            <p className="brand-caption">ITME Journal (Biannual) • K.R. Mangalam University</p>
          </div>
        </div>
        <p className="contact-disclaimer">For manuscript enquiries include (if available) your submission ID and a concise subject line to aid routing.</p>
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
      <style>{`
        .contact-info.enhanced { border-left:6px solid #003366; background:linear-gradient(135deg,#f8fafc 0%,#f2f7fa 100%); position:relative; overflow:hidden; }
        .contact-info.enhanced:before { content:""; position:absolute; inset:0; background:radial-gradient(circle at 85% 18%,rgba(0,51,102,.12),transparent 60%); pointer-events:none; }
        .contact-details.two-col { display:grid; gap:22px; grid-template-columns:repeat(auto-fit,minmax(250px,1fr)); align-items:start; }
        .contact-block { display:grid; gap:18px; }
        .contact-item { display:flex; gap:14px; align-items:flex-start; padding:10px 12px; background:#fff; border:1px solid #e2e9ef; border-radius:10px; box-shadow:0 1px 3px rgba(0,0,0,.04); transition:box-shadow .35s, transform .35s, border-color .35s; }
        .contact-item:hover { transform:translateY(-3px); box-shadow:0 6px 18px -4px rgba(0,51,102,.25); border-color:#c2d8e4; }
        .contact-item i { background:#003366; color:#fff; width:38px; height:38px; display:flex; align-items:center; justify-content:center; border-radius:10px; font-size:.95rem; box-shadow:0 4px 10px -2px rgba(0,0,0,.25); }
        .contact-meta { display:flex; flex-direction:column; gap:2px; font-size:.85rem; }
        .contact-meta .label { font-weight:600; letter-spacing:.4px; color:#003366; font-size:.7rem; text-transform:uppercase; opacity:.85; }
        .contact-meta .value { font-weight:500; color:#163b52; font-size:.78rem; word-break:break-word; text-decoration:none; }
        .contact-meta .value.linkable:hover { text-decoration:underline; color:#00518a; }
        .contact-brand { grid-column:1/-1; display:flex; flex-direction:column; align-items:center; gap:.65rem; padding:14px 10px 4px; }
        .contact-logo { width:72px; height:auto; filter:drop-shadow(0 4px 8px rgba(0,0,0,.25)); transform:scale(1.9); }
        .brand-caption { margin:0; font-size:.65rem; letter-spacing:.5px; font-weight:600; color:#0d3b4d; text-transform:uppercase; opacity:.8; }
        .contact-disclaimer { margin:18px 0 0; font-size:.63rem; letter-spacing:.4px; text-transform:uppercase; font-weight:600; color:#4d6472; }
        @media (max-width:640px){
          .contact-logo { transform:scale(1.55); }
          .contact-item { padding:10px 10px; }
        }
      `}</style>
    </div>
  );
}

export default ContactForm;
