document.addEventListener('DOMContentLoaded', () => {
    // 1. Частицы на фоне (меньше частиц на мобильных — экономим GPU/CPU)
    const container = document.getElementById('particles-container');
    const particleCount = window.matchMedia('(max-width: 768px)').matches ? 20 : 50;
    for (let i = 0; i < particleCount; i++) {
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

    // 3. Логика мобильного бургер-меню
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    const closeMobileMenu = () => {
        navLinks.classList.remove('nav-active');
        menuToggle.setAttribute('aria-expanded', 'false');
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    };

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('nav-active');
            menuToggle.setAttribute('aria-expanded', String(isOpen));

            const icon = menuToggle.querySelector('i');
            if (isOpen) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        // Закрываем меню при клике на обычную ссылку внутри него
        // (пункт с мега-меню обрабатывается отдельно ниже, чтобы не закрывать меню раньше времени)
        const links = navLinks.querySelectorAll('a:not(.mega-menu-trigger)');
        links.forEach(link => {
            link.addEventListener('click', () => {
                if (window.matchMedia('(max-width: 768px)').matches) {
                    closeMobileMenu();
                }
            });
        });
    }

    // 4. Мега-меню "Услуги": доступно по клику/Enter (тач + клавиатура),
    // независимо от hover-поведения на десктопе (CSS обрабатывает hover отдельно).
    const megaTrigger = document.querySelector('.mega-menu-trigger');
    if (megaTrigger) {
        const megaMenuId = megaTrigger.getAttribute('aria-controls');
        const megaMenu = megaMenuId ? document.getElementById(megaMenuId) : null;

        megaTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            const isOpen = megaTrigger.getAttribute('aria-expanded') === 'true';
            megaTrigger.setAttribute('aria-expanded', String(!isOpen));
            if (megaMenu) {
                megaMenu.classList.toggle('mega-menu-open', !isOpen);
            }
        });
    }

    // 5. Подвкладки внутри мега-меню ("Комплексный Social" / "Для Брендов")
    const megaTabs = document.querySelectorAll('.mega-tab');
    megaTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = tab.getAttribute('aria-controls');
            const targetPanel = document.getElementById(targetId);
            if (!targetPanel) return;

            megaTabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
                t.setAttribute('tabindex', '-1');
            });
            document.querySelectorAll('.mega-tab-panel').forEach(panel => {
                panel.classList.remove('active');
                panel.hidden = true;
            });

            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');
            tab.setAttribute('tabindex', '0');
            targetPanel.classList.add('active');
            targetPanel.hidden = false;
        });
    });
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
