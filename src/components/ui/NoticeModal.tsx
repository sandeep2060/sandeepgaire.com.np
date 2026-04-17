import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import styles from './NoticeModal.module.css';

interface Notice {
  id: string;
  text: string;
  mediaUrl: string; // can be image or video
  mediaType: 'image' | 'video' | 'none';
  isActive: boolean;
}

const NoticeModal: React.FC = () => {
  const [notice, setNotice] = useState<Notice | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if dismissed in this session
    const isDismissed = sessionStorage.getItem('notice_dismissed');
    if (isDismissed === 'true') return;

    // Load notice from localStorage (Mocked DB)
    const storedNoticeStr = localStorage.getItem('site_notice');
    if (storedNoticeStr) {
      try {
        const storedNotice = JSON.parse(storedNoticeStr) as Notice;
        if (storedNotice.isActive && (storedNotice.text || storedNotice.mediaUrl)) {
          setNotice(storedNotice);
          // Small delay before showing modal
          const timer = setTimeout(() => setIsVisible(true), 1500);
          return () => clearTimeout(timer);
        }
      } catch (e) {
        console.error("Failed to parse notice", e);
      }
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem('notice_dismissed', 'true');
  };

  if (!notice) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <div className={styles.modalOverlay}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`${styles.modalContainer} glass`}
          >
            <button className={styles.closeBtn} onClick={handleClose} aria-label="Close Notice">
              <X size={24} />
            </button>
            
            <div className={styles.modalContent}>
              <h3 className="text-gradient">Notice</h3>
              
              {notice.text && <p className={styles.noticeText}>{notice.text}</p>}
              
              {notice.mediaType === 'image' && notice.mediaUrl && (
                <div className={styles.mediaContainer}>
                  <img src={notice.mediaUrl} alt="Notice Media" className={styles.mediaItem} />
                </div>
              )}
              
              {notice.mediaType === 'video' && notice.mediaUrl && (
                <div className={styles.mediaContainer}>
                  <video src={notice.mediaUrl} controls autoPlay muted loop className={styles.mediaItem} />
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default NoticeModal;
