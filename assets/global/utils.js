// Function attached to window for global access
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
        'youtube': root + 'youtube/',
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
    });

    // Update footer links dynamically 
    const footerLinks = document.querySelectorAll('.footer-link[data-link]');
    footerLinks.forEach(link => {
        const target = link.getAttribute('data-link');
        if(target && linkMap[target]) {
            link.setAttribute('href', linkMap[target]);
        }
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
    window.addEventListener('scroll', () => {
        if(window.scrollY > 50) {
            navElement.classList.add('scrolled');
        } else {
            navElement.classList.remove('scrolled');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Reveal animations
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach(reveal => {
        // Init styles for reveals
        reveal.style.opacity = '0';
        reveal.style.transform = 'translateY(30px)';
        reveal.style.transition = 'all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)';
        observer.observe(reveal);
    });
});
