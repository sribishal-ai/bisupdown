export const dynamic = 'force-dynamic';

export default async function sitemap() {
    const baseUrl = process.env.SITE_URL || 'https://bisuptime.com';

    const staticPages = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1.0,
        },
    ];

    // Dynamically import prisma only at runtime to avoid build-time connection errors
    try {
        const { default: prisma } = await import('./lib/prisma');

        const domains = await prisma.domain.findMany({
            orderBy: { updatedAt: 'desc' },
            take: 500,
            select: { name: true, updatedAt: true },
        });

        const dynamicPages = domains.map((domain) => ({
            url: `${baseUrl}/check/${encodeURIComponent(domain.name)}`,
            lastModified: domain.updatedAt,
            changeFrequency: 'hourly',
            priority: 0.8,
        }));

        return [...staticPages, ...dynamicPages];
    } catch {
        // Fallback if DB unavailable (e.g., during build)
        const popularSites = [
            'google.com', 'youtube.com', 'x.com', 'facebook.com',
            'instagram.com', 'reddit.com', 'github.com', 'amazon.com',
            'netflix.com', 'discord.com', 'web.whatsapp.com', 'linkedin.com',
        ];

        const fallbackPages = popularSites.map((site) => ({
            url: `${baseUrl}/check/${encodeURIComponent(site)}`,
            lastModified: new Date(),
            changeFrequency: 'hourly',
            priority: 0.8,
        }));

        return [...staticPages, ...fallbackPages];
    }
}
