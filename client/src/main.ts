import { initNavigation } from './modules/navigation';
import { initDataLoader } from './modules/dataLoader';
import { initModals } from './modules/modals';
import { initContactForm } from './modules/contact';

// Initialize Modules
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initDataLoader();
    initModals();
    initContactForm();

    // Footer Year
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear().toString();
});
