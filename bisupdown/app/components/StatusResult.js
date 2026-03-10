import styles from './StatusResult.module.css';

export default function StatusResult({ data }) {
    const { url, isUp, statusCode, responseTime, checkedAt } = data;

    return (
        <div
            className={`${styles.wrapper} ${isUp ? styles.up : styles.down}`}
            id="status-result"
        >
            <div className={styles.statusBadge}>
                <span className={styles.statusIcon}>{isUp ? '✅' : '🔴'}</span>
                <span className={styles.statusText}>
                    {isUp ? 'Website is UP' : 'Website is DOWN'}
                </span>
            </div>

            <h1 className={styles.domain}>{url}</h1>

            <p className={styles.message}>
                {isUp
                    ? 'This website is reachable and responding normally. If you\'re having trouble accessing it, the issue might be on your end.'
                    : 'This website appears to be down and not responding. It\'s not just you — others likely can\'t reach it either.'}
            </p>

            <div className={styles.details}>
                <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Status Code</span>
                    <span className={styles.detailValue}>
                        {statusCode ? statusCode : 'N/A'}
                    </span>
                </div>
                <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Response Time</span>
                    <span className={styles.detailValue}>
                        {responseTime ? `${responseTime}ms` : 'N/A'}
                    </span>
                </div>
                <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Checked At</span>
                    <span className={styles.detailValue}>
                        {new Date(checkedAt).toLocaleString()}
                    </span>
                </div>
            </div>
        </div>
    );
}
