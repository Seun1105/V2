document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });
    }

    // Dynamic Year in Footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Close mobile menu if open
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
            }

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Simple Fade-in Animation on Scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('fade-in-section');
        observer.observe(section);
    });

    // Who it is for
    // 1. Get references to the main section and all cards
    const audienceSection = document.getElementById('audience');
    const audienceCards = document.querySelectorAll('.audience-card');
    
    // 2. Store the default background property
    const defaultBg = window.getComputedStyle(audienceSection).backgroundImage;

    // 3. Loop through each card to add event listeners
    audienceCards.forEach(card => {
        // Get the specific background URL from the data attribute
        const newBgUrl = card.getAttribute('data-bg-url');

        // Event: Mouse enters the card (Hover)
        card.addEventListener('mouseenter', () => {
            if (newBgUrl) {
                // Change the main section's background image
                audienceSection.style.backgroundImage = newBgUrl;
                audienceSection.style.backgroundSize = "cover"
            }
        });

        // Event: Mouse leaves the card (Hover out)
        card.addEventListener('mouseleave', () => {
            // Revert the main section's background to the default
            audienceSection.style.backgroundImage = defaultBg;
        });

        // If you only want this on CLICK instead of hover, use this:
        /*
        card.addEventListener('click', () => {
             if (newBgUrl) {
                audienceSection.style.backgroundImage = newBgUrl;
            }
        });
        */
    });

    // Newsletter Form Handling
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value;

            if (email) {
                // Simulate API call
                const btn = newsletterForm.querySelector('button');
                const originalText = btn.textContent;

                btn.textContent = 'Subscribing...';
                btn.disabled = true;

                setTimeout(() => {
                    alert(`Thank you for subscribing with ${email}!`);
                    newsletterForm.reset();
                    btn.textContent = 'Subscribed!';

                    setTimeout(() => {
                        btn.textContent = originalText;
                        btn.disabled = false;
                    }, 2000);
                }, 1000);
            }
        });
    }

    // Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Simulate API call
            const btn = contactForm.querySelector('button');
            const originalText = btn.textContent;

            btn.textContent = 'Sending...';
            btn.disabled = true;

            setTimeout(() => {
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
                btn.textContent = 'Message Sent!';

                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.disabled = false;
                }, 2000);
            }, 1000);
        });
    }
});
