import Link from 'next/link';
import styles from './PopularSites.module.css';

const sites = [
    { name: 'Google', domain: 'google.com', icon: '🔍' },
    { name: 'YouTube', domain: 'youtube.com', icon: '▶️' },
    { name: 'Twitter / X', domain: 'x.com', icon: '🐦' },
    { name: 'Facebook', domain: 'facebook.com', icon: '📘' },
    { name: 'Instagram', domain: 'instagram.com', icon: '📷' },
    { name: 'Reddit', domain: 'reddit.com', icon: '🤖' },
    { name: 'GitHub', domain: 'github.com', icon: '🐙' },
    { name: 'Amazon', domain: 'amazon.com', icon: '📦' },
    { name: 'Netflix', domain: 'netflix.com', icon: '🎬' },
    { name: 'Discord', domain: 'discord.com', icon: '💬' },
    { name: 'WhatsApp', domain: 'web.whatsapp.com', icon: '💚' },
    { name: 'LinkedIn', domain: 'linkedin.com', icon: '💼' },
];

export default function PopularSites() {
    return (
        <section className={styles.section} id="popular">
            <div className={styles.container}>
                <h2 className={styles.heading}>Popular Sites</h2>
                <p className={styles.subheading}>Quick-check the most visited websites</p>
                <div className={styles.grid}>
                    {sites.map((site, i) => (
                        <Link
                            key={site.domain}
                            href={`/check/${encodeURIComponent(site.domain)}`}
                            className={styles.card}
                            style={{ animationDelay: `${i * 0.05}s` }}
                        >
                            <span className={styles.siteIcon}>{site.icon}</span>
                            <span className={styles.siteName}>{site.name}</span>
                            <span className={styles.siteDomain}>{site.domain}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
