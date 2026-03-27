// SCRIPT 

// Gestion du Bouton Scroll To Top

const scrollTopBtn = document.getElementById('scroll-top');
const scrollThreshold = 300;

window.addEventListener('scroll', function() {
    if (window.scrollY > scrollThreshold) {
        scrollTopBtn.classList.remove('opacity-0', 'pointer-events-none');
    } else {
        scrollTopBtn.classList.add('opacity-0', 'pointer-events-none');
    }
});

scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});