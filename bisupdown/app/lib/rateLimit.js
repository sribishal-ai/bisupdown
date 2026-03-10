// Simple in-memory rate limiter
const requestCounts = new Map();
const WINDOW_MS = 60_000; // 1 minute
const MAX_REQUESTS = 60;

export function rateLimit(identifier) {
    const now = Date.now();
    const entry = requestCounts.get(identifier);

    if (!entry || now - entry.windowStart > WINDOW_MS) {
        requestCounts.set(identifier, { windowStart: now, count: 1 });
        return { allowed: true, remaining: MAX_REQUESTS - 1 };
    }

    if (entry.count >= MAX_REQUESTS) {
        return {
            allowed: false,
            remaining: 0,
            retryAfter: Math.ceil((entry.windowStart + WINDOW_MS - now) / 1000),
        };
    }

    entry.count++;
    return { allowed: true, remaining: MAX_REQUESTS - entry.count };
}

// Cleanup stale entries every 5 minutes
setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of requestCounts) {
        if (now - entry.windowStart > WINDOW_MS * 2) {
            requestCounts.delete(key);
        }
    }
}, 300_000);
