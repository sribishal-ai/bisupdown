import styles from './loading.module.css';

export default function Loading() {
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.spinner} />
                <div className={styles.skeletonBadge} />
                <div className={styles.skeletonTitle} />
                <div className={styles.skeletonText} />
                <div className={styles.skeletonText2} />
                <div className={styles.skeletonDetails}>
                    <div className={styles.skeletonDetail} />
                    <div className={styles.skeletonDetail} />
                    <div className={styles.skeletonDetail} />
                </div>
            </div>
        </div>
    );
}
