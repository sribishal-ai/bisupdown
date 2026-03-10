import StatusResult from '../../components/StatusResult';
import VoteWidget from '../../components/VoteWidget';
import UrlForm from '../../components/UrlForm';
import CopyLinkButton from '../../components/CopyLinkButton';
import SaveCheck from './SaveCheck';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

async function checkWebsite(url) {
    let targetUrl = url;
    if (!/^https?:\/\//i.test(targetUrl)) {
        targetUrl = `https://${targetUrl}`;
    }

    const startTime = Date.now();

    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 10000);

        const response = await fetch(targetUrl, {
            method: 'HEAD',
            signal: controller.signal,
            redirect: 'follow',
            headers: {
                'User-Agent': 'BIS-Uptime-Checker/1.0 (Website Status Monitor)',
            },
        });

        clearTimeout(timeout);
        const responseTime = Date.now() - startTime;

        return {
            url,
            isUp: true,
            statusCode: response.status,
            responseTime,
            checkedAt: new Date().toISOString(),
        };
    } catch (headErr) {
        try {
            const controller2 = new AbortController();
            const timeout2 = setTimeout(() => controller2.abort(), 10000);

            const response2 = await fetch(targetUrl, {
                method: 'GET',
                signal: controller2.signal,
                redirect: 'follow',
                headers: {
                    'User-Agent': 'BIS-Uptime-Checker/1.0 (Website Status Monitor)',
                },
            });

            clearTimeout(timeout2);
            const responseTime = Date.now() - startTime;

            return {
                url,
                isUp: response2.status < 500,
                statusCode: response2.status,
                responseTime,
                checkedAt: new Date().toISOString(),
            };
        } catch {
            const responseTime = Date.now() - startTime;

            return {
                url,
                isUp: false,
                statusCode: null,
                responseTime,
                checkedAt: new Date().toISOString(),
            };
        }
    }
}

export async function generateMetadata({ params }) {
    const { url } = await params;
    const decodedUrl = decodeURIComponent(url);

    return {
        title: `Is ${decodedUrl} Down? — BIS Uptime Checker`,
        description: `Check if ${decodedUrl} is down for everyone or just you. Real-time status check with community voting.`,
        openGraph: {
            title: `Is ${decodedUrl} Down? — BIS Uptime Checker`,
            description: `Real-time status check for ${decodedUrl}. Find out if it's down for everyone.`,
            type: 'website',
        },
        twitter: {
            card: 'summary',
            title: `Is ${decodedUrl} Down?`,
            description: `Check if ${decodedUrl} is down for everyone or just you.`,
        },
        alternates: {
            canonical: `/check/${encodeURIComponent(decodedUrl)}`,
        },
    };
}

export default async function CheckPage({ params }) {
    const { url } = await params;
    const decodedUrl = decodeURIComponent(url);
    const result = await checkWebsite(decodedUrl);

    // JSON-LD structured data
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'BIS Uptime Checker',
        description: `Real-time status check for ${decodedUrl}`,
        url: `https://bisuptime.com/check/${encodeURIComponent(decodedUrl)}`,
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'Any',
    };

    return (
        <div className={styles.page}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className={styles.container}>
                <StatusResult data={result} />
                <VoteWidget url={decodedUrl} />

                <div className={styles.checkAnother}>
                    <h2 className={styles.checkAnotherTitle}>Check Another Website</h2>
                    <UrlForm compact />
                </div>

                <div className={styles.shareSection}>
                    <h3 className={styles.shareTitle}>Share this result</h3>
                    <div className={styles.shareLinks}>
                        <a
                            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                                `${decodedUrl} is ${result.isUp ? 'UP ✅' : 'DOWN 🔴'} — checked with BIS Uptime Checker`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.shareLink}
                        >
                            𝕏 Twitter
                        </a>
                        <CopyLinkButton className={styles.shareLink} />
                    </div>
                </div>
            </div>

            <SaveCheck url={decodedUrl} isUp={result.isUp} />
        </div>
    );
}
