import { Link } from 'react-router-dom';
import './DashboardHome.css';

const DashboardHome = () => {
  return (
    <div className="dashboard-home">
      <div className="welcome-section card">
        <h1>Welcome to Your Portfolio Dashboard</h1>
        <p>Manage your portfolio content from here</p>
      </div>

      <div className="quick-links grid grid-3">
        <Link to="/admin/dashboard/profile" className="quick-link-card card">
          <i className="fas fa-user"></i>
          <h3>Profile</h3>
          <p>Update your personal information</p>
        </Link>

        <Link to="/admin/dashboard/projects" className="quick-link-card card">
          <i className="fas fa-folder"></i>
          <h3>Projects</h3>
          <p>Manage your portfolio projects</p>
        </Link>

        <Link to="/admin/dashboard/skills" className="quick-link-card card">
          <i className="fas fa-code"></i>
          <h3>Skills</h3>
          <p>Add and update your skills</p>
        </Link>

        <Link to="/admin/dashboard/experience" className="quick-link-card card">
          <i className="fas fa-briefcase"></i>
          <h3>Experience</h3>
          <p>Manage work experience</p>
        </Link>

        <Link to="/admin/dashboard/messages" className="quick-link-card card">
          <i className="fas fa-envelope"></i>
          <h3>Messages</h3>
          <p>View contact messages</p>
        </Link>

        <Link to="/" className="quick-link-card card">
          <i className="fas fa-eye"></i>
          <h3>View Portfolio</h3>
          <p>See your live portfolio</p>
        </Link>
      </div>
    </div>
  );
};

export default DashboardHome;
