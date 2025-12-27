/*!
 * © 2025 CodeWithDivine
 * MIT License (see LICENSE)
 */


        // Coverflow functionality
        const coverflowItems = document.querySelectorAll('.coverflow-item');
        const coverflowDotsContainer = document.getElementById('coverflowDots');
        let currentCoverflowIndex = 2;
        let isCoverflowAnimating = false;

        // Create dots for coverflow
        coverflowItems.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'dot';
            dot.onclick = () => goToCoverflowIndex(index);
            coverflowDotsContainer.appendChild(dot);
        });

        const coverflowDots = document.querySelectorAll('.coverflow-dots .dot');

        function updateCoverflow() {
            if (isCoverflowAnimating) return;
            isCoverflowAnimating = true;

            coverflowItems.forEach((item, index) => {
                let offset = index - currentCoverflowIndex;
                
                if (offset > coverflowItems.length / 2) {
                    offset = offset - coverflowItems.length;
                }
                else if (offset < -coverflowItems.length / 2) {
                    offset = offset + coverflowItems.length;
                }
                
                const absOffset = Math.abs(offset);
                const sign = Math.sign(offset);
                
                let translateX = offset * 240;
                let translateZ = -absOffset * 200;
                let rotateY = -sign * Math.min(absOffset * 60, 60);
                let opacity = 1 - (absOffset * 0.2);
                let scale = 1 - (absOffset * 0.1);

                if (absOffset > 2) {
                    opacity = 0;
                    translateX = sign * 800;
                }

                item.style.transform = `
                    translateX(${translateX}px) 
                    translateZ(${translateZ}px) 
                    rotateY(${rotateY}deg)
                    scale(${scale})
                `;
                item.style.opacity = opacity;
                item.style.zIndex = 100 - absOffset;

                item.classList.toggle('active', index === currentCoverflowIndex);
            });

            coverflowDots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentCoverflowIndex);
            });

            setTimeout(() => {
                isCoverflowAnimating = false;
            }, 600);
        }

        function navigateCoverflow(direction) {
            if (isCoverflowAnimating) return;
            
            currentCoverflowIndex = currentCoverflowIndex + direction;
            
            if (currentCoverflowIndex < 0) {
                currentCoverflowIndex = coverflowItems.length - 1;
            } else if (currentCoverflowIndex >= coverflowItems.length) {
                currentCoverflowIndex = 0;
            }
            
            updateCoverflow();
        }

        function goToCoverflowIndex(index) {
            if (isCoverflowAnimating || index === currentCoverflowIndex) return;
            currentCoverflowIndex = index;
            updateCoverflow();
        }

        // Initialize coverflow
        updateCoverflow();

        // Mobile menu toggle
        const menuToggle = document.getElementById('menuToggle');
        const mainMenu = document.getElementById('mainMenu');

        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mainMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on menu items
        document.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                mainMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !mainMenu.contains(e.target)) {
                menuToggle.classList.remove('active');
                mainMenu.classList.remove('active');
            }
        });

        // Portfolio filtering
        const filterButtons = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');
                
                const filterValue = button.getAttribute('data-filter');
                
                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });

        // Form submission
        const contactForm = document.getElementById('contactForm');
        
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Header scroll effect
        const header = document.getElementById('header');
        const scrollToTopBtn = document.getElementById('scrollToTop');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            if (window.scrollY > 500) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });

        // Scroll to top functionality
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Active menu item on scroll
        const sections = document.querySelectorAll('section');
        const menuItems = document.querySelectorAll('.menu-item');

        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (window.scrollY >= (sectionTop - 100)) {
                    current = section.getAttribute('id');
                }
            });
            
            menuItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${current}`) {
                    item.classList.add('active');
                }
            });
        });
    