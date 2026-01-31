import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FolderOpen, 
  Code2, 
  Briefcase, 
  Send,
  ArrowRight,
  Target,
  Trophy,
  Users
} from 'lucide-react';
import Navbar from '../../components/Navbar/Navbar';
import Hero from '../../components/Hero/Hero';
import portfolioData from '../../data/portfolioData.json';
import './Home.css';

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: 'spring', damping: 20, stiffness: 100 }
    }
  };

  const journeyCards = [
    {
      title: 'Featured Work',
      description: 'Explore my latest Flutter and web projects',
      path: '/projects',
      icon: <FolderOpen size={32} />,
      color: 'primary',
      btnText: 'View Projects'
    },
    {
      title: 'My Skills',
      description: 'Technical expertise and toolset breakdown',
      path: '/skills',
      icon: <Code2 size={32} />,
      color: 'secondary',
      btnText: 'See Expertise'
    },
    {
      title: 'Career History',
      description: 'Professional timeline and key milestones',
      path: '/experience',
      icon: <Briefcase size={32} />,
      color: 'accent',
      btnText: 'Experience'
    },
    {
      title: 'Hire Me',
      description: 'Available for freelance and full-time roles',
      path: '/contact',
      icon: <Send size={32} />,
      color: 'success',
      btnText: 'Get In Touch',
      highlight: true
    }
  ];

  const getStatIcon = (label) => {
    switch (label) {
      case 'Experience': return <Briefcase size={20} />;
      case 'Projects Done': return <Trophy size={20} />;
      case 'Happy Clients': return <Users size={20} />;
      case 'Success Rate': return <Target size={20} />;
      default: return <Trophy size={20} />;
    }
  };

  const stats = portfolioData.profile.stats || [];

  return (
    <div className="home-page">
      <Navbar />
      <Hero />


      {/* Journey Section */}
      <section className="professional-journey section-spacing">
        <div className="container">
          <motion.header 
            className="section-header text-center mb-5"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="section-badge">EXPLORE MY WORLD</span>
            <h2 className="text-gradient display-title">Professional Journey</h2>
            <p className="subtitle">Discover how I transform ideas into high-performance digital experiences</p>
          </motion.header>
          
          <motion.div 
            className="journey-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {journeyCards.map((card, index) => (
              <motion.div key={index} variants={cardVariants}>
                <Link to={card.path} className={`journey-card-modern ${card.highlight ? 'highlight' : ''}`}>
                  <div className={`card-icon-modern ${card.color}`}>
                    {card.icon}
                  </div>
                  <div className="card-content-modern">
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                    <span className="card-link-modern">
                      {card.btnText}
                      <ArrowRight size={18} />
                    </span>
                  </div>
                  <div className="card-hover-bg"></div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <footer className="footer-modern">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <span className="text-gradient">Portfolio.</span>
            </div>
            <p>&copy; {new Date().getFullYear()} Designed & Built with ❤️ by Md Rakib</p>
            <div className="footer-links">
               <Link to="/">Home</Link>
               <Link to="/projects">Work</Link>
               <Link to="/contact">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
