import { useState, useEffect } from 'react';

import { contactAPI, profileAPI } from '../../services/api';

import Navbar from '../../components/Navbar/Navbar';
import './ContactPage.css';

const ContactPage = () => {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await profileAPI.get();
        setProfile(response.data.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      await contactAPI.submit(formData);
      setStatus({ type: 'success', message: 'Message sent successfully! I will get back to you soon.' });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus({ type: 'error', message: 'Failed to send message. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <Navbar />
      <div className="container py-5">
        <header className="section-header text-center mb-5">
          <h1 className="text-gradient">Get In Touch</h1>
          <p>Let's discuss your next project or just say hi</p>
        </header>

        <div className="contact-grid">
          <div className="contact-info-side">
            <div className="contact-info-card card mb-3">
              <div className="info-icon">
                <i className="fas fa-envelope"></i>
              </div>
              <div className="info-text">
                <h3>Email Me</h3>
                <p>{profile?.email || 'Loading...'}</p>
              </div>
            </div>

            {profile?.phone && (
              <div className="contact-info-card card mb-3">
                <div className="info-icon">
                  <i className="fas fa-phone"></i>
                </div>
                <div className="info-text">
                  <h3>Call Me</h3>
                  <p>{profile.phone}</p>
                </div>
              </div>
            )}

            {profile?.location && (
              <div className="contact-info-card card mb-3">
                <div className="info-icon">
                  <i className="fas fa-location-dot"></i>
                </div>
                <div className="info-text">
                  <h3>Location</h3>
                  <p>{profile.location}</p>
                </div>
              </div>
            )}

            {profile?.social && (
              <div className="social-connect mt-4">
                <h3>Follow Me</h3>
                <div className="social-links-grid mt-2">
                  {profile.social.github && (
                    <a href={profile.social.github} target="_blank" rel="noopener noreferrer" className="social-icon-btn">
                      <i className="fab fa-github"></i>
                    </a>
                  )}
                  {profile.social.linkedin && (
                    <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon-btn">
                      <i className="fab fa-linkedin"></i>
                    </a>
                  )}
                  {profile.social.twitter && (
                    <a href={profile.social.twitter} target="_blank" rel="noopener noreferrer" className="social-icon-btn">
                      <i className="fab fa-twitter"></i>
                    </a>
                  )}
                  {profile.social.facebook && (
                    <a href={profile.social.facebook} target="_blank" rel="noopener noreferrer" className="social-icon-btn">
                      <i className="fab fa-facebook"></i>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="contact-form-side card">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-2">
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Your Email"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="What is this about?"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="form-textarea"
                  rows="6"
                  placeholder="Your message here..."
                  required
                ></textarea>
              </div>

              {status.message && (
                <div className={`alert alert-${status.type} mb-2`}>
                  {status.message}
                </div>
              )}

              <button type="submit" className="btn btn-primary btn-lg w-full" disabled={loading}>
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
