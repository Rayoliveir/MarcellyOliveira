// Scroll Animation Controller
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        this.init();
    }

    init() {
        // Add animation classes to sections
        this.addAnimationClasses();
        
        // Create intersection observer
        const observer = new IntersectionObserver(
            this.handleIntersection.bind(this),
            this.observerOptions
        );

        // Observe all animated elements
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    }

    addAnimationClasses() {
        // Sections to animate
        const sections = [
            '.hero-content',
            '.sobre',
            '.cards',
            '.projetos-container',
            '.bento-item',
            '.quote-section',
            '.contato-wrapper'
        ];

        sections.forEach((selector, index) => {
            document.querySelectorAll(selector).forEach(el => {
                el.classList.add('animate-on-scroll');
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = `opacity 0.8s ease, transform 0.8s ease ${index * 0.1}s`;
            });
        });

        // Stagger animation for cards
        document.querySelectorAll('.card').forEach((card, index) => {
            card.classList.add('animate-on-scroll');
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = `opacity 0.6s ease, transform 0.6s ease ${index * 0.15}s`;
        });

        // Stagger animation for bento items
        document.querySelectorAll('.bento-item').forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = `opacity 0.6s ease, transform 0.6s ease ${index * 0.1}s`;
        });
    }

    handleIntersection(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ScrollAnimations();
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});