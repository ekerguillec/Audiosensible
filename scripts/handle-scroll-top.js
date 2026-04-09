// Gestion du bouton Scroll To Top - adapté au nouveau layout (sans classes Tailwind)

const scrollTopBtn = document.getElementById('scroll-top');
const scrollThreshold = 300;

if (scrollTopBtn) {
    window.addEventListener('scroll', function () {
        if (window.scrollY > scrollThreshold) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}