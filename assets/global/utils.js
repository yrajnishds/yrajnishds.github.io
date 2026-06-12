// Add transition overlay to body immediately
document.body.insertAdjacentHTML('afterbegin', '<div class="page-transition-overlay"></div>');

window.loadComponent = async function(elementId, componentPath) {
    try {
        const response = await fetch(componentPath);
        if (response.ok) {
            const html = await response.text();
            const el = document.getElementById(elementId);
            if(el) {
                el.innerHTML = html;
                
                // Set year if available
                const yearSpan = document.getElementById('year');
                if(yearSpan) {
                    yearSpan.textContent = new Date().getFullYear();
                }

                // Bind generic navigation any time components mount 
                initNavigation();
                initThemeToggle();
            }
        }
    } catch (error) {
        console.error(`Error loading component from ${componentPath}:`, error);
    }
};

function initNavigation() {
    const root = window.PORTFOLIO_ROOT || './';
    const linkMap = {
        'home': root + 'home/',
        'projects': root + 'projects/',
        'research': root + 'research/',
        'blog': root + 'blog/',
        'connect': root + 'connect/',
        'skills': root + 'skills/',
        'cv': root + 'cv/'
    };

    const logo = document.querySelector('.nav-logo');
    if(logo) logo.setAttribute('href', linkMap['home']);

    const profileImg = document.querySelector('.nav-profile-img');
    if(profileImg) profileImg.setAttribute('src', root + 'assets/images/profile.jpg');

    // Update main nav links dynamically
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname;

    navLinks.forEach(link => {
        const target = link.getAttribute('data-link');
        if(target && linkMap[target]) {
            link.setAttribute('href', linkMap[target]);
        }
        
        // Active state check based on URL
        if (currentPath.includes(`/${target}/`) || currentPath.endsWith(`/${target}`)) {
            link.classList.add('active');
        }

        // Page Transition Click Intercept
        link.addEventListener('click', (e) => {
            if (target && linkMap[target] && !link.classList.contains('active')) {
                e.preventDefault();
                document.body.classList.add('fade-out');
                setTimeout(() => {
                    window.location.href = linkMap[target];
                }, 400); // Wait for transition
            }
        });
    });

    // Update footer links dynamically 
    const footerLinks = document.querySelectorAll('.footer-link[data-link]');
    footerLinks.forEach(link => {
        const target = link.getAttribute('data-link');
        if(target && linkMap[target]) {
            link.setAttribute('href', linkMap[target]);
        }

        // Page Transition Click Intercept
        link.addEventListener('click', (e) => {
            if (target && linkMap[target]) {
                e.preventDefault();
                document.body.classList.add('fade-out');
                setTimeout(() => {
                    window.location.href = linkMap[target];
                }, 400);
            }
        });
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');
    if(hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Navbar scroll effect
    const navElement = document.querySelector('.navbar');
    if (navElement) {
        window.addEventListener('scroll', () => {
            if(window.scrollY > 50) {
                navElement.classList.add('scrolled');
            } else {
                navElement.classList.remove('scrolled');
            }
        });
    }
}

function initThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) return;

    // Check saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    
    // Check if we already applied theme early on body to avoid flicker
    if (!document.documentElement.hasAttribute('data-theme-loaded')) {
        // Default to light mode unless explicitly set to dark
        if (savedTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            document.body.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
            document.body.removeAttribute('data-theme'); // default is light
        }
        document.documentElement.setAttribute('data-theme-loaded', 'true');
    }

    if (document.documentElement.getAttribute('data-theme') === 'dark' || document.body.getAttribute('data-theme') === 'dark') {
        toggleBtn.textContent = '☀️'; // Sun icon to switch to light
    } else {
        toggleBtn.textContent = '🌙'; // Moon icon to switch to dark
    }

    // Remove old listeners to prevent duplicates
    const newToggleBtn = toggleBtn.cloneNode(true);
    toggleBtn.parentNode.replaceChild(newToggleBtn, toggleBtn);

    newToggleBtn.addEventListener('click', () => {
        if (document.documentElement.getAttribute('data-theme') === 'dark' || document.body.getAttribute('data-theme') === 'dark') {
            // Switch to Light
            document.documentElement.removeAttribute('data-theme');
            document.body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            newToggleBtn.textContent = '🌙';
        } else {
            // Switch to Dark
            document.documentElement.setAttribute('data-theme', 'dark');
            document.body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            newToggleBtn.textContent = '☀️';
        }
    });
}

// Early theme init to prevent flash
(function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (document.body) document.body.setAttribute('data-theme', 'dark');
    }
})();


document.addEventListener('DOMContentLoaded', () => {
    // Reveal animations
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach(reveal => {
        observer.observe(reveal);
    });

    // Remove page transition overlay on load
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.body.classList.add('loaded');
        }, 100);

        // Simulate skeleton loading if wrappers exist
        const skeletons = document.querySelectorAll('.skeleton-wrapper');
        if (skeletons.length > 0) {
            setTimeout(() => {
                skeletons.forEach(el => {
                    // Find elements with skeleton class inside wrapper and remove it
                    const skels = el.querySelectorAll('.skeleton');
                    skels.forEach(s => s.classList.remove('skeleton'));
                });
            }, 800); // 800ms artificial delay for visual effect
        }
    });
});
