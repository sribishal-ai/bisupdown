'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './UrlForm.module.css';

function normalizeUrl(input) {
    let url = input.trim().toLowerCase();
    // Remove protocol if present to normalize
    url = url.replace(/^(https?:\/\/)/, '');
    // Remove trailing slash
    url = url.replace(/\/+$/, '');
    return url;
}

function isValidDomain(input) {
    const domainRegex = /^([a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}(\/.*)?$/;
    return domainRegex.test(input);
}

export default function UrlForm({ compact = false }) {
    const [url, setUrl] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        const normalized = normalizeUrl(url);
        if (!normalized) {
            setError('Please enter a website URL');
            return;
        }

        if (!isValidDomain(normalized)) {
            setError('Please enter a valid domain (e.g., google.com)');
            return;
        }

        setLoading(true);
        router.push(`/check/${encodeURIComponent(normalized)}`);
    };

    return (
        <form
            className={`${styles.form} ${compact ? styles.compact : ''}`}
            onSubmit={handleSubmit}
            id="url-check-form"
        >
            <div className={styles.inputWrapper}>
                <span className={styles.inputIcon}>🌐</span>
                <input
                    type="text"
                    className={styles.input}
                    placeholder="Enter a website URL (e.g., google.com)"
                    value={url}
                    onChange={(e) => {
                        setUrl(e.target.value);
                        if (error) setError('');
                    }}
                    aria-label="Website URL to check"
                    id="url-input"
                    autoComplete="url"
                    spellCheck={false}
                />
                <button
                    type="submit"
                    className={styles.button}
                    disabled={loading}
                    id="check-button"
                >
                    {loading ? (
                        <span className={styles.spinner} />
                    ) : (
                        <>
                            <span className={styles.btnIcon}>🔍</span>
                            <span>Check</span>
                        </>
                    )}
                </button>
            </div>
            {error && (
                <p className={styles.error} role="alert" id="url-error">
                    {error}
                </p>
            )}
        </form>
    );
}
