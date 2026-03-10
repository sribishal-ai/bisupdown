import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer} id="site-footer">
            <div className={styles.container}>
                <div className={styles.top}>
                    <div className={styles.brand}>
                        <Link href="/" className={styles.logo}>
                            <span className={styles.logoIcon}>⚡</span>
                            <span className={styles.logoText}>
                                <span className={styles.logoBold}>BIS</span> Uptime
                            </span>
                        </Link>
                        <p className={styles.tagline}>
                            Real-time website monitoring powered by community intelligence.
                        </p>
                    </div>

                    <div className={styles.links}>
                        <div className={styles.linkGroup}>
                            <h4 className={styles.linkTitle}>Product</h4>
                            <Link href="/">Website Checker</Link>
                            <a href="#features">Features</a>
                            <a href="#popular">Popular Sites</a>
                        </div>
                        <div className={styles.linkGroup}>
                            <h4 className={styles.linkTitle}>Resources</h4>
                            <a href="#how-it-works">How It Works</a>
                            <a href="#faq">FAQ</a>
                        </div>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p className={styles.copy}>
                        © {new Date().getFullYear()} BIS Uptime Checker. All rights reserved.
                    </p>
                    <p className={styles.builtWith}>
                        Built with precision & community spirit
                    </p>
                </div>
            </div>
        </footer>
    );
}
