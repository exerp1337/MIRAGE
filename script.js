document.addEventListener('DOMContentLoaded', () => {
    // 1. Частицы на фоне
    const container = document.getElementById('particles-container');
    for (let i = 0; i < 50; i++) {
        createParticle(container);
    }
    
    // 2. Observer для плавной анимации при скролле
    const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
});

function createParticle(container) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    const size = Math.random() * 3 + 1;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.top = `${Math.random() * 100}vh`;
    particle.style.animationDuration = `${Math.random() * 15 + 10}s`;
    particle.style.animationDelay = `${Math.random() * 5}s`;
    
    const colors = ['#FDEBD0', '#D5C2A5', '#C29B62', '#D48C45', '#4A3320'];
    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    container.appendChild(particle);
}
