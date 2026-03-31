const fs = require('fs');
const path = require('path');
const { minify } = require('terser');
const CleanCSS = require('clean-css');

const rootDir = __dirname;
const templatesEnDir = path.join(rootDir, 'templates', 'en');
const templatesArDir = path.join(rootDir, 'templates', 'ar');

async function build() {
    console.log('Starting build...');

    // 1. Minify JS
    const jsFiles = ['app.js', 'app-ar.js'];
    for (const file of jsFiles) {
        if (!fs.existsSync(path.join(rootDir, file))) continue;
        console.log(`Minifying ${file}...`);
        const code = fs.readFileSync(path.join(rootDir, file), 'utf8');
        const result = await minify(code);
        fs.writeFileSync(path.join(rootDir, file.replace('.js', '.min.js')), result.code);
    }

    // 2. Minify CSS
    const cssFiles = ['styles.css', 'styles-rtl.css', 'theme.css'];
    for (const file of cssFiles) {
        if (!fs.existsSync(path.join(rootDir, file))) continue;
        console.log(`Minifying ${file}...`);
        const code = fs.readFileSync(path.join(rootDir, file), 'utf8');
        const result = new CleanCSS().minify(code);
        fs.writeFileSync(path.join(rootDir, file.replace('.css', '.min.css')), result.styles);
    }

    // 3. Update HTML references
    console.log('Updating HTML files to use minified assets...');
    const htmlFiles = ['index.html', 'index-ar.html', 'about.html', 'about-ar.html', 'privacy.html', 'privacy-ar.html', 'terms.html', 'terms-ar.html', 'blog.html', 'blog-ar.html', 'calculators/typing.html', 'calculators/typing-ar.html'];
    for (const file of htmlFiles) {
        const filePath = path.join(rootDir, file);
        if (!fs.existsSync(filePath)) continue;
        let content = fs.readFileSync(filePath, 'utf8');
        content = content.replace(/styles\.css/g, 'styles.min.css')
            .replace(/styles-rtl\.css/g, 'styles-rtl.min.css')
            .replace(/theme\.css/g, 'theme.min.css')
            .replace(/app\.js/g, 'app.min.js')
            .replace(/app-ar\.js/g, 'app-ar.min.js');
        fs.writeFileSync(filePath, content);
    }

    // 4. Generate sw.js ASSETS array
    console.log('Generating pre-cache list for sw.js...');
    const getHtmlFiles = (dir) => fs.readdirSync(dir).filter(f => f.endsWith('.html')).map(f => `/templates/${path.basename(dir)}/${f}`);

    let templateFiles = [];
    if (fs.existsSync(templatesEnDir)) templateFiles.push(...getHtmlFiles(templatesEnDir));
    if (fs.existsSync(templatesArDir)) templateFiles.push(...getHtmlFiles(templatesArDir));

    let blogFiles = [];
    const blogDir = path.join(rootDir, 'blog');
    if (fs.existsSync(blogDir)) {
        blogFiles = fs.readdirSync(blogDir).filter(f => f.endsWith('.html')).map(f => `/blog/${f}`);
    }

    const assets = [
        '/',
        '/index.html',
        '/index-ar.html',
        '/styles.min.css',
        '/styles-rtl.min.css',
        '/theme.min.css',
        '/app.min.js',
        '/app-ar.min.js',
        '/about.html',
        '/about-ar.html',
        '/blog.html',
        '/blog-ar.html',
        '/privacy.html',
        '/privacy-ar.html',
        '/terms.html',
        '/terms-ar.html',
        '/og-image.png',
        '/icon-192.png',
        '/icon-512.png',
        '/offline.html',
        'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Outfit:wght@300;400;500;600;700&display=swap',
        'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&family=Amiri:ital@0;1&display=swap',
        ...templateFiles,
        ...blogFiles
    ];

    const swPath = path.join(rootDir, 'sw.js');
    let swContent = fs.readFileSync(swPath, 'utf8');
    // Replaces the ASSETS array definition
    swContent = swContent.replace(/const ASSETS = \[[\s\S]*?\];/, `const ASSETS = ${JSON.stringify(assets, null, 2)};`);
    // Bump cache version automatically
    const version = Date.now();
    swContent = swContent.replace(/const CACHE_NAME = "[^"]+";/, `const CACHE_NAME = "calcwise-v${version}";`);
    fs.writeFileSync(swPath, swContent);

    console.log('Build complete!');
}

build().catch(console.error);
