export function initContactForm() {
    const form = document.getElementById('contact-form') as HTMLFormElement;
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const btn = form.querySelector('button');
        const originalText = btn ? btn.textContent : 'Send Message';
        
        if (btn) {
            btn.textContent = 'Sending...';
            btn.disabled = true;
        }

        const formData = new FormData(form);
        const data: Record<string, any> = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`Server status: ${response.status}`);
            }

            // Success
            showNotification('Message sent successfully!', 'success');
            form.reset();
        } catch (error) {
            console.error(error);
            showNotification('Failed to send message. Please try again later.', 'error');
        } finally {
            if (btn) {
                btn.textContent = originalText;
                btn.disabled = false;
            }
        }
    });
}

function showNotification(message: string, type: 'success' | 'error') {
    const existing = document.querySelector('.notification-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `notification-toast ${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);

    // Fade in
    requestAnimationFrame(() => toast.classList.add('visible'));

    // Remove after 3s
    setTimeout(() => {
        toast.classList.remove('visible');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}
