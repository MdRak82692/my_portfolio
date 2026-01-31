import { useEffect, useState } from 'react';

import { useParams, Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import portfolioData from '../../data/portfolioData.json';
import './ProjectDetails.css';

const ProjectDetails = () => {
  const { id } = useParams();
  const [activeImage, setActiveImage] = useState(0);
  const project = portfolioData.projects.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const allImages = project ? [project.image, ...(project.images || [])].filter(img => img) : [];

  useEffect(() => {
    if (allImages.length <= 1) return;

    const timer = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % allImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(timer);
  }, [id, allImages.length]);

  if (!project) {
    return (
      <div className="project-details-page">
        <Navbar />
        <div className="container text-center py-5">
          <h2>Project not found</h2>
          <Link to="/projects" className="btn btn-primary mt-2">Back to Projects</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="project-details-page">
      <Navbar />
      <div className="container py-5">
        <Link to="/projects" className="back-link mb-3">
          <i className="fas fa-arrow-left"></i> Back to Projects
        </Link>
        
        <div className="project-details-grid">
          <div className="project-gallery">
            <div className="main-image-container card">
              <div className="scrolling-image-wrapper">
                <img 
                  key={activeImage}
                  src={allImages[activeImage]} 
                  alt={project.title} 
                  className="scrolling-image"
                />
              </div>
            </div>
            {allImages.length > 1 && (
              <div className="thumbnail-grid mt-2">
                {allImages.map((img, index) => (
                  <div 
                    key={index} 
                    className={`thumbnail card ${activeImage === index ? 'active' : ''}`}
                    onClick={() => setActiveImage(index)}
                  >
                    <img src={img.startsWith('http') ? img : img} alt={`${project.title} thumb ${index}`} />

                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="project-info fade-in">
            <h1 className="text-gradient mb-1">{project.title}</h1>
            
            <div className="tags-container mb-2">
              {project.technologies?.map((tech, i) => (
                <span key={i} className="tech-tag">{tech}</span>
              ))}
            </div>

            <div className="project-description card mb-3">
              <h3>About Project</h3>
              <p>{project.description}</p>
              {project.details && (
                <div className="mt-2">
                  <h3>Full Details</h3>
                  <div className="details-content">{project.details}</div>
                </div>
              )}
            </div>

            <div className="project-actions-container mt-4">
              <div className="project-actions flex flex-wrap gap-3">
                {project.playStoreUrl && (
                  <a href={project.playStoreUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary store-btn">
                    <i className="fab fa-google-play"></i> 
                    <span>Google Play</span>
                  </a>
                )}
                {project.appStoreUrl && (
                  <a href={project.appStoreUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary store-btn">
                    <i className="fab fa-apple"></i> 
                    <span>App Store</span>
                  </a>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
