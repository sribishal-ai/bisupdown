import { NextResponse } from 'next/server';
import prisma from '../../lib/prisma';
import { rateLimit } from '../../lib/rateLimit';
import { hashIp } from '../../lib/hash';

export const dynamic = 'force-dynamic';

export async function POST(request) {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const rl = rateLimit(`vote-${ip}`);
    if (!rl.allowed) {
        return NextResponse.json(
            { error: 'Too many votes. Please slow down.' },
            { status: 429, headers: { 'Retry-After': String(rl.retryAfter) } }
        );
    }

    try {
        const body = await request.json();
        const { url, vote } = body;

        if (!url || typeof url !== 'string') {
            return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
        }

        if (!['up', 'down'].includes(vote)) {
            return NextResponse.json({ error: 'Vote must be "up" or "down"' }, { status: 400 });
        }

        const domainName = url.toLowerCase().replace(/^https?:\/\//, '').replace(/\/+$/, '').split('/')[0];
        const ipHash = hashIp(ip);

        // Upsert domain
        const domain = await prisma.domain.upsert({
            where: { name: domainName },
            update: {},
            create: { name: domainName },
        });

        // Check if user already voted on this domain
        const existingVote = await prisma.vote.findFirst({
            where: { domainId: domain.id, ipHash },
            orderBy: { createdAt: 'desc' },
        });

        if (existingVote) {
            // Update existing vote
            await prisma.vote.update({
                where: { id: existingVote.id },
                data: { type: vote.toUpperCase() },
            });
        } else {
            // Create new vote
            await prisma.vote.create({
                data: {
                    domainId: domain.id,
                    type: vote.toUpperCase(),
                    ipHash,
                },
            });
        }

        // Get updated counts
        const [upCount, downCount] = await Promise.all([
            prisma.vote.count({ where: { domainId: domain.id, type: 'UP' } }),
            prisma.vote.count({ where: { domainId: domain.id, type: 'DOWN' } }),
        ]);

        return NextResponse.json({
            up: upCount,
            down: downCount,
            total: upCount + downCount,
        });
    } catch (err) {
        console.error('Vote error:', err.message);
        return NextResponse.json({ error: 'Failed to record vote' }, { status: 500 });
    }
}
