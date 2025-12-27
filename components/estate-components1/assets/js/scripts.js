


        // Enhanced Dark Mode Toggle
        const toggleBtn = document.getElementById('themeToggle');
        const body = document.body;
        
        toggleBtn.addEventListener('click', () => {
            const isDark = body.getAttribute('data-theme') === 'dark';
            body.setAttribute('data-theme', isDark ? 'light' : 'dark');
            
            // Update icon
            const icon = toggleBtn.querySelector('i');
            if (isDark) {
                icon.className = 'fas fa-moon';
            } else {
                icon.className = 'fas fa-sun';
            }
        });

        // Enhanced Number Animation (Counter)
        const counters = document.querySelectorAll('.counter');
        
        const animateCounters = () => {
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const prefix = counter.innerText.includes('$') ? '$' : '';
                
                const updateCount = () => {
                    const currentText = counter.innerText.replace(/[^0-9.]/g, '');
                    const count = +currentText || 0;
                    const inc = target / 100;

                    if (count < target) {
                        counter.innerText = prefix + Math.ceil(count + inc).toLocaleString();
                        setTimeout(updateCount, 20);
                    } else {
                        counter.innerText = prefix + target.toLocaleString();
                    }
                };
                updateCount();
            });
        };

        // Trigger animation when page loads
        window.addEventListener('load', animateCounters);

        // Enhanced Tab Switching Logic
        function switchTab(element) {
            const parent = element.parentElement;
            const tabs = parent.querySelectorAll('.tab');
            tabs.forEach(t => t.classList.remove('active'));
            element.classList.add('active');
            
            // Add a subtle animation effect
            element.style.transform = 'scale(0.95)';
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 150);
        }

        // Enhanced Staggered Entry Animation using IntersectionObserver
        const observerOptions = {
            threshold: 0.05
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add a slight delay based on index for staggered effect
                    setTimeout(() => {
                        entry.target.style.opacity = "1";
                        entry.target.style.transform = "translateY(0)";
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.card').forEach((card, index) => {
            card.style.opacity = "0";
            card.style.transform = "translateY(30px)";
            card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
            observer.observe(card);
        });

        // Add ripple effect to buttons
        document.querySelectorAll('.btn-primary, .btn-icon, .tab').forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });

        // Handle window resize for responsive adjustments
        window.addEventListener('resize', function() {
            // This ensures any layout recalculations happen smoothly
            document.body.style.overflow = 'hidden';
            setTimeout(() => {
                document.body.style.overflow = '';
            }, 100);
        });
    
