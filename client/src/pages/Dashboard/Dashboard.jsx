import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  const navItems = [
    { path: '/admin/dashboard', label: 'Overview', icon: 'fas fa-home' },
    { path: '/admin/dashboard/profile', label: 'Profile', icon: 'fas fa-user' },
    { path: '/admin/dashboard/projects', label: 'Projects', icon: 'fas fa-folder' },
    { path: '/admin/dashboard/skills', label: 'Skills', icon: 'fas fa-code' },
    { path: '/admin/dashboard/experience', label: 'Experience', icon: 'fas fa-briefcase' },
    { path: '/admin/dashboard/education', label: 'Education', icon: 'fas fa-graduation-cap' },
    { path: '/admin/dashboard/messages', label: 'Messages', icon: 'fas fa-envelope' },
  ];

  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <h2 className="text-gradient">Portfolio Admin</h2>
          <p className="sidebar-user">Welcome, {user?.username}</p>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              <i className={item.icon}></i>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <Link to="/" className="btn btn-secondary btn-sm">
            <i className="fas fa-eye"></i> View Portfolio
          </Link>
          <button onClick={handleLogout} className="btn btn-danger btn-sm">
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>
      </aside>

      <main className="dashboard-main">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
