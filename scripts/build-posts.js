const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const { marked } = require('marked');

const POSTS_DIR = 'blog/_posts';
const OUT_DIR = 'blog';

const template = (title, description, slug, content) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<title>${title} | Medo Hamdani</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Cairo:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../style.css">
<meta name="description" content="${description}">
<meta name="author" content="Medo Hamdani">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://medohamdani.github.io/blog/${slug}.html">
<meta property="og:title" content="${title} | Medo Hamdani">
<meta property="og:description" content="${description}">
<meta property="og:image" content="https://medohamdani.github.io/favicon.svg">
<meta property="og:url" content="https://medohamdani.github.io/blog/${slug}.html">
<meta property="og:type" content="article">
<meta property="og:locale" content="en_US">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="${title} | Medo Hamdani">
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
    "datePublished": "${new Date().toISOString().split('T')[0]}"
}
</script>
</head>
<body>
<header>
  <div class="container">
    <nav>
      <a href="../index.html" class="logo">Medo Hamdani</a>
      <div class="nav-links">
        <a href="../index.html">Home</a>
        <a href="../about.html">About</a>
        <a href="../blog.html">Blog</a>
        <a href="../videos.html">Videos</a>
        <a href="../projects.html">Projects</a>
        <a href="../products.html">Products</a>
        <a href="../contact.html">Contact</a>
        <a href="../ar/blog/${slug}.html" class="lang-switch">ع</a>
      </div>
      <button class="mobile-menu-btn" onclick="toggleMobileMenu()">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M3 12h18M3 6h18M3 18h18"/>
        </svg>
      </button>
    </nav>
    <div class="mobile-menu" id="mobileMenu">
      <a href="../index.html">Home</a>
      <a href="../about.html">About</a>
      <a href="../blog.html">Blog</a>
      <a href="../videos.html">Videos</a>
      <a href="../projects.html">Projects</a>
      <a href="../products.html">Products</a>
      <a href="../contact.html">Contact</a>
      <a href="../ar/blog/${slug}.html">العربية</a>
    </div>
  </div>
</header>
<main>
<article>
  <div class="container">
    <a href="../blog.html" class="back-link">← Back to Blog</a>
    <h1>${title}</h1>
    <p style="color:#64748b;margin-bottom:2rem">${description}</p>
    ${content}
    <footer style="margin-top:4rem">
      <p>© Medo Hamdani | <a href="../blog.html" style="color:#60a5fa">Back to Blog</a></p>
      <p class="footer-text" style="margin-top:1rem;color:#94a3b8;font-size:0.85rem">
        Design by Medo Hamdani |
        <a href="https://bit.ly/BizMapper" target="_blank" style="color:#818cf8">Biz Mapper</a> v.1.2
      </p>
    </footer>
  </div>
</article>
</main>
<script src="../script.js"></script>
</body>
</html>`;

if (!fs.existsSync(POSTS_DIR)) {
  fs.mkdirSync(POSTS_DIR, { recursive: true });
  console.log('Created blog/_posts directory');
}

const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));

if (files.length === 0) {
  console.log('No markdown files found in blog/_posts/');
  process.exit(0);
}

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
  const html = marked.parse(body);
  const outPath = path.join(OUT_DIR, `${slug}.html`);
  fs.writeFileSync(outPath, template(title, description, slug, html));
  console.log(`Generated ${outPath}`);
}
