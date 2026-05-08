document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeBtn = document.querySelector('[data-theme-toggle]');
    const html = document.documentElement;

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            html.setAttribute('data-theme', newTheme);
            themeBtn.textContent = newTheme === 'light' ? '◑' : '☼';
        });
    }

    // Intersection Observer for Reveal
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});
