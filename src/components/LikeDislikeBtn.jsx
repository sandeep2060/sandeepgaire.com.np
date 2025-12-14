import { useState, useEffect } from 'react';
import { getInteractions, getUserInteraction, toggleInteraction } from '../services/api';
import './LikeDislikeBtn.css';

const LikeDislikeBtn = ({ itemId, type = 'blog', hideDislikeCount = false }) => {
    const [counts, setCounts] = useState({ likes: 0, dislikes: 0 });
    const [userAction, setUserAction] = useState(null);

    useEffect(() => {
        const fetchInteractions = async () => {
            const c = await getInteractions(itemId);
            const ua = await getUserInteraction(itemId);
            setCounts(c);
            setUserAction(ua);
        };
        fetchInteractions();
    }, [itemId]);

    const handleAction = async (actionType) => {
        // Optimistic update
        const previousAction = userAction;
        let newCounts = { ...counts };

        // Remove previous
        if (previousAction === 'like') newCounts.likes--;
        if (previousAction === 'dislike') newCounts.dislikes--;

        // Toggle
        if (previousAction === actionType) {
            setUserAction(null);
        } else {
            setUserAction(actionType);
            if (actionType === 'like') newCounts.likes++;
            if (actionType === 'dislike') newCounts.dislikes++;
        }
        setCounts(newCounts);

        // API Call
        await toggleInteraction(itemId, type, actionType);
        // Could re-fetch true state here if needed
    };

    return (
        <div className="interaction-buttons">
            <button
                className={`interaction-btn like ${userAction === 'like' ? 'active' : ''}`}
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleAction('like');
                }}
                title="Like"
            >
                <span className="icon">👍</span>
                <span className="count">{counts.likes}</span>
            </button>

            <button
                className={`interaction-btn dislike ${userAction === 'dislike' ? 'active' : ''}`}
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleAction('dislike');
                }}
                title="Dislike"
            >
                <span className="icon">👎</span>
                {!hideDislikeCount && <span className="count">{counts.dislikes}</span>}
            </button>
        </div>
    );
};

export default LikeDislikeBtn;
