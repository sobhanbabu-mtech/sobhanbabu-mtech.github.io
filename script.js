// ==========================================
// STATIC ACADEMIC PORTFOLIO
// DR. Y. SOBHAN BABU
// Essential JavaScript Features Only
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // MOBILE MENU TOGGLE
    // ==========================================
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = this.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(8px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.nav-container')) {
                navMenu.classList.remove('active');
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
    
    // ==========================================
    // STICKY NAVIGATION SCROLL EFFECT
    // ==========================================
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (navbar) {
            if (window.pageYOffset > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });
    
    // ==========================================
    // SMOOTH SCROLLING FOR ANCHOR LINKS
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only prevent default for valid anchor links
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ==========================================
    // CONTACT FORM HANDLING
    // ==========================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const btnSubmit = this.querySelector('.btn-submit');
            const btnText = btnSubmit.querySelector('.btn-text');
            const btnLoading = btnSubmit.querySelector('.btn-loading');
            
            // Show loading state
            if (btnText && btnLoading) {
                btnText.style.display = 'none';
                btnLoading.style.display = 'inline';
            }
            btnSubmit.disabled = true;
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Create mailto link with form data
            setTimeout(() => {
                const subject = encodeURIComponent(data.subject || 'Contact from Portfolio');
                const body = encodeURIComponent(
                    `Name: ${data.name}\n` +
                    `Email: ${data.email}\n` +
                    `Phone: ${data.phone || 'Not provided'}\n\n` +
                    `Message:\n${data.message}`
                );
                
                window.location.href = `mailto:sobhanbabu.mtech@gmail.com?subject=${subject}&body=${body}`;
                
                // Reset form
                this.reset();
                
                // Show success message
                alert('Thank you for your message! Your default email client will open to send the message.');
                
                // Reset button state
                if (btnText && btnLoading) {
                    btnText.style.display = 'inline';
                    btnLoading.style.display = 'none';
                }
                btnSubmit.disabled = false;
            }, 500);
        });
    }
    
    // ==========================================
    // SCROLL TO TOP BUTTON
    // ==========================================
    function createScrollToTopButton() {
        const button = document.createElement('button');
        button.innerHTML = '↑';
        button.className = 'scroll-to-top';
        button.setAttribute('aria-label', 'Scroll to top');
        button.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: #2c5282;
            color: white;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s ease, visibility 0.3s ease, background 0.3s ease;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            z-index: 999;
        `;
        
        button.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                button.style.opacity = '1';
                button.style.visibility = 'visible';
            } else {
                button.style.opacity = '0';
                button.style.visibility = 'hidden';
            }
        });
        
        button.addEventListener('mouseenter', function() {
            this.style.background = '#3182ce';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.background = '#2c5282';
        });
        
        document.body.appendChild(button);
    }
    
    // Create scroll to top button
    createScrollToTopButton();
    
    // ==========================================
    // FORM FIELD FOCUS EFFECTS
    // ==========================================
    document.querySelectorAll('.form-group input, .form-group textarea, .form-group select').forEach(field => {
        field.addEventListener('focus', function() {
            this.parentElement.style.transition = 'all 0.2s ease';
        });
    });
    
    // ==========================================
    // DYNAMIC YEAR IN FOOTER
    // ==========================================
    const footerYear = document.querySelector('.footer-bottom p');
    if (footerYear && footerYear.textContent.includes('2025')) {
        const currentYear = new Date().getFullYear();
        if (currentYear > 2025) {
            footerYear.textContent = footerYear.textContent.replace('2025', currentYear);
        }
    }
    
    // ==========================================
    // HIGHLIGHT ACTIVE PAGE IN NAVIGATION
    // ==========================================
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-menu a').forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
    
    // ==========================================
    // CONSOLE MESSAGE
    // ==========================================
    console.log('%c👨‍🏫 Dr. Y. Sobhan Babu - Academic Portfolio', 'font-size: 18px; font-weight: bold; color: #2c5282;');
    console.log('%cProfessor in Computer Science & Engineering', 'font-size: 13px; color: #4a5568;');
    console.log('%c25+ Years of Academic Excellence', 'font-size: 11px; color: #718096;');
    
});

// ==========================================
// HANDLE PAGE VISIBILITY CHANGE
// ==========================================
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        document.title = '👋 Come back! - Dr. Y. Sobhan Babu';
    } else {
        // Restore original title based on current page
        const pageTitles = {
            'index.html': 'Dr. Y. Sobhan Babu - Academic Portfolio',
            'about.html': 'About - Dr. Y. Sobhan Babu',
            'education.html': 'Education - Dr. Y. Sobhan Babu',
            'experience.html': 'Experience - Dr. Y. Sobhan Babu',
            'projects.html': 'Academic Projects - Dr. Y. Sobhan Babu',
            'publications.html': 'Publications - Dr. Y. Sobhan Babu',
            'conferences.html': 'Conferences - Dr. Y. Sobhan Babu',
            'contact.html': 'Contact - Dr. Y. Sobhan Babu'
        };
        
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        document.title = pageTitles[currentPage] || 'Dr. Y. Sobhan Babu - Academic Portfolio';
    }
});
