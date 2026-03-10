'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './RecentChecks.module.css';

const STORAGE_KEY = 'bis-recent-checks';

export function addRecentCheck(url, isUp) {
    if (typeof window === 'undefined') return;
    try {
        const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        const filtered = stored.filter((item) => item.url !== url);
        filtered.unshift({ url, isUp, checkedAt: new Date().toISOString() });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered.slice(0, 10)));
    } catch {
        // Ignore storage errors
    }
}

export default function RecentChecks() {
    const [checks, setChecks] = useState([]);

    useEffect(() => {
        try {
            const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
            setChecks(stored);
        } catch {
            // Ignore
        }
    }, []);

    if (checks.length === 0) return null;

    return (
        <section className={styles.section} id="recent-checks">
            <div className={styles.container}>
                <h2 className={styles.heading}>Your Recent Checks</h2>
                <div className={styles.list}>
                    {checks.map((check, i) => (
                        <Link
                            key={`${check.url}-${i}`}
                            href={`/check/${encodeURIComponent(check.url)}`}
                            className={styles.item}
                        >
                            <span
                                className={`${styles.dot} ${check.isUp ? styles.dotUp : styles.dotDown}`}
                            />
                            <span className={styles.url}>{check.url}</span>
                            <span className={styles.time}>
                                {new Date(check.checkedAt).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
