const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const { marked } = require('marked');

const POSTS_DIR = 'blog/_posts';

const enCfg = {
  outDir: 'blog',
  listingFile: 'blog.html',
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
  backLink: '← Back to Blog',
  backHref: '../blog.html',
  cardReadMore: 'Read More →',
  cardTarget: '_self',
  cardHref: (slug) => `blog/${slug}.html`,
  langSwitch: (slug) => ({ href: `../ar/blog/${slug}.html`, label: 'ع' }),
  langSwitchMobile: (slug) => ({ href: `../ar/blog/${slug}.html`, label: 'العربية' }),
};

const arCfg = {
  outDir: 'ar/blog',
  listingFile: 'ar/blog.html',
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
  backLink: '← العودة إلى المدونة',
  backHref: '../../ar/blog.html',
  cardReadMore: 'اقرأ المقال →',
  cardTarget: '_self',
  cardHref: (slug) => `blog/${slug}.html`,
  langSwitch: (slug) => ({ href: `../../blog/${slug}.html`, label: 'EN' }),
  langSwitchMobile: (slug) => ({ href: `../../blog/${slug}.html`, label: 'English' }),
};

const staticCards = {
  en: [
    { title: 'Life Lessons from Yemen', description: 'Reflections on culture, resilience, and personal growth from my Yemeni roots.', href: 'http://lifelessonsyemen.blogspot.com.eg/', target: '_blank' },
    { title: 'Japanese Anime & Culture', description: 'Exploring the fascinating world of Japanese anime and its cultural impact.', href: 'http://japaneseanimeyemen.blogspot.com.eg/', target: '_blank' },
    { title: 'Personal Journey & Thoughts', description: 'My personal reflections, experiences, and insights on various topics.', href: 'https://medohamdani.blogspot.com', target: '_blank' },
  ],
  ar: [
    { title: 'دروس الحياة من اليمن', description: 'تأملات حول الثقافة، المرونة، والنمو الشخصي من جذوري اليمنية.', href: 'http://lifelessonsyemen.blogspot.com.eg/', target: '_blank' },
    { title: 'الأنمي الياباني والثقافة', description: 'استكشاف عالم الأنمي الياباني الرائع وتأثيره الثقافي.', href: 'http://japaneseanimeyemen.blogspot.com.eg/', target: '_blank' },
    { title: 'رحلتي الشخصية وأفكاري', description: 'تأملاتي الشخصية، تجاربي، وآرائي حول مواضيع متنوعة.', href: 'https://medohamdani.blogspot.com', target: '_blank' },
  ],
};

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

function buildCards(cfg, posts) {
  const cards = posts.map(p => {
    const href = typeof cfg.cardHref === 'function' ? cfg.cardHref(p.slug) : `blog/${p.slug}.html`;
    return `                    <div class="card">
                        <h3>${p.title}</h3>
                        <p>${p.description}</p>
                        <a href="${href}" target="${cfg.cardTarget}">${cfg.cardReadMore}</a>
                    </div>`;
  });
  const staticList = (staticCards[cfg.lang] || []).map(c => {
    return `                    <div class="card">
                        <h3>${c.title}</h3>
                        <p>${c.description}</p>
                        <a href="${c.href}" target="${c.target || '_self'}">${cfg.cardReadMore}</a>
                    </div>`;
  });
  return [...cards, ...staticList].join('\n');
}

function updateListing(cfg, posts) {
  const listingPath = cfg.listingFile;
  if (!fs.existsSync(listingPath)) {
    console.warn(`Listing file not found: ${listingPath}`);
    return;
  }
  let html = fs.readFileSync(listingPath, 'utf8');
  const marker = '<!-- BLOG_CARDS -->';
  const idx = html.indexOf(marker);
  if (idx === -1) {
    console.warn(`Marker not found in ${listingPath}`);
    return;
  }
  const before = html.slice(0, idx + marker.length);
  const afterStart = html.indexOf('</div>', idx);
  if (afterStart === -1) {
    console.warn(`Could not find closing </div> after marker in ${listingPath}`);
    return;
  }
  const after = html.slice(afterStart);
  const cards = buildCards(cfg, posts);
  fs.writeFileSync(listingPath, `${before}\n${cards}\n${after}`);
  console.log(`Updated ${listingPath}`);
}

if (!fs.existsSync(POSTS_DIR)) {
  fs.mkdirSync(POSTS_DIR, { recursive: true });
}

const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));
const enPosts = [];
const arPosts = [];

for (const file of files) {
  const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8');
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
  const lang = front.lang || 'en';
  const cfg = lang === 'ar' ? arCfg : enCfg;
  const html = marked.parse(body);
  const outPath = path.join(cfg.outDir, `${slug}.html`);
  fs.writeFileSync(outPath, buildTemplate(cfg, title, description, slug, html));
  console.log(`Generated ${outPath}`);
  const post = { title, description, slug, date: front.date || '2026-01-01' };
  if (lang === 'ar') {
    arPosts.push(post);
  } else {
    enPosts.push(post);
  }
}

enPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
arPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

updateListing(enCfg, enPosts);
updateListing(arCfg, arPosts);
