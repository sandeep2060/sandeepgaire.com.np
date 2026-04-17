import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, ThumbsUp, MessageSquare, LayoutDashboard, FileText, Settings, LogOut, Code, Bell, Sun, Moon, Eye, ThumbsDown, Edit, Trash2, X } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { getAllStats } from '../lib/statsManager';
import { projectsData, blogPosts } from '../data/mockData';
import styles from './AdminDashboard.module.css';

interface AdminDashboardProps {
  theme?: 'light' | 'dark';
  toggleTheme?: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ theme, toggleTheme }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Notice State
  const [noticeText, setNoticeText] = useState('');
  const [noticeMediaUrl, setNoticeMediaUrl] = useState('');
  const [noticeMediaType, setNoticeMediaType] = useState<'none' | 'image' | 'video'>('none');
  const [noticeIsActive, setNoticeIsActive] = useState(false);
  const [noticeSaved, setNoticeSaved] = useState(false);

  // Projects & Blogs State
  const [projects, setProjects] = useState(projectsData);
  const [blogs, setBlogs] = useState(blogPosts);
  
  // Edit State
  const [editingItem, setEditingItem] = useState<any>(null);
  const [editType, setEditType] = useState<'project' | 'blog' | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated !== 'true') {
      navigate('/login');
    }
    
    // Load existing notice
    const storedNotice = localStorage.getItem('site_notice');
    if (storedNotice) {
      try {
        const parsed = JSON.parse(storedNotice);
        setNoticeText(parsed.text || '');
        setNoticeMediaUrl(parsed.mediaUrl || '');
        setNoticeMediaType(parsed.mediaType || 'none');
        setNoticeIsActive(parsed.isActive || false);
      } catch (e) {}
    }
  }, [navigate]);

  const handleSaveNotice = (e: React.FormEvent) => {
    e.preventDefault();
    const notice = {
      id: Date.now().toString(),
      text: noticeText,
      mediaUrl: noticeMediaUrl,
      mediaType: noticeMediaType,
      isActive: noticeIsActive
    };
    localStorage.setItem('site_notice', JSON.stringify(notice));
    setNoticeSaved(true);
    setTimeout(() => setNoticeSaved(false), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  const handleDelete = (id: number, type: 'projects' | 'blogs') => {
    if (window.confirm(`Are you sure you want to delete this ${type === 'projects' ? 'project' : 'blog post'}?`)) {
      if (type === 'projects') {
        setProjects(projects.filter(p => p.id !== id));
      } else {
        setBlogs(blogs.filter(b => b.id !== id));
      }
    }
  };

  const openEditModal = (item: any, type: 'project' | 'blog') => {
    setEditingItem({ ...item });
    setEditType(type);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editType === 'project') {
      setProjects(projects.map(p => p.id === editingItem.id ? editingItem : p));
    } else {
      setBlogs(blogs.map(b => b.id === editingItem.id ? editingItem : b));
    }
    setIsEditModalOpen(false);
    setEditingItem(null);
  };

  const handleEditChange = (field: string, value: any) => {
    setEditingItem((prev: any) => ({ ...prev, [field]: value }));
  };

  const navItems = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={20} /> },
    { id: 'projects', label: 'Projects', icon: <Code size={20} /> },
    { id: 'blogs', label: 'Blogs', icon: <FileText size={20} /> },
    { id: 'messages', label: 'Messages', icon: <MessageSquare size={20} /> },
    { id: 'notices', label: 'Notices', icon: <Bell size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className={styles.adminContainer}>
      {/* Sidebar */}
      <div className={`${styles.sidebar} glass`}>
        <div className={styles.sidebarHeader}>
          <h2 className="text-gradient">Admin Panel</h2>
        </div>
        
        <nav className={styles.sidebarNav}>
          {navItems.map(item => (
            <button 
              key={item.id}
              className={`${styles.navBtn} ${activeTab === item.id ? styles.active : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        
        <div className={styles.sidebarFooter}>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            <LogOut size={20} className={styles.logoutIcon} />
            <span className={styles.logoutText}>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        <div className={styles.topbar}>
          <h3 className={styles.pageTitle}>
            {navItems.find(item => item.id === activeTab)?.label}
          </h3>
          <div className={styles.topbarActions}>
            {toggleTheme && (
              <button onClick={toggleTheme} className={styles.themeToggleBtn} aria-label="Toggle theme">
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            )}
            <div className={styles.userProfile}>
              <div className={styles.avatar}>SG</div>
              <span>Admin</span>
            </div>
          </div>
        </div>

        <div className={styles.contentArea}>
          {activeTab === 'overview' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={styles.dashboardGrid}
            >
              <Card className={styles.statCard}>
                <div className={styles.statIcon} style={{ color: '#0ea5e9', background: 'rgba(14, 165, 233, 0.1)' }}>
                  <Users size={24} />
                </div>
                <div className={styles.statInfo}>
                  <p>Total Visitors</p>
                  <h4>12,450</h4>
                </div>
              </Card>
              
              <Card className={styles.statCard}>
                <div className={styles.statIcon} style={{ color: '#db2777', background: 'rgba(219, 39, 119, 0.1)' }}>
                  <ThumbsUp size={24} />
                </div>
                <div className={styles.statInfo}>
                  <p>Total Likes</p>
                  <h4>3,820</h4>
                </div>
              </Card>
              
              <Card className={styles.statCard}>
                <div className={styles.statIcon} style={{ color: '#8b5cf6', background: 'rgba(139, 92, 246, 0.1)' }}>
                  <MessageSquare size={24} />
                </div>
                <div className={styles.statInfo}>
                  <p>Messages</p>
                  <h4>45</h4>
                </div>
              </Card>

              {/* Recent Messages Preview */}
              <Card className={styles.recentSection}>
                <h3>Recent Messages</h3>
                <div className={styles.emptyState}>
                  <p>Waiting for Supabase integration to load messages...</p>
                </div>
              </Card>
            </motion.div>
          )}

          {activeTab === 'notices' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className={styles.noticeAdminCard}>
                <h3 className={styles.sectionTitle}>Manage Global Notice</h3>
                <p className={styles.sectionDesc}>This notice will appear as a popup when visitors open your website.</p>
                
                <form onSubmit={handleSaveNotice} className={styles.noticeForm}>
                  <div className={styles.formGroup}>
                    <label>Notice Status</label>
                    <div className={styles.toggleWrapper}>
                      <input 
                        type="checkbox" 
                        id="noticeStatus"
                        checked={noticeIsActive}
                        onChange={(e) => setNoticeIsActive(e.target.checked)}
                        className={styles.toggleCheckbox}
                      />
                      <label htmlFor="noticeStatus" className={styles.toggleLabel}>
                        {noticeIsActive ? 'Active (Will show to users)' : 'Inactive (Hidden)'}
                      </label>
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="noticeText">Notice Text / Message</label>
                    <textarea 
                      id="noticeText"
                      value={noticeText}
                      onChange={(e) => setNoticeText(e.target.value)}
                      placeholder="Enter announcement here..."
                      rows={4}
                      className={styles.inputField}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Media Type (Optional)</label>
                    <select 
                      value={noticeMediaType}
                      onChange={(e) => setNoticeMediaType(e.target.value as any)}
                      className={styles.inputField}
                    >
                      <option value="none">No Media</option>
                      <option value="image">Image</option>
                      <option value="video">Video</option>
                    </select>
                  </div>

                  {noticeMediaType !== 'none' && (
                    <div className={styles.formGroup}>
                      <label htmlFor="mediaUrl">Media URL</label>
                      <input 
                        type="url"
                        id="mediaUrl"
                        value={noticeMediaUrl}
                        onChange={(e) => setNoticeMediaUrl(e.target.value)}
                        placeholder={`https://example.com/your-${noticeMediaType}.jpg`}
                        className={styles.inputField}
                      />
                    </div>
                  )}

                  <div className={styles.formActions}>
                    <Button type="submit" variant="primary">
                      Save Notice
                    </Button>
                    {noticeSaved && <span className={styles.successMsg}>Saved successfully!</span>}
                  </div>
                </form>
              </Card>
            </motion.div>
          )}

          {(activeTab === 'projects' || activeTab === 'blogs') && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={styles.tableContainer}
            >
              <Card className={styles.tableCard}>
                <h3 className={styles.sectionTitle}>
                  {activeTab === 'projects' ? 'Projects Statistics' : 'Blog Statistics'}
                </h3>
                <div className={styles.tableResponsive}>
                  <table className={styles.dataTable}>
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th><Eye size={16} /> Views</th>
                        <th><ThumbsUp size={16} /> Likes</th>
                         <th className={styles.dangerText}><ThumbsDown size={16} /> Dislikes</th>
                         <th>Actions</th>
                       </tr>
                     </thead>
                     <tbody>
                       {(activeTab === 'projects' ? projects : blogs).map(item => {
                         const allStats = getAllStats(activeTab);
                         const itemStats = allStats[item.id] || { likes: 0, dislikes: 0, views: 0 };
                         return (
                           <tr key={item.id}>
                             <td className={styles.itemTitle}>{item.title}</td>
                             <td>{itemStats.views}</td>
                             <td className={styles.successText}>{itemStats.likes}</td>
                             <td className={styles.dangerText}>{itemStats.dislikes}</td>
                             <td>
                               <div className={styles.actionButtons}>
                                 <button 
                                   className={styles.editBtn} 
                                   onClick={() => openEditModal(item, activeTab === 'projects' ? 'project' : 'blog')}
                                   title="Edit"
                                 >
                                   <Edit size={16} />
                                 </button>
                                 <button 
                                   className={styles.deleteBtn} 
                                   onClick={() => handleDelete(item.id, activeTab as 'projects' | 'blogs')}
                                   title="Delete"
                                 >
                                   <Trash2 size={16} />
                                 </button>
                               </div>
                             </td>
                           </tr>
                         );
                       })}
                     </tbody>
                  </table>
                </div>
              </Card>
            </motion.div>
          )}

          {activeTab !== 'overview' && activeTab !== 'notices' && activeTab !== 'projects' && activeTab !== 'blogs' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={styles.emptyStateWrapper}
            >
              <Card className={styles.emptyStateCard}>
                <h3 className="text-gradient">{navItems.find(item => item.id === activeTab)?.label} Management</h3>
                <p>This module will be fully functional once Supabase is connected.</p>
                <div className={styles.placeholderMockup}></div>
              </Card>
            </motion.div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className={styles.modalOverlay}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`${styles.modalContent} glass`}
          >
            <div className={styles.modalHeader}>
              <h3>Edit {editType === 'project' ? 'Project' : 'Blog Post'}</h3>
              <button className={styles.closeBtn} onClick={() => setIsEditModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className={styles.modalForm}>
              <div className={styles.formGroup}>
                <label>Title</label>
                <input 
                  type="text" 
                  value={editingItem.title} 
                  onChange={(e) => handleEditChange('title', e.target.value)}
                  className={styles.inputField}
                  required
                />
              </div>

              {editType === 'project' ? (
                <>
                  <div className={styles.formGroup}>
                    <label>Description</label>
                    <textarea 
                      value={editingItem.description} 
                      onChange={(e) => handleEditChange('description', e.target.value)}
                      className={styles.inputField}
                      rows={3}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Tags (comma separated)</label>
                    <input 
                      type="text" 
                      value={editingItem.tags.join(', ')} 
                      onChange={(e) => handleEditChange('tags', e.target.value.split(',').map((s: string) => s.trim()))}
                      className={styles.inputField}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.formGroup}>
                    <label>Excerpt</label>
                    <textarea 
                      value={editingItem.excerpt} 
                      onChange={(e) => handleEditChange('excerpt', e.target.value)}
                      className={styles.inputField}
                      rows={3}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Category</label>
                    <input 
                      type="text" 
                      value={editingItem.category} 
                      onChange={(e) => handleEditChange('category', e.target.value)}
                      className={styles.inputField}
                      required
                    />
                  </div>
                </>
              )}

              <div className={styles.formGroup}>
                <label>Image URL</label>
                <input 
                  type="text" 
                  value={editingItem.image} 
                  onChange={(e) => handleEditChange('image', e.target.value)}
                  className={styles.inputField}
                  required
                />
              </div>

              <div className={styles.modalActions}>
                <Button type="button" variant="secondary" onClick={() => setIsEditModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                  Save Changes
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
