const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://calcwises.com';
const TODAY = new Date().toISOString().split('T')[0];

function generateSitemap() {
    console.log('Generating sitemap...');

    // 1. Static Pages
    const staticPages = [
        { en: '/', ar: 'index-ar.html', freq: 'weekly', prio: '1.0' },
        { en: 'about.html', ar: 'about-ar.html', freq: 'monthly', prio: '0.7' },
        { en: 'privacy.html', ar: 'privacy-ar.html', freq: 'yearly', prio: '0.3' },
        { en: 'terms.html', ar: 'terms-ar.html', freq: 'yearly', prio: '0.3' },
        { en: 'blog.html', ar: 'blog-ar.html', freq: 'weekly', prio: '0.8' }
    ];

    // 2. Blog Articles (Read from filesystem to ensure sync)
    const blogDir = path.join(__dirname, 'blog');
    const blogFiles = fs.readdirSync(blogDir).filter(f => f.endsWith('.html') && !f.endsWith('-ar.html'));

    const blogPages = blogFiles.map(f => {
        const slug = f.replace('.html', '');
        return {
            en: `blog/${slug}.html`,
            ar: `blog/${slug}-ar.html`,
            freq: 'monthly',
            prio: '0.6'
        };
    });

    // 3. Calculators (Read from seo_data.json)
    const seoData = JSON.parse(fs.readFileSync(path.join(__dirname, 'seo_data.json'), 'utf8'));
    const calcPages = seoData.map(c => ({
        en: `calculators/${c.id}.html`,
        ar: `calculators/${c.id}-ar.html`,
        freq: 'weekly',
        prio: '0.9'
    }));

    // Generate XML
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">

  <!-- ═══ CORE PAGES ═══ -->
`;

    function addUrl(p) {
        const enUrl = `${BASE_URL}/${p.en === '/' ? '' : p.en}`;
        const arUrl = `${BASE_URL}/${p.ar}`;

        xml += `
  <url>
    <loc>${enUrl}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}"/>
    <xhtml:link rel="alternate" hreflang="ar" href="${arUrl}"/>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${p.freq}</changefreq>
    <priority>${p.prio}</priority>
  </url>
  <url>
    <loc>${arUrl}</loc>
    <xhtml:link rel="alternate" hreflang="ar" href="${arUrl}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}"/>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${p.freq}</changefreq>
    <priority>${p.prio}</priority>
  </url>
`;
    }

    staticPages.forEach(addUrl);

    xml += `\n  <!-- ═══ BLOG POSTS (${blogPages.length} × 2 languages) ═══ -->\n`;
    blogPages.forEach(addUrl);

    xml += `\n  <!-- ═══ CALCULATOR PAGES (${calcPages.length} × 2 languages) ═══ -->\n`;
    calcPages.forEach(addUrl);

    xml += `\n</urlset>`;

    fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), xml, 'utf8');
    console.log(`✅ Sitemap generated with ${staticPages.length * 2 + blogPages.length * 2 + calcPages.length * 2} URLs.`);
}

generateSitemap();
