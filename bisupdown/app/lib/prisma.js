import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis;

/**
 * Lazy-initialized Prisma client singleton.
 * Defers connection until first use, preventing build-time connection errors.
 */
function getPrismaClient() {
    if (!globalForPrisma._prisma) {
        globalForPrisma._prisma = new PrismaClient({
            log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
        });
    }
    return globalForPrisma._prisma;
}

const prisma = new Proxy({}, {
    get(_, prop) {
        return getPrismaClient()[prop];
    },
});

export default prisma;
