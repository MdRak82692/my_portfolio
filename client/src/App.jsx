import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import ProjectsPage from './pages/Projects/ProjectsPage';
import ProjectDetails from './pages/ProjectDetails/ProjectDetails';
import SkillsPage from './pages/Skills/SkillsPage';
import ExperiencePage from './pages/Experience/ExperiencePage';
import EducationPage from './pages/Education/EducationPage';
import ContactPage from './pages/Contact/ContactPage';



import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/experience" element={<ExperiencePage />} />
        <Route path="/education" element={<EducationPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Router>
  );
}

export default App;
