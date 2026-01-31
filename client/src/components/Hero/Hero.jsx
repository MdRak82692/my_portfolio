import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Facebook, 
  Download, 
  ArrowRight,
  ChevronRight,
  Layout,
  Code2,
  Briefcase,
  Rocket
} from 'lucide-react';
import portfolioData from '../../data/portfolioData.json';
import './Hero.css';

const Hero = () => {
  const profile = portfolioData.profile;

  if (!profile) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 50 }
    }
  };

  return (
    <section id="home" className="hero">
      <div className="hero-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
        <div className="grid-overlay"></div>
      </div>

      <div className="container">
        <div className="hero-content">
          <motion.div 
            className="hero-text"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="hero-badge">
              <span className="badge-icon"><Rocket size={16} /></span>
              Available for New Projects
            </motion.div>

            <motion.p variants={itemVariants} className="hero-greeting">
              Assalamu Alaikum! I'm
            </motion.p>
            
            <motion.h1 variants={itemVariants} className="hero-name">
              {profile.name}
            </motion.h1>
            
            <motion.div variants={itemVariants} className="hero-title-wrapper">
               <h2 className="hero-title text-gradient">{profile.title}</h2>
               <div className="title-underline"></div>
            </motion.div>

            <motion.p variants={itemVariants} className="hero-bio">
              {profile.bio}
            </motion.p>

            <motion.div variants={itemVariants} className="hero-actions">
              <Link to="/contact" className="btn-premium">
                <span className="btn-text">Let's Connect</span>
                <span className="btn-icon"><ArrowRight size={20} /></span>
              </Link>
              
              {profile.resume && (
                <a 
                  href={profile.resume} 
                  className="btn-glass"
                  download={profile.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download size={20} /> 
                  <span>Resume</span>
                </a>
              )}
            </motion.div>

            <motion.div variants={itemVariants} className="hero-social-modern">
              <span className="social-label">Follow Me</span>
              <div className="social-links-group">
                {profile.social?.github && (
                  <a href={profile.social.github} target="_blank" rel="noopener noreferrer" className="social-icon github">
                    <Github size={22} />
                    <span className="icon-bg"></span>
                  </a>
                )}
                {profile.social?.linkedin && (
                  <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon linkedin">
                    <Linkedin size={22} />
                    <span className="icon-bg"></span>
                  </a>
                )}
                {profile.social?.twitter && (
                  <a href={profile.social.twitter} target="_blank" rel="noopener noreferrer" className="social-icon twitter">
                    <Twitter size={22} />
                    <span className="icon-bg"></span>
                  </a>
                )}
                {profile.social?.facebook && (
                  <a href={profile.social.facebook} target="_blank" rel="noopener noreferrer" className="social-icon facebook">
                    <Facebook size={22} />
                    <span className="icon-bg"></span>
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            className="hero-image-modern"
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: 'spring' }}
          >
            <div className="image-container-premium">
               <div className="glow-effect"></div>
               <div className="border-gradient"></div>
               {profile.avatar && (
                 <img src={profile.avatar} alt={profile.name} className="profile-img-main" />
               )}
               {/* Decorative floating icons */}
               <motion.div 
                 className="floating-card flutter"
                 animate={{ y: [0, -15, 0] }}
                 transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
               >
                 <Code2 size={24} />
               </motion.div>
               <motion.div 
                 className="floating-card tech"
                 animate={{ y: [0, 15, 0] }}
                 transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
               >
                 <Layout size={24} />
               </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator removed to prevent overlap */}
    </section>
  );
};

export default Hero;
