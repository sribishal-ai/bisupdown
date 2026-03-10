import styles from './Features.module.css';

const features = [
    {
        icon: '🚀',
        title: 'Real-Time Detection',
        description:
            'Instant server-side checks with millisecond-precision response time tracking. Know in seconds if a site is truly down.',
    },
    {
        icon: '🗳️',
        title: 'Community Voting',
        description:
            'Crowdsourced status reports from real users worldwide. See if others are experiencing the same outage.',
    },
    {
        icon: '⚡',
        title: 'Lightning Fast',
        description:
            'Enterprise-grade infrastructure with optimized checks. Results delivered in under a second, no signup required.',
    },
];

export default function Features() {
    return (
        <section className={styles.section} id="features">
            <div className={styles.container}>
                <h2 className={styles.heading}>How It Works</h2>
                <p className={styles.subheading}>
                    Three simple steps to know if a website is down
                </p>
                <div className={styles.grid}>
                    {features.map((feature, i) => (
                        <article
                            key={i}
                            className={styles.card}
                            style={{ animationDelay: `${i * 0.15}s` }}
                        >
                            <div className={styles.iconWrapper}>
                                <span className={styles.icon}>{feature.icon}</span>
                            </div>
                            <h3 className={styles.cardTitle}>{feature.title}</h3>
                            <p className={styles.cardDesc}>{feature.description}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
