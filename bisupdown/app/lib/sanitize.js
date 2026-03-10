// URL sanitization & validation utilities

/**
 * Sanitize user-provided URL input to prevent XSS and injection attacks.
 * Returns a clean, normalized domain string or null if invalid.
 */
export function sanitizeUrl(input) {
    if (!input || typeof input !== 'string') return null;

    // Strip any HTML/script tags
    let url = input.replace(/<[^>]*>/g, '').trim();

    // Remove protocol for normalization
    url = url.replace(/^(https?:\/\/)/i, '');

    // Remove trailing slashes
    url = url.replace(/\/+$/, '');

    // Only allow valid domain characters (letters, numbers, dots, hyphens, and optional path)
    if (!/^([a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}(\/[a-zA-Z0-9._~:/?#[\]@!$&'()*+,;=-]*)?$/.test(url)) {
        return null;
    }

    // Block private/local IPs and localhost
    const blocked = ['localhost', '127.0.0.1', '0.0.0.0', '::1'];
    const domain = url.split('/')[0].toLowerCase();
    if (blocked.includes(domain)) return null;

    // Block internal network ranges
    if (/^(10\.|172\.(1[6-9]|2[0-9]|3[01])\.|192\.168\.)/.test(domain)) return null;

    return url.toLowerCase();
}
