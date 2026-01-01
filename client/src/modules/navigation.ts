export function initNavigation() {
    initRouter();
    initMobileMenu();
}

function initRouter() {
    function handleRoute() {
        // Default to #home since About is merged
        const hash = window.location.hash || '#home';
        
        // Update Active Links
        document.querySelectorAll('.nav-link').forEach(link => {
            if (link.getAttribute('href') === hash) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Toggle Sections
        document.querySelectorAll('.view-section').forEach(section => {
            section.classList.remove('active');
        });

        const activeSection = document.querySelector(hash);
        if (activeSection) {
            activeSection.classList.add('active');
            window.scrollTo(0, 0);
        }
    }

    window.addEventListener('hashchange', handleRoute);
    window.addEventListener('load', handleRoute);
}

function initMobileMenu() {
    const menuBtn = document.getElementById('menu-toggle');
    const closeBtn = document.getElementById('close-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.nav-link.mobile');

    if (!menuBtn || !mobileMenu) return;

    function toggleMenu() {
        mobileMenu?.classList.toggle('active');
    }

    menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    closeBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    // Close when clicking a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
             mobileMenu?.classList.remove('active');
        });
    });

    // Close on outside click
    mobileMenu.addEventListener('click', (e) => {
        if (e.target === mobileMenu) {
            mobileMenu.classList.remove('active');
        }
    });
}
