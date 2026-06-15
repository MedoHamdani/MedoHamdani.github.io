const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const { marked } = require('marked');

const configs = [
  {
    postsDir: 'blog/_posts',
    outDir: 'blog',
    lang: 'en',
    dir: 'ltr',
    stylePath: '../style.css',
    scriptPath: '../script.js',
    ogLocale: 'en_US',
    siteName: 'Medo Hamdani',
    nav: [
      { href: '../index.html', label: 'Home' },
      { href: '../about.html', label: 'About' },
      { href: '../blog.html', label: 'Blog' },
      { href: '../videos.html', label: 'Videos' },
      { href: '../projects.html', label: 'Projects' },
      { href: '../products.html', label: 'Products' },
      { href: '../contact.html', label: 'Contact' },
    ],
    langSwitch: (slug) => ({ href: `../ar/blog/${slug}.html`, label: 'ع' }),
    langSwitchMobile: (slug) => ({ href: `../ar/blog/${slug}.html`, label: 'العربية' }),
    backLink: '← Back to Blog',
    backHref: '../blog.html',
  },
  {
    postsDir: 'ar/blog/_posts',
    outDir: 'ar/blog',
    lang: 'ar',
    dir: 'rtl',
    stylePath: '../../ar/style.css',
    scriptPath: '../../script.js',
    ogLocale: 'ar_AR',
    siteName: 'Medo Hamdani',
    nav: [
      { href: '../../ar/index.html', label: 'الرئيسية' },
      { href: '../../ar/about.html', label: 'من أنا' },
      { href: '../../ar/blog.html', label: 'المدونة' },
      { href: '../../ar/videos.html', label: 'فيديو' },
      { href: '../../ar/projects.html', label: 'المشاريع' },
      { href: '../../ar/products.html', label: 'المنتجات' },
      { href: '../../ar/contact.html', label: 'اتصل بي' },
    ],
    langSwitch: (slug) => ({ href: `../../blog/${slug}.html`, label: 'EN' }),
    langSwitchMobile: (slug) => ({ href: `../../blog/${slug}.html`, label: 'English' }),
    backLink: '← العودة إلى المدونة',
    backHref: '../../ar/blog.html',
  },
];

function buildTemplate(cfg, title, description, slug, content) {
  const navLinks = cfg.nav.map(l => `<a href="${l.href}">${l.label}</a>`).join('\n        ');
  const ls = cfg.langSwitch(slug);
  const lsm = cfg.langSwitchMobile(slug);
  const date = new Date().toISOString().split('T')[0];

  return `<!DOCTYPE html>
<html lang="${cfg.lang}" dir="${cfg.dir}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<title>${title} | ${cfg.siteName}</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Cairo:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${cfg.stylePath}">
<meta name="description" content="${description}">
<meta name="author" content="Medo Hamdani">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://medohamdani.github.io/${cfg.outDir}/${slug}.html">
<meta property="og:title" content="${title} | ${cfg.siteName}">
<meta property="og:description" content="${description}">
<meta property="og:image" content="https://medohamdani.github.io/favicon.svg">
<meta property="og:url" content="https://medohamdani.github.io/${cfg.outDir}/${slug}.html">
<meta property="og:type" content="article">
<meta property="og:locale" content="${cfg.ogLocale}">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="${title} | ${cfg.siteName}">
<meta name="twitter:description" content="${description}">
<meta name="twitter:image" content="https://medohamdani.github.io/favicon.svg">
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "${title}",
    "description": "${description}",
    "author": {
        "@type": "Person",
        "name": "Medo Hamdani"
    },
    "datePublished": "${date}"
}
</script>
</head>
<body>
<header>
  <div class="container">
    <nav>
      <a href="${cfg.nav[0].href}" class="logo">Medo Hamdani</a>
      <div class="nav-links">
        ${navLinks}
        <a href="${ls.href}" class="lang-switch">${ls.label}</a>
      </div>
      <button class="mobile-menu-btn" onclick="toggleMobileMenu()">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M3 12h18M3 6h18M3 18h18"/>
        </svg>
      </button>
    </nav>
    <div class="mobile-menu" id="mobileMenu">
      ${cfg.nav.map(l => `<a href="${l.href}">${l.label}</a>`).join('\n      ')}
      <a href="${lsm.href}">${lsm.label}</a>
    </div>
  </div>
</header>
<main>
<article>
  <div class="container">
    <a href="${cfg.backHref}" class="back-link">${cfg.backLink}</a>
    <h1>${title}</h1>
    <p style="color:#64748b;margin-bottom:2rem">${description}</p>
    ${content}
    <footer style="margin-top:4rem">
      <p>© Medo Hamdani | <a href="${cfg.backHref}" style="color:#60a5fa">${cfg.backLink}</a></p>
      <p class="footer-text" style="margin-top:1rem;color:#94a3b8;font-size:0.85rem">
        Design by Medo Hamdani |
        <a href="https://bit.ly/BizMapper" target="_blank" style="color:#818cf8">Biz Mapper</a> v.1.2
      </p>
    </footer>
  </div>
</article>
</main>
<script src="${cfg.scriptPath}"></script>
</body>
</html>`;
}

for (const cfg of configs) {
  if (!fs.existsSync(cfg.postsDir)) {
    fs.mkdirSync(cfg.postsDir, { recursive: true });
    console.log(`Created ${cfg.postsDir}`);
  }

  const files = fs.readdirSync(cfg.postsDir).filter(f => f.endsWith('.md'));

  if (files.length === 0) {
    console.log(`No markdown files found in ${cfg.postsDir}/`);
    continue;
  }

  for (const file of files) {
    const raw = fs.readFileSync(path.join(cfg.postsDir, file), 'utf8');
    const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!match) {
      console.warn(`Skipping ${file}: no front matter`);
      continue;
    }
    const front = yaml.load(match[1]);
    const body = match[2];
    const title = front.title || file.replace('.md', '');
    const description = front.description || '';
    const slug = file.replace('.md', '');
    const html = marked.parse(body);
    const outPath = path.join(cfg.outDir, `${slug}.html`);
    fs.writeFileSync(outPath, buildTemplate(cfg, title, description, slug, html));
    console.log(`Generated ${outPath}`);
  }
}
