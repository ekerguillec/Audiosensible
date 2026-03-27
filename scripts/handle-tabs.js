// SCRIPT

// Gestion des tabulations pour navigation responsive
document.addEventListener('DOMContentLoaded', function() {
    const navDesktop = document.querySelector('nav.hidden.md\\:flex');
    const navMobile = document.querySelector('nav.md\\:hidden');
    const navToggle = document.getElementById('nav-toggle');
    const navToggleLabel = document.querySelector('label[for="nav-toggle"]');
    const logoLink = document.querySelector('header a[href*="travail_projet"]');
    const mainContent = document.querySelector('main');
    const footer = document.querySelector('footer');
    const scrollTopBtn = document.getElementById('scroll-top');
    
    function updateTabIndex() {
        const isDesktop = window.innerWidth >= 768; // breakpoint md
        const isMobileMenuOpen = navToggle && navToggle.checked;
        
        if (isDesktop) {
            // MODE DESKTOP
            // Navigation desktop accessible
            if (navDesktop) {
                const desktopLinks = navDesktop.querySelectorAll('a');
                desktopLinks.forEach(link => {
                    link.tabIndex = 0;
                });
            }
            
            // Navigation mobile inaccessible
            if (navMobile) {
                const mobileLinks = navMobile.querySelectorAll('a');
                mobileLinks.forEach(link => {
                    link.tabIndex = -1;
                });
            }
            
            // Bouton hamburger inaccessible
            if (navToggleLabel) {
                navToggleLabel.tabIndex = -1;
                navToggle.setAttribute("aria-hidden", true);
                navToggleLabel.setAttribute("aria-hidden", true);
            }
            
            // Reste du site accessible
            if (logoLink) logoLink.tabIndex = 0;
            if (mainContent) mainContent.removeAttribute('inert');
            if (footer) footer.removeAttribute('inert');
            if (scrollTopBtn) scrollTopBtn.tabIndex = 0;
            
        } else {
            // MODE MOBILE
            // Navigation desktop inaccessible
            if (navDesktop) {
                const desktopLinks = navDesktop.querySelectorAll('a');
                desktopLinks.forEach(link => {
                    link.tabIndex = -1;
                });
            }
            
            // Bouton hamburger accessible
            if (navToggleLabel) {
                navToggleLabel.tabIndex = 0;
                navToggle.setAttribute("aria-hidden", false);
                navToggleLabel.setAttribute("aria-hidden", false);
            }
            
            if (isMobileMenuOpen) {
                // MENU MOBILE OUVERT
                // Navigation mobile accessible
                if (navMobile) {
                    const mobileLinks = navMobile.querySelectorAll('a');
                    mobileLinks.forEach(link => {
                        link.tabIndex = 0;
                    });
                }
                
                // Logo accessible
                if (logoLink) logoLink.tabIndex = 0;
                
                // Reste du site inaccessible
                if (mainContent) mainContent.setAttribute('inert', '');
                if (footer) footer.setAttribute('inert', '');
                if (scrollTopBtn) scrollTopBtn.tabIndex = -1;
                
            } else {
                // MENU MOBILE FERMÉ
                // Navigation mobile inaccessible
                if (navMobile) {
                    const mobileLinks = navMobile.querySelectorAll('a');
                    mobileLinks.forEach(link => {
                        link.tabIndex = -1;
                    });
                }
                
                // Reste du site accessible
                if (logoLink) logoLink.tabIndex = 0;
                if (mainContent) mainContent.removeAttribute('inert');
                if (footer) footer.removeAttribute('inert');
                if (scrollTopBtn) scrollTopBtn.tabIndex = 0;
            }
        }
    }
    
    // Mettre à jour au chargement
    updateTabIndex();
    
    // Mettre à jour au redimensionnement
    window.addEventListener('resize', updateTabIndex);
    
    // Mettre à jour quand le menu hamburger change
    if (navToggle) {
        navToggle.addEventListener('change', updateTabIndex);
    }
});