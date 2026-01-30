import { useState, useEffect } from 'react';
import { profileAPI } from '../../../services/api';

const ProfileManager = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    email: '',
    bio: '',
    social: {
      github: '',
      linkedin: '',
      twitter: '',
      facebook: ''
    }
  });

  const [avatarFile, setAvatarFile] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await profileAPI.get();
      const data = response.data.data;
      
      setFormData({
        name: data.name || '',
        title: data.title || '',
        email: data.email || '',
        bio: data.bio || '',
        social: {
          github: data.social?.github || '',
          linkedin: data.social?.linkedin || '',
          twitter: data.social?.twitter || '',
          facebook: data.social?.facebook || ''
        }
      });
      
      if (data.avatar) {
        setAvatarPreview(`http://localhost:5000${data.avatar}`);
      }
    } catch (err) {
      setError('Failed to load profile');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('social.')) {
      const socialKey = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        social: {
          ...prev.social,
          [socialKey]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      if (name === 'avatar') {
        setAvatarFile(files[0]);
        setAvatarPreview(URL.createObjectURL(files[0]));
      } else if (name === 'resume') {
        setResumeFile(files[0]);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    setError('');

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('title', formData.title);
      data.append('email', formData.email);
      data.append('bio', formData.bio);
      data.append('social', JSON.stringify(formData.social));

      if (avatarFile) {
        data.append('avatar', avatarFile);
      }
      if (resumeFile) {
        data.append('resume', resumeFile);
      }

      const response = await profileAPI.update(data);
      setMessage(response.data.message);
      
      // Update preview with returned data if successful (optional, mostly for consistency)
      const updatedProfile = response.data.data;
      if (updatedProfile.avatar) {
        setAvatarPreview(`http://localhost:5000${updatedProfile.avatar}`);
      }

    } catch (err) {
      setError('Failed to update profile');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="spinner"></div>;

  return (
    <div className="dashboard-page">
      <h1 className="text-gradient mb-4">Edit Profile</h1>

      {message && <div className="alert alert-success mb-3">{message}</div>}
      {error && <div className="alert alert-error mb-3">{error}</div>}

      <form onSubmit={handleSubmit} className="profile-form">
        <div className="grid-2">
          {/* Left Column: Personal Info */}
          <div className="card">
            <h3 className="mb-3">Personal Information</h3>
            
            <div className="form-group mb-3 text-center">
              <div 
                className="avatar-preview mb-2"
                style={{ 
                  width: '120px', 
                  height: '120px', 
                  borderRadius: '50%', 
                  overflow: 'hidden', 
                  margin: '0 auto',
                  background: 'var(--bg-darker)',
                  border: '2px solid var(--primary)'
                }}
              >
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Avatar Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div className="flex items-center justify-center h-full text-secondary">
                    <i className="fas fa-user fa-3x"></i>
                  </div>
                )}
              </div>
              <label className="btn btn-sm btn-secondary cursor-pointer">
                Change Avatar
                <input 
                  type="file" 
                  name="avatar" 
                  onChange={handleFileChange} 
                  accept="image/*"
                  hidden 
                />
              </label>
            </div>

            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Professional Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g. Full Stack Developer"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email (Public)</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="form-textarea"
                rows="4"
              ></textarea>
            </div>
            
             <div className="form-group">
              <label className="form-label">Resume / CV (PDF)</label>
              <input 
                type="file" 
                name="resume" 
                onChange={handleFileChange} 
                accept=".pdf,.doc,.docx"
                className="form-input"
              />
              <small className="text-secondary">Upload a new file to replace the existing one.</small>
            </div>
          </div>

          {/* Right Column: Social Links */}
          <div className="card h-fit">
            <h3 className="mb-3">Social Media Links</h3>
            
            <div className="form-group">
              <label className="form-label">
                <i className="fab fa-github mr-2"></i> GitHub
              </label>
              <input
                type="url"
                name="social.github"
                value={formData.social.github}
                onChange={handleChange}
                className="form-input"
                placeholder="https://github.com/username"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <i className="fab fa-linkedin mr-2"></i> LinkedIn
              </label>
              <input
                type="url"
                name="social.linkedin"
                value={formData.social.linkedin}
                onChange={handleChange}
                className="form-input"
                placeholder="https://linkedin.com/in/username"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <i className="fab fa-twitter mr-2"></i> Twitter / X
              </label>
              <input
                type="url"
                name="social.twitter"
                value={formData.social.twitter}
                onChange={handleChange}
                className="form-input"
                placeholder="https://twitter.com/username"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <i className="fab fa-facebook mr-2"></i> Facebook
              </label>
              <input
                type="url"
                name="social.facebook"
                value={formData.social.facebook}
                onChange={handleChange}
                className="form-input"
                placeholder="https://facebook.com/username"
              />
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button 
            type="submit" 
            className="btn btn-primary btn-lg"
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileManager;
