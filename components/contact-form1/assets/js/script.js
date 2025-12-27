/*!
 * © 2025 CodeWithDivine
 * MIT License (see LICENSE)
 */
        document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('contactForm');
            const formGroups = document.querySelectorAll('.form-group');
            
            // Add focus/blur events for floating labels
            const inputs = document.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                input.addEventListener('focus', function() {
                    this.parentElement.classList.add('focused');
                });
                
                input.addEventListener('blur', function() {
                    if (!this.value) {
                        this.parentElement.classList.remove('focused');
                    }
                });
                
                // Initialize focused state for pre-filled values
                if (input.value) {
                    input.parentElement.classList.add('focused');
                }
            });
            
            // Form validation
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Reset previous validation states
                formGroups.forEach(group => {
                    group.classList.remove('success', 'error');
                });
                
                // Validation status
                let isValid = true;
                
                // Validate name
                const name = document.getElementById('name');
                if (!name.value.trim()) {
                    name.parentElement.classList.add('error');
                    isValid = false;
                } else {
                    name.parentElement.classList.add('success');
                }
                
                // Validate email
                const email = document.getElementById('email');
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email.value)) {
                    email.parentElement.classList.add('error');
                    isValid = false;
                } else {
                    email.parentElement.classList.add('success');
                }
                
                // Validate phone
                const phone = document.getElementById('phone');
                if (phone.value && !/^[\d\s()+-]{7,20}$/.test(phone.value)) {
                    phone.parentElement.classList.add('error');
                    isValid = false;
                } else if (phone.value) {
                    phone.parentElement.classList.add('success');
                }
                
                // Validate subject
                const subject = document.getElementById('subject');
                if (!subject.value) {
                    subject.parentElement.classList.add('error');
                    isValid = false;
                } else {
                    subject.parentElement.classList.add('success');
                }
                
                // Validate message
                const message = document.getElementById('message');
                if (!message.value.trim()) {
                    message.parentElement.classList.add('error');
                    isValid = false;
                } else {
                    message.parentElement.classList.add('success');
                }
                
                // If valid, show success message
                if (isValid) {
                    // Create success animation
                    const button = form.querySelector('button');
                    button.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                    button.style.background = 'linear-gradient(135deg, #4ADE80, #22C55E)';
                    
                    setTimeout(() => {
                        // Reset form for demo purposes
                        form.reset();
                        
                        // Remove validation classes
                        formGroups.forEach(group => {
                            group.classList.remove('success', 'error', 'focused');
                        });
                        
                        // Reset button
                        setTimeout(() => {
                            button.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                            button.style.background = '';
                        }, 2000);
                    }, 1500);
                }
            });
        });
    