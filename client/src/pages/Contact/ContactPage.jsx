import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Github, 
  Linkedin, 
  Twitter, 
  Facebook, 
  Check, 
  Copy,
  ExternalLink,
  MessageSquare,
  MessageCircle,
  Sparkles,
  User,
  AtSign,
  Type,
  FileText,
  Loader2,
  ThumbsUp
} from 'lucide-react';

import Navbar from '../../components/Navbar/Navbar';
import portfolioData from '../../data/portfolioData.json';
import './ContactPage.css';

const ContactPage = () => {
  const profile = portfolioData.profile;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [focusedField, setFocusedField] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFocus = (field) => setFocusedField(field);
  const handleBlur = () => setFocusedField(null);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    const SERVICE_ID = 'service_uk1gipr';
    const TEMPLATE_ID = 'template_l9aqoc3';
    const PUBLIC_KEY = 'z0rMLL83Ro0bLI9E7';

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: profile.email,
        sent_at: new Date().toLocaleString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        })
      };

      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      
      setLoading(false);
      setShowSuccessOverlay(true);
      setTimeout(() => setShowSuccessOverlay(false), 5000);
      
      setStatus({ type: 'success', message: 'Message sent successfully!' });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      setLoading(false);
      setStatus({ 
        type: 'error', 
        message: `Failed to send message: ${error?.text || 'Check your internet connection.'}` 
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 50 } }
  };

  const getActiveTitle = () => {
    if (showSuccessOverlay) return "Message Sent!";
    switch (focusedField) {
      case 'name': return 'Nice to meet you!';
      case 'email': return 'Where should I reply?';
      case 'subject': return 'What\'s on your mind?';
      case 'message': return 'I\'m all ears!';
      default: return 'Drop a Message';
    }
  };

  return (
    <div className="contact-page">
      <Navbar />
      
      {/* Background Decorative Elements */}
      <div className="contact-bg-glow glow-1"></div>
      <div className="contact-bg-glow glow-2"></div>

      <AnimatePresence>
        {showSuccessOverlay && (
          <motion.div 
            className="success-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="success-modal glass"
              initial={{ scale: 0.5, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.5, opacity: 0, y: 50 }}
            >
              <div className="success-icon-animated">
                <motion.div
                  initial={{ rotate: -180, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
                >
                  <ThumbsUp size={80} color="var(--primary-light)" />
                </motion.div>
                <div className="particles">
                  {[...Array(12)].map((_, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0, x: 0, y: 0 }}
                      animate={{ 
                        scale: [0, 1, 0], 
                        x: (Math.random() - 0.5) * 200, 
                        y: (Math.random() - 0.5) * 200 
                      }}
                      transition={{ duration: 1, repeat: Infinity, repeatDelay: Math.random() }}
                      style={{ background: i % 2 === 0 ? 'var(--primary)' : 'var(--secondary)' }}
                    />
                  ))}
                </div>
              </div>
              <h2>Thank You!</h2>
              <p>Your message has been delivered successfully. I will get back to you shortly.</p>
              <button className="btn btn-primary" onClick={() => setShowSuccessOverlay(false)}>Close</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container py-5">
        <motion.header 
          className="section-header text-center mb-5"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: 'spring' }}
        >
          <div className="contact-label-wrapper">
             <span className="contact-label">CONTACT ME</span>
          </div>
          <motion.h1 
            className="text-gradient display-title"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            Let's Create Something <br /> Great Together
          </motion.h1>
          <p className="contact-subtitle">I'm currently available for new projects and collaborations. <br /> Reach out and let's discuss how I can help you.</p>
        </motion.header>

        <motion.div 
          className="contact-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="contact-info-side">
            <motion.div variants={itemVariants} className="info-section">
              <h3 className="section-subtitle">Get In Touch</h3>
              
              <div className="contact-cards-stack">
                <div className={`contact-info-card ${focusedField === 'email' ? 'active-highlight' : ''}`}>
                  <div className="info-icon-wrapper">
                    <Mail size={28} />
                  </div>
                  <div className="info-text">
                    <span className="info-label">Email Address</span>
                    <p>{profile?.email}</p>
                  </div>
                  <button 
                    className="copy-btn" 
                    onClick={() => copyToClipboard(profile?.email)}
                    title="Copy Email"
                  >
                    {copiedEmail ? <Check size={20} className="text-success" /> : <Copy size={20} />}
                  </button>
                </div>

                {profile?.phone && (
                  <>
                    <div className="contact-info-card">
                      <div className="info-icon-wrapper">
                        <Phone size={28} />
                      </div>
                      <div className="info-text">
                        <span className="info-label">Phone Number</span>
                        <p>{profile.phone}</p>
                      </div>
                      <a href={`tel:${profile.phone}`} className="action-link">
                        <ExternalLink size={20} />
                      </a>
                    </div>

                    <a 
                      href={`https://wa.me/${profile.phone.replace(/[^0-9]/g, '')}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="contact-info-card whatsapp-card"
                    >
                      <div className="info-icon-wrapper wa-icon">
                        <MessageCircle size={28} />
                      </div>
                      <div className="info-text">
                        <span className="info-label">Instant Support</span>
                        <p>WhatsApp Chat</p>
                      </div>
                      <div className="action-link">
                        <ExternalLink size={20} />
                      </div>
                    </a>
                  </>
                )}

                {profile?.location && (
                  <div className="contact-info-card">
                    <div className="info-icon-wrapper">
                      <MapPin size={28} />
                    </div>
                    <div className="info-text">
                      <span className="info-label">Current Location</span>
                      <p>{profile.location}</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="social-connect mt-4">
              <h3 className="section-subtitle">Connect Socially</h3>
              <div className="social-links-flex">
                {profile.social.github && (
                  <a href={profile.social.github} target="_blank" rel="noopener noreferrer" className="social-link-item github glass">
                    <Github size={22} />
                    <span>GitHub</span>
                  </a>
                )}
                {profile.social.linkedin && (
                  <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" className="social-link-item linkedin glass">
                    <Linkedin size={22} />
                    <span>LinkedIn</span>
                  </a>
                )}
                {profile.social.facebook && (
                  <a href={profile.social.facebook} target="_blank" rel="noopener noreferrer" className="social-link-item facebook glass">
                    <Facebook size={22} />
                    <span>Facebook</span>
                  </a>
                )}
              </div>
            </motion.div>
          </div>

          <motion.div 
            variants={itemVariants} 
            className={`contact-form-container ${focusedField ? 'form-active' : ''}`}
          >
            <div className="form-header">
              <motion.div 
                className="form-icon-container"
                animate={focusedField ? { rotate: 360, scale: 1.1 } : { rotate: -3, scale: 1 }}
                transition={{ duration: 0.5, type: 'spring' }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={focusedField || 'default'}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {focusedField === 'name' && <User size={36} />}
                    {focusedField === 'email' && <AtSign size={36} />}
                    {focusedField === 'subject' && <Type size={36} />}
                    {focusedField === 'message' && <FileText size={36} />}
                    {!focusedField && <Sparkles size={36} />}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
              <div>
                <motion.h3
                  key={getActiveTitle()}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="dynamic-title"
                >
                  {getActiveTitle()}
                </motion.h3>
                <p>I'll get back to you within 24 hours</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="premium-form">
              <div className="form-row">
                <div className={`form-group floating ${focusedField === 'name' ? 'field-focused' : ''}`}>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => handleFocus('name')}
                    onBlur={handleBlur}
                    className={`form-input ${formData.name ? 'has-value' : ''}`}
                    placeholder=" "
                    required
                  />
                  <label htmlFor="name" className="floating-label">Full Name</label>
                  <div className="input-focus-line"></div>
                </div>
                
                <div className={`form-group floating ${focusedField === 'email' ? 'field-focused' : ''}`}>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => handleFocus('email')}
                    onBlur={handleBlur}
                    className={`form-input ${formData.email ? 'has-value' : ''}`}
                    placeholder=" "
                    required
                  />
                  <label htmlFor="email" className="floating-label">Email Address</label>
                  <div className="input-focus-line"></div>
                </div>
              </div>

              <div className={`form-group floating ${focusedField === 'subject' ? 'field-focused' : ''}`}>
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onFocus={() => handleFocus('subject')}
                  onBlur={handleBlur}
                  className={`form-input ${formData.subject ? 'has-value' : ''}`}
                  placeholder=" "
                  required
                />
                <label htmlFor="subject" className="floating-label">Subject</label>
                <div className="input-focus-line"></div>
              </div>

              <div className={`form-group floating ${focusedField === 'message' ? 'field-focused' : ''}`}>
                <textarea
                  name="message"
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => handleFocus('message')}
                  onBlur={handleBlur}
                  className={`form-textarea ${formData.message ? 'has-value' : ''}`}
                  placeholder=" "
                  required
                ></textarea>
                <label htmlFor="message" className="floating-label">How can I help you?</label>
                <div className="input-focus-line"></div>
              </div>

              <AnimatePresence>
                {status.message && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0, scale: 0.95 }}
                    animate={{ opacity: 1, height: 'auto', scale: 1 }}
                    exit={{ opacity: 0, height: 0, scale: 0.95 }}
                    className={`status-alert alert-${status.type}`}
                  >
                    <div className="alert-icon">
                      {status.type === 'success' ? <Check size={18} /> : <span>!</span>}
                    </div>
                    {status.message}
                  </motion.div>
                )}
              </AnimatePresence>

              <button 
                type="submit" 
                className={`submit-btn ${loading ? 'loading' : ''}`} 
                disabled={loading}
              >
                <span className="btn-content">
                  {loading ? (
                    <>
                      <Loader2 className="btn-spinner-icon" size={20} />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={20} />
                    </>
                  )}
                </span>
                <div className="btn-hover-effect"></div>
              </button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;
