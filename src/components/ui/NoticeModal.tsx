import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import styles from './NoticeModal.module.css';

interface Notice {
  id: string;
  text: string;
  media_url: string; 
  media_type: 'image' | 'video' | 'none';
  is_active: boolean;
}

const NoticeModal: React.FC = () => {
  const [notice, setNotice] = useState<Notice | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if dismissed in this session
    const isDismissed = sessionStorage.getItem('notice_dismissed');
    if (isDismissed === 'true') return;

    const fetchNotice = async () => {
      try {
        const { data, error } = await supabase
          .from('notices')
          .select('*')
          .eq('is_active', true)
          .limit(1)
          .single();

        if (error) {
          if (error.code !== 'PGRST116') console.error("Error fetching notice:", error);
          return;
        }

        if (data && (data.text || data.media_url)) {
          setNotice(data as unknown as Notice);
          // Small delay before showing modal
          const timer = setTimeout(() => setIsVisible(true), 2000);
          return () => clearTimeout(timer);
        }
      } catch (e) {
        console.error("Failed to fetch notice", e);
      }
    };

    fetchNotice();
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
              
              {notice.media_type === 'image' && notice.media_url && (
                <div className={styles.mediaContainer}>
                  <img src={notice.media_url} alt="Notice Media" className={styles.mediaItem} />
                </div>
              )}
              
              {notice.media_type === 'video' && notice.media_url && (
                <div className={styles.mediaContainer}>
                  <video src={notice.media_url} controls autoPlay muted loop className={styles.mediaItem} />
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
