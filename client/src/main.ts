import { initNavigation } from './modules/navigation';
import { initDataLoader } from './modules/dataLoader';
import { initModals } from './modules/modals';
import { initContactForm } from './modules/contact';
import { initResumeDownload } from './modules/downloadResume';
import { inject } from '@vercel/analytics';

// Initialize Analytics
inject();

// Initialize Modules
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initDataLoader();
    initModals();
    initContactForm();
    initResumeDownload();

    // Footer Year
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear().toString();
});
