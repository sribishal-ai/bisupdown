import { NextResponse } from 'next/server';
import prisma from '../../lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url) {
        return NextResponse.json({ error: 'Missing "url" parameter' }, { status: 400 });
    }

    try {
        const domainName = url.toLowerCase().replace(/^https?:\/\//, '').replace(/\/+$/, '').split('/')[0];

        const domain = await prisma.domain.findUnique({
            where: { name: domainName },
        });

        if (!domain) {
            return NextResponse.json({ up: 0, down: 0, total: 0 });
        }

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
        console.error('Votes fetch error:', err.message);
        return NextResponse.json({ up: 0, down: 0, total: 0 });
    }
}
