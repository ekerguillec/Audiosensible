// Gestion du menu hamburger - adapté au nouveau layout light mode

document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobile-nav');

    if (!hamburger || !mobileNav) return;

    // Keyboard support
    hamburger.addEventListener('keydown', function (e) {
        if (e.key === ' ' || e.key === 'Spacebar' || e.key === 'Enter') {
            e.preventDefault();
            toggleMenu();
        }
    });

    hamburger.addEventListener('click', toggleMenu);

    function toggleMenu() {
        const isOpen = mobileNav.classList.toggle('open');
        hamburger.classList.toggle('open', isOpen);
        hamburger.setAttribute('aria-expanded', isOpen);
        hamburger.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');

        // Bloquer le scroll du body quand le menu est ouvert
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    // Fermer si on clique sur un lien
    mobileNav.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            mobileNav.classList.remove('open');
            hamburger.classList.remove('open');
            hamburger.setAttribute('aria-expanded', false);
            hamburger.setAttribute('aria-label', 'Ouvrir le menu');
            document.body.style.overflow = '';
        });
    });

    // Fermer si on resize vers desktop
    window.addEventListener('resize', function () {
        if (window.innerWidth >= 641) {
            mobileNav.classList.remove('open');
            hamburger.classList.remove('open');
            hamburger.setAttribute('aria-expanded', false);
            document.body.style.overflow = '';
        }
    });
});