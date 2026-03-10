import { NextResponse } from 'next/server';
import prisma from '../../lib/prisma';
import { rateLimit } from '../../lib/rateLimit';
import { sanitizeUrl } from '../../lib/sanitize';

export const dynamic = 'force-dynamic';

export async function GET(request) {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const rl = rateLimit(ip);
    if (!rl.allowed) {
        return NextResponse.json(
            { error: 'Too many requests. Please slow down.' },
            { status: 429, headers: { 'Retry-After': String(rl.retryAfter) } }
        );
    }

    const { searchParams } = new URL(request.url);
    const rawUrl = searchParams.get('url');

    if (!rawUrl) {
        return NextResponse.json({ error: 'Missing "url" parameter' }, { status: 400 });
    }

    const cleanUrl = sanitizeUrl(rawUrl);
    if (!cleanUrl) {
        return NextResponse.json({ error: 'Invalid URL provided' }, { status: 400 });
    }

    const targetUrl = `https://${cleanUrl}`;
    const startTime = Date.now();
    let result;

    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 10000);

        const response = await fetch(targetUrl, {
            method: 'HEAD',
            signal: controller.signal,
            redirect: 'follow',
            headers: { 'User-Agent': 'BIS-Uptime-Checker/1.0 (Website Status Monitor)' },
        });

        clearTimeout(timeout);
        const responseTime = Date.now() - startTime;

        result = {
            url: cleanUrl,
            isUp: true,
            statusCode: response.status,
            responseTime,
            checkedAt: new Date().toISOString(),
        };
    } catch (headErr) {
        // Fallback to GET
        try {
            const controller2 = new AbortController();
            const timeout2 = setTimeout(() => controller2.abort(), 10000);

            const response2 = await fetch(targetUrl, {
                method: 'GET',
                signal: controller2.signal,
                redirect: 'follow',
                headers: { 'User-Agent': 'BIS-Uptime-Checker/1.0 (Website Status Monitor)' },
            });

            clearTimeout(timeout2);
            const responseTime = Date.now() - startTime;

            result = {
                url: cleanUrl,
                isUp: response2.status < 500,
                statusCode: response2.status,
                responseTime,
                checkedAt: new Date().toISOString(),
            };
        } catch {
            const responseTime = Date.now() - startTime;
            let reason = 'Connection failed';
            if (headErr.name === 'AbortError') reason = 'Request timed out (10s)';
            else if (headErr.cause?.code === 'ENOTFOUND') reason = 'DNS resolution failed';
            else if (headErr.cause?.code === 'ECONNREFUSED') reason = 'Connection refused';
            else if (headErr.cause?.code === 'ECONNRESET') reason = 'Connection reset';

            result = {
                url: cleanUrl,
                isUp: false,
                statusCode: null,
                responseTime,
                reason,
                checkedAt: new Date().toISOString(),
            };
        }
    }

    // Save to database (non-blocking)
    try {
        const domainName = cleanUrl.split('/')[0];
        const domain = await prisma.domain.upsert({
            where: { name: domainName },
            update: { updatedAt: new Date() },
            create: { name: domainName },
        });

        await prisma.check.create({
            data: {
                domainId: domain.id,
                isUp: result.isUp,
                statusCode: result.statusCode,
                responseTime: result.responseTime,
                reason: result.reason || null,
            },
        });
    } catch (dbErr) {
        // Don't fail the request if DB write fails
        console.error('DB write failed:', dbErr.message);
    }

    return NextResponse.json(result);
}
