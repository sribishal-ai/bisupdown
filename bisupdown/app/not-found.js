'use client';

import styles from './not-found.module.css';
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <span className={styles.code}>404</span>
                <h1 className={styles.title}>Page Not Found</h1>
                <p className={styles.message}>
                    The page you&apos;re looking for doesn&apos;t exist or has been moved.
                </p>
                <Link href="/" className={styles.backBtn}>
                    ← Back to Home
                </Link>
            </div>
        </div>
    );
}
