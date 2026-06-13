function toggleMobileMenu() {
    document.getElementById('mobileMenu').classList.toggle('active');
}

document.addEventListener('DOMContentLoaded', function() {
    var currentPath = window.location.pathname.split('/').pop() || 'index.html';
    var navLinks = document.querySelectorAll('.nav-links a:not(.lang-switch)');
    navLinks.forEach(function(link) {
        var href = link.getAttribute('href');
        if (href === currentPath) {
            link.classList.add('active');
        }
    });
});
