'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className={styles.header} id="site-header">
            <div className={styles.container}>
                <Link href="/" className={styles.logo} aria-label="BIS Uptime Checker Home">
                    <span className={styles.logoIcon}>⚡</span>
                    <span className={styles.logoText}>
                        <span className={styles.logoBold}>BIS</span> Uptime
                    </span>
                </Link>

                <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`} aria-label="Main navigation">
                    <Link href="/" className={styles.navLink} onClick={() => setMenuOpen(false)}>
                        Home
                    </Link>
                    <a href="#features" className={styles.navLink} onClick={() => setMenuOpen(false)}>
                        Features
                    </a>
                    <a href="#popular" className={styles.navLink} onClick={() => setMenuOpen(false)}>
                        Popular Sites
                    </a>
                </nav>

                <button
                    className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={menuOpen}
                    id="mobile-menu-toggle"
                >
                    <span />
                    <span />
                    <span />
                </button>
            </div>
        </header>
    );
}
