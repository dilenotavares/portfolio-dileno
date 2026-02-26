document.addEventListener('DOMContentLoaded', () => {

    // Ano dinâmico no rodapé
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Alternar navegação móvel
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Rolagem suave para âncoras
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            navLinks.classList.remove('active'); // Fechar menu ao clicar

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animação de rolagem (aparece gradualmente para cima)
    const observerOptions = {
        threshold: 0.1
    };

    // Lógica do botão Voltar ao topo
    const backToTopBtn = document.querySelector('.btn-back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Adicione a classe 'fade-in-up' aos elementos que deseja animar. Certifique-se de que o CSS para esta classe esteja definido para criar o efeito desejado.
    const animateElements = document.querySelectorAll('.section-title, .timeline-item, .skill-card, .project-card, .contact-wrapper');

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Gerenciar mudanças de interseção para garantir que os elementos animados sejam visíveis quando estiverem na viewport, mesmo que o usuário role rapidamente ou se o navegador não disparar eventos de scroll como esperado.
    const handleScrollAnimation = () => {
        animateElements.forEach(el => {
            if (el.classList.contains('visible')) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    };

    // É necessário verificar constantemente ou usar melhor o retorno de chamada do observador.
    // A função de retorno de chamada do observador acima já adiciona a classe. Precisamos apenas garantir que o CSS a reconheça ou definir estilos embutidos nela.
    // Função de retorno de chamada do observador modificada para definir estilos diretamente, visando simplicidade e confiabilidade, sem regras adicionais de classe CSS.

    const styleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                styleObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animateElements.forEach(el => {
        styleObserver.observe(el);
    });

});
