document.addEventListener('DOMContentLoaded', () => {
    // 0a. Inject Master Navbar directly to avoid local CORS issues
    const navPlaceholder = document.getElementById('nav-placeholder');
    if (navPlaceholder) {
        navPlaceholder.innerHTML = `
<nav class="navbar">
    <div class="nav-container">
        <a href="../home/" class="nav-logo">Rajnish</a>
        <ul class="nav-links">
            <li><a href="../home/" class="nav-link" data-path="/home/"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="nav-icon"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg> Home</a></li>
            <li><a href="../research/" class="nav-link" data-path="/research/"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="nav-icon"><circle cx="9" cy="9" r="2"></circle><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path><path d="M9 3v.01"></path><path d="M5 5v.01"></path><path d="M3 9v.01"></path></svg> Research</a></li>
            <li><a href="../projects/" class="nav-link" data-path="/projects/"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="nav-icon"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg> Projects</a></li>
            <li><a href="../blog/" class="nav-link" data-path="/blog/"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="nav-icon"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg> Blog</a></li>
            <li><a href="../youtube/" class="nav-link" data-path="/youtube/"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="nav-icon"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg> YouTube</a></li>
            <li><a href="../skills/" class="nav-link" data-path="/skills/"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="nav-icon"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg> Skills</a></li>
            <li><a href="../cv/" class="nav-link" data-path="/cv/"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="nav-icon"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg> CV</a></li>
            <li><a href="../connect/" class="nav-link" data-path="/connect/"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="nav-icon"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg> Connect</a></li>
        </ul>
        <div class="hamburger">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
        </div>
    </div>
</nav>
        `;
        
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

    // Hamburger menu logic moved to the fetch component loader above

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
