import { createHash } from 'crypto';

/**
 * Hash an IP address for privacy-safe storage
 */
export function hashIp(ip) {
    return createHash('sha256').update(ip || 'anonymous').digest('hex').slice(0, 16);
}
