import { useState, useEffect } from 'react';
import { contactAPI } from '../../../services/api';

const MessagesManager = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await contactAPI.getAll();
      setMessages(response.data.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch messages');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await contactAPI.markAsRead(id);
      // Update local state to reflect change
      setMessages(messages.map(msg => 
        msg._id === id ? { ...msg, read: true } : msg
      ));
    } catch (err) {
      console.error('Failed to mark message as read', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await contactAPI.delete(id);
        setMessages(messages.filter(msg => msg._id !== id));
      } catch (err) {
        console.error('Failed to delete message', err);
        setError('Failed to delete message');
      }
    }
  };

  if (loading && !messages.length) return <div className="spinner"></div>;

  return (
    <div className="dashboard-page">
      <h1 className="text-gradient mb-4">Messages</h1>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="messages-list">
        {messages.length === 0 ? (
          <p>No messages found.</p>
        ) : (
          messages.map(msg => (
            <div 
              key={msg._id} 
              className={`card mb-3 message-card ${!msg.read ? 'unread' : ''}`}
              style={{ borderLeft: !msg.read ? '4px solid var(--primary)' : '1px solid var(--border)' }}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-bold">{msg.name}</h3>
                  <p className="text-sm text-secondary">{msg.email}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-secondary block">
                    {new Date(msg.createdAt).toLocaleString()}
                  </span>
                  {!msg.read && (
                    <span className="badge badge-primary mt-1 inline-block">New</span>
                  )}
                </div>
              </div>
              
              <h4 className="font-medium mb-1 mt-2">{msg.subject}</h4>
              <p className="text-secondary bg-darker p-3 rounded mb-3">{msg.message}</p>

              <div className="flex gap-2 justify-end">
                {!msg.read && (
                  <button 
                    className="btn btn-sm btn-secondary"
                    onClick={() => handleMarkAsRead(msg._id)}
                  >
                    <i className="fas fa-check"></i> Mark as Read
                  </button>
                )}
                <a 
                  href={`mailto:${msg.email}`} 
                  className="btn btn-sm btn-primary"
                >
                  <i className="fas fa-reply"></i> Reply
                </a>
                <button 
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(msg._id)}
                >
                  <i className="fas fa-trash"></i> Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MessagesManager;
