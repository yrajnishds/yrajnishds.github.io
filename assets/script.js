document.addEventListener('DOMContentLoaded', () => {
    // 0a. Fetch and Inject Master Navbar
    const navPlaceholder = document.getElementById('nav-placeholder');
    if (navPlaceholder) {
        fetch('../components/nav.html')
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.text();
            })
            .then(html => {
                navPlaceholder.innerHTML = html;
                initializeNavigation();
            })
            .catch(error => console.error('Error loading navigation:', error));
    }

    // Initialize Navigation specific scripts
    function initializeNavigation() {
        // Highlight active link based on current path
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (currentPath.includes(link.getAttribute('data-path'))) {
                link.classList.add('active');
            }
        });

        // Attach Hamburger Menu Toggle
        const hamburger = document.querySelector('.hamburger');
        const navLinksUl = document.querySelector('.nav-links');
        if (hamburger) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navLinksUl.classList.toggle('active');
            });
            
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navLinksUl.classList.remove('active');
                });
            });
        }
    }

    // 0b. Fetch and Inject Master Footer
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        fetch('../components/footer.html')
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.text();
            })
            .then(html => {
                footerPlaceholder.innerHTML = html;
                initializeFooter();
            })
            .catch(error => console.error('Error loading footer:', error));
    }

    // Initialize Footer specific scripts
    function initializeFooter() {
        // 1. Set current year in footer
        const yearElement = document.getElementById('year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }

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
    setTimeout(type, 1000);

    // 3.5. Typing Effect for Academic Log
    const logTypingText = document.getElementById('log-typing-text');
    if (logTypingText) {
        // We will store HTML strings instead of plain text because of the strong tags with classes
        const logPhrases = [
            '<strong class="text-teal">DBMS (Database Management Systems):</strong> Designing robust schemas and mastering advanced SQL for scalable data storage.',
            '<strong class="text-purple">PDSA (Programming, Data Structures, and Algorithms):</strong> Analyzing algorithmic efficiency and implementing optimal Python architectures.',
            '<strong class="text-gold">MLF (Machine Learning Foundations):</strong> Exploring the mathematical mechanisms and essential statistics underlying predictive models.',
            '<strong class="text-accent">MAD (Modern Application Development):</strong> Creating full-stack, deployed solutions to serve data-driven applications seamlessly.'
        ];

        let logPhraseIndex = 0;
        let logCharIndex = 0;
        let logIsDeleting = false;

        function typeLog() {
            const currentLogPhrase = logPhrases[logPhraseIndex];

            // To handle HTML tags smoothly without breaking them mid-type,
            // we calculate the total visible characters and map our character
            // index to the string length including tags.

            let displayHTML = "";
            let visibleCount = 0;
            let i = 0;

            // Reconstruct the HTML string up to the current visible character count
            while (i < currentLogPhrase.length && visibleCount < logCharIndex) {
                const char = currentLogPhrase[i];
                displayHTML += char;

                if (char === '<') {
                    // Fast-forward through the tag so it doesn't count as visible typed characters
                    while (i < currentLogPhrase.length && currentLogPhrase[i] !== '>') {
                        i++;
                        displayHTML += currentLogPhrase[i];
                    }
                } else {
                    visibleCount++;
                }
                i++;
            }

            // Allow the browser to automatically close the unclosed <strong> tags when inserted
            // This prevents tags from being literally typed out
            let tempDiv = document.createElement('div');
            tempDiv.innerHTML = displayHTML;
            logTypingText.innerHTML = tempDiv.innerHTML;

            let totalVisibleChars = currentLogPhrase.replace(/<[^>]*>/g, '').length;

            let logTypeSpeed = logIsDeleting ? 20 : 40;

            if (!logIsDeleting && logCharIndex >= totalVisibleChars) {
                // Pause at the end of typing
                logTypeSpeed = 4000;
                logIsDeleting = true;
            } else if (logIsDeleting && logCharIndex === 0) {
                // Pause before typing the next phrase
                logIsDeleting = false;
                logPhraseIndex = (logPhraseIndex + 1) % logPhrases.length;
                logTypeSpeed = 500;
            } else {
                // Determine next character index progression
                if (logIsDeleting) {
                    logCharIndex--;
                } else {
                    logCharIndex++;
                }
            }

            setTimeout(typeLog, logTypeSpeed);
        }

        // Start log typing effect quickly after load
        setTimeout(typeLog, 500);
    }

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
            const href = item.getAttribute('href');
            // Only apply active state if the link is a hash link for the current page
            if (href && href.startsWith('#') && href.slice(1) === current) {
                item.classList.add('active');
            } else if (href && href.includes('.html') && current === '') {
                // We keep it clean, active states for other pages will be handled on their respective pages
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
