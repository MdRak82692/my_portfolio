import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { profileAPI } from '../../services/api';
import './Hero.css';

const Hero = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await profileAPI.get();
      setProfile(response.data.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  if (!profile) return null;

  return (
    <section id="home" className="hero">
      <div className="hero-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      <div className="container">
        <div className="hero-content">
          <div className="hero-text fade-in">
            <p className="hero-greeting">Hello, I'm</p>
            <h1 className="hero-name">{profile.name}</h1>
            <h2 className="hero-title">{profile.title}</h2>
            <p className="hero-bio">{profile.bio}</p>

            <div className="hero-actions">
              <Link to="/contact" className="btn btn-primary btn-lg">
                Get In Touch
              </Link>
              {profile.resume && (
                <a 
                  href={`http://localhost:5000${profile.resume}`} 
                  className="btn btn-secondary btn-lg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download Resume
                </a>
              )}
            </div>

            <div className="hero-social">
              {profile.social?.github && (
                <a href={profile.social.github} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-github"></i>
                </a>
              )}
              {profile.social?.linkedin && (
                <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin"></i>
                </a>
              )}
              {profile.social?.twitter && (
                <a href={profile.social.twitter} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-twitter"></i>
                </a>
              )}
              {profile.social?.facebook && (
                <a href={profile.social.facebook} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-facebook"></i>
                </a>
              )}
            </div>
          </div>

          {profile.avatar && (
            <div className="hero-image fade-in">
              <div className="image-wrapper">
                <img src={`http://localhost:5000${profile.avatar}`} alt={profile.name} />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="scroll-indicator">
        <div className="mouse">
          <div className="wheel"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
