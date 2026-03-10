'use client';

import { useState, useEffect, useCallback } from 'react';
import styles from './VoteWidget.module.css';

export default function VoteWidget({ url }) {
    const [votes, setVotes] = useState({ up: 0, down: 0 });
    const [userVote, setUserVote] = useState(null); // 'up' | 'down' | null
    const [loading, setLoading] = useState(false);

    const storageKey = `bis-vote-${url}`;

    // Fetch current votes
    const fetchVotes = useCallback(async () => {
        try {
            const res = await fetch(`/api/votes?url=${encodeURIComponent(url)}`);
            if (res.ok) {
                const data = await res.json();
                setVotes({ up: data.up, down: data.down });
            }
        } catch {
            // Silent fail
        }
    }, [url]);

    useEffect(() => {
        fetchVotes();
        // Check localStorage for previous vote (UI hint only, DB is source of truth)
        try {
            const stored = localStorage.getItem(storageKey);
            if (stored) setUserVote(stored);
        } catch {
            // Ignore
        }
    }, [fetchVotes, storageKey]);

    const handleVote = async (vote) => {
        if (loading || userVote === vote) return;

        setLoading(true);
        try {
            const res = await fetch('/api/vote', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url, vote }),
            });

            if (res.ok) {
                const data = await res.json();
                setVotes({ up: data.up, down: data.down });
                setUserVote(vote);
                try {
                    localStorage.setItem(storageKey, vote);
                } catch {
                    // Ignore storage errors
                }
            }
        } catch {
            // Silent fail
        } finally {
            setLoading(false);
        }
    };

    const total = votes.up + votes.down;
    const upPercent = total > 0 ? Math.round((votes.up / total) * 100) : 50;

    return (
        <div className={styles.widget} id="vote-widget">
            <h3 className={styles.title}>Community Reports</h3>
            <p className={styles.subtitle}>What are others experiencing?</p>

            <div className={styles.buttons}>
                <button
                    className={`${styles.voteBtn} ${styles.upBtn} ${userVote === 'up' ? styles.active : ''}`}
                    onClick={() => handleVote('up')}
                    disabled={loading}
                    id="vote-up-btn"
                    aria-label="Vote site is up"
                >
                    <span className={styles.voteIcon}>👍</span>
                    <span className={styles.voteLabel}>It&apos;s Up</span>
                    <span className={styles.voteCount}>{votes.up}</span>
                </button>

                <button
                    className={`${styles.voteBtn} ${styles.downBtn} ${userVote === 'down' ? styles.active : ''}`}
                    onClick={() => handleVote('down')}
                    disabled={loading}
                    id="vote-down-btn"
                    aria-label="Vote site is down"
                >
                    <span className={styles.voteIcon}>👎</span>
                    <span className={styles.voteLabel}>It&apos;s Down</span>
                    <span className={styles.voteCount}>{votes.down}</span>
                </button>
            </div>

            {total > 0 && (
                <div className={styles.barContainer}>
                    <div className={styles.barLabels}>
                        <span className={styles.barLabelUp}>{upPercent}% say it&apos;s up</span>
                        <span className={styles.barLabelDown}>{100 - upPercent}% say it&apos;s down</span>
                    </div>
                    <div className={styles.bar}>
                        <div
                            className={styles.barFill}
                            style={{ width: `${upPercent}%` }}
                        />
                    </div>
                    <p className={styles.totalVotes}>{total} total {total === 1 ? 'vote' : 'votes'}</p>
                </div>
            )}

            {userVote && (
                <p className={styles.votedMsg}>
                    You voted: {userVote === 'up' ? '👍 It\'s Up' : '👎 It\'s Down'}
                </p>
            )}
        </div>
    );
}
