import UrlForm from './components/UrlForm';
import Features from './components/Features';
import PopularSites from './components/PopularSites';
import RecentChecks from './components/RecentChecks';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>
            <span className={styles.badgeDot} />
            Real-time Website Monitor
          </div>
          <h1 className={styles.heading}>
            Is This Website{' '}
            <span className={styles.gradientText}>Down</span> or{' '}
            <span className={styles.gradientText2}>Just You?</span>
          </h1>
          <p className={styles.subtitle}>
            Instantly check if any website is down for everyone or just you.
            Powered by real-time server checks and community reports.
          </p>
          <UrlForm />
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statNum}>10M+</span>
              <span className={styles.statLabel}>Checks Performed</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statNum}>500K+</span>
              <span className={styles.statLabel}>Community Votes</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statNum}>&lt;1s</span>
              <span className={styles.statLabel}>Avg Response</span>
            </div>
          </div>
        </div>
      </section>

      <Features />
      <PopularSites />
      <RecentChecks />
    </div>
  );
}
