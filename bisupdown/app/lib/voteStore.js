// Shared in-memory vote store
// For production, replace with Redis / database
const voteStore = new Map();

function normalizeKey(url) {
    return url.toLowerCase().replace(/^https?:\/\//, '').replace(/\/+$/, '');
}

export function getVotes(url) {
    const key = normalizeKey(url);
    return voteStore.get(key) || { up: 0, down: 0 };
}

export function setVotes(url, votes) {
    const key = normalizeKey(url);
    voteStore.set(key, { ...votes });
}
