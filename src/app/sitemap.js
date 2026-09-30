export default function sitemap() {
    const base = 'https://www.adestrasolutions.com';
    const pages = ['', '/blog', '/portfolio', '/pricing', '/team', '/contact'];

    return pages.map((path) => ({
        url: `${base}${path}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: path === '' ? 1.0 : 0.8,
    }));
}