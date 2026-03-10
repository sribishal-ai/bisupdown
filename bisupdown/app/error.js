'use client';

import Link from 'next/link';

export default function Error({ error, reset }) {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '60vh',
                padding: '2rem',
                animation: 'fadeIn 0.5s ease',
            }}
        >
            <div style={{ textAlign: 'center', maxWidth: 480 }}>
                <span
                    style={{
                        fontSize: '3rem',
                        display: 'block',
                        marginBottom: '1rem',
                    }}
                >
                    ⚠️
                </span>
                <h1
                    style={{
                        fontSize: '1.5rem',
                        marginBottom: '0.75rem',
                        color: 'var(--text-primary)',
                    }}
                >
                    Something went wrong
                </h1>
                <p
                    style={{
                        color: 'var(--text-muted)',
                        marginBottom: '1.5rem',
                        fontSize: '0.95rem',
                        lineHeight: 1.6,
                    }}
                >
                    {error?.message || 'An unexpected error occurred while processing your request.'}
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button
                        onClick={reset}
                        style={{
                            padding: '10px 24px',
                            background: 'linear-gradient(135deg, var(--accent-primary), #7c3aed)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '9999px',
                            fontWeight: 600,
                            fontSize: '0.9rem',
                            cursor: 'pointer',
                        }}
                    >
                        Try Again
                    </button>
                    <Link
                        href="/"
                        style={{
                            padding: '10px 24px',
                            background: 'var(--bg-card)',
                            color: 'var(--text-secondary)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '9999px',
                            fontWeight: 600,
                            fontSize: '0.9rem',
                            textDecoration: 'none',
                        }}
                    >
                        Go Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
