export default function robots() {
    const baseUrl = process.env.SITE_URL || 'https://bisuptime.com';

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/'],
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
