document.addEventListener('DOMContentLoaded', () => {
    // 0. Neural Network / Data Science Animated Canvas Background
    const canvas = document.getElementById('bg-canvas');
    if (canvas && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;
        
        const particles = [];
        const properties = {
            particleColor: 'rgba(94, 139, 183, 0.5)', /* Accent color */
            particleRadius: 2.5,
            particleCount: 50, /* Adjust density */
            particleMaxVelocity: 0.3, /* Slow, calm drift */
            lineLength: 170 /* Connection range */
        };

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.velocityX = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
                this.velocityY = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
                // Initialize color, will be updated dynamically
                this.color = '';
            }
            position() {
                // Bounce off edges gently
                if ((this.x + this.velocityX > width && this.velocityX > 0) || (this.x + this.velocityX < 0 && this.velocityX < 0)) this.velocityX *= -1;
                if ((this.y + this.velocityY > height && this.velocityY > 0) || (this.y + this.velocityY < 0 && this.velocityY < 0)) this.velocityY *= -1;
                this.x += this.velocityX;
                this.y += this.velocityY;
            }
            redraw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, properties.particleRadius, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fillStyle = properties.particleColor;
                ctx.fill();
            }
        }

        for (let i = 0; i < properties.particleCount; i++) {
            particles.push(new Particle());
        }

        function drawLines() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    let dx = particles[i].x - particles[j].x;
                    let dy = particles[i].y - particles[j].y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < properties.lineLength) {
                        let opacity = 1 - (distance / properties.lineLength);
                        
                        ctx.lineWidth = 0.5;
                        ctx.strokeStyle = `rgba(94, 139, 183, ${opacity * 0.4})`; /* Synapse appearance */
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.closePath();
                        ctx.stroke();
                    }
                }
            }
        }

        function loop() {
            ctx.clearRect(0, 0, width, height); // Native canvas clears dynamically over the CSS gradient
            for (let i = 0; i < properties.particleCount; i++) {
                particles[i].position();
                particles[i].redraw();
            }
            drawLines();
            requestAnimationFrame(loop);
        }
        
        loop(); // Start animation
    }

    // 1. Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // 2. Hamburger Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // 3. Typing Effect (Academic Phrases)
    const typingText = document.getElementById('typing-text');
    const phrases = [
        "Aspiring Data Scientist",
        "Mathematical Foundations of AI",
        "Algorithmic Thinking",
        "Preparing for GATE DA 2028"
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isWaiting = false; // Renamed from isPaused to avoid conflict with snippet

    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typingText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 40 : 80;

        if (!isDeleting && charIndex === currentPhrase.length) {
            isWaiting = true; // Use isWaiting
            typeSpeed = 2000; // Pause at end of phrase
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isWaiting = false;
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500; // Pause before typing new phrase
        }

        setTimeout(type, typeSpeed);
    }

    // Start typing effect after 1 second
    setTimeout(type, 1000);

    // 4. Scroll Active Link Highlighting
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').slice(1) === current) {
                item.classList.add('active');
            }
        });
    });

    // 5. Scroll Reveal & Skill Bar Animation
    const revealElements = document.querySelectorAll('.reveal');
    const skillBars = document.querySelectorAll('.progress');
    
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function reveal() {
        if (prefersReducedMotion) {
            revealElements.forEach(el => el.classList.add('active'));
            skillBars.forEach(bar => {
                bar.style.width = bar.getAttribute('data-width');
            });
            return;
        }

        const windowHeight = window.innerHeight;
        const revealPoint = 75; // Adjust as needed

        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - revealPoint) {
                el.classList.add('active');
            }
        });

        // Trigger skill bars when skills section is visible
        const skillsSection = document.getElementById('skills');
        if (skillsSection) {
            const skillsTop = skillsSection.getBoundingClientRect().top;
            if (skillsTop < windowHeight - revealPoint) {
                skillBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    bar.style.width = width;
                });
            }
        }
    }

    window.addEventListener('scroll', reveal);
    reveal(); // Trigger on load
});
