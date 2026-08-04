// Скрипт для создания эффекта "песчинок" на фоне
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('particles-container');
    const particleCount = 50; // Количество песчинок

    for (let i = 0; i < particleCount; i++) {
        createParticle(container);
    }
});

function createParticle(container) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Случайные параметры
    const size = Math.random() * 3 + 1; // от 1 до 4px
    const startX = Math.random() * 100; // 0-100vw
    const startY = Math.random() * 100; // 0-100vh
    const duration = Math.random() * 15 + 10; // 10-25s
    const delay = Math.random() * 5; // 0-5s

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${startX}vw`;
    particle.style.top = `${startY}vh`;
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;
    
    // Немного разнообразим цвет (от кремового к золотому)
    const colors = ['#FDEBD0', '#D5C2A5', '#C29B62', '#D48C45'];
    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

    container.appendChild(particle);
}

// Эффект небольшого параллакса для стеклянных панелей при движении мыши (опционально, для премиальности)
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.service-card, .hero-card');
    const xAxis = (window.innerWidth / 2 - e.pageX) / 50;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 50;

    cards.forEach(card => {
        // Применяем легкий наклон только если экран достаточно большой
        if(window.innerWidth > 992) {
            // card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`; // Закомментировано, чтобы не конфликтовать с hover, но можно активировать
        }
    });
});
