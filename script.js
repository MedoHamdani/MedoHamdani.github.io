function toggleMobileMenu() {
    document.getElementById('mobileMenu').classList.toggle('active');
}

function toggleTheme() {
    var html = document.documentElement;
    var theme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    var btn = document.querySelector('.theme-toggle');
    if (btn) {
        btn.textContent = theme === 'dark' ? '\u{1F319}' : '\u2600\uFE0F';
    }
}

function toggleSearch() {
    var box = document.getElementById('searchBox');
    var input = document.getElementById('searchInput');
    if (!box || !input) return;
    if (box.classList.contains('active')) {
        box.classList.remove('active');
        input.value = '';
        filterArticles();
    } else {
        box.classList.add('active');
        input.focus();
    }
}

function filterArticles() {
    var input = document.getElementById('searchInput');
    var empty = document.getElementById('searchEmpty');
    var cards = document.querySelectorAll('.cards-grid .card');
    if (!input || !cards.length) return;
    var query = input.value.toLowerCase();
    var visible = 0;
    cards.forEach(function(card) {
        var match = card.textContent.toLowerCase().indexOf(query) !== -1;
        card.style.display = match ? '' : 'none';
        if (match) visible++;
    });
    if (empty) {
        empty.style.display = visible === 0 && query.length > 0 ? 'block' : 'none';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    var saved = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', saved);
    var btn = document.querySelector('.theme-toggle');
    if (btn) {
        btn.textContent = saved === 'dark' ? '\u{1F319}' : '\u2600\uFE0F';
    }
    var currentPath = window.location.pathname.split('/').pop() || 'index.html';
    var navLinks = document.querySelectorAll('.nav-links a:not(.lang-switch)');
    navLinks.forEach(function(link) {
        var href = link.getAttribute('href');
        if (href === currentPath) {
            link.classList.add('active');
        }
    });
});
