import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://laptopscout.in'; // Replace with actual domain if known, otherwise placeholder is fine for now

  const routes = [
    '',
    '/tool',
    '/blog',
    '/check-laptop-battery',
    '/check-laptop-ram',
    '/check-laptop-ssd',
    '/check-laptop-gpu',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Add blog posts
  const blogSlugs = [
    'how-to-check-used-laptop-battery',
    'hdd-vs-ssd-used-laptop',
    'used-laptop-buying-checklist',
    'common-scams-used-laptops',
    'macbook-buying-guide-used',
    'gaming-laptop-inspection-tips',
    'screen-defects-used-laptop',
    'keyboard-trackpad-testing',
    'negotiation-tips-used-laptop',
    'best-used-laptops-under-30000',
  ];

  const blogRoutes = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...routes, ...blogRoutes];
}
