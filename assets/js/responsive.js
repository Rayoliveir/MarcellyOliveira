// Responsive Design Controller
class ResponsiveManager {
    constructor() {
        this.breakpoints = {
            mobile: 0,
            tablet: 768,
            desktop: 1024,
            largeDesktop: 1440
        };
        
        this.currentBreakpoint = this.getBreakpoint();
        this.menuOpen = false;
        
        this.init();
    }

    init() {
        // Initial setup
        this.setup();
        
        // Event listeners
        window.addEventListener('resize', this.debounce(this.handleResize.bind(this), 250));
        window.addEventListener('load', this.handleLoad.bind(this));
        
        // Mobile menu toggle
        this.createMobileMenuToggle();
        
        // Touch interactions
        this.setupTouchInteractions();
        
        // Responsive images
        this.optimizeImages();
        
        // Dynamic font sizing
        this.adjustFontSizes();
    }

    getBreakpoint() {
        const width = window.innerWidth;
        if (width <= this.breakpoints.tablet) return 'mobile';
        if (width <= this.breakpoints.desktop) return 'tablet';
        return 'desktop';
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    handleResize() {
        const newBreakpoint = this.getBreakpoint();
        
        if (newBreakpoint !== this.currentBreakpoint) {
            this.currentBreakpoint = newBreakpoint;
            this.setup();
            
            // Dispatch custom event for other scripts to listen
            window.dispatchEvent(new CustomEvent('breakpointChange', { 
                detail: { breakpoint: newBreakpoint } 
            }));
        }
        
        this.adjustFontSizes();
        this.adjustGridLayout();
    }

    handleLoad() {
        this.setup();
        this.optimizeImages();
    }

    setup() {
        const breakpoint = this.currentBreakpoint;
        
        // Apply breakpoint-specific classes to body
        document.body.classList.remove('breakpoint-mobile', 'breakpoint-tablet', 'breakpoint-desktop');
        document.body.classList.add(`breakpoint-${breakpoint}`);
        
        // Adjust layouts based on breakpoint
        switch(breakpoint) {
            case 'mobile':
                this.setupMobileLayout();
                break;
            case 'tablet':
                this.setupTabletLayout();
                break;
            case 'desktop':
                this.setupDesktopLayout();
                break;
        }
    }

    setupMobileLayout() {
        // Stack all cards vertically
        document.querySelectorAll('.cards').forEach(container => {
            container.style.flexDirection = 'column';
            container.style.alignItems = 'center';
        });

        // Single column grid
        document.querySelectorAll('.bento-grid').forEach(grid => {
            grid.style.gridTemplateColumns = '1fr';
        });

        // Full width contact wrapper
        document.querySelectorAll('.contato-wrapper').forEach(wrapper => {
            wrapper.style.gridTemplateColumns = '1fr';
            wrapper.style.gap = '40px';
        });

        // Adjust hero layout
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.padding = '0 15px';
        }

        // Stack quote section
        document.querySelectorAll('.quote-container').forEach(container => {
            container.style.flexDirection = 'column';
            container.style.textAlign = 'center';
        });
    }

    setupTabletLayout() {
        // Two columns for cards
        document.querySelectorAll('.cards').forEach(container => {
            container.style.flexDirection = 'row';
            container.style.flexWrap = 'wrap';
            container.style.justifyContent = 'center';
        });

        // Two column bento grid
        document.querySelectorAll('.bento-grid').forEach(grid => {
            grid.style.gridTemplateColumns = 'repeat(2, 1fr)';
        });

        // Two column contact
        document.querySelectorAll('.contato-wrapper').forEach(wrapper => {
            wrapper.style.gridTemplateColumns = '1fr 1fr';
            wrapper.style.gap = '60px';
        });
    }

    setupDesktopLayout() {
        // Original layout maintained
        document.querySelectorAll('.cards').forEach(container => {
            container.style.flexDirection = '';
            container.style.flexWrap = '';
        });

        // Original bento grid
        document.querySelectorAll('.bento-grid').forEach(grid => {
            grid.style.gridTemplateColumns = '1.2fr 1fr';
        });

        // Original contact layout
        document.querySelectorAll('.contato-wrapper').forEach(wrapper => {
            wrapper.style.gridTemplateColumns = '1.2fr 0.8fr';
            wrapper.style.gap = '80px';
        });
    }

    adjustGridLayout() {
        const breakpoint = this.currentBreakpoint;
        
        // Projects carousel adjustment
        const projectCards = document.querySelectorAll('.projeto-card');
        projectCards.forEach(card => {
            if (breakpoint === 'mobile') {
                card.style.minWidth = '100%';
            } else if (breakpoint === 'tablet') {
                card.style.minWidth = 'calc(50% - 15px)';
            } else {
                card.style.minWidth = '';
            }
        });
    }

    adjustFontSizes() {
        const width = window.innerWidth;
        const baseSize = Math.min(Math.max(width / 100, 14), 18);
        
        document.documentElement.style.fontSize = `${baseSize}px`;
        
        // Hero title responsive sizing
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            const titleSize = width <= 768 ? 'clamp(48px, 12vw, 80px)' : 'clamp(68px, 8vw, 400px)';
            heroTitle.style.fontSize = titleSize;
        }
        
        // Section headings
        document.querySelectorAll('.superior h3, .projetos h2, .superior-centro h3').forEach(heading => {
            heading.style.fontSize = width <= 768 ? '32px' : '';
        });
    }

    createMobileMenuToggle() {
        // Check if mobile menu toggle already exists
        if (document.querySelector('.mobile-menu-toggle')) return;
        
        const header = document.querySelector('.header');
        if (!header) return;
        
        const toggle = document.createElement('button');
        toggle.className = 'mobile-menu-toggle';
        toggle.innerHTML = `
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
        `;
        toggle.setAttribute('aria-label', 'Toggle Menu');
        toggle.style.cssText = `
            display: none;
            flex-direction: column;
            gap: 5px;
            background: none;
            border: none;
            cursor: pointer;
            padding: 10px;
            z-index: 1001;
        `;
        
        // Add hamburger line styles
        const style = document.createElement('style');
        style.textContent = `
            .hamburger-line {
                width: 25px;
                height: 3px;
                background-color: var(--espresso, #4A2114);
                transition: all 0.3s ease;
            }
            
            @media (max-width: 768px) {
                .mobile-menu-toggle {
                    display: flex !important;
                }
                
                .nav-links {
                    position: fixed;
                    top: 80px;
                    left: -100%;
                    width: 100%;
                    height: calc(100vh - 80px);
                    background-color: #fff;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    transition: left 0.3s ease;
                    gap: 30px;
                }
                
                .nav-links.active {
                    left: 0;
                }
                
                .nav-links a {
                    font-size: 24px;
                }
                
                .header-right {
                    gap: 15px;
                }
            }
        `;
        document.head.appendChild(style);
        
        header.appendChild(toggle);
        
        const navLinks = document.querySelector('.nav-links');
        if (navLinks) {
            toggle.addEventListener('click', () => {
                this.menuOpen = !this.menuOpen;
                navLinks.classList.toggle('active');
                toggle.classList.toggle('active');
                
                // Animate hamburger
                const lines = toggle.querySelectorAll('.hamburger-line');
                if (this.menuOpen) {
                    lines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                    lines[1].style.opacity = '0';
                    lines[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    lines[0].style.transform = '';
                    lines[1].style.opacity = '';
                    lines[2].style.transform = '';
                }
            });
        }
    }

    setupTouchInteractions() {
        // Add touch-friendly hover states
        document.querySelectorAll('.btn-principal, .btn-secundario, .projeto-links a, .link-direto').forEach(el => {
            el.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            el.addEventListener('touchend', function() {
                this.style.transform = '';
            });
        });
        
        // Prevent zoom on double tap
        document.addEventListener('dblclick', function(event) {
            event.preventDefault();
        }, { passive: false });
    }

    optimizeImages() {
        const width = window.innerWidth;
        const pixelRatio = window.devicePixelRatio || 1;
        
        // Lazy loading for images
        document.querySelectorAll('img').forEach(img => {
            if (width <= this.breakpoints.tablet) {
                img.loading = 'lazy';
            }
        });
        
        // Optimize image quality based on screen size
        document.querySelectorAll('.card-image img').forEach(img => {
            if (width <= this.breakpoints.tablet) {
                img.style.objectPosition = 'center';
            }
        });
    }

    // Utility: Check if element is in viewport
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Utility: Get current orientation
    getOrientation() {
        return window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
    }
}

// Initialize responsive manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.responsiveManager = new ResponsiveManager();
});

// Handle orientation change
window.addEventListener('orientationchange', () => {
    setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
    }, 100);
});