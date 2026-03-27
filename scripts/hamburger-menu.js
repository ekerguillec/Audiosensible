// SCRIPT 

// Gestion du menu Hamburger et Scroll to Top puis désactivation du scroll lorsqu'on clique sur 
// le menu hamburger - avec adaptation pour compatibilité Safari iOS

document.addEventListener('DOMContentLoaded', function () {
    const label = document.getElementById('nav-toggle-label');
    const checkbox = document.getElementById('nav-toggle');

    label.addEventListener('keydown', (e) => {
    // Space or Enter
    if (e.key === ' ' || e.key === 'Spacebar' || e.key === 'Enter') {
        e.preventDefault();        // empêche le scroll (Space) / comportement par défaut
        checkbox.click();          // déclenche le changement comme un clic
    }
    });
})

document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    let scrollPosition = 0;

    if (navToggle) {
        navToggle.addEventListener('change', function() {
            if(this.checked) {
                scrollPosition = window.scrollY;
                
                window.scrollTo({ top: 0, behavior: 'smooth' });
                
                setTimeout(() => {
                    document.body.style.position = 'fixed';
                    document.body.style.width = '100%';
                }, 400);

                // Gestion de la background-color du body pour iOS Safari
                document.body.classList.remove('bg-asphalt');
                document.body.classList.add('bg-floral-white');
            }
            else {
                document.body.style.position = '';
                document.body.style.top = '';
                document.body.style.width = '';
                
                window.scrollTo(0, scrollPosition);

                // Gestion de la background-color du body pour iOS Safari
                document.body.classList.remove('bg-floral-white');
                document.body.classList.add('bg-asphalt');
            }
        });
    }
});