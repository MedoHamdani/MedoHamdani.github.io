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
